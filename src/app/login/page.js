'use client';

import { useState } from "react";
import { useRouter } from "next/navigation"; // Para Next.js 13+
import { SupabaseClient } from "../../utils/supabaseClient"; // Asegúrate de importar correctamente el archivo

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Estado para manejar el error
    const router = useRouter();

    // Redirige a la página de "viajes" con el parámetro del correo del usuario
    const redirectToViajes = () => {
        const queryParam = `?userEmail=${email}`;
        router.push(`/viajes${queryParam}`);
    };

    // Redirige a la página de registro
    const redirectToRegistro = () => {
        router.push("/registro");
    };

    // Redirige a la página de "reset-password" para restablecer la contraseña
    const redirectToResetPassword = () => {
        router.push("/cambioClave");
    };

    // Maneja el login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Limpiar el error si el usuario intenta de nuevo

        try {
            const supabase = SupabaseClient.getInstance(); 
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message); // Si hay un error, mostrarlo
                return; // No redirigir si hay error
            }

            // Si login es exitoso, redirigir a la página de "viajes"
            
            redirectToViajes();
        } catch (err) {
            setError("Hubo un problema al intentar iniciar sesión.");
        }
    };

    return (
        <div className="flex text-black flex-col items-center justify-center min-h-screen bg-[#0c1822]">
            <h1 className="text-5xl font-bold mb-6 text-white">PooledRides</h1>

            {/* Mostrar mensaje de error si existe */}
            {error && <p className="text-red-500">{error}</p>}

            <form
                className="bg-white p-6 rounded-lg shadow-md w-80"
                onSubmit={handleLogin} // Maneja el login aquí
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

                <label htmlFor="password" className="block text-lg font-medium">
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
                >
                    Iniciar Sesion
                </button>

                <button
                    type="button"
                    onClick={redirectToRegistro}
                    className="w-full mt-4 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-800 transition"
                >
                    Registrate
                </button>
            </form>

            {/* Enlace para restablecer la contraseña */}
            <p className="text-center text-gray-600 mt-4">
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
