<template>
  <div class="h-full w-full grid grid-cols-1 justify-items-center items-center overflow-hidden">
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
          <input type="text" class="p-[5px] rounded-[5px]" v-model="firstName" :disabled="!isEdit"
                 placeholder="Ваше имя"/>
        </div>
        <div>
          <input type="text" class="p-[5px] rounded-[5px]" v-model="lastName" :disabled="!isEdit"
                 placeholder="Ваша фамилия"/>
        </div>
        <div>
          <input type="text" class="p-[5px] rounded-[5px]" v-model="patronymic" :disabled="!isEdit"
                 placeholder="Ваше отчество"/>
        </div>
        <div>
          <input type="text" class="p-[5px] rounded-[5px]" v-model="phoneUser" :disabled="!isEdit"
                 placeholder="Ваш телефон"/>
        </div>
        <div>
          <input type="email" class="p-[5px] rounded-[5px]" v-model="email" :disabled="!isEdit"
                 placeholder="Ваш email"/>
        </div>
        <button
            v-if="!isEdit"
            @click.prevent="onEdit"
            class="w-[100%] rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
          Редактировать
        </button>
        <button
            @click.stop.prevent="openAcceptModal({bool:true, nameAction:'isLogout'})"
            v-if="!isEdit"
            class="w-[100%] rounded-[5px] bg-red-600 hover:bg-red-800 transition-[background-color] ease-out duration-[0.25s] py-1">
          Выйти
        </button>
        <button
            v-if="isEdit"
            @click.prevent="cancel"
            class="w-[100%] rounded-[5px] bg-red-600 hover:bg-red-800 transition-[background-color] ease-out duration-[0.25s] py-1">
          Отменить
        </button>
        <button
            v-if="isEdit"
            @click.prevent="openAcceptModal({bool:true, nameAction:'isEditInfoUser'})"
            class="w-[100%] rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
          Сохранить
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import store from "@/store";

export default {
  name: "ProfilePage",

  data() {
    return {
      isEdit: false,

      firstName: '',
      lastName: '',
      patronymic: '',
      phoneUser: '',
      email: '',
    }
  },

  computed: {
    ...mapState({
      token: state => state.token,
      user: state => state.user,
      isAuth: state => state.isAuth,
      modalAcceptedAction: state => state.modalAcceptedAction,
      actions: state => state.actions
    })
  },

  beforeRouteEnter(to, from, next) {
    let path = to.path.slice(1);
    if (to.name == 'profile') {
      next((vm) => {
        if (vm.isAuth) {
          vm.fetchData({
            url: path,
            method: 'get',
            body: null,
            token: vm.token,
            nameMutation: 'loadInfoUser'
          })
        } else {
          vm.$router.push('/')
        }
      });
    } else {
      next();
    }
  },

  created() {
    const unsubscribe = store.subscribe((mutation) => {
      if (mutation.type == 'loadInfoUser') {
        this.getValues(this.user)
      } else if (mutation.type == 'acceptOrNotEditInfoUser') {
        if (this.actions.isEditInfoUser.isAccept) {
          this.save();
        } else {
          this.cancel();
        }
      } else if (mutation.type == 'acceptOrNotLogout') {
        if (this.actions.isLogout.isAccept) {
          unsubscribe();
          this.logout();
          this.acceptOrNotLogout(false);
        }
      }
    })

    if (this.isAuth) {
      this.fetchData({
        url: this.$route.fullPath.slice(1),
        method: 'get',
        body: null,
        token: this.token,
        nameMutation: 'loadInfoUser'
      })
    }
  },

  methods: {
    ...mapActions({
      fetchData: 'fetchData'
    }),

    ...mapMutations({
      openOrCloseAcceptModal: 'openOrCloseAcceptModal',
      openAcceptModal: 'openAcceptModal',
      closeAcceptModal: 'closeAcceptModal',
      acceptOrNotLogout: 'acceptOrNotLogout',
      logoutState: 'logout'
    }),


    onEdit() {
      this.isEdit = true
    },

    offEdit() {
      this.isEdit = false
    },

    closeAccept() {
      this.closeAcceptModal()
    },

    async save() {
      let url = this.$route.fullPath.slice(1)

      await this.fetchData({
        url: url + '/update-user',
        method: 'post',
        body: {
          first_name: this.firstName,
          last_name: this.lastName,
          patronomic: this.patronymic,
          phone_user: this.phoneUser,
          email: this.email,
        },
        token: this.token,
        nameMutation: null
      })

      await this.fetchData({
        url: url,
        method: 'get',
        body: null,
        token: this.token,
        nameMutation: 'loadInfoUser'
      })
      this.offEdit();
    },

    async logout() {
      await this.fetchData({
        url: 'logout',
        method: 'get',
        body: null,
        token: localStorage.getItem('token'),
        nameMutation: 'logout'
      })
      localStorage.removeItem('token')
      this.logoutState();
      this.$router.go();
    },

    cancel() {
      this.getValues(this.user)
      this.offEdit()
    },

    getValues(obj) {
      for (let key in obj) {
        this[key] = obj[key]
      }
    }
  }
}
</script>

<style scoped>

</style>