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
    const { loading, isAuthenticated, hasRole, user } = useAuth();
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        // Solo redireccionar cuando no está cargando y sabemos el estado del usuario
        if (!loading) {
            if (!isAuthenticated) {
                setIsRedirecting(true);

                // Guardar la URL actual para redirigir de vuelta después del login
                const currentPath = window.location.pathname;
                if (currentPath !== '/login' && currentPath !== '/registro') {
                    sessionStorage.setItem('redirectAfterLogin', currentPath);
                }

                router.push(fallbackUrl);
            } else if (requiredRole && !hasRole(requiredRole)) {
                setIsRedirecting(true);
                router.push(unauthorizedUrl);
            }
        }
    }, [loading, isAuthenticated, hasRole, requiredRole, router, fallbackUrl, unauthorizedUrl]);

    // Mostrar indicador de carga
    if (loading || isRedirecting) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
        );
    }

    // Si está autenticado y tiene el rol requerido, muestra la página protegida
    return children;
}