<template>
    <div class="header">
        <div class="local">
            <h1> {{ $route.path === '/home' ? 'Suas Mensagens' : 'Messagens enviadas para a comunidade' }} </h1>
            <h3> {{ $route.path === '/home' ? 'Acompanhe suas mensagens enviadas' : 'Acompanhe as mensagens enviadas a comunidade em tempo real' }}</h3>
        </div>
        <div class="user">
            <h1>{{user.name}} <ph-pencil-simple-line :size="28" class="edit" /></h1>
            <h3>mensagens enviadas</h3>
        </div>
    </div>
    <div class="menu">
        <RouterLink class="router-link" to="/home"> <button  :class="{'ativa': $route.path === '/home'}"><ph-paper-plane-tilt :size="24" /> Enviadas</button> </RouterLink>
        <RouterLink class="router-link" to="/recebidas"><button :class="{'ativa': $route.path === '/recebidas'}"><ph-chat-centered-text :size="24" /> Recebidas</button></RouterLink>
        
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UserInterface } from '../types/UserInterface';

const user = ref<UserInterface>(JSON.parse(localStorage.getItem('user')));
</script>

<style scoped>
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

.user h1, h3{
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

.menu{
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