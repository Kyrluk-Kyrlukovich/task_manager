<template>
  <div class="bg-slate-200 grid justify-center gap-[20px] w-[350px] p-4 rounded-[5px]">
      <div class="text-center-web" ><img src="../assets/user.png" alt=""></div>
      <input type="text" class="h-[30px] p-1 rounded" placeholder="Название канала">
      <button 
        class="w-[100%] h-[100%] rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
        Создать Канал
      </button>
  </div>
</template>

<script>
export default {
    name: "ModalCreateChannel"

}
</script>

<style>
.text-center-web {
  text-align: -webkit-center;
  text-align: -moz-center;
  text-align: -o-center;
}
</style>