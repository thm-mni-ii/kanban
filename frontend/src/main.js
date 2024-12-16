import { createApp } from 'vue';

import App from './App.vue';
import store from './store/index.js';
import router from './router/index.js';

import ExportButton from './components/ExportButton.vue';
import NavigationTabs from './components/NavigationTabs.vue';


const app = createApp(App);

app.component('export-button', ExportButton);
app.component('navigation-tabs', NavigationTabs);

app.use(store);
app.use(router);



app.mount('#app');