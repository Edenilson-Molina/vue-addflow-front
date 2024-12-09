import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router';

// Primevue
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Ripple from 'primevue/ripple';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css';
import Menubar from 'primevue/menubar';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputTex from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Fieldset from 'primevue/fieldset';
import Message from 'primevue/message';
import Toast from 'primevue/toast';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Chip from 'primevue/chip';
import Tag from 'primevue/tag';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import ProgressSpinner from 'primevue/progressspinner';
import DataView from 'primevue/dataview';
import Select from 'primevue/select';
import Dialog from 'primevue/dialog';
import Toolbar from 'primevue/toolbar';
import SelectButton from 'primevue/selectbutton';
import Textarea from 'primevue/textarea';
import ToggleButton from 'primevue/togglebutton';
import ToggleSwitch from 'primevue/toggleswitch';


const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// Register global components Primevue
app.directive('ripple', Ripple);
app.component('Menubar', Menubar);
app.component('Avatar', Avatar);
app.component('Badge', Badge);
app.component('Button', Button);
app.component('IconField', IconField);
app.component('InputIcon', InputIcon);
app.component('InputText', InputTex);
app.component('InputNumber', InputNumber);
app.component('Fieldset', Fieldset);
app.component('Message', Message);
app.component('Toast', Toast);
app.component('Card', Card);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Chip', Chip);
app.component('Tag', Tag);
app.component('Tabs', Tabs);
app.component('TabList', TabList);
app.component('Tab', Tab);
app.component('TabPanels', TabPanels);
app.component('TabPanel', TabPanel);
app.component('ProgressSpinner', ProgressSpinner);
app.component('DataView', DataView);
app.component('Select', Select);
app.component('Dialog', Dialog);
app.component('Toolbar', Toolbar);
app.component('SelectButton', SelectButton);
app.component('Textarea', Textarea);
app.component('ToggleButton', ToggleButton);
app.component('ToggleSwitch', ToggleSwitch);

// Installation plugin
app.use(pinia);
app.use(router);
app.use(ToastService);
app.use(PrimeVue, {
    ripple: true,
    theme: {
        preset: Aura,
        options: {
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities'
            }
        }
    }
 });


app.mount('#app');
