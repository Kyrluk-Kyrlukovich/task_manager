<template>
  <div class="h-[9%] flex justify-between items-center bg-slate-200 px-6">
    <SearchInput/>
    <AuthMenu v-if="!isAuth"/>
    <UserMenu v-if="isAuth"/>
  </div>
</template>

<script>
import SearchInput from "@/components/SearchInput";
import UserMenu from "@/components/UserMenu";
import AuthMenu from "@/components/AuthMenu";
import {mapState} from "vuex";

export default {
  name: "MainTop",
  components: {SearchInput, UserMenu, AuthMenu},

  computed: {
    ...mapState({
      isAuth: state => state.isAuth
    })
  }
}
</script>

<style scoped>

</style>