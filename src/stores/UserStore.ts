import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '../services/api'; // Importe seu cliente de API
import type { UserInterface } from '../types/UserInterface';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserInterface>();
  const token = ref<string>();
  const loginUser = async (loginData) => {
    const response = await api.post('login', loginData);
    token.value = response.data.token;
    user.value = response.data.user;
    localStorage.setItem('user', JSON.stringify(user.value));

    localStorage.setItem('token', token.value);
  };

  return { loginUser, token, user };
});
