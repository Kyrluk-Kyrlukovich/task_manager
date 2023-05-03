import {createStore} from 'vuex'

export default createStore({
    state: {
        isAuth: false,
        token: '',
        date: new Date(),
        currDay: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        tasks: [],
        time: [],
        channels: [],
        colorsTasks: [],
        statusesTasks: [],
        defaultColor: 'black',
        chooseDate: null,
        isLoadingTasks: true,
        isProfileModal: false,
    },

    getters: {
        formatDate: () => date => {
            let incrementMonth = date.month + 1;
            let day = `${date.day}`.length == 1 ? '0' + date.day : date.day;
            let month = `${incrementMonth}`.length == 1 ? '0' + incrementMonth : incrementMonth;
            return `${day}.${month}.${date.year}`;
          }, 

          formatTime: () => time => {
            let hour = `${time.hour}`.length == 1 ? '0' + time.hour : time.hour;
            return `${hour}:${time.minute}`
          },
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
            if (state.month === 11) {
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

        openProfileModal(state) {
            state.isProfileModal = true
        },

        closeProfileModal(state) {
            state.isProfileModal = false
        },

        loadTasks(state, data) {
            state.tasks = [];
            data.forEach(el => {
                state.tasks.push(el)
            })
        },

        loadStatusesTasks(state, data) {
            state.statusesTasks = [];
            data.forEach(el => {
                state.statusesTasks.push(el)
            })
        },

        loadColorsTask(state, data) {
            state.colorsTasks = [];
            data.forEach(el => {
                state.colorsTasks.push(el)
            })
        },

        isLoading(state, boolean) {
            state.isLoading = boolean
        },

        login(state, data) {
            state.token = data.token;
            state.isAuth = true;
        },

        logout(state) {
            state.token = '';
            state.isAuth = false;
        },

        loadChannels(state, data) {
            state.channels = [];
            data.forEach( channel => {
                state.channels.push(channel)
            })
        },
        
        changeChoosenDate(state, data) {
            state.chooseDate = data
        },
        
        fillTime(state) {
            state.time = [];
            for (let i = 1; i <= 23; i++) {
                let hour = i;
                for(let j = 1; j <= 2; j++) {
                  let minute = j == 1 ? '00' : '30';
                  state.time.push({hour:hour, minute:minute, task:''})
                }
              }
        },

        fillNewTasks(state, date) {
            let currDayTask =  state.tasks.filter(el => 
            +el['date_start'].day == date.date.day 
            && +el['date_start'].month == (date.date.month + 1)
            && +el['date_start'].year == date.date.year);    
            currDayTask.forEach(task => {
              state.time.forEach(el => {
                if(+task['date_start'].hour == el.hour && +task['date_start'].minutes == el.minute) {
                  el.task = task;
                  console.log('ElemTask', el.task);
                }
              })
            })
          },

          clearTasks(state) {
            state.time.forEach(el => el.task = '')
          }

    },
    actions: {
        async fetchData({commit}, params) {
            let urlFetch = `http://taskmanager/api/${params.url}`
            let headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${params.token}`
            }
            try {
                commit('isLoading', true);
                let response;
                if (params.method == 'get') {
                    response = await fetch(urlFetch, {
                        method: params.method,
                        headers: headers,
                    });
                } else {
                    response = await fetch(urlFetch, {
                        method: params.method,
                        headers: headers,
                        body: JSON.stringify(params.body)
                    });
                }

                let data = await response.json();
                if (params.nameMutation) {
                    commit(params.nameMutation, data.data);
                }
                return data;
            } catch (e) {
                alert(e);
                return 'error'
            } finally {
                commit('isLoading', false);
            }
        },
    },
    modules: {}
})
