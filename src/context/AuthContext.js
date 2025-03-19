'use client'
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { SupabaseClient } from '@/utils/supabaseClient'

const AuthContext = createContext()

const roleHierarchy = { empresa: 3, conductor: 2, usuario: 1 }

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [userRole, setUserRole] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const supabase = SupabaseClient.getInstance()

    const fetchUserRole = async (userId) => {
        console.log('first')
        try {
            const { data, error } = await supabase
                .from('Perfiles')
                .select('Rol')
                .eq('Usuario_ID', userId)
                .single()

            if (error) {
                console.error('Error al obtener el rol:', error)
                return 'usuario'
            }
            return data?.Rol || 'usuario'
        } catch (error) {
            console.error('Error inesperado al obtener el rol:', error)
            return 'usuario'
        }
    }

    const updateUserState = useCallback(async (currentUser) => {
        if (!currentUser) {
            setUser(null)
            setUserRole(null)
            return
        }

        setUser(currentUser)
    }, [])

    useEffect(() => {
        let mounted = true

        const handleAuthChange = async (event, session) => {
            if (mounted) {
                await updateUserState(session?.user || null)
                setLoading(false)
            }
        }

        // Verificar la sesión inicial
        supabase.auth.getSession()
            .then(({ data }) => {
                if (mounted) {
                    updateUserState(data?.session?.user || null)
                    setLoading(false)
                }
            })
            .catch((error) => console.error('Error obteniendo sesión:', error))

        // Suscribirse a cambios de autenticación
        const { data: subscription } = supabase.auth.onAuthStateChange(handleAuthChange)

        return () => {
            mounted = false
            subscription?.subscription?.unsubscribe()
        }
    }, [updateUserState])

    const hasRole = useCallback((requiredRole) => {
        return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
    }, [userRole])

    const login = async (email, password) => {
        setLoading(true)
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) throw error

            if (data.user) {
                await updateUserState(data.user)
                const role = await fetchUserRole(data.user.id)
                setUserRole(role)
            }
            return { success: true }
        } catch (error) {
            console.error('Error en login:', error)
            return { success: false, error: error.message }
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        setLoading(true)
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error

            setUser(null)
            setUserRole(null)
            router.push('/login')
            return { success: true }
        } catch (error) {
            return { success: false, error: error.message }
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{ user, userRole, loading, login, logout, hasRole, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider')
    }
    return context
}
