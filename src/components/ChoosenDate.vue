<template>
  <div class="h-[10%] w-full p-2 flex text-xl font-semibold ">
    <div v-if="choosenDate" class="w-full h-fit text-start self-end mt-auto">{{months[choosenDate.month]}}, {{choosenDate.day}}</div>
    <div v-if="!choosenDate" class="w-full h-fit text-center my-auto"></div>
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