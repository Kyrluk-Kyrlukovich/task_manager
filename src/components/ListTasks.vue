<template>
  <div class="h-[82%] relative w-full overflow-hidden bg-slate-200 rounded-[10px]">
    <div
        class="overflow-y-scroll absolute w-full p-5 flex flex-wrap max-h-[100%]"
    >
      <div v-for="hour in time" :key="hour" class="w-full h-[60px] flex">
        <div class="w-2/12">{{ hour }}</div>
        <div class="w-[5px] border-r-[1px] border-slate-400 relative -mr-3"></div>
        <div class="w-10/12 pl-4 pr-2 py-2 border-t-[1px] border-slate-400 text-[14px]">
          <div class="h-full rounded-r-[7px] border-l-[3px] border-lime-600">
            <div class="absolute p-2">safsfsdfsdsdf</div>
            <div class="bg-lime-400 h-full rounded-r-[7px] p-1 opacity-25"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListTasks",

  data() {
    return {
      time: [],
    };
  },

  created() {
    for (let i = 1; i <= 23; i++) {
      if (i < 10) {
        this.time.push(`0${i}:00`);
      } else {
        this.time.push(`${i}:00`);
      }

      if (i === 23) {
        this.time.push("00:00");
      }
    }
  },
}
</script>

<style scoped>

</style>