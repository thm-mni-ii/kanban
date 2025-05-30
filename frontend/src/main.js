import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import registerGlobalComponents from './global-components';
import router from './router';


import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
    components,
    directives,
})
const app = createApp(App);
const pinia = createPinia();

app.use(vuetify)
app.use(pinia);
app.use(router);

registerGlobalComponents(app);

app.mount('#app');