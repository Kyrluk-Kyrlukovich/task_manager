<template>
  <div class="w-9/12">
    <div
        class="rounded-[5px] border-[1px] border-slate-400 bg-slate-50 w-5/12"
    >
      <input
          class="p-1 rounded-[5px] border-slate-400 bg-slate-50 w-11/12 focus:outline-none"
          type="text"
          placeholder="Поиск"
      />
      <button class="ml-2">
        <img src="../assets/search.png" width="18" height="18"/>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchInput"
}
</script>

<style scoped>

</style>