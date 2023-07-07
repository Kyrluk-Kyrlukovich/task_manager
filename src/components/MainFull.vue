<template>
  <NavMenu v-if="isAuth"/>
  <main class="h-full" :class="navMenuDisplay">
    <MainTop/>
    <MainBottom class="py-4"/>
  </main>
</template>

<script>
import NavMenu from "@/components/NavMenu";
import MainTop from "@/components/MainTop";
import MainBottom from "@/components/MainBottom";
import {mapState, mapActions, mapMutations} from "vuex";

export default {
  name: "MainFull",
  components: {NavMenu, MainTop, MainBottom},

  computed: {
    ...mapState({
      isAuth: state => state.isAuth,
      token: state => state.token,
      isListTask: state => state.isListTask
    }),

    navMenuDisplay: function () {
      return this.isAuth ? 'w-10/12' : 'w-full'
    }
  },

  beforeRouteEnter(to, from, next) {
    let path = to.path.slice(1, to.path.length);

    if (to.name == 'main') {
      next((vm) => {
        if (vm.isAuth) {
          vm.fetchData({
            url: 'profile',
            method: 'get',
            body: null,
            token: vm.token,
            nameMutation: 'loadInfoUser'
          })
        }
      });
    }

    if (to.name == 'channel' && (to.params.id != from.params.id)) {
      next((vm) => {
        if (vm.isAuth) {
          vm.fetchData({
            url: path,
            method: 'get',
            body: null,
            token: vm.token,
            nameMutation: 'loadTasks'
          })
        }

        if (vm.$route.name == 'channel' || vm.$route.name == 'choosenDay') {
          vm.changeListTask(true)
        } else {
          vm.changeListTask(false)
        }
      });
    } else {
      next();
    }
  },

  beforeRouteLeave(to, from, next) {
    if(from.name == 'channel') {
      this.clearAllTasks()
    }
    next()
  },

  beforeRouteUpdate(to, from, next) {
    let path = to.path.slice(1, to.path.length);
    if (to.name == 'channel' && (to.params.id != from.params.id)) {
      if (this.isAuth) {
        this.fetchData({
          url: path,
          method: 'get',
          body: null,
          token: this.token,
          nameMutation: 'loadTasks'
        })
      }
      next()
    } else {
      next()
    }

  },

  created() {
    if (this.isAuth) {
      this.tryGetChannels()
    }

    if (this.$route.name == 'channel' || this.$route.name == 'choosenDay') {
      this.changeListTask(true)
    } else {
      this.changeListTask(false)
    }
  },

  methods: {
    ...mapActions({
      fetchData: 'fetchData'
    }),

    ...mapMutations({
      changeListTask: 'changeListTask',
      clearAllTasks: 'clearAllTasks'
    }),

    async tryGetChannels() {
      await this.fetchData({
        url: 'channels',
        method: 'get',
        body: {},
        token: this.token,
        nameMutation: 'loadChannels'
      });
    }
  }
}
</script>

<style scoped>

</style>