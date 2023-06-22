import {createStore} from 'vuex'
import axios from 'axios';

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
        dayListTasks: [],
        channels: [],
        colorsTasks: [],
        statusesTasks: [],
        defaultColor: 'black',
        usersChannel:[],
        users: [],
        user:[],
        usersFunctions:[],

        chooseDate: null,
        choosenTask: null,
        choosenSettingsChannel: null,
        choosenUserForSettings: {
            id: '',
            functions: []
        },
        creatorChannel: false,

        isLoadingTasks: true,
        isProfileModal: false,
    },

    getters: {
        formatDate: () => (isIncremented, date) => {
            let corretedMonth = isIncremented ? date.month : +date.month + 1

            let day = `${date.day}`.length == 1 ? '0' + date.day : date.day;
            let month = `${corretedMonth}`.length == 1 ? '0' + corretedMonth : corretedMonth;
            return `${day}.${month}.${date.year}`;
        },

        formatTime: () => time => {
            let hour = `${time.hour}`.length == 1 ? '0' + time.hour : time.hour;
            return `${hour}:${time.minutes}`
        },

        findTasks: (state) => data => {
            let findedTasks = []
            state.tasks.forEach(task => {
                data.forEach(calendarTask => {
                    if(task['id_task'] == calendarTask['id_task']) {
                        findedTasks.push(task)
                    }
                })
            })
            return findedTasks
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

        changeChoosenDate(state, data) {
            state.chooseDate = data
        },

        changeChoosenSettingsChannel(state, data) {
            state.choosenSettingsChannel = data;
        },

        changeChoosenUserForSetting(state, data) {
            state.choosenUserForSettings.id  = data
        },

        fillTime(state) {
            state.time = [];
            for (let i = 1; i <= 23; i++) {
                let hour = i;
                for (let j = 1; j <= 2; j++) {
                    let minute = j == 1 ? '00' : '30';
                    state.time.push({hour: hour, minute: minute, task: ''})
                }
            }
        },

        fillNewTasks(state, data) {
            data.forEach(task => state.dayListTasks.push(task))
        },

        clearTasks(state) {
            state.dayListTasks = []
        },

        isLoading(state, boolean) {
            state.isLoading = boolean
        },

        changeChoosenTask(state, task) {
            state.choosenTask = task
        },

        login(state, data) {
            state.token = data.token;
            state.isAuth = true;
        },

        logout(state) {
            state.token = '';
            state.isAuth = false;
        },

        loadUsers(state, data) {
            state.users = [];
            data.forEach(el => {
                state.users.push(el)
            })
        },

        loadInfoUser(state, data) {
            state.user = JSON.parse(JSON.stringify(data));
        },

        loadCreator(state, data) {
            state.creatorChannel = data.creator
        },

        loadUsersFunctions(state, data) {
            state.usersFunctions = [];
            data.forEach(el => {
                state.usersFunctions.push(el)
            })
        },

        loadUserFunctions(state, data) {
            state.choosenUserForSettings.functions = [];
            data.forEach(el => {
                state.choosenUserForSettings.functions.push(el)
            })
        },

        loadTasks(state, data) {
            state.tasks = [];
            data.forEach(el => {
                state.tasks.push(el)
            })
        },

        loadUsersChannel(state, data) {
            console.log(data.data);
            state.usersChannel = [];
            data.users.forEach(el => {
                state.usersChannel.push(el)
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

        loadChannels(state, data) {
            state.channels = [];
            data.forEach(channel => {
                state.channels.push(channel)
            })
        },

    },
    actions: {
        async fetchData({commit}, params) {
            let urlFetch = `http://taskmanager/api/${params.url}`
            let headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${params.token}`
            }
            try {
                commit('isLoading', true);
                let response;
                if (params.method == 'get') {
                    response = await  axios({
                        method: params.method,
                        url: urlFetch,
                        data: JSON.stringify(params.body),
                        headers: headers});
                    //  fetch(urlFetch, {
                    //     method: params.method,
                    //     headers: headers,
                    // });
                } else {
                    response = await axios({
                        method: params.method,
                        url: urlFetch,
                        data: JSON.stringify(params.body),
                        headers: headers}); 
                    // fetch(urlFetch, {
                    //     method: params.method,
                    //     headers: headers,
                    //     body: JSON.stringify(params.body)
                    // });
                }
                if (params.nameMutation) {
                    commit(params.nameMutation, response.data.data);
                }
                return response;
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
