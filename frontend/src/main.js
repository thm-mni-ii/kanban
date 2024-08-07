

import { createApp } from 'vue'
import App from './App.vue'
import Board from './Boards.vue'
import Start from './Start.vue'
import route from './router.js'

//Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
  components,
  directives,
})



createApp(Start)
  .use(vuetify)
  .use(route)
  .mount('#app')
