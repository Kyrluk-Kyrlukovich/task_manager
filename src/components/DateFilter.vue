<template>
  <div class="flex justify-between h-[10%] w-full">
    <div class="flex flex-wrap w-5/12">
      <h2 class="text-lg font-medium opacity-50 w-full">Сегодня</h2>
      <h1 class="text-2xl font-semibold w-6/12">{{ months[month] }}, {{ year }}</h1>
      <div class="w-6/12 flex gap-2">
        <ButtonNextLeft @click="previousMonth"/>
        <ButtonNextRight @click="nextMonth"/>
      </div>
    </div>
    <div class="w-7/12 flex justify-end self-end">
      <FilterCategory/>
    </div>
  </div>
</template>

<script>
import ButtonNextLeft from "@/components/ButtonNextLeft";
import ButtonNextRight from "@/components/ButtonNextRight";
import FilterCategory from "@/components/FilterCategory";
import store from "@/store";
import {mapActions} from 'vuex';

export default {
  name: "DateFilter",
  components: {ButtonNextLeft, ButtonNextRight, FilterCategory},

  data() {
    return {
      day: store.state.day,
      month: store.state.month,
      year: store.state.year,
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

  created() {
    store.subscribe((mutation) => {
      if (mutation.type == 'nextMonth') {
        this.month = store.state.month;
        this.year = store.state.year;
      } else if (mutation.type == 'previousMonth') {
        this.month = store.state.month;
        this.year = store.state.year;
      }

    })

    this.fetchData({url: 'statuses', method: 'get', body: {}, token: null, nameMutation: 'loadStatusesTasks'})
  },

  methods: {
    ...mapActions({
      fetchData: 'fetchData'
    }),

    nextMonth() {
      this.$emit('nextMonth');
    },

    previousMonth() {
      this.$emit('previousMonth');
    }
  }

}
</script>

<style scoped>

</style>