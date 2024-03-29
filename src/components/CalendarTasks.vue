<template>
  <div class="h-[100%] w-full flex flex-col gap-3">
    <DateFilter @nextMonth="nextMonth" @previousMonth="previousMonth"/>
    <div class="h-[90%]">
      <div
          class="grid grid-cols-7 bg-slate-600 h-[9%] px-2 text-slate-200 text-center rounded-t-[15px]"
      >
        <div v-for="(day, idx) in days"
             :key="idx"
             class="flex items-center justify-center">{{ day }}
        </div>
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
              @click="showDayWithTask(item)"
              class="flex text-[0.9em] px-2 py-1 flex-col justify-start border-r-[2px] last-of-type:border-r-[0px] border-slate-300"
              ref="day"
          >
            <div v-for="task in item.tasks.slice(0, 3)" :key="task.id"
                 class="h-[20%] w-full my-1 rounded-r-[7px] border-l-[3px] border-lime-600">
              <div class="absolute pl-1 pt-[0.1%]">{{ task['head_task'] }}</div>
              <div class="h-full rounded-r-[7px] opacity-25" :class="task.color['name_color']"></div>
            </div>
            <div v-if="item.tasks.length > 3" class="h-[10px] text-[16px]">...</div>
            <div class="h-[20%] w-full text-right mt-auto">{{ item.day }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DateFilter from "@/components/DateFilter";
import store from "@/store";
import {mapState, mapMutations, mapGetters} from 'vuex';

export default {
  name: "CalendarTasks",
  components: {DateFilter},


  data() {
    return {
      classObject: function (item) {
        return {
          "bg-blue-200": item.day == this.currDay && item.statusMonth == 'month' && item.month == this.currMonth ? true : false,
        }
      },
      date: [],
      time: [],

      showModal: false,

      currDay: new Date().getDate(),
      currMonth: new Date().getMonth(),

      category: '',
      month: '',
      year: '',
      firstDayOfMonth: '',
      lastDayOfMonth: '',
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
      } else if (mutation.type == 'previousMonth') {
        this.month = store.state.month;
        this.year = store.state.year;
      } else if (mutation.type == 'loadTasks') {
        this.clearTasks();
        this.fillNewTasks(this.updateDayWithTask(mutation.payload));
      } else if (mutation.type == 'changeSelectCategory') {
        this.category = mutation.payload;
      }
    })
    this.updateCalendar();
  },

  computed: {
    ...mapState({
      tasks: state => state.tasks,
      isLoadingTasks: state => state.isLoadingTasks,
      choosenDate: state => state.chooseDate,
      dayListTask: state => state.dayListTasks,
      selectCategory: state => state.selectCategory
    }),

    CheckCurrMonth() {
      let calendar = this.updateCalendar();
      this.daysTasks();
      if (this.$refs.day) {
        this.formatTaskHead(calendar, this.$refs.day[0]);
      }
      return calendar;
    },

    ...mapGetters({
      findTasks: 'findTasks'
    })
  },

  methods: {
    ...mapMutations({
      fillNewTasks: 'fillNewTasks',
      clearTasks: 'clearTasks',
      changeChoosenDate: 'changeChoosenDate'
    }),

    formatTaskHead(calendar) {
      return calendar.map(el =>
          el.map(day =>
              day.tasks.map(task => {
                if (task['head_task'].length >= 16) {
                  task['head_task'] = task['head_task'].substring(1, 16) + '...'
                }
              })
          )
      )
    },

    showDayWithTask(data) {
      console.log(data)
      this.changeChoosenDate({
        month: data.month,
        day: data.day,
        year: data.year
      })
      this.clearTasks();
      this.fillNewTasks(this.findTasks(data.tasks))
    },

    updateDayWithTask(arr) {
      const newArr = arr.filter(
          task =>
              task['date_start'].day == this.choosenDate.day
              && +task['date_start'].month == this.choosenDate.month + 1
              && task['date_start'].year == this.choosenDate.year)
      return newArr;
    },


    nextMonth() {
      store.commit('nextMonth');
    },

    previousMonth() {
      store.commit('previousMonth');
    },

    sortTaskByCategory(tasks) {
      if (this.category == '') {
        return tasks
      }
      return tasks.filter(el => el.status['name_status'] == this.category)
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
              arr.push({
                day: dateCurrentMonth,
                statusMonth: "month",
                month: this.month,
                year: this.year,
                tasks: []
              });
            } else { //Записывает конец прошлого месяца
              let date = new Date(this.year, this.month, 0).getDate() - firstDayOfMonth;
              firstDayOfMonth -= 1;
              arr.push({
                day: date,
                statusMonth: "previousMonth",
                month: this.month - 1,
                year: this.year,
                tasks: []
              });

            }
          } else if (i == 4) {
            if (j <= this.lastDayOfMonth) {//Записывает середину текущего месяца
              dateCurrentMonth += 1;
              arr.push({
                day: dateCurrentMonth,
                statusMonth: "month",
                month: this.month,
                year: this.year,
                tasks: []
              });
            } else {//Записывает начало следующего месяца
              dateStartNextMonth += 1;
              arr.push({
                day: dateStartNextMonth,
                statusMonth: "nextMonth",
                month: this.month + 1,
                year: this.year,
                tasks: []
              });
            }
          } else {//Записывает конец текущего месяца
            dateCurrentMonth += 1;
            arr.push({
              day: dateCurrentMonth,
              statusMonth: "month",
              month: this.month,
              year: this.year,
              tasks: []
            });
          }

        }
        date.push(arr);
      }
      this.date = date;
      return date;
    },

    daysTasks() {
      let tasks = JSON.parse(JSON.stringify(this.tasks));
      this.date.forEach(week => {
        week.forEach(day => {
          let dayTasks = tasks.filter(
              task => +task['date_start'].day == day.day && +task['date_start'].month == (day.month + 1) && +task['date_start'].year == day.year
          );
          day.tasks = this.sortTaskByCategory(dayTasks)
        })
      })
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

</style>