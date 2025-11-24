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
            </form>
            <button @click="notify.forPromise(handlerPromise())">Push</button>
        </Fieldset>
    </section>
</template>

<script setup>
import { inject } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { useRouter } from 'vue-router';
import { required, email, helpers } from '@vuelidate/validators'
import { reactive } from 'vue'
import { storeToRefs } from 'pinia';
import { useNotify } from '@/composables/useNotify'

const { auth: authServices } = inject('security');
 

// Notificaciones
const notify = useNotify()

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
const router = useRouter();

const handleLogin = async () => {
    v$.value.$touch();
    if (v$.value.$error) return;

    try {
        const response = await authServices.login({
            email: form.email,
            password: form.password
        });

        console.log('Login successful:', response);
    }
    catch (error) {
        
    }
};

const handlerPromise = async () => {
    return await new Promise((resolve, reject) =>
      setTimeout(1 > 0.5 ? resolve : reject, 2000)
    )
};
</script>