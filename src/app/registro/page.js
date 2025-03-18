"use client";

import { useState } from "react";

export default function RegistroForm() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [codigo, setCodigo] = useState("");
    const [rol, setRol] = useState("pasajero"); // Valor por defecto "pasajero"
    const [archivo, setArchivo] = useState(null);
    const [aceptaTerminos, setAceptaTerminos] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!aceptaTerminos) {
            alert("Debes aceptar los términos y condiciones.");
            return;
        }

        // Aquí podrías procesar el envío de datos, como enviar un API o guardar en el estado
        console.log({ nombre, email, contrasena, codigo, rol, archivo, aceptaTerminos });
    };

    const handleFileChange = (e) => {
        setArchivo(e.target.files[0]);
    };

    return (
        <div className="flex text-black flex-col items-center justify-center min-h-screen bg-[#0c1822]">
            <h1 className="text-5xl font-bold mb-6 text-white">Formulario de Registro</h1>

            <form onSubmit={handleSubmit} style={{ backgroundColor: "white", padding: "24px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", width: "400px" }}>
                <div style={{ marginBottom: "16px" }}>
                    <label htmlFor="nombre" className="block text-lg font-medium">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                    />
                </div>

                <div style={{ marginBottom: "16px" }}>
                    <label htmlFor="email" className="block text-lg font-medium">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                    />
                </div>

                <div style={{ marginBottom: "16px" }}>
                    <label htmlFor="contrasena" className="block text-lg font-medium">Contraseña</label>
                    <input
                        type="password"
                        id="contrasena"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                    />
                </div>

                <div style={{ marginBottom: "16px" }}>
                    <label htmlFor="codigo" className="block text-lg font-medium">Código</label>
                    <input
                        type="text"
                        id="codigo"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                    />
                </div>

                <div style={{ marginBottom: "16px" }}>
                    <label htmlFor="rol" className="block text-lg font-medium">Rol</label>
                    <select
                        id="rol"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                        style={{ width: "100%", padding: "8px", marginTop: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                    >
                        <option value="pasajero">Pasajero</option>
                        <option value="chofer">Chofer</option>
                    </select>
                </div>

                <div style={{ marginBottom: "16px" }}>
                    <label htmlFor="archivo" className="block text-lg font-medium">Subir Archivo</label>
                    {/* Botón de subir archivo */}
                    <button
                        type="button"
                        onClick={() => document.getElementById('archivo').click()}
                        style={{
                            width: "100%",
                            padding: "12px",
                            backgroundColor: "#f97316",
                            color: "white",
                            borderRadius: "4px",
                            cursor: "pointer",
                            textAlign: "center",
                            transition: "background-color 0.3s ease"
                        }}
                    >
                        {archivo ? archivo.name : "Seleccionar Archivo"}
                    </button>
                    {/* Input oculto */}
                    <input
                        type="file"
                        id="archivo"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </div>

                <div style={{ marginBottom: "16px", display: "flex", alignItems: "center" }}>
                    <input
                        type="checkbox"
                        id="aceptaTerminos"
                        checked={aceptaTerminos}
                        onChange={(e) => setAceptaTerminos(e.target.checked)}
                        className="checkbox-custom"
                    />
                    <label htmlFor="aceptaTerminos" style={{ marginLeft: "8px", fontSize: "1rem" }}>
                        Acepto los términos y condiciones
                    </label>
                </div>

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "#f97316",
                        color: "white",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease"
                    }}
                >
                    Registrarse
                </button>
            </form>

            <style jsx>{`
                /* Personalización del checkbox */
                .checkbox-custom {
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border: 2px solid #ccc;
                    border-radius: 4px;
                    margin-right: 8px;
                    transition: background-color 0.3s, border-color 0.3s;
                }

                .checkbox-custom:checked {
                    background-color: #10b981; /* Verde cuando está seleccionado */
                    border-color: #10b981;
                }

                .checkbox-custom:checked::after {
                    content: '✔';
                    color: white;
                    font-size: 16px;
                    text-align: center;
                    line-height: 18px;
                }
            `}</style>
        </div>
    );
}
