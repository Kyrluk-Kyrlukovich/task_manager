<template>
  <div class="h-[10%] w-full p-2 flex text-xl font-semibold align-items-center">
    <div class="w-full h-fit text-center my-auto"></div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ChoosenDate",

  data() {
    return {
      months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
    }
  },

  computed:{
    ...mapState({
      choosenDate: state => state.chooseDate
    })
  }
}
</script>

<style scoped>

</style>