<template>
  <div class="flex h-[91%]">
    <div
        class=" w-9/12 px-6 flex gap-y-10 flex-wrap"
    >
      <CalendarTasks/>
    </div>
    <div class="w-3/12 flex flex-wrap">
      <ChoosenDate class="h-[10%]"/>
      <ListTasks class="h-[80%]"/>
      <transition name="modalCreateTask">
        <div v-if="showModal" class="absolute overflow-hidden left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[10px] shadow-[1px_3px_27px_8px_rgba(34,60,80,0.2)] bg-slate-200 max-h-[475px] h-full max-w-[550px] w-full">
          <modal-create-task @closeModalWindow="closeModalWindow"/>
        </div>
      </transition>
      
      <button @click="showModalWindow"
              class="w-[100%] h-[5%] rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
        Создать задачу
      </button>
    </div>
  </div>
</template>

<script>
import CalendarTasks from "@/components/CalendarTasks";
import ChoosenDate from "@/components/ChoosenDate";
import ListTasks from "@/components/ListTasks";
import ModalCreateTask from "@/components/ModalCreateTask";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "MainBottom",
  components: { CalendarTasks, ChoosenDate, ListTasks, ModalCreateTask},

  data() {
    return {
      showModal: false,
    }
  },

  computed: {
    ...mapGetters({
      formatDate: 'formatDate',
      formatTime: 'formatTime'
    }),
  },

  methods: {
    ...mapActions({
      fetchData: 'fetchData'
    }),

    showModalWindow() {
      this.showModal = true;
    },

    closeModalWindow() {
      this.showModal = false;
    },
  }
}
</script>

<style scoped>
  .modalCreateTask-enter-active {
  animation: open 0.7s;
}
.modalCreateTask-leave-active {
  animation: open 0.7s reverse;
}

  @keyframes open {
    0% {
      max-height: 0;
    }
    100% {
      max-height: 475px;
    }
  }
</style>