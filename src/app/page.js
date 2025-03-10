'use client'
import React, { useState } from 'react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Navbar */}
      <nav className="bg-black shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-orange-500 font-bold text-2xl">PooledRides</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <a href="#features" className="text-gray-300 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">Características</a>
              <a href="#plans" className="text-gray-300 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">Planes</a>
              <a href="#about" className="text-gray-300 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">Acerca de</a>
              <a href="#contact" className="bg-orange-500 text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600">Contacto</a>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-orange-500 focus:outline-none"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#features" className="text-gray-300 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">Características</a>
              <a href="#plans" className="text-gray-300 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">Planes</a>
              <a href="#about" className="text-gray-300 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">Acerca de</a>
              <a href="#contact" className="bg-orange-500 text-black block px-3 py-2 rounded-md text-base font-medium">Contacto</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative bg-black py-28">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Transporte compartido para empresas
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-400">
              Optimiza el transporte de tus empleados con nuestra plataforma basada en la nube
            </p>
            <div className="mt-10 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <a href="#contact" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-black bg-orange-500 hover:bg-orange-600">
                  Empieza ahora
                </a>
              </div>
              <div className="ml-3 inline-flex">
                <a href="#plans" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700">
                  Ver planes
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0">
          <div className="h-16 bg-gray-900 rounded-t-3xl"></div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Principales funcionalidades
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
              Soluciones integrales para la gestión de viajes compartidos en tu empresa
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow border border-orange-500">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-black mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white">Perfiles de Usuario</h3>
              <p className="mt-2 text-gray-300">
                Crea perfiles y asigna roles (conductor, pasajero o empresa) con verificación de documentos mediante imágenes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow border border-orange-500">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-black mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white">Gestión de Viajes</h3>
              <p className="mt-2 text-gray-300">
                Registra viajes con detalles de rutas y horarios, coordina grupos y controla disponibilidad de asientos.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow border border-orange-500">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-black mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white">Módulo de Reportería</h3>
              <p className="mt-2 text-gray-300">
                Accede a reportes de viajes realizados, estadísticas de uso y exporta documentos en formato PDF.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow border border-orange-500">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-black mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white">Módulo de Vacaciones</h3>
              <p className="mt-2 text-gray-300">
                Gestión automática de sustituciones durante periodos de ausencia, con notificaciones integradas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Planes de suscripción
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
              Soluciones flexibles adaptadas a las necesidades de tu empresa
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
            {/* Plan 1 */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-orange-500">
              <div className="px-6 py-8 bg-orange-500 sm:p-10 sm:pb-6">
                <div>
                  <h3 className="text-xl font-medium text-black">Plan Estándar</h3>
                  <div className="mt-4 flex items-baseline text-black">
                    <span className="text-5xl font-extrabold tracking-tight">$199</span>
                    <span className="ml-1 text-xl">/mes</span>
                  </div>
                  <p className="mt-5 text-lg text-gray-800">
                    Para pequeñas y medianas empresas
                  </p>
                </div>
              </div>
              <div className="px-6 pt-6 pb-8 bg-gray-800 sm:p-10">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-300">Coordinación básica de viajes</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-300">Registro de rutas y horarios</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-300">Gestión de disponibilidad</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-300">Reportes básicos</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-300">Soporte estándar</p>
                  </li>
                </ul>
                <div className="mt-8">
                  <div className="rounded-lg shadow-md">
                    <a href="#contact" className="block w-full text-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-orange-500 hover:bg-orange-600">
                      De 10 a 250 usuarios
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Plan 2 */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-orange-500">
              <div className="px-6 py-8 bg-orange-600 sm:p-10 sm:pb-6">
                <div>
                  <h3 className="text-xl font-medium text-black">Plan Premium</h3>
                  <div className="mt-4 flex items-baseline text-black">
                    <span className="text-5xl font-extrabold tracking-tight">$399</span>
                    <span className="ml-1 text-xl">/mes</span>
                  </div>
                  <p className="mt-5 text-lg text-gray-800">
                    Para empresas medianas y grandes
                  </p>
                </div>
              </div>
              <div className="px-6 pt-6 pb-8 bg-gray-800 sm:p-10">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-300">Funcionalidades completas de coordinación</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-300">Opciones de personalización para rutas</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-300">Calendario de vacaciones integrado</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-300">Soporte Premium (horario extendido)</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-300">Informes avanzados y análisis de datos</p>
                  </li>
                </ul>
                <div className="mt-8">
                  <div className="rounded-lg shadow-md">
                    <a href="#contact" className="block w-full text-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-orange-500 hover:bg-orange-600">
                      De 250 a 800 usuarios
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Acerca de PooledRides
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                PooledRides nació para ofrecer una solución eficiente y accesible para la gestión de transporte compartido en empresas.
              </p>
              <div className="mt-6 prose prose-orange text-gray-400">
                <p>
                  Nuestra plataforma SaaS basada en la nube facilita la coordinación de viajes compartidos en tiempo real, reduciendo costos y mejorando la eficiencia en la gestión de desplazamientos colaborativos.
                </p>
                <p>
                  Lo que nos distingue es nuestro enfoque en accesibilidad, facilidad de uso y escalabilidad. Nuestra aplicación se adapta a las necesidades de cada empresa, permitiendo un crecimiento sin comprometer la operatividad.
                </p>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="aspect-w-5 aspect-h-3 rounded-lg bg-gray-800 overflow-hidden border border-orange-500">
                <div className="h-64 bg-gray-800 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-medium text-white">Público Meta</h3>
                <p className="mt-2 text-lg text-gray-400">
                  Dirigido a empresas de distintos tamaños que buscan optimizar el transporte de sus empleados y fomentar la movilidad compartida.
                </p>
                <p className="mt-4 text-lg text-gray-400">
                  Ideal para organizaciones con modelos de trabajo híbrido y empresas con programas de sostenibilidad que buscan reducir su huella de carbono.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Contáctanos
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
              ¿Listo para optimizar el transporte en tu empresa? Envíanos un mensaje.
            </p>
          </div>
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-orange-500 tracking-wider uppercase">PooledRides</h3>
              <p className="mt-4 text-base text-gray-400">
                Soluciones de transporte compartido para empresas modernas.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-orange-500 tracking-wider uppercase">Enlaces rápidos</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#features" className="text-base text-gray-400 hover:text-white">
                    Características
                  </a>
                </li>
                <li>
                  <a href="#plans" className="text-base text-gray-400 hover:text-white">
                    Planes
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-base text-gray-400 hover:text-white">
                    Acerca de
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-base text-gray-400 hover:text-white">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-orange-500 tracking-wider uppercase">Contacto</h3>
              <ul className="mt-4 space-y-4">
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-400">info@pooledrides.com</span>
                </li>
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-400">+506 8989 8989</span>
                </li>
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400">San José, Costa Rica</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; 2025 PooledRides. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}