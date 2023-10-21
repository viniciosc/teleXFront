<template>
    <div class="conteiner">

        <div class="user">
            <ph-user :size="28" />
            <p>{{ name }}</p>
        </div>

        <div class="message">
            <strong>Messagem:</strong>
            <p>{{ messagen.message }}</p>
        </div>

        <div class="data">
            <strong>Enviada: </strong>
            <p>{{ formatCreatedAt }}</p>
        </div>

    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps(['messagen', 'name']);

const formatCreatedAt = computed(() => {
  const date = new Date(props.messagen.createdAt);
  return date.toLocaleString();
});


</script>

<style scoped>
.conteiner {
    margin: 8px;
    padding: 8px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 2px 2px 2px 1px;
}

.message {
    margin-left: 8px;
}

.message p {
    font-size: 22px;
    margin-left: 8px;
}


.user {
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 8px;
}

.data {
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 8px;
}
</style>