<template>
  <div class="bg-slate-200 rounded-[5px] grid overflow-hidden">
    <router-link to="profile" class="p-3 hover:bg-slate-100 transition-[background-color] ease-out rounded-top-[5px]">
      <div class="p-1">Профиль</div>
    </router-link>
    <router-link to="/" @click="logout" class="p-3 hover:bg-slate-100 transition-[background-color] ease-out">
      <div class="p-1">Выйти</div>
    </router-link>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from "vuex";

export default {
  name: "ProfileModal",

  computed:{
    ...mapState({
      token: state => state.token
    })
  },

  methods:{
    ...mapActions({
      fetchData: 'fetchData'
    }),

    ...mapMutations({
      closeProfileModal: 'closeProfileModal'
    }),

    logout() {
      this.fetchData({
        url: 'logout',
        method: 'get',
        body: null,
        token: this.token,
        nameMutation: 'logout'
      })
      this.closeProfileModal()
    }
  }
}
</script>

<style scoped>

</style>