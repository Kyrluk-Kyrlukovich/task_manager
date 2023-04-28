<template>
  <div
      class=" flex flex-wrap p-3 h-[120px] bg-slate-200 w-[100px] text-[12px] shadow-[0px_4px_12px_6px_rgba(34,60,80,0.2)] rounded-[5px] overflow-hidden">
    <div v-for="color in colorsTasks" :key="color.id" class="w-1/2 flex justify-center">
      <div
          @click="chooseColor(color.tag)"
          class="w-[20px] h-[20px] rounded-[50%] hover:scale-[1.15] transition-[transform] ease-in hover:cursor-pointer"
          :class="[`bg-[#${color.tag}]`]">
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "SmallColorTask",

  data() {
    return {}
  },

  created() {
    this.fetchData({url: 'task-color', method: 'get', body: {}, nameMutation: 'loadColorsTask'})
  },

  computed: {
    ...mapState({
      colorsTasks: state => state.colorsTasks
    })
  },

  methods: {
    ...mapActions({
      fetchData: 'fetchData'
    }),

    chooseColor(tag) {
      this.$emit('chooseColor', tag);
    }
  }
}
</script>

<style scoped>

</style>