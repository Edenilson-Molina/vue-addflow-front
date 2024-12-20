<template>
    <section class="flex flex-1 justify-center items-center w-full">
        <Fieldset class="w-auto md:w-1/2 lg:w-1/4">
            <template #legend>
                <header class="flex justify-center items-center gap-1">
                    <img class="w-20" src="/src/assets/logo.svg" alt="Flujo de Caja">
                    <h1 class="text-lg">Flujo de Caja</h1>
                </header>
            </template>
            <form @submit.prevent="handleLogin" class="flex flex-col justify-center">
                <InputText type="text" v-model="form.email" :errors="v$.email.$errors"
                    placeholder="Correo electrónico" />
                <Password v-model="form.password" :errors="v$.password.$errors" placeholder="Contraseña" />
                <footer class="flex justify-center">
                    <Button type="submit">Iniciar sesión</Button>
                </footer>
                <Toast />
            </form>
        </Fieldset>
    </section>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core'
import { useRouter } from 'vue-router';
import { useToast } from "primevue/usetoast";
import { required, email, helpers } from '@vuelidate/validators'
import { reactive } from 'vue'
import InputText from '@/components/forms/InputTextComponent.vue'
import Password from '@/components/forms/PasswordComponent.vue';
import { useAuthStore } from '@/stores/auth.store'
import { storeToRefs } from 'pinia';
 
// Notificaciones
const toast = useToast();

// Validación de formulario
const form = reactive({
    email: '',
    password: ''
});

const rules = {
    email: {
        required: helpers.withMessage('El correo es obligatorio', required),
        email: helpers.withMessage('El correo no es válido', email)
    },
    password: {
        required: helpers.withMessage('La contraseña es obligatoria', required)
    }
};

const v$ = useVuelidate(rules, form);

// Autenticación
const authStore = useAuthStore();
const { authenticated } = storeToRefs(authStore);
const { login } = authStore;
const router = useRouter();

const handleLogin = async () => {
    v$.value.$touch();
    if (v$.value.$error) return;

    try {
        await login({ email: form.email, password: form.password });
        if (authenticated.value) {
            toast.add({
                severity: 'success',
                summary: 'Inicio de sesión exitoso',
                detail: '¡Bienvenido de nuevo! Nos alegra verte.',
                life: 3000
            });
            await new Promise(resolve => setTimeout(resolve, 1500));
            router.push({ name: 'dashboard', replace: true });
        }
    }
    catch (error) {
        // Por si hay un error que no se logró capturar en router.beforeEach
        toast.add({
            severity: 'error',
            summary: 'Error al iniciar sesión',
            detail: 'Verifica tus credenciales e intenta de nuevo.',
            life: 3000
        });
    }
};
</script>