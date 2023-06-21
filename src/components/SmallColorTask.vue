<template>
  <div
      class=" flex flex-wrap p-3 h-[120px]  w-[100px] text-[12px]  overflow-hidden">
    <div v-for="color in colorsTasks" :key="color['id_color']" class="w-1/2 flex justify-center">
      <div
          @click="chooseColor(color)"
          class="w-[20px] h-[20px] rounded-[50%] hover:scale-[1.15] transition-[transform] ease-in hover:cursor-pointer"
          :class="[color['name_color']]">
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
  },

  computed: {
    ...mapState({
      colorsTasks: state => state.colorsTasks,
      token: state => state.token
    }),
  },

  methods: {
    ...mapActions({
      fetchData: 'fetchData'
    }),

    chooseColor(color) {
      this.$emit('chooseColor', color);
    }
  }
}
</script>

<style scoped>
.black {
  background-color: #000000;
}

.red {
  background-color: #8B0000;
}

.green {
  background-color: #008000;
}

.orange {
  background-color: #FFA500;
}

.blue {
  background-color: #1E90FF;
}

.purple {
  background-color: #800080;
}
</style>