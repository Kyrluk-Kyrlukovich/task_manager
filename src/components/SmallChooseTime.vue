<template>
  <div
      class=" h-[250px] bg-slate-200 absolute top-[140px] left-[170px]  w-[150px] text-[12px] shadow-[0px_4px_12px_6px_rgba(34,60,80,0.2)] rounded-[5px] overflow-hidden">
    <div class="h-[10%] z-20 text-start absolute top-[5px] left-[5px]">
      <button @click="closeSmallTime">
        <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.19873" width="24.8757" height="3.10946" rx="1" transform="rotate(45 2.19873 0)" fill="#374457"/>
          <rect x="0.211517" y="17.8013" width="24.8757" height="3.10946" rx="1"
                transform="rotate(-45 0.211517 17.8013)" fill="#374457"/>
        </svg>
      </button>
    </div>
    <div class="overflow-y-scroll z-10 absolute w-full max-h-[100%]">
      <div v-for="(item, idx) in time" :key="idx"
           class="text-start p-[15px] px-[30px] text-[16px] hover:bg-slate-300 transition-[background-color] ease-out"
           @click="chooseTime">
        {{ item.hour }}:{{ item.minute }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "smallChooseTime",

  data() {
    return {
      time: [],
      choosenTime: ''
    }
  },

  created() {
    this.fillTime()
  },

  methods: {
    closeSmallTime() {
      this.$emit('closeSmallTime');
    },

    chooseTime(evt) {
      for (let i = 1; i <= 23; i++) {
        let hour = i;
        for (let j = 1; j <= 2; j++) {
          let minute = j == 1 ? '00' : '30';
          if(`${hour}:${minute}` == evt.target.textContent){
            this.choosenTime = {hour:hour, minute:minute}
          }
        }
      }
      this.$emit('chooseTime', this.choosenTime);
    },

    fillTime() {
      for (let i = 1; i <= 23; i++) {
        let hour = i;
        for (let j = 1; j <= 2; j++) {
          let minute = j == 1 ? '00' : '30';
          this.time.push({hour: hour, minute: minute})
        }
      }
    }
  }
}
</script>

<style scoped>

</style>