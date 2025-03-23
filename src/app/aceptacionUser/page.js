import Image from 'next/image';

export default function AceptacionUserPage() {
    return (
        <div style={{ backgroundColor: '#0c1822', color: '#ffffff', minHeight: '100vh', padding: '20px' }}>
            <div style={{ marginTop: '20px', position: 'relative', width: '100%' }}>
                <input
                    type="text"
                    style={{
                        width: '100%',
                        padding: '10px 40px 10px 10px', // Espacio para el ícono
                        borderRadius: '20px',
                        border: '1px solid #ffffff', // Bordes blancos
                        backgroundColor: '#0c1822', // Fondo #0c1822
                        color: '#ffffff', // Texto blanco
                        outline: 'none' // Elimina el borde azul al enfocar
                    }}
                />
                {/* Ícono de búsqueda */}
                <Image
                    src="/search.svg"
                    alt="Search Icon"
                    width={20}
                    height={20}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '10px',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none' // Evita que interfiera con el input
                    }}
                />
            </div>
        </div>
    );
}