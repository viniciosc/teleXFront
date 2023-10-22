<template>
    <div class="modal-background">
        <div class="modal">
            <header class="modal-header">
                <slot name="header">
                    Digite sua mensagem!
                </slot>
                <button type="button" class="btn-close" @click="$emit('closeModal')"><ph-x :size="16" /></button>
            </header>
            <section class="modal-body">
                <slot name="body">
                    
                </slot>

            </section>

            <footer class="modal-footer">
                <slot name="footer">
                   
                </slot>

            </footer>

        </div>
    </div>
</template>

<script setup lang="ts">



</script>

<style scoped>

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5000; 
}

.modal{
    background-color: #ffffff;
    box-shadow: 2px 2px 20px 1px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    z-index: 5000;
    border-radius: 4px;
}

.modal-header,
.modal-footer{
    padding: 8px;
    display: flex;
    background-color: #ffffff;
}

.modal-header{
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    background-color: #ffffff;
    justify-content: space-between;
    align-items: center;
}

.modal-footer{
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
    color: #4AAE9B;
}

.modal-body {
    position: relative;
    padding: 20px 10px;
    color: #4AAE9B;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 4px;
}

.btn-close {
    position: relative;
    top: 0;
    right: 0;
    color: #4AAE9B;
    border: none;
    font-size: 16px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    background-color: #ffffff;
}


</style>