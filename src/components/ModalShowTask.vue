<template>
  <div class="h-full">
    <div class="h-full w-full grid grid-cols-1 gap-[15px] px-6 py-8">
      <div class="w-full grid grid-cols-[100px_1fr] gap-[10px]">
        <h3>Заголовок:</h3>
        <input class="rounded-[5px] p-2 h-[30px] w-full disabled:bg-slate-200" type="text"
               v-model="task['head_task']"
               :disabled="isDisabled">
      </div>
      <div class="w-full grid grid-cols-[100px_1fr] gap-[10px]">
        <div><img src="../assets/wall_clock.png" alt=""></div>
        <div class="grid grid-cols-[2fr_1fr]">
          <div @click="openCalendar"
             class="p-2 rounded" :class="editClass">
          {{ chooseDateTask.day }} {{ this.shortedNameMonths[chooseDateTask.month] }} {{ chooseDateTask.year }}
          </div>
          <div @click="openOrCloseModalTime" class="rounded-[5px] p-2 h-full w-full bg-slate-200" :class="editClass">
            {{ dateStartFormat }}
          </div>
        </div>
        <transition name="modalSmallCalendar" class="hover:cursor-pointer">
          <div v-if="isCalendar" class="absolute left-[50px] top-[120px] h-[210px] bg-slate-200 w-[300px] shadow-[0px_4px_12px_6px_rgba(34,60,80,0.2)] rounded-[5px] overflow-hidden">
            <SmallCalendar @closeSmallCalendar="closeSmallCalendar" @chooseDate="chooseDate"/>
          </div>
        </transition>
        <transition name="modalSmallChooseTime">
          <div v-if="isTimeModal"
               class="h-[250px]  bg-slate-200 absolute top-[110px] left-[150px]  w-[150px] text-[12px] shadow-[0px_4px_12px_6px_rgba(34,60,80,0.2)] rounded-[5px] overflow-hidden">
            <SmallChooseTime @closeSmallTime="closeModalTime" @chooseTime="chooseTime"/>
          </div>
        </transition>
      </div>
      <div class="w-full grid grid-cols-[100px_1fr] gap-[10px]">
        <h3>Статус:</h3>
        <div @click="openOrCloseModalStatus" class="rounded-[5px] p-1 h-[30px] bg-slate-200" :class="editClass">{{
            task.status['name_status']
          }}
        </div>
        <transition name="smallStatus">
          <div v-if="isStatusModal"
               class="absolute hover:cursor-pointer top-[160px] left-[140px] h-[120px] bg-slate-200 w-[200px] shadow-[0px_4px_12px_6px_rgba(34,60,80,0.2)] rounded-[5px] overflow-hidden">
            <SmallStatus @chooseStatus="chooseStatus" class="absolute"/>
          </div>
        </transition>
      </div>
      <div class="w-full grid grid-cols-[100px_1fr] gap-[10px]">
        <h3>Цвет:</h3>
        <div @click="openOrCloseModalColor" class="flex gap-[10px] items-center rounded-[5px] p-1" :class="editClass">
          <div class="rounded-[50%] p-1 bg-slate-200 w-[20px] h-[20px]" :class="task.color['name_color']"></div>
          <div v-if="isEditTask">
            <svg width="13" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M20.7989 0.899445L11.6065 10.0918C11.216 10.4824 10.5828 10.4824 10.1923 10.0918L0.999896 0.899445"
                  stroke="#535353" stroke-width="3"/>
            </svg>
          </div>
          <transition name="smallColorTask">
            <div v-if="isColorModal"
                 class="absolute top-[200px] left-[170px] overflow-hidden bg-slate-200 shadow-[0px_4px_12px_6px_rgba(34,60,80,0.2)] rounded-[5px]">
              <SmallColorTask @chooseColor="chooseColor"/>
            </div>
          </transition>
        </div>
      </div>
      <div class="w-full grid grid-cols-[100px_1fr] gap-[10px]">
        <div><img src="../assets/icon_description_task.svg" alt=""></div>
        <textarea v-model="task['text_task']" class="resize-none w-full rounded-[10px] p-2 disabled:bg-slate-200"
                  :disabled="isDisabled"></textarea>
      </div>
      <div class="grid grid-cols-1 gap-[5px]">
        <button @click="onEditTask"
                v-if="!isEditTask"
                class="w-[100%] h-[90%] rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
          Изменить
        </button>
        <button @click="closeModalShowTask"
                v-if="!isEditTask"
                class="w-[100%] h-[90%] rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
          Закрыть
        </button>
        <button @click="openAcceptModal({bool:true, nameAction:'isDeleteTask'})"
                v-if="!isEditTask"
                class="w-[100%] h-[90%] rounded-[5px] bg-red-600 hover:bg-red-800 transition-[background-color] ease-out duration-[0.25s] py-1">
          Удалить
        </button>
        <button @click="offEditTask"
                v-if="isEditTask"
                class="w-[100%] h-[90%] rounded-[5px] bg-red-600 hover:bg-red-800 transition-[background-color] ease-out duration-[0.25s] py-1">
          Отменить
        </button>
        <button @click="openAcceptModal({bool:true, nameAction:'isEditTask'})"
                v-if="isEditTask"
                class="w-[100%] h-[90%] rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import SmallColorTask from "@/components/SmallColorTask";
import SmallChooseTime from "@/components/SmallChooseTime";
import SmallStatus from "@/components/SmallStatus";
import SmallCalendar from "@/components/SmallCalendar";
import store from "@/store";

export default {
  name: "ModalShowTask",
  components: {SmallColorTask, SmallChooseTime, SmallStatus, SmallCalendar},

  data() {
    return {
      isDisabled: true,
      isEditTask: false,
      isColorModal: false,
      isTimeModal: false,
      isCalendar: false,
      isStatusModal: false,
      task: null,
      chooseDateTask:'',
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
    const unsubscribe = store.subscribe((mutation) => {
        if (mutation.type == 'changeChoosenTask') {
          this.task = {...mutation.payload}
        } else if(mutation.type == 'acceptOrNotDeleteTask') {
          if(this.actions.isDeleteTask.isAccept) {
            this.acceptOrNotDeleteTask(false);
            this.deleteTask();
            unsubscribe();
          }
        } else if(mutation.type == 'acceptOrNotEditTask') {
          if(this.actions.isEditTask.isAccept) {
            this.acceptOrNotEditTask(false);
            this.updateTask();
          }
        }
      })

    if (!this.task) {
      this.task = {...this.choosenTask}
    }

    this.chooseDateTask = {day: +this.task['date_start'].day, month: +this.task['date_start'].month - 1, year: this.task['date_start'].year};

    this.fetchData({url: 'task-color', method: 'get', body: {}, token: null, nameMutation: 'loadColorsTask'})
    this.fetchData({url: 'statuses', method: 'get', body: {}, token: null, nameMutation: 'loadStatusesTasks'})
  },

  computed: {
    ...mapState({
      choosenTask: state => state.choosenTask,
      token: state => state.token,
      isAuth: state => state.isAuth,
      actions: state => state.actions,
    }),

    ...mapGetters({
      formatDate: 'formatDate',
      formatTime: 'formatTime',
      findTasks: 'findTasks'
    }),

    dateStartFormat() {
      if (this.task) {
        return `${this.task['date_start'].hour}:${this.task['date_start'].minutes}`;
      }
      return 'null'
    },

    editClass() {
      if (this.isEditTask) {
        return ['hover:bg-slate-300', 'transition-[background-color]', 'duration-[0.25s]', 'ease-out', 'cursor-pointer', 'w-fit', 'px-3']
      }
      return false
    }
  },

  methods: {
    ...mapActions({
      fetchData: 'fetchData',

    }),

    ...mapMutations({
      openAcceptModal: 'openAcceptModal',
      acceptOrNotDeleteTask: 'acceptOrNotDeleteTask',
      acceptOrNotEditTask: 'acceptOrNotEditTask'
    }),

    async deleteTask() {
      const deleteTaskUrl = (this.$route.fullPath + '/delete-task').slice(1);
      const getNewTasksUrl = this.$route.fullPath.slice(1);
      await this.fetchData({
        url: deleteTaskUrl,
        method: 'post',
        body: {id_task: this.task['id_task']},
        token: this.token,
        nameMutation: null
      })
      await this.fetchData({
        url: getNewTasksUrl,
        method: 'get',
        body: null,
        token: this.token,
        nameMutation: 'loadTasks'
      })
      this.closeModalShowTask()
    },

    async updateTask() {
      if(this.isAuth) {
        let dateStart = this.formatDate(false, this.chooseDateTask);
        let timeStart = this.formatTime(this.task['date_start'])
        let date = dateStart + ' ' + timeStart;
        let path = this.$route.path.slice(1)
        console.log(date);

        await this.fetchData({
          url: path,
          method: 'post',
          body: {
            id_task: this.task['id_task'],
            head_task: this.task['head_task'],
            text_task: this.task['text_task'],
            date_start: date,
            id_status: this.task.status['id_status'],
            id_task_color: this.task.color['id_color'],
          },
          token: this.token,
          nameMutation: 'changeChoosenTask'
        })

        await this.fetchData({
          url: path,
          method: 'get',
          body: null,
          token: this.token,
          nameMutation: 'loadTasks'
        })
        this.onDisable();
        this.offEditTask();
      }
    },

    closeSmallCalendar() {
      this.isCalendar = false;
    },

    chooseDate(date) {
      console.log(date);
      this.chooseDateTask = {...date}
      this.isCalendar = false;
    },

    offDisable() {
      this.isDisabled = false
    },

    onDisable() {
      this.isDisabled = true
    },

    onEditTask() {
      this.isEditTask = true
      this.offDisable()
    },

    offEditTask() {
      this.isEditTask = false
      this.onDisable()
      this.closeModalTime()
      this.closeModalStatus()
      this.closeModalColor()
      this.task = {...this.choosenTask}
    },

    closeModalShowTask() {
      console.log('work');
      this.$emit('closeModalShowTask')
    },

    openCalendar() {
    if(this.isEditTask) 
      if(this.isCalendar) {
        this.closeSmallCalendar()
      } else {
        this.isTimeModal = false;
        this.isStatusModal = false;
        this.isCalendar = true;
        this.isColorModal = false;
      }
    },

    openOrCloseModalTime() {
      if (this.isEditTask) {
        this.isTimeModal = this.isTimeModal ? false : true
        this.isStatusModal = false
        this.isColorModal = false
      }
    },
    openOrCloseModalStatus() {
      if (this.isEditTask) {
        this.isStatusModal = this.isStatusModal ? false : true
        this.isTimeModal = false
        this.isColorModal = false
      }
    },

    openOrCloseModalColor() {
      if (this.isEditTask) {
        this.isColorModal = this.isColorModal ? false : true
        this.isTimeModal = false
        this.isStatusModal = false
      }
    },

    closeModalTime() {
      this.isTimeModal = false
    },

    closeModalStatus() {
      this.isStatusModal = false
    },

    closeModalColor() {
      this.isColorModal = false
    },

    chooseTime(time) {
      this.task['date_start'].hour = time.hour
      this.task['date_start'].minutes = time.minutes
      this.closeModalTime()
    },

    chooseStatus(status) {
      this.task.status = status
      this.closeModalStatus()
    },

    chooseColor(color) {
      this.task.color = color
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