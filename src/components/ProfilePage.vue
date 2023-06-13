<template>
  <div class="h-full w-full grid grid-cols-1 justify-items-center items-center">
    <router-link to="/" class="fixed left-0 top-0 m-[40px] w-[10%] rounded-[5px]">
      <button
          class="w-[100%] h-fit rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
        На главную
      </button>
    </router-link>
    <div class="bg-slate-200 rounded-[10px] p-[7%] shadow-[0px_0px_27px_-1px_rgba(34,60,80,0.2)]">
      <form
          class="h-fit text-center grid grid-cols-1 gap-[10px]">
        <h2 class="text-[20px] font-medium mb-[15%]">Ваш профиль</h2>
        <div>
          <input type="text" class="p-[5px] rounded-[5px]" required placeholder="Ваше имя"/>
        </div>
        <div>
          <input type="text" class="p-[5px] rounded-[5px]" required placeholder="Ваша фамилия"/>
        </div>
        <div>
          <input type="text" class="p-[5px] rounded-[5px]" required placeholder="Ваше отчество"/>
        </div>
        <div>
          <input type="email" class="p-[5px] rounded-[5px]" required placeholder="Ваш телефон"/>
        </div>
        <div>
          <input type="email" class="p-[5px] rounded-[5px]" required placeholder="Ваш email"/>
        </div>
        <button
            v-if="!isEdit"
            @click="onEdit"
            class="w-[100%] rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
          Редактировать
        </button>
          <button
              v-if="!isEdit"
              class="w-[100%] rounded-[5px] bg-red-600 hover:bg-red-800 transition-[background-color] ease-out duration-[0.25s] py-1">
            Выйти
          </button>
        <button
            v-if="isEdit"
            @click="offEdit"
            class="w-[100%] rounded-[5px] bg-red-600 hover:bg-red-800 transition-[background-color] ease-out duration-[0.25s] py-1">
          Отменить
        </button>
        <button
            v-if="isEdit"
            class="w-[100%] rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
          Сохранить
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfilePage",

  data() {
    return {
      isEdit: false
    }
  },

  methods: {
    onEdit() {
      this.isEdit = true
    },

    offEdit() {
      this.isEdit = false
    },
  }
}
</script>

<style scoped>

</style>