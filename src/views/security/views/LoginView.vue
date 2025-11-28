<template>
    <main class="flex h-screen items-center justify-center bg-gradient-to-br from-sky-100 via-white to-blue-100 px-8">
        <section class="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl overflow-hidden rounded-3xl backdrop-blur-sm bg-white/50 shadow-2xl shadow-blue-50 border border-white/60">
            <article class="flex flex-col h-full flex-grow justify-center px-8 py-10 md:px-10 md:py-12">
                <header class="mb-8">
                    <p class="text-sm font-medium tracking-wide text-blue-500 mb-2">¡Bienvenido de nuevo!</p>
                    <h1 class="text-3xl md:text-4xl font-semibold text-slate-900 mb-2">Iniciar sesión</h1>
                    <p class="text-sm text-slate-500">
                        Ingresa tus crendenciales para acceder al panel de control.
                    </p>
                </header>
                <form class="space-y-6" @submit.prevent="submitLogin">
                    <div class="space-y-1">
                        <label for="email" class="block text-sm font-medium text-slate-700">Correo electrónico</label>
                        <InputText
                            size="small" 
                            id="email" 
                            v-model="form.email" 
                            class="rounded-xl bg-transparent w-full"
                        />
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-slate-700">Contraseña</label>
                        <Password 
                            id="password" 
                            size="small" 
                            v-model="form.password" 
                            type="password" 
                            class="w-full"
                            inputClass="rounded-xl bg-transparent w-full"
                            :feedback="false"
                            toggleMask
                        />
                    </div>
                    <div class="flex items-center justify-between text-xs text-slate-500">
                        <label class="inline-flex items-center gap-2">
                            <Checkbox v-model="rememberMe" :binary="true" />
                            <span>Recordarme</span>
                        </label>
                        <Button
                            link
                            class="text-xs"
                            label="¿Olvidate tu contraseña?"
                        />
                    </div>
                    <Button 
                        label="Ingresar"
                        type="submit"
                        class="w-full rounded-xl"
                        :loading="isPending"
                    />
                    <p class="text-xs text-slate-400 text-center">
                        Al continuar, aceptas nuestros terminos y políticas de privacidad.
                    </p>
                </form>
            </article>
            <article class="hidden h-full md:flex relative overflow-hidden bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white">
                <div class="absolute inset-0 opacity-40 mix-blend-soft-light bg-[radial-gradient(circle_at_0_0,_#ffffff_0,_transparent_55%),_radial-gradient(circle_at_100%_0,_#e0f2fe_0,_transparent_55%)]"></div>
                <section class="relativeflex flex-col justify-between w-full p-10">
                    <header>
                        <p class="text-xs uppercase tracking-[0.25rem] text-blue-100 mb-4">Flujo de caja</p>
                        <h1 class="text-2xl font-semibold mb-3 leading-snug">
                            Controla tus finanzas
                            <span class="block font-light text-blue-100">con una vista clara y moderna.</span>
                        </h1>
                        <p class="text-xs text-blue-100 max-w-sm">
                            Analiza ingresos, egresos y proyecciones en tiempo real para
                            tomar mejores decisiones financieras.
                        </p>
                    </header>
                    <div class="mt-8 flex-1 flex items-center justify-center">
                        <img class="max-h-72 h-full w-full object-contain" src="@/assets/img/login.png" alt=""/>
                    </div>
                    <footer class="mt-6 text-xs text-blue-100/70 flex items-center justify-between">
                        <span>Dashboard financiero en tiempo real</span>
                        <span class="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
                            <span class="h-1.5 w-1.5 rounded-full bg-emerald-300"></span>
                            <span>Disponible 24/7</span>
                        </span>
                    </footer>
                </section>
            </article>
        </section>
    </main>
</template>

<script setup>
import { requestLogin } from '@/api/services/security/authentication.query'
import { useNotify } from '@/composables/useNotify'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { reactive } from 'vue'

// Notificaciones
const notify = useNotify()

// Validación de formulario
const form = reactive({
    email: '',
    password: ''
});

const rememberMe = ref(false);

const rules = {
    email: {
        required: helpers.withMessage('El campo es obligatorio', required),
        email: helpers.withMessage('El correo no es válido', email)
    },
    password: {
        required: helpers.withMessage('El campo es obligatorio', required)
    }
};

const v$ = useVuelidate(rules, form);

// Autenticación
const { mutateAsync: login, isPending } = requestLogin()

const submitLogin = async () => {
    v$.value.$touch()
    if (v$.value.$error) return
    await notify.forPromise(
        login({ email: form.email, password: form.password }),
        {
            pending: 'Iniciando sesión…',
            success: 'Sesión iniciada',
            error: 'Credenciales inválidas'
        }
    )
}
</script>