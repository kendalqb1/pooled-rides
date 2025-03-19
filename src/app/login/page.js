'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { traducirErrorSupabase } from "@/utils/helpers";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    // Función mejorada para redirigir después del login
    const redirectAfterLogin = () => {
        // Verificar si hay una ruta guardada a la que redirigir
        const redirectPath = sessionStorage.getItem('redirectAfterLogin');
        console.log('Redirect path after login:', redirectPath);

        if (redirectPath) {
            sessionStorage.removeItem('redirectAfterLogin');
            router.push(redirectPath);
        } else {
            // Si no hay ruta guardada, ir a la página de viajes
            router.push('/viajes');
        }
    };

    // Redirige a la página de registro
    const redirectToRegistro = () => {
        router.push("/registro");
    };

    // Redirige a la página de "reset-password" para restablecer la contraseña
    const redirectToResetPassword = () => {
        router.push("/cambioClave");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const { success, error } = await login(email, password);

            if (!success) {
                setError(traducirErrorSupabase(error));
                setIsLoading(false);
                return;
            }

            // Give a moment for the auth state to update and then redirect
            setTimeout(() => {
                redirectAfterLogin();
                setIsLoading(false);
            }, 500);

        } catch (err) {
            console.error('Error en handleLogin:', err);
            setError("Hubo un problema al intentar iniciar sesión.");
            setIsLoading(false);
        }
    };

    return (
        <div className="flex text-black flex-col items-center justify-center min-h-screen bg-[#0c1822]">
            <h1 className="text-5xl font-bold mb-6 text-white">PooledRides</h1>

            {/* Mostrar mensaje de error si existe */}
            {error && <p className="text-red-500">{error}</p>}

            <form
                className="bg-white p-6 rounded-lg shadow-md w-80"
                onSubmit={handleLogin}
            >
                <label htmlFor="email" className="block text-lg font-medium">
                    Correo Electronico
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label htmlFor="password" className="block text-lg font-medium mt-4">
                    Contraseña
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="w-full mt-4 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-800 transition"
                    disabled={isLoading}
                >
                    {!isLoading ? "Iniciar Sesion" : "Cargando..."}
                </button>

                <button
                    type="button"
                    onClick={redirectToRegistro}
                    className="w-full mt-4 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-800 transition"
                    disabled={isLoading}
                >
                    Registrate
                </button>
            </form>

            {/* Enlace para restablecer la contraseña */}
            <p className="text-center text-white mt-4">
                <a
                    onClick={redirectToResetPassword}
                    className="text-orange-500 hover:underline cursor-pointer"
                >
                    ¿Olvidaste tu contraseña?
                </a>
            </p>
        </div>
    );
}