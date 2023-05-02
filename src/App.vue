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

export default {
  name: "App",
  components: { },


  data() {
    return {
    };
  },
};
</script>