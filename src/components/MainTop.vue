<template>
  <div class="h-[9%] flex justify-end items-center bg-slate-200 px-6">
    <AuthMenu v-if="!isAuth"/>
    <UserMenu v-if="isAuth"/>
  </div>
</template>

<script>
import UserMenu from "@/components/UserMenu";
import AuthMenu from "@/components/AuthMenu";
import {mapState} from "vuex";

export default {
  name: "MainTop",
  components: {UserMenu, AuthMenu},

  computed: {
    ...mapState({
      isAuth: state => state.isAuth
    })
  }
}
</script>

<style scoped>

</style>