import { createNotivue, Notivue, Notification } from 'notivue'
import 'notivue/notification.css'
import 'notivue/animations.css'

// Configuración opcional centralizada
const notivueConfig = {
    position: 'top-right',
    limit: 5,
    enqueue: true,
}

export function setupNotivue(app) {
    // Instancia del sistema de notificaciones
    const notivue = createNotivue(notivueConfig)
    app.use(notivue)

    // Registro explícito de componentes para evitar el warning de resolución
    app.component('Notivue', Notivue)
    app.component('Notification', Notification)
}