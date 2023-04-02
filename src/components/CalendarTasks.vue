<template>
  <div class="h-[100%] w-full flex flex-col gap-3">
    <DateFilter @nextMonth="nextMonth" @previousMonth="previousMonth"/>
    <div class="h-[90%]">
      <div
          class="grid grid-cols-7 bg-slate-600 h-[9%] px-2 text-slate-200 text-center rounded-t-[15px]"
      >
        <div v-for="(day, idx) in days"
             :key="idx"
             class="flex items-center justify-center">{{day}}</div>
      </div>
      <div
          class="grid grid-cols-1 grid-rows-5 h-[91%] bg-slate-200 rounded-b-[15px]"
      >
        <div
            v-for="items in CheckCurrMonth"
            v-bind:key="items"
            class="border-y-[1px] border-slate-300 last-of-type:border-b-[2px] last-of-type:rounded-b-[15px] grid grid-cols-7 grid-rows-1"
        >
          <div
              v-for="item in items"
              :key="item"
              :class=classObject(item)
              @click="showModalWindow"
              class="flex text-[14px] flex-col justify-start border-r-[2px] last-of-type:border-r-[0px] p-1 border-slate-300"
          >
            <div class="h-[20%] w-full my-1 rounded-r-[7px] border-l-[3px] border-lime-600">
              <div class="absolute p-1">safsfsdfsdsdf</div>
              <div class="bg-lime-400 h-full rounded-r-[7px] opacity-25"></div>
            </div>
            <div class="h-[20%] w-full my-1 rounded-r-[7px] border-l-[3px] border-lime-600">
              <div class="absolute p-1">safsfsdfsdsdf</div>
              <div class="bg-lime-400 h-full rounded-r-[7px] opacity-25"></div>
            </div>

            <div class="h-[20%] w-full text-right mt-auto">{{item.numDay}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalCreateTask v-show="showModal" @closeModalWindow="closeModalWindow" ref="modal"/>
</template>

<script>
import ModalCreateTask from "@/components/ModalCreateTask";
import DateFilter from "@/components/DateFilter";
import store from "@/store";

export default {
  name: "CalendarTasks",
  components: {ModalCreateTask, DateFilter},


  data() {
    return {
      classObject: function (item) {
        return {
          "bg-blue-200": item.numDay == this.currDay && item.statusMonth == 'month' && item.month == this.currMonth ? true : false,
        }
      },
      date: [],
      time: [],
      showModal: false,
      currDay: new Date().getDate(),
      currMonth: new Date().getMonth(),
      month: '',
      year: '',
      firstDayOfMonth: '',
      lastDayOfMonth:  '',
      lastDayOfLastMonth: '',

      days: [
          'Понедельник',
          'Вторник',
          'Среда',
          'Четверг',
          'Пятница',
          'Суббота',
          'Воскресенье'
      ],
    };
  },

  created() {
    this.month = store.state.month;
    this.year = store.state.year;
    store.subscribe((mutation) => {
      if (mutation.type == 'nextMonth') {
        this.month = store.state.month;
        this.year = store.state.year;
      } else if(mutation.type == 'previousMonth') {
        this.month = store.state.month;
        this.year = store.state.year;
      }

    })

    this.updateCalendar();


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

  computed: {
    CheckCurrMonth() {
      return this.updateCalendar();
    }
  },

  methods: {
    showModalWindow() {
      this.showModal = true;
    },

    closeModalWindow() {
      this.showModal = false;
    },

    nextMonth() {
      store.commit('nextMonth');
    },

    previousMonth() {
      store.commit('previousMonth');
    },
    updateCalendar() {
      console.log(this.month);
      let date = [];
      this.firstDayOfMonth = new Date(this.year, this.month).getDay();
      this.firstDayOfMonth == 0 ? this.firstDayOfMonth = 6 : this.firstDayOfMonth -= 1;

      this.lastDayOfMonth = new Date(this.year, this.month + 1, 0).getDay();
      this.lastDayOfMonth == 0 ? this.lastDayOfMonth = 6 : this.lastDayOfMonth -= 1;

      let dateCurrentMonth = new Date(this.year, this.month+1).getDate() - 1;
      let dateStartNextMonth = new Date(this.year, this.month+2).getDate() - 1;

      for (let i = 0; i < 5; i++) {
        let firstDayOfMonth = this.firstDayOfMonth - 1;
        let arr = [];
        for (let j = 0; j < 7; j++) {
          if(i == 0) {
            if (this.firstDayOfMonth <= j) {//Записывает начало текущего месяца
              dateCurrentMonth += 1;
              arr.push({numDay:dateCurrentMonth, statusMonth: "month",  month: this.month});
            } else { //Записывает конец прошлого месяца
              let date = new Date(this.year, this.month, 0).getDate() - firstDayOfMonth;
              firstDayOfMonth -= 1;
              arr.push({numDay:date, statusMonth: "previousMonth",  month: this.month});

            }
          } else if (i == 4) {
            if(j <= this.lastDayOfMonth) {//Записывает конец текущего месяца
              dateCurrentMonth += 1;
              arr.push({numDay:dateCurrentMonth, statusMonth: "month",  currMonth: this.month});
            } else {//Записывает начало следующего месяца
              dateStartNextMonth+=1;
              arr.push({numDay:dateStartNextMonth, statusMonth: "nextMonth",  currMonth: this.month});
            }
          } else {//Записывает конец текущего месяца
            dateCurrentMonth += 1;
            arr.push({numDay:dateCurrentMonth, statusMonth: "month",  currMonth: this.month});
          }

        }
        date.push(arr);
      }
      return date;
    }
  }
}
</script>

<style scoped>


</style>