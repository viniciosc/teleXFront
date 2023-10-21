<template>
  <div class="container">
    <form action="" class="login" v-if="!cadastrar">
      <div class="header">
        <h4>Bem-vindo ao TELE X, sua porta de entrada para a comunidade!</h4>
      </div>
      <strong :class="{ sucessoNotification: sucesso }">{{ notification }}</strong>
      <label for="nome">Usuário</label>
      <div class="input-icon">
        <input type="text" v-model="login.name" placeholder="Digite o usuário!" class="">
        <ph-user :size="16" class="icon" />
      </div>
      <label for="senha">Senha</label>
      <div class="input-icon">
        <input v-model="login.password" type="password" placeholder="Digite o senha!" required class="">
        <ph-password :size="16" class="icon" />
      </div>

      <button type="submit" class="acessar" @click.prevent="fetchLogin()" required><ph-sign-in :size="16" /> Acessar
        painel</button>
      <div class="separador"></div>
      <button class="cadastrar" @click="voltarCadastrar()"><ph-user-plus :size="16" /> Não tenho conta</button>

    </form>

    <form action="" class="login" v-else>
      <div class="header">
        <h4>Bem-vindo ao TELE X, sua porta de entrada para a comunidade!</h4>
      </div>
      <strong>{{ notification }}</strong>
      <label for="nome">Usuário</label>
      <div class="input-icon">
        <input type="text" v-model="cadastro.name" placeholder="Digite o usuário do seu telegram!" class="">
        <ph-user :size="16" class="icon" />
      </div>
      <label for="senha">Senha</label>
      <div class="input-icon">
        <input v-model="cadastro.password" type="password" placeholder="Digite o senha!" required class="">
        <ph-password :size="16" class="icon" />
      </div>

      <label for="senha">Senha</label>
      <div class="input-icon">
        <input v-model="passwordNew" type="password" placeholder="Digite a senha novamente!" required class="">
        <ph-password :size="16" class="icon" />
      </div>
      <button type="submit" class="acessar" @click.prevent="fetchCadastro()" required><ph-user-plus :size="16" />
        Cadastrar</button>
      <div class="separador"></div>
      <button class="cadastrar" @click="voltarCadastrar()"> Voltar</button>

    </form>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { api } from '../services/api';
import { useAuthStore } from '../stores/UserStore';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const { loginUser } = store;
const router = useRouter();

let cadastrar = ref<boolean>(false);

let login = ref({
  name: '',
  password: ''
});

let passwordNew = '';

let cadastro = ref({
  name: '',
  password: ''
});

let sucesso = ref<boolean>(false);

let notification = ref<string>('');

const voltarCadastrar = () => {
  notification.value = '';
  cadastrar.value = !cadastrar.value;
};

const fetchLogin = async () => {
  notification.value = '';
  sucesso.value = false;

  if (!login.value.name) {
    notification.value = 'Usuário obrigatório!!';
  } else if (!login.value.password) {
    notification.value = 'Senha obrigatório!!';
  }
  else {
    try {
      await loginUser(login.value);
      router.push({ name: 'home' });
    } catch (error) {
      notification.value = error.response.data.message;
    }

  }

};


const fetchCadastro = async () => {
  notification.value = '';

  if (!cadastro.value.name) {
    notification.value = 'Usuário obrigatório!!';
  } else if (!cadastro.value.password) {
    notification.value = 'Senha obrigatório!!';
  } else if (passwordNew !== cadastro.value.password) {
    notification.value = 'Senhas precisam ser a mesma!!';
  }
  else {
    try {
      await api.post('users', cadastro.value);
      cadastrar.value = !cadastrar.value;
      notification.value = 'Usuário cadastrado com sucesso! ';
      sucesso.value = true;
    } catch (error) {

      notification.value = error.response.data.message;

    }

  }

};

</script>

<style scoped>
strong {
  display: flex;
  justify-content: center;
  color: #FF0000;
}

.sucessoNotification {
  color: #00FF00;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.header {
  border-bottom: 1px solid #000000;
  margin-bottom: 16px;
  max-width: 250px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  text-align: justify;
  position: relative;
}

.login {

  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input-icon {
  position: relative;
  display: flex;
  align-items: center;
}

input {
  display: flex;
  flex: 1;
  padding: 8px;
  border: 1px solid #000000;
  border-radius: 4px;
  padding-left: 30px;
}

.icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}

input::placeholder {
  color: gray;
}

.separador {
  border-bottom: 1px solid #000000;
}

.acessar {
  color: #ffffff;
  background-color: #0088CC;
  margin-top: 8px;
  margin-bottom: 8px;
  border: none;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.cadastrar {
  background-color: transparent;
  border: 1px solid #000000;
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
}
</style>