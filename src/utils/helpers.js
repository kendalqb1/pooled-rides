// Función para formatear segundos como MM:SS
export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = (seconds % 60).toFixed(0)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export const traducirErrorSupabase = (mensajeError) => {
    const traducciones = {
      "Invalid login credentials": "Credenciales de inicio de sesión inválidas",
      "Email not confirmed": "Correo electrónico no confirmado",
      "User not found": "Usuario no encontrado",
      "Password recovery requires an email": "La recuperación de contraseña requiere un correo electrónico",
      "Email link is invalid or has expired": "El enlace de correo es inválido o ha expirado",
      "Password should be at least 6 characters": "La contraseña debe tener al menos 6 caracteres",
      "Email already registered": "Correo electrónico ya registrado"
    };
    
    return traducciones[mensajeError] || mensajeError;
  }