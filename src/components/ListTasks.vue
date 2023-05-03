<template>
  <div class="relative w-full overflow-hidden bg-slate-200 rounded-[10px]">
    <div
        class="overflow-y-scroll absolute w-full p-5 flex flex-wrap max-h-[100%]"
    >
      <div v-for="(correctTime, idx) in time" :key="idx" class="w-full h-[60px] flex">
        <div class="w-2/12">{{ correctTime.hour }}:{{ correctTime.minute }}</div>
        <div class="w-[5px] border-r-[1px] border-slate-400 relative -mr-3"></div>
        <div class="w-10/12 pl-4 pr-2 py-2 border-t-[1px] border-slate-400 text-[14px]">
          <div class="h-full rounded-r-[7px] border-l-[3px] border-lime-600">
            <div class="absolute p-2">{{ correctTime.task['head_task'] }}</div>
            <div class="bg-lime-400 h-full rounded-r-[7px] p-1 opacity-25"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";
import store from "@/store";

export default {
  name: "ListTasks",

  data() {
    return {
      localTime: []
    };
  },

  created() {
    store.subscribe((mutation) => {
      if (mutation.type == 'loadTasks') {
        this.fillNewTasks({date:this.chooseDate})
      }
    })
    if(!this.chooseDate) {
      this.changeChoosenDate({day: this.currDay, month: this.month, year:this.year})
    }
    this.fillTime();
  },

  computed: {
    ...mapState({
      tasks: state => state.tasks,
      currDay: state => state.currDay,
      month: state => state.month,
      year: state => state.year,
      chooseDate: state => state.chooseDate,
      time: state => state.time,
    }),
  },

  methods: {
    ...mapMutations({
      changeChoosenDate: 'changeChoosenDate',
      fillTime: 'fillTime',
      fillNewTasks: 'fillNewTasks'
    }),
  }
}
</script>

<style scoped>

</style>