<template>
  <div
      class="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[10px] shadow-[1px_3px_27px_8px_rgba(34,60,80,0.2)] bg-slate-200 max-h-[400px] h-full max-w-[550px] w-full">
    <div class="p-4 text-center flex flex-col gap-[20px] h-full">
      <div class="absolute right-4" @click="closeModalWindow">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.19873" width="24.8757" height="3.10946" rx="1" transform="rotate(45 2.19873 0)" fill="#64748B"/>
          <rect x="0.211517" y="17.8013" width="24.8757" height="3.10946" rx="1"
                transform="rotate(-45 0.211517 17.8013)" fill="#64748B"/>
        </svg>
      </div>
      <div class="p-2">
        <input
            class="bg-slate-200 p-1 text-[24px] border-b-2 border-black focus:outline-none focus:border-b-cyan-700"
            placeholder="Добавить задание"/>
      </div>
      <div class="flex gap-x-3 items-center">
        <div><img src="../assets/wall_clock.png" width="30" height="30"></div>
        <div @click="openCalendar = true" class="p-2 hover:bg-slate-300 rounded transition-[background-color] ease-out">10 апр 2023</div>
        <SmallCalendar v-if="openCalendar" @closeSmallCalendar="closeSmallCalendar" class="absolute left-[100px] top-[150px]"/>
        <div class="p-2 hover:bg-slate-300 rounded transition-[background-color] ease-out">00:00</div>
      </div>
      <div class="flex gap-x-4">
        <div class="p-2">Выбор цвета:</div>
        <div class="rounded p-2 hover:bg-slate-300 flex gap-x-2 items-center">
          <div class="w-[20px] h-[20px] bg-red-500 rounded-[50%]"></div>
          <div>
            <svg width="13" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M20.7989 0.899445L11.6065 10.0918C11.216 10.4824 10.5828 10.4824 10.1923 10.0918L0.999896 0.899445"
                  stroke="#535353" stroke-width="3"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="flex gap-x-3 items-center p-2">
        <div class="self-start">
          <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="4" rx="1" fill="#64748B"/>
            <rect y="6" width="32" height="4" rx="1" fill="#64748B"/>
            <path
                d="M0 13C0 12.4477 0.447715 12 1 12H17.9091C18.4614 12 18.9091 12.4477 18.9091 13V15C18.9091 15.5523 18.4614 16 17.9091 16H0.999998C0.447713 16 0 15.5523 0 15V13Z"
                fill="#64748B"/>
          </svg>
        </div>
        <div><textarea name="" cols="20" rows="3" class="rounded-[7px] resize-none p-2"
                       placeholder="Добавьте описание"></textarea></div>
      </div>
    </div>
  </div>
</template>

<script>
import SmallCalendar from "@/components/SmallCalendar";

export default {
  name: "ModalCreateTask",
  components: {SmallCalendar},

  data() {
    return {
      openCalendar: false,
    }
  },

  methods: {
    closeModalWindow() {
      this.$emit('closeModalWindow')
    },

    closeSmallCalendar() {
      this.openCalendar = false;
    }
  }
}
</script>

<style scoped>

</style>