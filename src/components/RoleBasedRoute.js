'use client'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function RoleBasedRoute({ 
    children, 
    requiredRole = 'usuario',
    fallbackUrl = '/login',
    unauthorizedUrl = '/accesoDenegado'
}) {
    const { loading, isAuthenticated, hasRole, authError } = useAuth()
    const router = useRouter()
    const [isRedirecting, setIsRedirecting] = useState(false)

    useEffect(() => {
        // Solo redireccionar cuando no está cargando y sabemos el estado del usuario
        if (!loading) {
            if (!isAuthenticated) {
                setIsRedirecting(true)
                router.push(fallbackUrl)
            } else if (!hasRole(requiredRole)) {
                setIsRedirecting(true)
                router.push(unauthorizedUrl)
            }
        }
    }, [loading, isAuthenticated, hasRole, requiredRole, router, fallbackUrl, unauthorizedUrl])

    // Mostrar indicador de carga en cualquiera de estos casos
    if (loading || isRedirecting) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                {authError && (
                    <p className="mt-4 text-red-600">{authError}</p>
                )}
            </div>
        )
    }

    // Si está autenticado pero no tiene el rol requerido
    if (isAuthenticated && !hasRole(requiredRole)) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="p-8 text-center bg-red-100 rounded-lg">
                    <h1 className="text-2xl font-bold text-red-700">Acceso Denegado</h1>
                    <p className="mt-4">No tienes los permisos necesarios para acceder a esta página.</p>
                    <button
                        onClick={() => router.push(unauthorizedUrl)}
                        className="px-4 py-2 mt-6 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        Volver al Dashboard
                    </button>
                </div>
            </div>
        )
    }

    // Si está autenticado y tiene el rol requerido, muestra la página protegida
    return children
}