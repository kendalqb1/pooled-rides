'use client'
import React, { useEffect, useState, useRef, Suspense } from 'react'
import { useSearchParams, useParams } from 'next/navigation'

import { SupabaseClient } from '@/utils/supabaseClient'
import AudioPlayer from '@/components/AudioPlayer'
import { formatTime } from '@/utils/helpers'
import { useAuth } from '@/context/AuthContext'
import RoleBasedRoute from '@/components/RoleBasedRoute'

export default function Messages() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <MessagesPage />
        </Suspense>
    )
}

function MessagesPage() {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [newMessage, setNewMessage] = useState('')
    const [sending, setSending] = useState(false)
    const [currentUserEmail, setCurrentUserEmail] = useState('')
    const [currentViaje, setCurrentViaje] = useState('')
    const [replyTo, setReplyTo] = useState(null)
    const [isRecording, setIsRecording] = useState(false)
    const [audioBlob, setAudioBlob] = useState(null)
    const [recordingTime, setRecordingTime] = useState(0)
    const [audioUrl, setAudioUrl] = useState(null)
    const [showScrollButton, setShowScrollButton] = useState(false)
    const messagesEndRef = useRef(null)
    const messagesContainerRef = useRef(null)
    const mediaRecorderRef = useRef(null)
    const audioChunksRef = useRef([])
    const recordingTimerRef = useRef(null)
    const touchStartXRef = useRef(null)
    const swipedMessageRef = useRef(null)
    const dat = useParams()
    console.log(dat)
    const searchParams = useSearchParams()

    const { user } = useAuth();
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        console.log(user)
        if (user.email) {
            setCurrentUserEmail(user.email)
        }

        const viajeId = searchParams.get('viaje')
        if (viajeId) {
            setCurrentViaje(viajeId)
        }
        // Obtener cliente de Supabase
        const supabase = SupabaseClient.getInstance()

        if (currentViaje) {
            // Cargar mensajes iniciales
            const fetchMessages = async () => {
                try {
                    setLoading(true)

                    console.log(currentViaje)

                    const { data, error } = await supabase
                        .from('Mensajes')
                        .select('*')
                        .eq('Viaje_ID', currentViaje)
                        .order('Creado_El', { ascending: true }) // Ordenado cronológicamente

                    console.log(data)

                    if (error) {
                        throw error
                    }

                    if (data) {
                        setMessages(data)
                        // Hacemos scroll al cargar los mensajes iniciales
                        setTimeout(scrollToBottom, 100)
                    }
                } catch (error) {
                    console.error('Error fetching messages:', error)
                } finally {
                    setLoading(false)
                }
            }

            fetchMessages()

            // Suscribirse a cambios en tiempo real
            const channel = supabase.channel('custom-messages-channel')
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'Mensajes', filter: `Viaje_ID=eq.${currentViaje}` },
                    (payload) => {
                        // Actualizar el estado según el tipo de evento
                        if (payload.eventType === 'INSERT') {
                            setMessages(prevMessages => [...prevMessages, payload.new])
                            // Hacer scroll cuando llega un nuevo mensaje
                            setTimeout(scrollToBottom, 100)
                        } else if (payload.eventType === 'UPDATE') {
                            setMessages(prevMessages =>
                                prevMessages.map(message =>
                                    message.id === payload.new.id ? payload.new : message
                                )
                            )
                        } else if (payload.eventType === 'DELETE') {
                            setMessages(prevMessages =>
                                prevMessages.filter(message => message.id !== payload.old.id)
                            )
                        }
                    }
                )
                .subscribe()

            // Configurar el observador de scroll para mostrar/ocultar el botón de scroll
            const handleScroll = () => {
                if (!messagesContainerRef.current) return

                const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current
                // Mostrar el botón cuando estamos a más de 300px del fondo
                const shouldShowButton = scrollHeight - scrollTop - clientHeight > 300
                setShowScrollButton(shouldShowButton)
            }

            const messagesContainer = messagesContainerRef.current
            if (messagesContainer) {
                messagesContainer.addEventListener('scroll', handleScroll)
            }

            // Limpiar la suscripción cuando el componente se desmonte
            return () => {
                supabase.removeChannel(channel)
                // Detener grabación si está activa al desmontar
                stopRecording()

                // Eliminar el listener de scroll
                if (messagesContainer) {
                    messagesContainer.removeEventListener('scroll', handleScroll)
                }
            }
        }
    }, [searchParams, currentViaje]) // Ahora depende de searchParams

    // Scroll al fondo cuando cambian los mensajes
    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Limpiar URL del audio al desmontar
    useEffect(() => {
        return () => {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl)
            }
        }
    }, [audioUrl])

    const handleSubmit = async (e) => {
        if (e) e.preventDefault()

        if ((!newMessage.trim() && !audioBlob) || !currentUserEmail) return

        const supabase = SupabaseClient.getInstance()

        try {
            setSending(true)

            const messageData = {
                Contenido: newMessage.trim(),
                Creado_Por: user.id,
                Tipo_Mensaje: audioBlob ? 'audio' : 'text',
                Viaje_ID: currentViaje
            }

            // Si estamos respondiendo a un mensaje, incluir esa información
            if (replyTo) {
                messageData.Respuesta = replyTo.id
            }

            // Si hay un audioBlob, subir el audio a Storage
            if (audioBlob) {
                const fileName = `${Date.now()}_${currentUserEmail.split('@')[0]}.webm`

                // Subir archivo a Supabase Storage
                const { data: uploadData, error: uploadError } = await supabase
                    .storage
                    .from('message_audios')
                    .upload(fileName, audioBlob, {
                        contentType: 'audio/webm'
                    })

                if (uploadError) {
                    throw uploadError
                }

                // Obtener URL pública del audio
                const { data: { publicUrl } } = supabase
                    .storage
                    .from('message_audios')
                    .getPublicUrl(fileName)

                // Añadir URL del audio al mensaje
                messageData.Audio_Url = publicUrl
                messageData.Duracion_Audio = recordingTime
            }

            console.log('first')

            const { error } = await supabase
                .from('Mensajes')
                .insert([messageData])

            if (error) {
                throw error
            }

            // Limpiamos los campos después de enviar exitosamente
            setNewMessage('')
            setAudioBlob(null)
            setAudioUrl(null)
            // Limpiar la respuesta después de enviar
            setReplyTo(null)

        } catch (error) {
            console.error('Error sending message:', error)
            alert('Error al enviar el mensaje')
        } finally {
            setSending(false)
        }
    }

    // Función para iniciar grabación de audio
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            mediaRecorderRef.current = new MediaRecorder(stream)
            audioChunksRef.current = []

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    audioChunksRef.current.push(e.data)
                }
            }

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
                setAudioBlob(audioBlob)

                // Crear URL para reproducir el audio
                const url = URL.createObjectURL(audioBlob)
                setAudioUrl(url)

                // Detener todos los tracks del stream
                stream.getTracks().forEach(track => track.stop())
            }

            // Iniciar temporizador
            setRecordingTime(0)
            recordingTimerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1)
            }, 1000)

            mediaRecorderRef.current.start()
            setIsRecording(true)
        } catch (error) {
            console.error('Error starting recording:', error)
            alert('No se pudo acceder al micrófono')
        }
    }

    // Función para detener grabación
    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)

            // Detener temporizador
            if (recordingTimerRef.current) {
                clearInterval(recordingTimerRef.current)
            }
        }
    }

    // Función para cancelar la grabación
    const cancelRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)

            // Detener temporizador
            if (recordingTimerRef.current) {
                clearInterval(recordingTimerRef.current)
            }

            // Limpiar datos de audio
            setAudioBlob(null)
            setAudioUrl(null)
            setRecordingTime(0)
        } else if (audioUrl) {
            // Si ya tenemos un audio grabado pero queremos cancelarlo
            URL.revokeObjectURL(audioUrl)
            setAudioBlob(null)
            setAudioUrl(null)
            setRecordingTime(0)
        }
    }

    // Función para manejar cuando el usuario quiere responder a un mensaje
    const handleReply = (message) => {
        setReplyTo(message)
        // Hacer foco en el área de texto
        document.querySelector('textarea').focus()
    }

    // Función para cancelar una respuesta
    const cancelReply = () => {
        setReplyTo(null)
    }

    // Funciones para el manejo de swipe (deslizar para responder)
    const handleTouchStart = (e, message) => {
        touchStartXRef.current = e.touches[0].clientX
        swipedMessageRef.current = message
    }

    const handleTouchMove = (e, messageElement) => {
        if (!touchStartXRef.current) return

        const touchCurrentX = e.touches[0].clientX
        const diff = touchCurrentX - touchStartXRef.current

        // Solo permitimos deslizar de izquierda a derecha (valor positivo)
        if (diff > 0 && diff < 100) {
            messageElement.style.transform = `translateX(${diff}px)`
            messageElement.style.transition = 'none'
        }
    }

    const handleTouchEnd = (e, messageElement) => {
        if (!touchStartXRef.current || !swipedMessageRef.current) {
            messageElement.style.transform = 'translateX(0)'
            messageElement.style.transition = 'transform 0.3s ease'
            return
        }

        const touchEndX = e.changedTouches[0].clientX
        const diff = touchEndX - touchStartXRef.current

        // Si el deslizamiento es mayor a 50px, consideramos que quiere responder
        if (diff > 50) {
            handleReply(swipedMessageRef.current)
        }

        // Resetear la posición del mensaje con animación
        messageElement.style.transform = 'translateX(0)'
        messageElement.style.transition = 'transform 0.3s ease'

        // Limpiar referencias
        touchStartXRef.current = null
        swipedMessageRef.current = null
    }

    // Función para determinar si un mensaje es del usuario actual
    const isCurrentUserMessage = (message) => {
        return message.created_by === currentUserEmail
    }

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)

        // Comprobar si es hoy, ayer o una fecha anterior
        if (date.toDateString() === today.toDateString()) {
            return 'Hoy'
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Ayer'
        } else {
            // Formatear la fecha para otras fechas
            return date.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
        }
    }

    // Función para agrupar mensajes por fecha
    const groupMessagesByDate = (messages) => {
        const groups = {}

        messages.forEach(message => {
            const date = new Date(message.Creado_El)
            const dateString = date.toDateString() // Usamos toDateString para agrupar por día

            if (!groups[dateString]) {
                groups[dateString] = []
            }

            groups[dateString].push(message)
        })

        // Convertir el objeto a un array de objetos {date, messages}
        return Object.entries(groups).map(([dateString, messages]) => ({
            date: dateString,
            formattedDate: formatDate(dateString),
            messages
        }))
    }

    // Encontrar un mensaje por ID
    const findMessageById = (id) => {
        return messages.find(message => message.Mensaje_ID === id)
    }

    // Agrupar mensajes por fecha
    const messageGroups = groupMessagesByDate(messages)

    return (
        <RoleBasedRoute>
            <div className="flex flex-col h-screen bg-gray-900">
                {/* Cabecera */}
                <div className="bg-orange-500 text-white p-4 shadow-md">
                    <h1 className="text-xl font-bold">Mensajes</h1>
                    {currentUserEmail && (
                        <p className="text-sm">Conectado como: {currentUserEmail}</p>
                    )}
                </div>

                {/* Área de mensajes con scroll */}
                <div
                    ref={messagesContainerRef}
                    className="flex-1 overflow-y-auto p-4"
                >
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <p>Cargando mensajes...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {messages.length === 0 ? (
                                <div className="flex justify-center items-center h-full">
                                    <p className="text-gray-500">No hay mensajes disponibles</p>
                                </div>
                            ) : (
                                messageGroups.map(group => (
                                    <div key={group.date} className="space-y-4">
                                        {/* Separador de fecha */}
                                        <div className="relative flex items-center py-2">
                                            <div className="flex-grow border-t border-gray-300"></div>
                                            <span className="flex-shrink mx-4 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                                {group.formattedDate}
                                            </span>
                                            <div className="flex-grow border-t border-gray-300"></div>
                                        </div>

                                        {/* Mensajes del día */}
                                        {group.messages.map(message => {
                                            // Referencia para el elemento del mensaje para manipulación en swipe
                                            const messageRef = React.createRef()

                                            return (
                                                <div
                                                    key={message.Mensaje_ID}
                                                    ref={messageRef}
                                                    className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 my-3 shadow ${isCurrentUserMessage(message)
                                                        ? 'ml-auto bg-orange-100'
                                                        : 'mr-auto bg-white'
                                                        }`}
                                                    onTouchStart={(e) => handleTouchStart(e, message)}
                                                    onTouchMove={(e) => handleTouchMove(e, messageRef.current)}
                                                    onTouchEnd={(e) => handleTouchEnd(e, messageRef.current)}
                                                >
                                                    {/* Si es una respuesta, mostrar el mensaje original */}
                                                    {message.Respuesta && (
                                                        <div className="mb-2 p-2 bg-gray-100 border-l-4 border-gray-300 rounded text-xs text-gray-600">
                                                            <div className="font-semibold">
                                                                {findMessageById(message.Respuesta)?.created_by.split('@')[0] || 'Usuario'}
                                                            </div>
                                                            <p className="truncate">
                                                                {findMessageById(message.Respuesta)?.Tipo_Mensaje === "text"
                                                                    ? findMessageById(message.Respuesta)?.content.substring(0, 100) || 'Mensaje original'
                                                                    : '🎤 Mensaje de audio'}
                                                            </p>
                                                        </div>
                                                    )}

                                                    {/* Contenido del mensaje - Texto o Audio */}
                                                    {message.Tipo_Mensaje === 'audio' ? (
                                                        <div className="space-x-2">
                                                            <AudioPlayer
                                                                audioUrl={message.Audio_Url}
                                                                audioDuration={message.Duracion_Audio}
                                                            />

                                                        </div>
                                                    ) : (
                                                        <p className="break-words text-black">{message.Contenido}</p>
                                                    )}

                                                    {/* Footer del mensaje */}
                                                    <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
                                                        <span>{message.Creado_Por && message.Creado_Por.split('@')[0]}</span>
                                                        <div className="flex items-center space-x-2">
                                                            {/* Botón de respuesta */}
                                                            <button
                                                                onClick={() => handleReply(message)}
                                                                className="text-gray-500 hover:text-orange-600"
                                                                title="Responder"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                                                </svg>
                                                            </button>

                                                            <span>
                                                                {new Date(message.Creado_El).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                ))
                            )}
                            {/* Elemento invisible para hacer scroll al final */}
                            <div ref={messagesEndRef} />
                        </div>
                    )}

                    {/* Botón de scroll hacia abajo */}
                    {showScrollButton && (
                        <button
                            onClick={scrollToBottom}
                            className="fixed bottom-24 right-6 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 focus:outline-none z-10 transition-all duration-300 transform hover:scale-110"
                            title="Ir al último mensaje"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Área de input fija en la parte inferior */}
                <div className="bg-gray-900 p-4 border-t">
                    {/* Mostrar a qué mensaje estamos respondiendo */}
                    {replyTo && (
                        <div className="mb-2 p-2 bg-gray-100 border-l-4 border-orange-500 rounded flex justify-between items-start">
                            <div className="flex-1">
                                <span className="text-xs font-semibold text-black">
                                    Respondiendo a {replyTo.Creado_Por.split('@')[0]}
                                </span>
                                <p className="text-xs text-gray-600 truncate">
                                    {replyTo.Tipo_Mensaje === 'audio' ? '🎤 Mensaje de audio' : replyTo.Contenido}
                                </p>
                            </div>
                            <button
                                onClick={cancelReply}
                                className="text-gray-500 hover:text-red-600"
                                title="Cancelar respuesta"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* Si hay un audio grabado, mostrar player para previsualizar */}
                    {audioUrl && !isRecording && (
                        <div className="mb-2 p-2 bg-gray-100 rounded flex justify-center items-center">
                            <div className='w-full'>
                                <AudioPlayer audioUrl={audioUrl} audioDuration={recordingTime} />
                            </div>
                            <button
                                onClick={cancelRecording}
                                className="text-gray-500 hover:text-red-600 ml-2"
                                title="Eliminar audio"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* Mostrar grabadora durante la grabación */}
                    {isRecording && (
                        <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                <span className="text-red-500 font-medium">Grabando</span>
                                <span className="text-gray-500">{formatTime(recordingTime)}</span>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={stopRecording}
                                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                                    title="Finalizar grabación"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={cancelRecording}
                                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                                    title="Cancelar grabación"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex space-x-2">
                        <textarea
                            className="text-white flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                            placeholder={replyTo ? `Responder a ${replyTo.Creado_Por.split('@')[0]}...` : "Escribe un mensaje..."}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            rows={1}
                            disabled={sending || !currentUserEmail || isRecording}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    if (newMessage.trim() || audioBlob) handleSubmit(e);
                                }
                            }}
                        />

                        {/* Botón de micrófono / grabación */}
                        {!isRecording && !audioBlob && (
                            <button
                                type="button"
                                onClick={startRecording}
                                className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 disabled:bg-orange-300 focus:outline-none"
                                disabled={sending || !currentUserEmail}
                                title="Grabar audio"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            </button>
                        )}

                        {/* Botón de enviar */}
                        <button
                            type="submit"
                            className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 disabled:bg-orange-300 focus:outline-none"
                            disabled={sending || (!newMessage.trim() && !audioBlob) || !currentUserEmail || isRecording}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </RoleBasedRoute>
    )
}