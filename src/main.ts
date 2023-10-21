import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style/global.css';
import App from './App.vue';
import PhosphorIcons from '@phosphor-icons/vue';
import router from './router';

const app = createApp(App);
app.use(PhosphorIcons);

app.use(createPinia());
app.use(router);

app.mount('#app');
