'use client';

import { useRouter } from "next/navigation"; // Para Next.js 13+

export default function Login() {

    const router = useRouter();


    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="p-8 text-center bg-red-100 rounded-lg">
                <h1 className="text-2xl font-bold text-red-700">Acceso Denegado</h1>
                <p className="mt-4 text-black">No tienes los permisos necesarios para acceder a esta página.</p>
                 <button
                    onClick={() => router.push("/login")}
                    className="px-4 py-2 mt-6 text-white bg-orange-600 rounded-md hover:bg-orange-700"
                >
                    Volver a iniciar sesion
                </button> 
            </div>
        </div>
    );
}
