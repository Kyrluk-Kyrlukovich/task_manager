<template>
  <div class="relative w-full overflow-hidden bg-slate-200 rounded-[10px]">
    <div
        class="overflow-y-scroll absolute w-full p-5 max-h-[100%] min-h-[100%]"
    >
      <div class="flex h-auto flex-wrap">
        <h1 v-if="isTasks"
            class="text-center absolute left-[50%] top-[50%] text-[24px] translate-y-[-50%] translate-x-[-50%] font-bold opacity-[30%]">
          Нет задач</h1>
        <div v-for="correctTime in dayListTasks" :key="correctTime['id_task']" class="w-full h-[60px] flex">
          <div class="w-2/12">{{ correctTime['date_start'].hour }}:{{ correctTime['date_start'].minutes }}</div>
          <div class="w-[5px] border-r-[1px] border-slate-400 relative -mr-3"></div>
          <div class="w-10/12 pl-4 pr-2 py-2 border-t-[1px] border-slate-400 text-[14px]">
            <div class="h-full rounded-r-[7px] border-l-[3px] border-lime-600 hover:cursor-pointer" @click="chooseTask(correctTime)">
              <div class="absolute p-2">{{ correctTime['head_task'] }}</div>
              <div class="h-full rounded-r-[7px] p-1 opacity-25" :class="correctTime.color['name_color']"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="modalShowTask">
      <div v-if="isModalShowTask" class="absolute overflow-hidden left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[10px] shadow-[1px_3px_27px_8px_rgba(34,60,80,0.2)] bg-slate-200 max-h-[420px] h-full max-w-[370px] w-full">
        <ModalShowTask @deleteTask="deleteTask"  @closeModalShowTask="closeModalShowTask"/>
      </div>
    </transition>
    
  </div>
</template>

<script>
import {mapState, mapMutations, mapGetters} from "vuex";
import ModalShowTask from "@/components/ModalShowTask";

export default {
  name: "ListTasks",
  components: {ModalShowTask},

  data() {
    return {
      localTime: [],
      isModalShowTask: false
    };
  },

  created() {

    if (!this.chooseDate) {
      this.changeChoosenDate({day: this.currDay, month: this.month, year: this.year})
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
      choosenTask: state => state.choosenTask,
      dayListTasks: state => state.dayListTasks
    }),


    ...mapGetters({
      findTasks:'findTasks'
    }),


    isTasks() {
      if (this.dayListTasks.length != 0) {
        return false
      }
      return true
    }
  },

  methods: {
    ...mapMutations({
      changeChoosenDate: 'changeChoosenDate',
      fillTime: 'fillTime',
      fillNewTasks: 'fillNewTasks',
      changeChoosenTask: 'changeChoosenTask'
    }),

    deleteTask() {
      this.$forceUpdate();
    },

    chooseTask(task) {
      this.changeChoosenTask(task)
      this.openModalShowTask()
    },

    closeModalShowTask() {
      this.isModalShowTask = false;
    },

    openModalShowTask() {
      this.isModalShowTask = true;
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


.modalShowTask-enter-active {
  animation: open 0.7s;
}
.modalShowTask-leave-active {
  animation: open 0.7s reverse;
}

  @keyframes open {
    0% {
      max-height: 0;
    }
    100% {
      max-height: 420px;
    }
  }
</style>