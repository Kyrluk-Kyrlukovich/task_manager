<template>
  <select
      v-model="selectCategory"
      name="categories"
      class="p-3 rounded-[5px] h-[65%] w-8/12"
  >
    <option value="">Не выбрано</option>
    <option v-for="status in statusesTasks" :key="status['id_status']" :value="status['name_status']">
      {{ status['name_status'] }}
    </option>
  </select>
</template>

<script>
import {mapMutations, mapState} from 'vuex'

export default {
  name: "FilterCategory",

  data() {
    return {
      selectCategory: ''
    }
  },

  computed: {

    ...mapState({
      statusesTasks: state => state.statusesTasks
    })
  },

  watch: {
    selectCategory: function () {
      this.changeSelectCategory(this.selectCategory);
    }
  },

  methods: {
    ...mapMutations({
      changeSelectCategory: 'changeSelectCategory'
    })
  }
}
</script>

<style scoped>

</style>