import React from 'react';
import Image from 'next/image';

export default function ValidationPage() {
    return (
        <div
            style={{
                backgroundColor: '#0c1822',
                color: '#ffffff',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                fontFamily: 'Poppins, sans-serif'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    width: '90%',
                    maxWidth: '400px',
                    textAlign: 'center',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center' 
                }}
            >
                <Image
                    src="/Alarm.svg"
                    alt="Alarma"
                    width={50}
                    height={50}
                    style={{
                        marginBottom: '10px'
                    }}
                />
                <h2 style={{ margin: '0 0 10px 0', fontSize: '20px', fontFamily: 'Poppins, sans-serif', }}>
                    Su solictud de registro esta siendo evaludada
                </h2>
                <p style={{ margin: '0', fontSize: '16px', fontFamily: 'Poppins, sans-serif', }}>
                    Esperar a que la empresa apruebe su solicitud.
                </p>
            </div>

            <button
                style={{
                    padding: '15px',
                    borderRadius: '20px',
                    backgroundColor: '#f96b05',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontFamily: 'Poppins, sans-serif',
                    width: '90%',
                    margin: '20px',
                    position: 'absolute',
                    bottom: '20px'
                }}
            >
                Regresar
            </button>
        </div>
    );
}