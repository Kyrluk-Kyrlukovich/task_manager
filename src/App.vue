<template>
  <div class="h-full w-full flex bg-slate-300 font-mont">
      <router-view></router-view>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700&display=swap");

#app {
  height: 100vh;
  width: 100vw;
}
</style>

<script>

import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "App",
  components: { },


  data() {
    return {
    };
  },

  methods: {
    ...mapActions({
      fetchData: 'fetchData'
    }),

    ...mapMutations({
      login: 'login'
    })
  },

  created() {
    if(localStorage.getItem('token')) {
      const data = {token: localStorage.getItem('token')}
      this.login(data);
    }

    if(this.isAuth) {
      this.fetchData({
            url: 'profile',
            method: 'get',
            body: null,
            token: this.token,
            nameMutation: 'loadInfoUser'
          })
    }
  },

  computed: {
    ...mapState({
      isAuth: state => state.isAuth,
      token: state => state.token
    })
  },
};
</script>