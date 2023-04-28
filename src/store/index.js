import { createStore } from 'vuex'

export default createStore({
  state: {
    date: new Date(),
    currDay: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    tasks: [],
    colorsTasks: [],
    isLoadingTasks:true
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
    },

    loadTasks(state, data) {
      state.tasks = [];
      data.forEach( el => {
        state.tasks.push(el)
      })
    },

    loadColorsTask(state, data) {
      state.colorsTasks = [];
      data.forEach( el => {
        state.colorsTasks.push(el)
      })
    },

    isLoadingTasks(state, boolean) {
      state.isLoadingTasks = boolean
    }
  },
  actions: {
    async fetchData({commit}, params) {
      let urlFetch = `http://taskmanager/api/${params.url}`
      try {
        commit('isLoadingTasks', true);
        let response;
        if(params.method == 'get') {
          response = await fetch(urlFetch, {
            method: params.method,
          });
        } else {
          response = await fetch(urlFetch, {
            method: params.method,
            body: params.body
          });
        }

        let data = await response.json();
        commit(params.nameMutation, data.data);
      } catch (e) {
        alert(e);
      } finally {
        commit('isLoadingTasks', false);
      }
    },

    async fetchChannel({commit}) {
      try {
        commit('isLoadingTasks', true);
        let response = await fetch('http://taskmanager/api/tasks', {
          method:'GET',
        });
        let data = await response.json();
        commit('loadTasks', data.data);
      } catch (e) {
        alert(e);
      } finally {
        commit('isLoadingTasks', false);
      }

    },
  },
  modules: {
  }
})
