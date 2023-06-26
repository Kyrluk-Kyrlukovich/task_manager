<template>
  <div class="grid grid-cols-1 grid-rows-[1fr_11fr] gap-[10px] py-[20px]">
    <div
        @click="closeModalAddUserOnChannel"
        class=" absolute left-[-20] top-0 m-[20px] w-[40px] rounded-[5px] hover:cursor-pointer">
      <img src="../assets/btn_closed.svg" />
    </div>
    <input type="search" v-model="search" class="rounded-[5px] p-2 h-[30px] justify-self-center">
    <div class="relative overflow-hidden ">
      <div class="absolute overflow-y-scroll w-full max-h-[100%] min-h-[100%]">
        <div v-for="user in searchUsers" :key="user['id_user']"
             class="grid grid-cols-[1fr_2fr_1fr] rounded-[10px] text-[13px] grid-rows-1 p-5 gap-5 justify-items-center items-center hover:bg-slate-400 transition-[background-color] duration-[0.25s] ease-out">
          <div><img src="../assets/user.png" alt="Пользователь" width="40" height="40">
          </div>
          <div>{{ user['first_name'] }} {{ user['last_name'] }}</div>
          <div class="self-center"><img @click="addUser(user['id_user'])" class="hover:cursor-pointer" src="../assets/plus.png"
                                                              width="20" height="20"
                                                              alt="Добавить участника участника"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "ModalAddUserOnChannel",

  data() {
    return {
      search: ''
    }
  },

  created() {
    this.fetchData({
      url: 'users',
      method: 'get',
      body: null,
      token: this.token,
      nameMutation: 'loadUsers'
    })
  },

  computed: {
    ...mapState({
      token: state => state.token,
      users: state => state.users,
      isAuth: state => state.isAuth
    }),

    searchUsers() {
      return this.users.filter(user => (user['first_name'] + user['last_name']).includes(this.search))
    }
  },

  methods: {
    ...mapActions({
      fetchData: 'fetchData'
    }),

    closeModalAddUserOnChannel() {
      this.$emit('closeModalAddUserOnChannel')
    },

    addUser(idUser) {
      const path = this.$route.fullPath.slice(1) + '/adduser'
      this.fetchData({
        url:path,
        method: 'post',
        body:{
          id_user: idUser
        },
        token: this.token
      })

      if (this.isAuth) {
        this.fetchData({
          url: this.$route.fullPath.slice(1),
          method: 'get',
          body: null,
          token: this.token,
          nameMutation: 'loadUsersChannel'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>