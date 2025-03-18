'use client'
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Viajes() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <ViajePage />
        </Suspense>
    );
}

function ViajePage() {
    const [currentUserEmail, setCurrentUserEmail] = useState(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const userEmail = searchParams.get('userEmail');
        if (userEmail) {
            setCurrentUserEmail(userEmail);
        }
    }, [router.query]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-black text-white">
            {/* Header */}
            <nav className="bg-black shadow-md w-full fixed top-0 left-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <span
                            className="text-orange-500 font-bold text-2xl cursor-pointer"
                            onClick={() => window.location.reload()}
                        >
                            PooledRides
                        </span>
                        <span className="text-lg font-semibold">
                             {currentUserEmail}
                        </span>
                    </div>
                </div>
            </nav>

            {/* Contenido principal */}
            <div className="mt-20 text-center">
                <h1 className="text-5xl font-bold mb-6">Chat de Viajes</h1>
                <p className="text-lg mb-6"></p>

                <div className="flex flex-col space-y-4">
                    {[1, 2, 3, 4, 5].map((viaje) => (
                        <Link key={viaje} href={`/messages?userEmail=${currentUserEmail}&viaje=${viaje}`}>
                            <button className="w-48 h-16 bg-orange-500 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300">
                                Viaje {viaje}
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
