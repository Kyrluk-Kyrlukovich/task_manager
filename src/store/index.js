import { createStore } from 'vuex'

export default createStore({
  state: {
    date: new Date(),
    currDay: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  },
  getters: {
  },
  mutations: {
    currDay(state) {
      state.currDay = state.date.getDate();
    },
    month(state) {
      state.month = state.date.getMonth();
    },
    year(state) {
      state.year = state.date.getFullYear();
    },
    nextMonth(state) {
      if(state.month === 11) {
        state.year += 1;
        state.month = 0;
      } else {
        state.month += 1;
      }
    },
    previousMonth(state) {
      if (state.month === 0) {
        state.month = 11;
        state.year -= 1;
      } else {
        state.month -= 1;
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
