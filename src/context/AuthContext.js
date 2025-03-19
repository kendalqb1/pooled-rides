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
    const [sessionChecked, setSessionChecked] = useState(false)
    const router = useRouter()

    const supabase = SupabaseClient.getInstance()

    const fetchUserRole = async (userId) => {
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

        // Fetch and set user role whenever user changes
        const role = await fetchUserRole(currentUser.id)
        setUserRole(role)
    }, [])

    // Initialize auth state on load
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                setLoading(true)

                // Check if there's an active session
                const { data, error } = await supabase.auth.getSession()

                if (error) {
                    console.error('Error getting session:', error)
                    return
                }

                if (data?.session?.user) {
                    await updateUserState(data.session.user)
                }
            } catch (error) {
                console.error('Error checking session:', error)
            } finally {
                setLoading(false)
                setSessionChecked(true)
            }
        }

        initializeAuth()
    }, [updateUserState])

    // Listen for auth changes
    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('Auth state changed:', event, session ? 'session exists' : 'no session')

                if (session?.user) {
                    await updateUserState(session.user)
                } else {
                    setUser(null)
                    setUserRole(null)
                }
            }
        )

        return () => {
            authListener?.subscription?.unsubscribe()
        }
    }, [updateUserState])

    const hasRole = useCallback((requiredRole) => {
        if (!userRole || !requiredRole) return false
        return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
    }, [userRole])

    const login = async (email, password) => {
        setLoading(true)
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) throw error

            if (data.user) {
                await updateUserState(data.user)
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
        <AuthContext.Provider value={{
            user,
            userRole,
            loading,
            login,
            logout,
            hasRole,
            isAuthenticated: !!user,
            sessionChecked
        }}>
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