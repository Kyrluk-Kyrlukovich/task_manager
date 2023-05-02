<template>
  <div class="flex justify-center align-items-center w-full h-full">
    <router-link to="/" class="fixed left-0 top-0 m-[40px] w-[10%] rounded-[5px]">
      <button
          class="w-[100%] h-fit rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
        На главную
      </button>
    </router-link>
    <form
        class="h-fit my-auto p-[7%] rounded-[10px] bg-slate-200 text-center grid grid-cols-1 gap-[10px] shadow-[0px_0px_27px_-1px_rgba(34,60,80,0.2)]">
      <h2 class="text-[20px] font-medium mb-[15%]">Авторизация</h2>
      <div>
        <input v-model="email" type="email" class="p-[5px] rounded-[5px]" required placeholder="Ваш email"/>
      </div>
      <div>
        <input type="password" v-model="password" class="p-[5px] rounded-[5px]" required placeholder="Ваш пароль"/>
      </div>
        <button
            @click.prevent="tryLogin"
            class="w-[100%] rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
          Войти
        </button>
      <router-link to="/signup" class="rounded-[5px]" v-if="!isAuth">
        <button
            class="w-[100%] rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
          Регистрация
        </button>
      </router-link>
    </form>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "LoginForm",

  data() {
    return {
      email: '',
      password: '',
    }
  },

  computed: {
    ...mapState({
      isAuth: state => state.isAuth
    })
  },

  methods: {
    ...mapActions({
      fetchData: 'fetchData'
    }),

    async tryLogin() {
      await this.fetchData({
        url: 'login',
        method: 'post',
        body: {email: this.email, password: this.password},
        token: null,
        nameMutation: 'login'
      })
      if (this.isAuth) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>

</style>