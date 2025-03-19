'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const publicRoutes = ['/login', '/registro', '/cambioClave', '/accesoDenegado'];

export default function AuthStateManager({ children }) {
    const { isAuthenticated, loading, user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (loading) return;

        const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

        // Si no está autenticado y está en una ruta protegida, redirigir a login
        if (!isAuthenticated && !isPublicRoute) {
            // Guardar la URL actual para redirigir después del login
            sessionStorage.setItem('redirectAfterLogin', pathname);
            router.push('/login');
            return;
        }

        // Si está autenticado y está en una ruta pública (como login), 
        // redirigir a la página principal o a la página guardada
        if (isAuthenticated && isPublicRoute) {
            const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/viajes';
            sessionStorage.removeItem('redirectAfterLogin');
            router.push(redirectPath);
            return;
        }
    }, [isAuthenticated, loading, pathname, router]);

    // Mostrar un spinner mientras se verifica la autenticación
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="w-12 h-12 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
        );
    }

    return children;
}