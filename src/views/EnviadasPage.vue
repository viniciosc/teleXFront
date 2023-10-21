<template>
  <HeaderComponent/>
    <div class="enviar">
        <button><ph-envelope-open :size="24" /> Enviar</button>
    </div>
    <div class="container">
    
        <template v-if="messagens.length>0">
            
            <div v-for="message in messagens" :key="message.id">
                <MessagensComponent :name="userName" :messagen="message" />
            </div>
        </template>

    </div>
</template>

<script setup lang="ts">
import HeaderComponent from '../components/HeaderComponent.vue';
import MessagensComponent from '../components/MessagensComponent.vue';
import { onMounted, ref } from 'vue';
import { MessageInterface } from '../types/MessageInterface';
import {api} from '../services/api';
import { UserInterface } from '../types/UserInterface';

const messagens = ref<MessageInterface[]>([]);
const userName = ref<string>('');
const user = ref<UserInterface>(JSON.parse(localStorage.getItem('user')));
const fetchMessages = async () => {
  try {
    
    console.log( );

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

.enviar {
    display: flex;
    justify-content: right;
    align-items: center;
    padding-right: 40px;
    padding-top: 40px;

}

button {
    color: #ffffff;
    background-color: #000000;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border: none;

}

@media screen and (max-width: 640px) {
    .container {
        grid-template-columns: 1fr;
        padding: 0 24px;
    }

}
</style>../types/MessageInterface