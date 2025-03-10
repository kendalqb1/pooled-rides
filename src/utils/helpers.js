// Función para formatear segundos como MM:SS
export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = (seconds % 60).toFixed(0)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}