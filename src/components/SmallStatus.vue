<template>
  <div
      class="flex flex-wrap text-start text-[12px] h-full w-full">
    <div class="absolute h-[100%] overflow-y-scroll">
      <div v-for="status in statusesTasks" :key="status['id_status']" @click="chooseStatus(status)"
           class="w-full p-4 text-[16px] hover:bg-slate-300 transition-[background-color] ease-out">
        {{ status['name_status'] }}
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "SmallStatus",

  computed: {
    ...mapState({
      statusesTasks: state => state.statusesTasks
    })
  },

  methods: {
    chooseStatus(status) {
      this.$emit('chooseStatus', status)
    }
  }
}
</script>

<style scoped>

</style>