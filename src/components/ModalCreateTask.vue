<template>
  <div>
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
            v-model="headTask"
            class="bg-slate-200 p-1 text-[24px] border-b-2 border-black focus:outline-none focus:border-b-cyan-700"
            placeholder="Добавить задание"/>
      </div>
      <div class="flex gap-x-3 items-center">
        <div><img src="../assets/wall_clock.png" width="30" height="30"></div>
        <div @click="openCalendar"
             class="p-2 hover:bg-slate-300 rounded transition-[background-color] duration-[0.25s] ease-out">
          {{ chooseDateTask.day }} {{ this.shortedNameMonths[chooseDateTask.month] }} {{ chooseDateTask.year }}
        </div>
        <transition name="modalSmallCalendar" class="hover:cursor-pointer">
          <div v-if="isCalendar"
               class="absolute left-[100px] top-[150px] h-[210px] bg-slate-200 w-[300px] shadow-[0px_4px_12px_6px_rgba(34,60,80,0.2)] rounded-[5px] overflow-hidden">
            <SmallCalendar @closeSmallCalendar="closeSmallCalendar" @chooseDate="chooseDate"/>
          </div>
        </transition>

        <div class="p-2 hover:bg-slate-300 rounded transition-[background-color] duration-[0.25s] ease-out"
             @click="openTime"
        >{{ chooseTimeTask.hour }}:{{ chooseTimeTask.minutes }}
        </div>
        <transition name="modalSmallChooseTime">
          <div v-if="isTime"
               class="h-[250px]  bg-slate-200 absolute top-[140px] left-[170px]  w-[150px] text-[12px] shadow-[0px_4px_12px_6px_rgba(34,60,80,0.2)] rounded-[5px] overflow-hidden">
            <SmallChooseTime @closeSmallTime="closeSmallTime" @chooseTime="chooseTime"/>
          </div>
        </transition>
      </div>
      <div class="flex gap-x-4">
        <div class="p-2">Выберите статус:</div>
        <div class=" rounded p-2 hover:bg-slate-300 duration-[0.25s] flex gap-x-2 items-center"
             @click="openOrCloseStatus">
          <div class=" w-[200px] rounded-[50%]">
            {{ chooseStatusTask['name_status'] }}
          </div>
          <div>
            <svg width="13" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M20.7989 0.899445L11.6065 10.0918C11.216 10.4824 10.5828 10.4824 10.1923 10.0918L0.999896 0.899445"
                  stroke="#535353" stroke-width="3"/>
            </svg>
          </div>
        </div>
        <transition name="smallStatus">
          <div v-if="isStatus"
               class="absolute hover:cursor-pointer top-[200px] left-[190px] h-[120px] bg-slate-200 w-[200px] shadow-[0px_4px_12px_6px_rgba(34,60,80,0.2)] rounded-[5px] overflow-hidden">
            <SmallStatus @chooseStatus="chooseStatus"/>
          </div>
        </transition>

      </div>
      <div class="flex gap-x-4">
        <div class="p-2">Выберите цвет:</div>
        <div class="rounded p-2 hover:bg-slate-300 duration-[0.25s] ease-out flex gap-x-2 items-center"
             @click="openOrCloseColorTask">
          <div class="w-[20px] h-[20px] rounded-[50%]" :class="[chooseColorTask['name_color']]">
          </div>
          <div>
            <svg width="13" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M20.7989 0.899445L11.6065 10.0918C11.216 10.4824 10.5828 10.4824 10.1923 10.0918L0.999896 0.899445"
                  stroke="#535353" stroke-width="3"/>
            </svg>
          </div>
        </div>
        <transition name="smallColorTask">
          <div v-if="isColor"
               class="absolute top-[260px] left-[170px] overflow-hidden bg-slate-200 shadow-[0px_4px_12px_6px_rgba(34,60,80,0.2)] rounded-[5px]">
            <SmallColorTask @chooseColor="chooseColor"/>
          </div>
        </transition>
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
        <div><textarea v-model="textTask" name="" cols="20" rows="3" class="rounded-[7px] resize-none p-2"
                       placeholder="Добавьте описание"></textarea></div>
      </div>
      <button @click="createTask"
              class="w-[100%] rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
        Создать
      </button>
    </div>
  </div>
</template>

<script>
import SmallCalendar from "@/components/SmallCalendar";
import {mapState, mapActions, mapGetters} from "vuex";
import SmallChooseTime from "@/components/SmallChooseTime";
import SmallColorTask from "@/components/SmallColorTask";
import SmallStatus from "@/components/SmallStatus";

export default {
  name: "ModalCreateTask",
  components: {SmallCalendar, SmallChooseTime, SmallColorTask, SmallStatus},

  data() {
    return {
      isCalendar: false,
      isTime: false,
      isColor: false,
      isStatus: false,
      headTask: '',
      textTask: '',
      chooseStatusTask: {id_status: 1, name_status: 'Срочно и важно'},
      chooseDateTask: '',
      chooseColorTask: {id_color: 1, name_color: 'black', tag_color: 'c70500'},
      chooseTimeTask: {hour: 12, minutes: '00'},
      shortedNameMonths: [
        'Янв',
        'Фев',
        'Март',
        'Апр',
        'Май',
        'Июнь',
        'Июль',
        'Авг',
        'Сен',
        'Окт',
        'Нояб',
        'Дек',
      ],
    }
  },

  created() {
    this.fetchData({url: 'task-color', method: 'get', body: {}, token: null, nameMutation: 'loadColorsTask'})
    this.fetchData({url: 'statuses', method: 'get', body: {}, token: null, nameMutation: 'loadStatusesTasks'})
    this.chooseDateTask = {day: this.date.getDate(), month: this.date.getMonth(), year: this.date.getFullYear()};
  },

  computed: {
    ...mapState({
      date: state => state.date,
      isAuth: state => state.isAuth,
      colorsTasks: state => state.colorsTasks,
      defaultColor: state => state.defaultColor,
      statusesTasks: state => state.statusesTasks,
      token: state => state.token
    }),

    ...mapGetters({
      formatDate: 'formatDate',
      formatTime: 'formatTime'
    })
  },

  methods: {
    ...mapActions({
      fetchData: 'fetchData'
    }),

    async createTask() {
      let dateStart = this.formatDate(false, this.chooseDateTask);
      let timeStart = this.formatTime(this.chooseTimeTask)
      let date = dateStart + ' ' + timeStart;
      let idChannel = this.$route.params.id
      let url = `channels/${idChannel}/create-task`
      await this.fetchData({
        url: url,
        method: 'post',
        body: {
          text_task: this.textTask,
          head_task: this.headTask,
          date_start: date,
          id_status: this.chooseStatusTask['id_status'],
          id_task_color: this.chooseColorTask['id_color']
        },
        token: this.token,
        nameMutation: null,
      })

      if (this.isAuth) {
        this.fetchData({
          url: this.$route.fullPath.slice(1),
          method: 'get',
          body: null,
          token: this.token,
          nameMutation: 'loadTasks'
        })
      }

      this.closeModalWindow();
    },

    openTime() {
      if (this.isTime) {
        this.closeSmallTime()
      } else {
        this.isCalendar = false;
        this.isColor = false;
        this.isStatus = false;
        this.isTime = true;
      }

    },

    chooseTime(time) {
      this.chooseTimeTask = {...time};
      this.isTime = false;
    },

    chooseStatus(status) {
      this.chooseStatusTask = {...status};
      this.isStatus = false;
    },

    closeSmallTime() {
      this.isTime = false
    },

    closeModalWindow() {
      this.$emit('closeModalWindow')
    },

    openCalendar() {
      if (this.isCalendar) {
        this.closeSmallCalendar()
      } else {
        this.isTime = false;
        this.isColor = false;
        this.isCalendar = true;
        this.isStatus = false;
      }

    },

    closeSmallCalendar() {
      this.isCalendar = false;
    },
    chooseDate(date) {
      this.chooseDateTask = {...date}
      this.isCalendar = false;
    },

    chooseColor(color) {
      this.chooseColorTask = {...color}
      this.isColor = false;
    },

    openOrCloseColorTask() {
      this.isCalendar = false;
      this.isTime = false;
      this.isStatus = false;
      this.isColor = this.isColor ? false : true;
    },
    openOrCloseStatus() {
      this.isCalendar = false;
      this.isTime = false;
      this.isColor = false;
      this.isStatus = this.isStatus ? false : true;
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

.modalSmallCalendar-enter-active,
.modalSmallChooseTime-enter-active,
.smallStatus-enter-active,
.smallColorTask-enter-active {
  animation: open 0.45s ease-in-out;
}

.modalSmallCalendar-leave-active,
.modalSmallChooseTime-leave-active,
.smallStatus-leave-active,
.smallColorTask-leave-active {
  animation: open 0.45s reverse ease-in-out;
}

@keyframes open {
  0% {
    max-height: 0;
  }
  100% {
    max-height: 250px;
  }
}
</style>