'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { SupabaseClient } from '@/utils/supabaseClient'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [userRole, setUserRole] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const supabase = SupabaseClient.getInstance()

    // Función para obtener el rol del usuario desde la tabla user_profiles
    const fetchUserRole = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('Perfiles')
                .select('Rol')
                .eq('Usuario_ID', userId)
                .single()
            if (error) throw error
            return data.Rol
        } catch (error) {
            console.error('Error al obtener el rol del usuario:', error)
            return 'usuario' // Rol por defecto si hay error
        }
    }

    useEffect(() => {
        // Verificar la sesión existente cuando el componente se monta
        const checkSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()

                if (session) {
                    setUser(session.user)
                    const role = await fetchUserRole(session.user.id)
                    setUserRole(role)
                }
            } catch (error) {
                console.error('Error al verificar la sesión:', error)
            } finally {
                setLoading(false)
            }
        }

        checkSession()

        // Suscribirse a cambios en el estado de autenticación
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session) {
                setUser(session.user)
                const role = await fetchUserRole(session.user.id)
                setUserRole(role)
            } else {
                setUser(null)
                setUserRole(null)
            }
            setLoading(false)
        })

        return () => {
            subscription?.unsubscribe()
        }
    }, [])

    // Función para verificar si el usuario tiene un rol específico
    const hasRole = (requiredRole) => {
        if (!userRole) return false

        // Estructura de jerarquía de roles (de mayor a menor privilegio)
        const roleHierarchy = {
            'empresa': 3,
            'conductor': 2,
            'usuario': 1
        }

        // Comprueba si el rol del usuario tiene igual o mayor privilegio que el requerido
        return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
    }

    const login = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (error) throw error

            // // Obtener el rol después del login
            if (data.user) {
                const role = await fetchUserRole(data.user.id)
                setUserRole(role)
            }

            return { success: true, data }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    const logout = async () => {
        try {
            await supabase.auth.signOut()
            router.push('/login')
            return { success: true }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    const value = {
        user,
        userRole,
        loading,
        login,
        logout,
        hasRole,
        isAuthenticated: !!user
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider')
    }
    return context
}