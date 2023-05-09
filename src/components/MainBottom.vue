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
      <modal-create-task v-if="showModal" @closeModalWindow="closeModalWindow"/>
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

<style>

</style>