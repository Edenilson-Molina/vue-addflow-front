<template>
    <header class="fixed top-0 left-0 w-full z-10">
        <navbar />
       <sidebar />
    </header>
    <main class="grow flex px-8 pt-20">
        <router-view />
    </main>
    <footer class="text-white p-4 w-full">
        <div class="container mx-auto text-center">
            © 2025 Flujo de Caja. Todos los derechos reservados.
        </div>
    </footer>
</template>

<script setup>

</script>
