<template>
    <div class="header">

        <ModalMessage v-if="closeModal" @closeModal="closeOpenModal">

            <template v-slot:header>
                <h4>Altere seu nome !</h4>
            </template>

            <template v-slot:body>
                <p class="notification" v-if="notification">{{ notification }}</p>
                <label for="">Nome:</label>
                <input class="edit-nome" type="text" v-model="nome.name">
            </template>
            <template v-slot:footer>
                <button class="button-edit" @click="fetchAlterarNome()">Enviar</button>
            </template>

        </ModalMessage>

        <div class="local">
            <h1> {{ $route.path === '/home' ? 'Suas Mensagens' : 'Messagens enviadas para a comunidade' }} </h1>
            <h3> {{ $route.path === '/home' ? 'Acompanhe suas mensagens enviadas' : `Acompanhe as mensagens enviadas a
                comunidade em tempo real` }}</h3>
        </div>
        <div class="user">
            <h1 class="edit" @click="closeModal = true">{{ user.name }} <ph-pencil-simple-line :size="28" /></h1>
            <!-- rota para seu bot -->
           <h3><a href="https://t.me/teleXSuper" target="_blank">Clique aqui para enviar uma mensagem para o bot</a></h3> 
        </div>
    </div>
    <div class="menu">
        <RouterLink class="router-link" to="/home"> <button
                :class="{ 'ativa': $route.path === '/home' }"><ph-paper-plane-tilt :size="24" /> Enviadas</button>
        </RouterLink>
        <RouterLink class="router-link" to="/recebidas"><button
                :class="{ 'ativa': $route.path === '/recebidas' }"><ph-chat-centered-text :size="24" /> Recebidas</button>
        </RouterLink>

    </div>
</template>

<script setup lang="ts">
import ModalMessage from '../components/ModalMessage.vue';
import { ref } from 'vue';
import { UserInterface } from '../types/UserInterface';
import { api } from '../services/api';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

let closeModal = ref(false);
const notification = ref<string>('');
const user = ref<UserInterface>(JSON.parse(localStorage.getItem('user')));
const nome = ref({ name: '' });

const closeOpenModal = () => {
  closeModal.value = false;

  notification.value = '';
};

const fetchAlterarNome = async () => {
  notification.value = '';
  if (!nome.value.name) {
    notification.value = 'Nome obrigatoria!';
  } else {
    try {
      const response = await api.patch(
        `users/${user.value.id}`, nome.value,
        {
          headers: {
            Authorization:
                            `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      user.value.name = nome.value.name;
      localStorage.setItem('user', JSON.stringify(user.value));
      toast.success('Nome alterado com sucesso!!!');
      closeModal.value = false;
    } catch (error) {
      console.error('Erro ao alterar nome:', error);
    }
  }


};

</script>

<style scoped>
a{
    color: #ffffff;
}
.notification {
    text-align: center;
    color: rgb(253, 0, 0);
}

input:focus {
    outline: none;
}

.edit-nome {
    padding: 8px;
    width: 200px;
    border: 1px solid #4AAE9B;
    border-radius: 4px;
}

.button-edit {

    color: #ffffff;
    background-color: #4AAE9B;
    border: 1px solid #34bca3;
    border-radius: 4px;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;

}

.header {
    max-height: 25%;
    background-color: #0088CC;
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;

}

.router-link {
    text-decoration: none;

}

.user h1,
h3 {
    display: flex;
    gap: 4px;
    justify-content: left;
    align-items: center;
}

.edit {
    cursor: pointer;
}

@media screen and (max-width: 640px) {
    .header {
        display: grid;
        grid-template-columns: 1fr;
    }
}

.menu {
    margin-top: 8px;
    gap: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

button {

    background-color: transparent;
    font-size: 16px;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
}

.ativa {
    color: #ffffff;
    background-color: #0088CC;
    border: none;
}
</style>