'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const publicRoutes = ['/login', '/registro', '/cambioClave', '/accesoDenegado', '/aceptacionUser' ];

export default function AuthStateManager({ children }) {
    const { isAuthenticated, loading, sessionChecked } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Don't do anything until the initial session check is complete
        if (!sessionChecked) return;

        // Skip redirect logic while loading
        if (loading) return;

        const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

        // Log the current state for debugging
        console.log('AuthStateManager:', {
            isAuthenticated,
            pathname,
            isPublicRoute
        });

        // If not authenticated and trying to access protected route
        if (!isAuthenticated && !isPublicRoute) {
            console.log('Redirecting to login from protected route');
            // Save the current path for redirection after login
            sessionStorage.setItem('redirectAfterLogin', pathname);
            router.push('/login');
            return;
        }

        // If authenticated and on a public route (like login)
        if (isAuthenticated && isPublicRoute) {
            console.log('Redirecting from public route to app');
            const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/viajes';
            sessionStorage.removeItem('redirectAfterLogin');
            router.push(redirectPath);
            return;
        }
    }, [isAuthenticated, loading, pathname, router, sessionChecked]);

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="w-12 h-12 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
                <p className="mt-4 text-lg">Verificando sesión...</p>
            </div>
        );
    }

    return children;
}