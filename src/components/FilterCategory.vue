<template>
  <select
      name="categories"
      class="p-3 rounded-[5px] h-[65%] w-8/12"
  >
    <option value="">Срочные</option>
    <option value="">Невыполненые</option>
    <option value="">Просроченые</option>
    <option value="">Выполненые</option>
    <option value="">В процессе</option>
  </select>
</template>

<script>
export default {
  name: "FilterCategory"
}
</script>

<style scoped>

</style>