<template>
  <HeaderComponent />
  <div class="container">
    <template v-if="messagens.length > 0">

      <div v-for="message in messagens" :key="message.id">
        <MessagensComponent :name="message.name" :messagen="message" />
      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
import HeaderComponent from '../components/HeaderComponent.vue';
import MessagensComponent from '../components/MessagensComponent.vue';
import { onMounted, ref } from 'vue';
import { MessageInterface } from '../types/MessageInterface';
import { api } from '../services/api';
import socketIo from 'socket.io-client';

const messagens = ref<MessageInterface[]>([]);

const fetchMessages = async () => {
  try {
    const response = await api.get(
      'messageRecebida');
    messagens.value = response.data;

  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
  }
};

onMounted(() => {
  //coloque o caminho do server
  const socket = socketIo('http://localhost:3000', {
    transports: ['websocket'],
  });

  socket.on('messagemRecebida', (newMessage) => {
    if (newMessage) {
      messagens.value.unshift(newMessage);
      console.log('Nova mensagem cadastrada ' + newMessage.id);
    } else {
      console.error('Variável "messagens" não está definida.');
    }
  });
});



onMounted(() => {
  fetchMessages();
});

</script>

<style scoped>
.container {
  margin: 40px auto;
  max-width: 2240px;
  gap: 24px;
  padding: 0 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(23%, 1fr));
}

@media screen and (max-width: 640px) {
  .container {
    grid-template-columns: 1fr;
    padding: 0 24px;
  }

}
</style>