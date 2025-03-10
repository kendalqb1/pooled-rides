'use client'
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Viajes() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <ViajePage />
        </Suspense>
    )
}

function ViajePage() {
    const [currentUserEmail, setCurrentUserEmail] = useState(null);
    const router = useRouter();
    const searchParams = useSearchParams()

    useEffect(() => {
        const userEmail = searchParams.get('userEmail')
        if (userEmail) {
            setCurrentUserEmail(userEmail)
        }
    }, [router.query]);

    return (
        <div
            className="flex flex-col items-center justify-center h-screen"
        >
            <h1 className="text-5xl font-bold">Viaje</h1>
            <p className="text-lg">Aquí va la página de viaje</p>
            <ul>
                <li>
                    <Link href={`/messages?userEmail=${currentUserEmail}&viaje=1`}>
                        <button className="text-blue-500">Ir a mensajes viaje 1</button>
                    </Link>
                </li>
                <li>
                    <Link href={`/messages?userEmail=${currentUserEmail}&viaje=2`}>
                        <button className="text-blue-500">Ir a mensajes viaje 2</button>
                    </Link>
                </li>
                <li>
                    <Link href={`/messages?userEmail=${currentUserEmail}&viaje=3`}>
                        <button className="text-blue-500">Ir a mensajes viaje 3</button>
                    </Link>
                </li>
            </ul>
        </div>
    )
}



