<template>
  <div class="grid overflow-hidden">
    <router-link to="/profile" class="p-3 hover:bg-slate-100 transition-[background-color] ease-out rounded-top-[5px]">
      <div class="p-1">Профиль</div>
    </router-link>
    <router-link to="/" @click.stop="openAcceptModal({bool:true, nameAction:'isLogout'})" class="p-3 hover:bg-slate-100 transition-[background-color] ease-out">
      <div class="p-1">Выйти</div>
    </router-link>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from "vuex";
import store from "@/store";

export default {
  name: "ProfileModal",

  computed:{
    ...mapState({
      token: state => state.token,
      actions: state => state.actions
    })
  },

  created() {
    store.subscribe((mutation) => {
      if (mutation.type == 'acceptOrNotLogout') {
        if(this.actions.isLogout.isAccept) {
          this.acceptOrNotLogout(false)
          this.logout();
        }
      }
    })
  },

  methods:{
    ...mapActions({
      fetchData: 'fetchData'
    }),

    ...mapMutations({
      acceptOrNotLogout: 'acceptOrNotLogout'
    }),

    ...mapMutations({
      closeProfileModal: 'closeProfileModal',
      openAcceptModal: 'openAcceptModal',
      logoutState: 'logout'
    }),

    async logout() {
      await this.fetchData({
        url: 'logout',
        method: 'get',
        body: null,
        token: localStorage.getItem('token'),
        nameMutation: 'logout'
      })
      localStorage.removeItem('token')
      this.logoutState()
      this.closeProfileModal()
    }
  }
}
</script>

<style scoped>

</style>