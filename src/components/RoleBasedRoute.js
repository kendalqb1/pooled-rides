'use client'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function RoleBasedRoute({
    children,
    requiredRole = 'usuario',
    unauthorizedUrl = '/accesoDenegado'
}) {
    const { loading, isAuthenticated, hasRole, sessionChecked } = useAuth();
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        // Don't do anything until the initial session check is complete
        if (!sessionChecked) return;

        // Skip redirect logic while loading
        if (loading) return;

        // AuthStateManager already handles the redirection for unauthenticated users
        // Here we just need to check if the user has the required role
        if (isAuthenticated && requiredRole && !hasRole(requiredRole)) {
            console.log('User does not have required role:', requiredRole);
            setIsRedirecting(true);
            router.push(unauthorizedUrl);
        }
    }, [loading, isAuthenticated, hasRole, requiredRole, router, unauthorizedUrl, sessionChecked]);

    // Show loading state
    if (loading || isRedirecting) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                <p className="mt-4 text-lg">Verificando permisos...</p>
            </div>
        );
    }

    // If authenticated and has the required role, show the protected content
    return children;
}