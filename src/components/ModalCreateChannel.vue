<template>
  <div class="bg-slate-200 grid justify-center gap-[20px] w-[350px] p-4 rounded-[5px]">
      <div class="text-center-web" ><img src="../assets/user.png" alt=""></div>
      <input type="text" class="h-[30px] p-1 rounded" placeholder="Название канала">
      <button 
        class="w-[100%] h-[100%] rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
        Создать Канал
      </button>
      <button @click="closeModalCreateChannel"
        class="w-[100%] h-fit rounded-[5px] bg-red-600 hover:bg-red-800 transition-[background-color] ease-out duration-[0.25s] py-1">
        Отменить и Закрыть
      </button>
  </div>
</template>

<script>
export default {
    name: "ModalCreateChannel",

    methods: {
      closeModalCreateChannel() {
        this.$emit('closeModalCreateChannel')
      }
    }
}
</script>

<style>
.text-center-web {
  text-align: -webkit-center;
  text-align: -moz-center;
  text-align: -o-center;
}
</style>