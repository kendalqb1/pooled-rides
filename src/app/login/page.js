"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    return <LoginPage />;
}

function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");

    const redirectToViajes = () => {
        const baseUrl = `${window.location.origin}/viajes`;
        const queryParam = `?userEmail=${email}`;
        router.push(baseUrl + queryParam);
    };

    return (
        <div className="flex text-black flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-5xl font-bold mb-6">Login</h1>

            <form
                className="bg-white  p-6 rounded-lg shadow-md w-80"
                onSubmit={(e) => {
                    e.preventDefault();
                    redirectToViajes();
                }}
            >
                <label htmlFor="email" className="block text-lg font-medium">
                    Email
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

                <button
                    type="submit"
                    className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
