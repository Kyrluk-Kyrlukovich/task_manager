<template>
  <div
      class=" p-2 h-[270px] bg-slate-200 w-[300px] text-[12px] shadow-[0px_4px_12px_6px_rgba(34,60,80,0.2)] rounded-[5px] overflow-hidden">
    <div class="h-[10%] text-start ">
      <button @click="closeSmallCalendar">
        <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.19873" width="24.8757" height="3.10946" rx="1" transform="rotate(45 2.19873 0)" fill="#64748B"/>
          <rect x="0.211517" y="17.8013" width="24.8757" height="3.10946" rx="1" transform="rotate(-45 0.211517 17.8013)" fill="#64748B"/>
        </svg>
      </button>
    </div>
    <div class="h-[10%] flex justify-between">
      <div>
        <h3 class="px-3 font-semibold text-[13px] text-start">{{ months[month] }}, {{ year }}</h3>
      </div>
      <div class="px-3">
        <button @click="previousMonth" class="mr-[10px]">
          <svg width="15" height="15" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.1673 7.33459L1 4.1673L4.1673 1" stroke="#64748B"/>
          </svg>
        </button>
        <button @click="nextMonth">
          <svg width="15" height="15" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.1673 1L4.33459 4.1673L1.1673 7.33459" stroke="#64748B"/>
          </svg>
        </button>
      </div>
    </div>
    <div
        class="grid grid-cols-7 h-[10%] text-center text-slate-600"
    >
      <div v-for="(day, idx) in days"
           :key="idx"
           class="flex items-center justify-center text-center">{{ day }}
      </div>
    </div>
    <div
        class="grid grid-cols-1 grid-rows-5 h-[75%] bg-slate-200"
    >
      <div
          v-for="items in CheckCurrMonth"
          v-bind:key="items"
          class=" grid grid-cols-7 grid-rows-1"
      >
        <div
            v-for="item in items"
            :key="item"
            @click="chooseDate"
            :class=classObject(item)
            class="flex flex-col justify-start"
        >

          <div
              class="w-full h-full text-[11px] font-medium text-center p-1 hover:cursor-pointer hover:bg-slate-400 transition-[background-color] ease-out">
            {{ item.numDay }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "SmallCalendar",
  data() {
    return {
      classObject: function (item) {
        return {
          "bg-blue-200": item.numDay == this.currDay && item.statusMonth == 'month' && item.month == this.currMonth ? true : false,
        }
      },
      months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
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
      days: [
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб',
        'Вс'
      ],
      date: '',
      choosenDate: '',
      currDay: new Date().getDate(),
      currMonth: new Date().getMonth(),
      month: '',
      year: '',
      firstDayOfMonth: '',
      lastDayOfMonth: '',
      lastDayOfLastMonth: '',
    }
  },

  created() {
    this.month = store.state.month;
    this.year = store.state.year;
    store.subscribe((mutation) => {
      if (mutation.type == 'nextMonth') {
        this.month = store.state.month;
        this.year = store.state.year;
      } else if (mutation.type == 'previousMonth') {
        this.month = store.state.month;
        this.year = store.state.year;
      }
    })

    this.updateCalendar();
  },

  computed: {
    CheckCurrMonth() {
      return this.updateCalendar();
    }
  },

  methods: {
    chooseDate(evt) {
      let data = JSON.parse(JSON.stringify(this.date));
      let choosenDate;
      for(let i = 0; i < data.length; i++) {
         for(let j = 0; j < 7; j++) {
           let tempDay = data[i][j];
           if(tempDay.numDay == evt.target.textContent) {
             choosenDate = {day: tempDay.numDay, month: tempDay.month, year: tempDay.year}
             this.choosenDate = choosenDate;
           }
         }
      }
      this.$emit('chooseDate', this.choosenDate);
    },

    closeSmallCalendar() {
      this.$emit('closeSmallCalendar');
    },

    nextMonth() {
      if (this.month === 11) {
        this.year += 1;
        this.month = 0;
      } else {
        this.month += 1;
      }
    },

    previousMonth() {
      if (this.month === 0) {
        this.month = 11;
        this.year -= 1;
      } else {
        this.month -= 1;
      }
    },

    updateCalendar() {
      let date = [];
      this.firstDayOfMonth = new Date(this.year, this.month).getDay();
      this.firstDayOfMonth == 0 ? this.firstDayOfMonth = 6 : this.firstDayOfMonth -= 1;

      this.lastDayOfMonth = new Date(this.year, this.month + 1, 0).getDay();
      this.lastDayOfMonth == 0 ? this.lastDayOfMonth = 6 : this.lastDayOfMonth -= 1;

      let dateCurrentMonth = new Date(this.year, this.month + 1).getDate() - 1;
      let dateStartNextMonth = new Date(this.year, this.month + 2).getDate() - 1;

      for (let i = 0; i < 5; i++) {
        let firstDayOfMonth = this.firstDayOfMonth - 1;
        let arr = [];
        for (let j = 0; j < 7; j++) {
          if (i == 0) {
            if (this.firstDayOfMonth <= j) {//Записывает начало текущего месяца
              dateCurrentMonth += 1;
              arr.push({numDay: dateCurrentMonth, statusMonth: "month", month: this.month, year: this.year});
            } else { //Записывает конец прошлого месяца
              let date = new Date(this.year, this.month, 0).getDate() - firstDayOfMonth;
              firstDayOfMonth -= 1;
              arr.push({numDay: date, statusMonth: "previousMonth", month: this.month, year: this.year});

            }
          } else if (i == 4) {
            if (j <= this.lastDayOfMonth) {//Записывает середину текущего месяца
              dateCurrentMonth += 1;
              arr.push({numDay: dateCurrentMonth, statusMonth: "month", month: this.month, year: this.year});
            } else {//Записывает начало следующего месяца
              dateStartNextMonth += 1;
              arr.push({numDay: dateStartNextMonth, statusMonth: "nextMonth", month: this.month, year: this.year});
            }
          } else {//Записывает конец текущего месяца
            dateCurrentMonth += 1;
            arr.push({numDay: dateCurrentMonth, statusMonth: "month", month: this.month, year: this.year});
          }

        }
        date.push(arr);
      }
      this.date = date;
      return date;
    }
  }
}
</script>

<style scoped>

</style>