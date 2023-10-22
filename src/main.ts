import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style/global.css';
import App from './App.vue';
import PhosphorIcons from '@phosphor-icons/vue';
import router from './router';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';

const app = createApp(App);

app.use(PhosphorIcons);

app.use(Vue3Toastify, {
  autoClose: 3000,
} as ToastContainerOptions);

app.use(createPinia());

app.use(router);

app.mount('#app');
