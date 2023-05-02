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
        channels: [],
        colorsTasks: [],
        statusesTasks: [],
        defaultColor: 'black',
        isLoadingTasks: true,
        isProfileModal: false,
    },
    getters: {},
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
