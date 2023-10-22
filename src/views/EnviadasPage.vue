<template>
  <HeaderComponent />
  <ModalMessage v-if="closeModal" @closeModal="closeOpenModal">

    <template v-slot:header>
      <h4>Digite sua mensagem!</h4>
    </template>

    <template v-slot:body>
      <p class="notification" v-if="notification">{{ notification }}</p>
      <label for="">Mensagen:</label>
      <textarea name="" id="" cols="34" rows="5" v-model="message.message"></textarea>
    </template>
    <template v-slot:footer>
      <button @click="fetchEnviarMessage()" class="btn-green">Enviar</button>
    </template>

  </ModalMessage>
  <div class="enviar">
    <button @click="closeModal = true"><ph-envelope-open :size="24" /> Enviar</button>
  </div>
  <div class="container">

    <template v-if="messagens.length > 0">

      <div v-for="message in messagens" :key="message.id">
        <MessagensComponent :name="userName" :messagen="message" />
      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
import ModalMessage from '../components/ModalMessage.vue';
import HeaderComponent from '../components/HeaderComponent.vue';
import MessagensComponent from '../components/MessagensComponent.vue';
import { onMounted, ref } from 'vue';
import { MessageInterface } from '../types/MessageInterface';
import { api } from '../services/api';
import { UserInterface } from '../types/UserInterface';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

let closeModal = ref(false);
const messagens = ref<MessageInterface[]>([]);
const userName = ref<string>('');
const message = ref({message:''});
const notification = ref<string>('');

const user = ref<UserInterface>(JSON.parse(localStorage.getItem('user')));

const closeOpenModal = ()=>{
  closeModal.value = false;

  notification.value ='';
}; 

const fetchMessages = async () => {
  try {

    const response = await api.get(
      `messages/${user.value.id}`,
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    messagens.value = response.data[0].messages;
    userName.value = response.data[0].name;
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
  }
};

const fetchEnviarMessage = async () => {
  notification.value = '';
  if (!message.value.message) {
    notification.value = 'Mensagem obrigatoria!';
  } else {
    try {

      const response = await api.post(
        `messages/${user.value.id}`, message.value,
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      messagens.value.unshift(response.data);
      toast.success('Messagen enviada com sucesso!!!');
      closeModal.value = false;
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
    }
  }


};

onMounted(() => {
  fetchMessages();
});
</script>

<style scoped>
.notification{
  text-align: center;
  color: rgb(253, 0, 0);
}
.container {
  margin: 40px auto;
  max-width: 2240px;
  gap: 24px;
  padding: 0 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(23%, 1fr));
}

.enviar {
  display: flex;
  justify-content: right;
  align-items: center;
  padding-right: 40px;
  padding-top: 40px;

}

button {

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

textarea {
  padding: 8px;
  border: 1px solid #4AAE9B;
  border-radius: 4px;
}

textarea:focus {
  outline: none;
}

@media screen and (max-width: 640px) {
  .container {
    grid-template-columns: 1fr;
    padding: 0 24px;
  }

}
</style>../types/MessageInterface