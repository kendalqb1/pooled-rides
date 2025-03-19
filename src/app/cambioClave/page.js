'use client';

import { useState } from "react";
import { useRouter } from "next/navigation"; // Para Next.js 13+
import { SupabaseClient } from "../../utils/supabaseClient"; // Asegúrate de importar correctamente el archivo

export default function CambioClave() {
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState(""); // Estado para manejar el error
    const [success, setSuccess] = useState(""); // Estado para mostrar mensaje de éxito
    const router = useRouter();

    // Redirige a la página de login
    const redirectToLogin = () => {
        router.push("/login");
    };

    // Maneja el cambio de contraseña
    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError(""); // Limpiar el error si el usuario intenta de nuevo
        setSuccess(""); // Limpiar el mensaje de éxito

        try {
            const supabase = SupabaseClient.getInstance(); 

            // Primero, verifica el usuario
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password: oldPassword,
            });

            if (error) {
                setError("La contraseña actual es incorrecta.");
                return; // Si hay un error, mostrarlo
            }

            // Luego, cambia la contraseña
            const { error: updateError } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (updateError) {
                setError("Hubo un problema al intentar cambiar la contraseña.");
                return; // No continuar si hay error
            }

            // Si la contraseña fue cambiada exitosamente
            setSuccess("Contraseña cambiada exitosamente.");
        } catch (err) {
            setError("Hubo un problema al intentar cambiar la contraseña.");
        }
    };

    return (
        <div className="flex text-black flex-col items-center justify-center min-h-screen bg-[#0c1822]">
            <h1 className="text-5xl font-bold mb-6 text-white">PooledRides</h1>

            {/* Mostrar mensaje de error si existe */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Mostrar mensaje de éxito si se cambió la contraseña */}
            {success && <p className="text-green-500">{success}</p>}

            <form
                className="bg-white p-6 rounded-lg shadow-md w-80"
                onSubmit={handleChangePassword} // Maneja el cambio de contraseña aquí
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

                <label htmlFor="oldPassword" className="block text-lg font-medium">
                    Contraseña Actual
                </label>
                <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                    className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label htmlFor="newPassword" className="block text-lg font-medium">
                    Nueva Contraseña
                </label>
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="w-full mt-4 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-800 transition"
                >
                    Cambiar Contraseña
                </button>
            </form>

            {/* Enlace para volver al login */}
            <p className="text-center text-gray-600 mt-4">
                <a
                    onClick={redirectToLogin}
                    className="text-orange-500 hover:underline cursor-pointer"
                >
                    Volver a Iniciar Sesión
                </a>
            </p>
        </div>
    );
}
