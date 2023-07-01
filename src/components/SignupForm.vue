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
        <input v-model="firstName" type="text" class="p-[5px] rounded-[5px]" required placeholder="Ваше имя"/>
      </div>
      <div>
        <input v-model="lastName" type="text" class="p-[5px] rounded-[5px]" required placeholder="Ваша фамилия"/>
      </div>
      <div>
        <input v-model="phone" type="tel" class="p-[5px] rounded-[5px]" required placeholder="Ваш номер телефона"/>
      </div>
      <div>
        <input v-model="email" type="email" class="p-[5px] rounded-[5px]" required placeholder="Ваш email"/>
      </div>
      <div>
        <input v-model="password" type="password" class="p-[5px] rounded-[5px]" required placeholder="Ваш пароль"/>
      </div>
      <router-link @click="trySignup" to="/signup" class="rounded-[5px]">
        <button
            class="w-[100%] rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
          Регистрация
        </button>
      </router-link>
      <router-link to="/login" class="rounded-[5px]">
        <button
            class="w-[100%] rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
          Войти
        </button>
      </router-link>

    </form>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "SignupForm",

  data() {
    return {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
    }
  },

  computed: {
    ...mapState({
      isAuth: state => state.isAuth,
      token: state => state.token
    })
  },

  methods: {
    ...mapActions({
      fetchData: 'fetchData'
    }),

    async trySignup() {
      let data = await this.fetchData({
        url: 'signup',
        method: 'post',
        body: {
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          password: this.password,
          phone_user: this.phone,
        },
        token: this.token,
        nameMutation: null
      })

      if (data.data) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>

</style>