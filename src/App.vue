<template>
  <div class="h-full w-full flex bg-slate-300 font-mont">
    <NavMenu/>
    <main class="w-10/12 h-full">
      <MainTop/>
      <MainBottom/>
    </main>
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
import NavMenu from "@/components/NavMenu";
import MainTop from "@/components/MainTop";
import MainBottom from "@/components/MainBottom";

export default {
  name: "App",
  components: { NavMenu, MainTop, MainBottom },


  data() {
    return {
      date: [],
      time: [],
    };
  },
};
</script>