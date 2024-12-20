import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { VueSpinnersPlugin } from 'vue3-spinners';

import App from './App.vue';
import router from './router';

// Primevue
import PrimeVue from 'primevue/config';
import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import Ripple from 'primevue/ripple';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css';
import AnimateOnScroll from 'primevue/animateonscroll';

import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Chip from 'primevue/chip';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import DataView from 'primevue/dataview';
import DatePicker from 'primevue/datepicker';
import Dialog from 'primevue/dialog';
import Fieldset from 'primevue/fieldset';
import IconField from 'primevue/iconfield';
import IftaLabel from 'primevue/iftalabel';
import InputIcon from 'primevue/inputicon';
import InputNumber from 'primevue/inputnumber';
import InputTex from 'primevue/inputtext';
import Menu from 'primevue/menu';
import Menubar from 'primevue/menubar';
import Message from 'primevue/message';
import Panel from 'primevue/panel';
import ProgressSpinner from 'primevue/progressspinner';
import Select from 'primevue/select';
import SelectButton from 'primevue/selectbutton';
import Tab from 'primevue/tab';
import TabList from 'primevue/tablist';
import TabPanel from 'primevue/tabpanel';
import TabPanels from 'primevue/tabpanels';
import Tabs from 'primevue/tabs';
import Tag from 'primevue/tag';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ToggleButton from 'primevue/togglebutton';
import ToggleSwitch from 'primevue/toggleswitch';
import Toolbar from 'primevue/toolbar';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// Register global components Primevue
app.component('Avatar', Avatar);
app.component('Badge', Badge);
app.component('Button', Button);
app.component('Card', Card);
app.component('Chip', Chip);
app.component('Column', Column);
app.component('DataTable', DataTable);
app.component('DataView', DataView);
app.component('DatePicker', DatePicker);
app.component('Dialog', Dialog);
app.component('Fieldset', Fieldset);
app.component('IconField', IconField);
app.component('IftaLabel', IftaLabel);
app.component('InputIcon', InputIcon);
app.component('InputNumber', InputNumber);
app.component('InputText', InputTex);
app.component('Menu', Menu);
app.component('Menubar', Menubar);
app.component('Message', Message);
app.component('Panel', Panel);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Select', Select);
app.component('SelectButton', SelectButton);
app.component('Tab', Tab);
app.component('TabList', TabList);
app.component('TabPanel', TabPanel);
app.component('TabPanels', TabPanels);
app.component('Tabs', Tabs);
app.component('Tag', Tag);
app.component('Textarea', Textarea);
app.component('Toast', Toast);
app.component('ToggleButton', ToggleButton);
app.component('ToggleSwitch', ToggleSwitch);
app.component('Toolbar', Toolbar);
app.directive('animateonscroll', AnimateOnScroll);
app.directive('ripple', Ripple);

// Installation plugin
const MyPreset = definePreset(Aura, {
    //Your customizations, see the following sections for examples
    semantic: {
        primary: {
            50: '{sky.50}',
            100: '{sky.100}',
            200: '{sky.200}',
            300: '{sky.300}',
            400: '{sky.400}',
            500: '{sky.500}',
            600: '{sky.600}',
            700: '{sky.700}',
            800: '{sky.800}',
            900: '{sky.900}',
            950: '{sky.950}'
        },
        colorScheme: {
            light: {
                formField: {
                    hoverBorderColor: '{primary.color}'
                }
            },
            dark: {
                formField: {
                    hoverBorderColor: '{primary.color}'
                }
            }
        }
    }
});

app.use(pinia);
app.use(router);
app.use(ToastService);
app.use(VueSpinnersPlugin);
app.use(PrimeVue, {
    ripple: true,
    theme: {
        preset: MyPreset,
        options: {
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities'
            }
        }
    },
    locale:{
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    }
 });

app.mount('#app');
