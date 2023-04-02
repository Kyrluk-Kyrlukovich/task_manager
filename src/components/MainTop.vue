<template>
  <div class="h-[9%] flex justify-between items-center bg-slate-200 px-6">
    <SearchInput/>
    <UserMenu/>
  </div>
</template>

<script>
import SearchInput from "@/components/SearchInput";
import UserMenu from "@/components/UserMenu";

export default {
  name: "MainTop",
  components: {SearchInput, UserMenu}

}
</script>

<style scoped>

</style>