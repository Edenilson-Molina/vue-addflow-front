import PrimeVue from 'primevue/config';
import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';

export function setupPrimeVue(app) {
    const MyPreset = definePreset(Aura, {
        semantic: {
            primary: {
                50: '{blue.50}',
                100: '{blue.100}',
                200: '{blue.200}',
                300: '{blue.300}',
                400: '{blue.400}',
                500: '{blue.500}',
                600: '{blue.600}',
                700: '{blue.700}',
                800: '{blue.800}',
                900: '{blue.900}',
                950: '{blue.950}'
            },
            colorScheme: {
                light: {
                    formField: { hoverBorderColor: '{primary.color}' }
                },
                dark: {
                    formField: { hoverBorderColor: '{primary.color}' }
                }
            }
        }
    });
    
    app.use(PrimeVue, {
        ripple: true,
        theme: {
            preset: MyPreset,
            options: {
                darkModeSelector: '.dark',
                cssLayer: {
                    name: 'primevue',
                    order: 'tailwind-base, primevue, tailwind-utilities'
                }
            }
        },
        locale: {
            dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        }
    });
}
