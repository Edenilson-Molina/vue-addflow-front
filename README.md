# Flujo de Caja — Frontend

Gestión simple y moderna de ingresos y egresos: categorías, cuentas, transacciones y reportes diarios en una SPA con Vue 3.

<!-- Tech badges -->
![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwindcss&logoColor=white)
![PrimeVue](https://img.shields.io/badge/PrimeVue-4-1E90FF?logo=primevue&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-4-FF6384?logo=chartdotjs&logoColor=white)


## ¿Qué puedes hacer?
- Registrar ingresos y egresos con categorías y cuentas.
- Visualizar flujo diario y resúmenes rápidos.
- Formularios validados y UI responsiva con PrimeVue + Tailwind.
- Persistencia local del estado con Pinia.
- Exportación de datos y soporte para gráficos con Chart.js.

## Inicio rápido
Requisitos: Node.js 18+.

```sh
npm install
cp .env.example .env.local
npm run dev
```

## Variables de entorno
- Copia `.env.example` a `.env.local` y completa las variables necesarias (p. ej. URL base de la API).

## Scripts útiles
- `npm run dev` — Servidor de desarrollo con recarga en caliente.
- `npm run build` — Compilación para producción.
- `npm run preview` — Previsualización de la build.
- `npm run lint` — Linter (ESLint) con fix automático.

## Estructura mínima
```
src/
	components/        # UI reutilizable (formularios, iconos)
	router/            # Rutas (módulos por dominio)
	services/          # Llamadas a API (axios)
	stores/            # Estado global (Pinia)
	views/             # Páginas (auth, dashboard, transacciones)
```

Hecho con ❤️ para agilizar la gestión diaria del dinero.
