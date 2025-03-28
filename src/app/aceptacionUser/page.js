import Image from 'next/image';

const usuarios = [
    { nombre: "Aditya Pratama", addAt: "2023-09-01", addAtTime: "10:00:00" },
    { nombre: "Siti Nurhaliza", addAt: "2025-02-02", addAtTime: "11:00:00" },
    { nombre: "Budi Santoso", addAt: "2024-09-03", addAtTime: "12:00:00" },
    { nombre: "Rina Kartika", addAt: "2025-03-23", addAtTime: "13:00:00" },
];

export default function AceptacionUserPage() {
    return (
        <div style={{ backgroundColor: '#0c1822', color: '#ffffff', minHeight: '100vh', padding: '20px', fontFamily: 'Poppins, sans-serif' }}>
            <div style={{ marginTop: '20px', position: 'relative', width: '100%' }}>
                <input
                    type="text"
                    style={{
                        width: '100%',
                        padding: '10px 40px 10px 10px',
                        borderRadius: '20px',
                        border: '1px solid #ffffff',
                        backgroundColor: '#0c1822',
                        color: '#ffffff',
                        outline: 'none',
                        fontFamily: 'Poppins, sans-serif'
                    }}
                />
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
                        pointerEvents: 'none'
                    }}
                />
            </div>
            <div style={{ marginTop: '20px' }}>
                {usuarios.map((usuario, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#ffffff',
                            padding: '15px',
                            borderRadius: '20px',
                            marginBottom: '10px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                            fontFamily: 'Poppins, sans-serif'
                        }}
                    >
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: '#c9b9a4',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                marginRight: '15px',
                                fontFamily: 'Poppins, sans-serif'
                            }}
                        >
                            {usuario.nombre
                                .split(' ')
                                .map((word) => word[0])
                                .join('')
                                .slice(0, 2)
                                .toUpperCase()}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#000000', fontFamily: 'Poppins, sans-serif' }}>
                                {usuario.nombre}
                            </h3>
                            <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#b0b0b0', fontFamily: 'Poppins, sans-serif' }}>
                                {(() => {
                                    const registro = new Date(`${usuario.addAt}T${usuario.addAtTime}`);
                                    const ahora = new Date();
                                    const diferenciaMs = ahora - registro;
                                    const minutos = Math.floor(diferenciaMs / (1000 * 60));
                                    const horas = Math.floor(minutos / 60);
                                    const dias = Math.floor(horas / 24);
                                    const semanas = Math.floor(dias / 7);
                                    const meses = Math.floor(semanas / 4);

                                    if (meses > 0) {
                                        return `Registrado hace ${meses} ${meses === 1 ? 'mes' : 'meses'}`;
                                    } else if (semanas > 0) {
                                        return `Registrado hace ${semanas} ${semanas === 1 ? 'semana' : 'semanas'}`;
                                    } else if (dias > 0) {
                                        return `Registrado hace ${dias} ${dias === 1 ? 'día' : 'días'}`;
                                    } else if (horas > 0) {
                                        return `Registrado hace ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
                                    } else {
                                        return `Registrado hace ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
                                    }
                                })()}
                            </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '10px',
                                        backgroundColor: '#f96b05',
                                        color: '#ffffff',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        fontSize: '18px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    ✓
                                </button>
                                <button
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '10px',
                                        backgroundColor: '#f96b05',
                                        color: '#ffffff',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        fontSize: '18px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px'
                }}
            >
                <button
                    style={{
                        width: '100%',
                        padding: '15px',
                        borderRadius: '20px',
                        backgroundColor: '#f96b05',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontFamily: 'Poppins, sans-serif'
                    }}
                >
                    Confirmar
                </button>
            </div>
        </div>
    );
}