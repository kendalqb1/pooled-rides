import Image from 'next/image';  // Asegúrate de importar Image si no lo has hecho

export default function UserLogin() {
  return (
    <div className="mt-16 max-w-lg mx-auto">
            <form className="grid grid-cols-1 gap-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nombre</label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-gray-800 border-gray-700 text-white rounded-md"
                    placeholder="Tu nombre"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-gray-800 border-gray-700 text-white rounded-md"
                    placeholder="tu@ejemplo.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300">Empresa</label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    autoComplete="organization"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-gray-800 border-gray-700 text-white rounded-md"
                    placeholder="Tu empresa"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">Mensaje</label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-gray-800 border-gray-700 text-white rounded-md"
                    placeholder="¿Cómo podemos ayudarte?"
                  ></textarea>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-black bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Enviar mensaje
                </button>
              </div>
            </form>

            {/* Enlace para cambiar contraseña */}
        <p className="text-center text-gray-600 mt-4">
          <a href="/reset-password" className="text-orange-500 hover:underline">¿Olvidaste tu contraseña?</a>
        </p>
          </div>
      
  );
}
