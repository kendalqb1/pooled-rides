'use client'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router'

export default function RoleBasedRoute({ children, requiredRole = 'usuario' }) {
    const { loading, isAuthenticated, hasRole } = useAuth()
    const router = useRouter()

    // Si está cargando, muestra un indicador de carga
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
        )
    }

    // Si no está autenticado, redirige al login
    if (!isAuthenticated) {
        router.push('/login')
        return null
    }

    // Si está autenticado pero no tiene el rol requerido, muestra un mensaje de acceso denegado
    if (!hasRole(requiredRole)) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="p-8 text-center bg-red-100 rounded-lg">
                    <h1 className="text-2xl font-bold text-red-700">Acceso Denegado</h1>
                    <p className="mt-4">No tienes los permisos necesarios para acceder a esta página.</p>
                    <button
                        onClick={() => router.push('/dashboard')}
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