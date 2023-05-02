<template>
  <div class="flex items-center w-3/12 justify-end">
    <router-link to="/login" class="w-[60%]">
      <button
          class="w-[100%] rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
        Войти
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "AuthMenu"
}
</script>

<style scoped>

</style>