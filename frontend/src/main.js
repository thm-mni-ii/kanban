import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import registerGlobalComponents from './global-components';
import router from './router';


const app = createApp(App);
const pinia = createPinia();


app.use(pinia);
// app.use(router);

registerGlobalComponents(app);

app.mount('#app');