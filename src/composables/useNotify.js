import { push } from 'notivue'

export function useNotify(defaults = {}) {
    const base = {
        duration: 3000,
        ...defaults,
    }

    const notify = (message, options = {}) => {
        const payload = { message, ...base, ...options }
        return push[options.type](payload)
    }

    const success = (message, options = {}) => notify(message, { type: 'success', ...options })
    const info = (message, options = {}) => notify(message, { type: 'info', ...options })
    const warning = (message, options = {}) => notify(message, { type: 'warning', ...options })
    const error = (message, options = {}) => notify(message, { type: 'error', duration: 4000, ...options })

    // Helper para promesas (inicio -> éxito | error)
    const forPromise = async (promise, { pending = 'Procesando…', success: ok = 'Completado', error: ko = 'Ocurrió un error' } = {}, options = {}) => {
        const notification = notify(pending, { type: 'promise', ...options })
        try {
            const result = await promise
            notification.resolve(ok)
            return result
        } catch (e) {
            notification.reject(ko)
            throw e
        }
    }

    return { success, info, warning, error, forPromise }
}
