<template>
    <main class="min-h-screen flex">
        <!-- Left Panel - Form -->
        <section class="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 sm:p-12 bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div class="w-full max-w-md">
                <!-- Logo and Header -->
                <header class="text-center mb-10">
                    <div class="flex justify-center mb-4">
                        <div class="p-4 bg-gradient-to-br from-sky-100 to-blue-200 rounded-2xl shadow-lg shadow-blue-100/50">
                            <img class="w-16 h-16" src="@/assets/logo.svg" alt="Flujo de Caja">
                        </div>
                    </div>
                    <h1 class="text-3xl font-bold text-slate-800 mb-2">Bienvenido de nuevo</h1>
                    <p class="text-slate-500">Ingresa tus credenciales para continuar</p>
                </header>

                <!-- Login Form -->
                <form @submit.prevent="handleLogin" class="space-y-5">
                    <!-- Email Field -->
                    <div class="space-y-2">
                        <label for="email" class="block text-sm font-medium text-slate-700">
                            Correo electrónico
                        </label>
                        <div class="relative">
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                <i class="pi pi-envelope text-lg"></i>
                            </span>
                            <InputText 
                                id="email"
                                type="email" 
                                v-model="form.email" 
                                :invalid="v$.email.$error"
                                placeholder="ejemplo@correo.com"
                                class="w-full pl-12 pr-4 py-3 rounded-xl border-slate-200 focus:border-sky-400 focus:ring-sky-400/20 transition-all duration-200"
                            />
                        </div>
                        <Message v-if="v$.email.$error" severity="error" size="small" variant="simple" class="mt-1">
                            <small v-for="error in v$.email.$errors" :key="error.$uid" class="font-normal">
                                {{ error.$message }}
                            </small>
                        </Message>
                    </div>

                    <!-- Password Field -->
                    <div class="space-y-2">
                        <label for="password" class="block text-sm font-medium text-slate-700">
                            Contraseña
                        </label>
                        <div class="relative">
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10">
                                <i class="pi pi-lock text-lg"></i>
                            </span>
                            <Password 
                                id="password"
                                v-model="form.password" 
                                :invalid="v$.password.$error"
                                :feedback="false"
                                toggleMask
                                placeholder="••••••••"
                                input-class="w-full pl-12 pr-4 py-3 rounded-xl border-slate-200 focus:border-sky-400 focus:ring-sky-400/20 transition-all duration-200"
                                class="w-full"
                            />
                        </div>
                        <Message v-if="v$.password.$error" severity="error" size="small" variant="simple" class="mt-1">
                            <small v-for="error in v$.password.$errors" :key="error.$uid" class="font-normal">
                                {{ error.$message }}
                            </small>
                        </Message>
                    </div>

                    <!-- Remember me and Forgot Password -->
                    <div class="flex items-center justify-between text-sm">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <Checkbox v-model="rememberMe" :binary="true" class="!rounded-md" />
                            <span class="text-slate-600">Recordarme</span>
                        </label>
                        <a href="#" class="text-sky-600 hover:text-sky-700 font-medium transition-colors">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>

                    <!-- Submit Button -->
                    <Button 
                        type="submit" 
                        :loading="isLoading"
                        class="w-full py-3.5 px-6 text-base font-semibold rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 border-0 shadow-lg shadow-sky-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/40 hover:-translate-y-0.5"
                    >
                        <span v-if="!isLoading">Iniciar sesión</span>
                        <span v-else>Iniciando...</span>
                    </Button>
                </form>

                <!-- Footer -->
                <footer class="mt-8 text-center">
                    <p class="text-slate-500 text-sm">
                        ¿No tienes una cuenta? 
                        <a href="#" class="text-sky-600 hover:text-sky-700 font-semibold transition-colors">
                            Regístrate
                        </a>
                    </p>
                </footer>
            </div>
        </section>

        <!-- Right Panel - Decorative -->
        <section class="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 overflow-hidden">
            <!-- Decorative Elements -->
            <div class="absolute inset-0 opacity-10">
                <div class="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                <div class="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white rounded-full blur-3xl opacity-20"></div>
            </div>
            
            <!-- Content -->
            <div class="relative z-10 flex flex-col justify-center items-center w-full p-12 text-center">
                <div class="mb-8">
                    <div class="p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl">
                        <img class="w-32 h-32" src="@/assets/logo.svg" alt="Flujo de Caja">
                    </div>
                </div>
                <h2 class="text-4xl font-bold text-white mb-4">Flujo de Caja</h2>
                <p class="text-xl text-sky-100 max-w-md leading-relaxed">
                    Gestiona tus finanzas de manera inteligente y eficiente con nuestra plataforma
                </p>
                
                <!-- Feature List -->
                <div class="mt-10 space-y-4 text-left">
                    <div class="flex items-center gap-3 text-white/90">
                        <div class="p-2 bg-white/20 rounded-lg">
                            <i class="pi pi-chart-line text-lg"></i>
                        </div>
                        <span>Análisis financiero en tiempo real</span>
                    </div>
                    <div class="flex items-center gap-3 text-white/90">
                        <div class="p-2 bg-white/20 rounded-lg">
                            <i class="pi pi-shield text-lg"></i>
                        </div>
                        <span>Seguridad de nivel empresarial</span>
                    </div>
                    <div class="flex items-center gap-3 text-white/90">
                        <div class="p-2 bg-white/20 rounded-lg">
                            <i class="pi pi-sync text-lg"></i>
                        </div>
                        <span>Sincronización automática</span>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { inject, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { reactive } from 'vue'

const { auth: authServices } = inject('security');

// Estado del formulario
const isLoading = ref(false);
const rememberMe = ref(false);

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
const handleLogin = async () => {
    v$.value.$touch();
    if (v$.value.$error) return;

    isLoading.value = true;
    try {
        const response = await authServices.login({
            email: form.email,
            password: form.password
        });

        console.log('Login successful:', response);
    }
    catch (error) {
        console.error('Login failed:', error);
    }
    finally {
        isLoading.value = false;
    }
};
</script>