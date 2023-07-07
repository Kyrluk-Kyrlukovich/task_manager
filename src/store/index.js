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
        selectCategory:'',
        creatorChannel: false,

        modalAcceptedAction: {
            isOpen: false,
            currAction: null
        } ,
        actions: {
            isDeleteTask: {
                isAccept: false,
                text: 'Вы уверены что хотите удалить задачу?',
                nameMutation: 'acceptOrNotDeleteTask'
            },

            isEditInfoUser: {
                isAccept: false,
                text: 'Вы уверены что хотите сохранить изменения?',
                nameMutation: 'acceptOrNotEditInfoUser'
            },

            isEditTask: {
                isAccept: false,
                text: 'Вы уверены что хотите сохранить изменения?',
                nameMutation: 'acceptOrNotEditTask'
            },

            isDeleteChannel: {
                isAccept: false,
                text: 'Вы уверены что хотите удалить канал?',
                nameMutation: 'acceptOrNotDeleteChannel'
            },

            isEditChannel: {
                isAccept: false,
                text: 'Вы уверены что хотите сохранить изменения?',
                nameMutation: 'acceptOrNotEditChannel'
            },

            isDeleteUserFromChannel: {
                isAccept: false,
                text: 'Вы уверены что хотите удалить пользователя из канала?',
                nameMutation: 'acceptOrNotDeleteUserFromChannel'
            },

            isEditUserFunction: {
                isAccept: false,
                text: 'Вы уверены что хотите сохранить изменения?',
                nameMutation: 'acceptOrNotEditUserFunction'
            },

            isLogout: {
                isAccept: false,
                text: 'Вы уверены что хотите выйти?',
                nameMutation: 'acceptOrNotLogout'
            },
        },

        errorAction: {
            isError: false,
            text:null,
        },

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
            const findedTasks = []
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

        changeStatusIsError(state, bool){
            state.errorAction.isError = bool
        },

        changeTextError(state, text) {
            state.errorAction.text = text;
        },

        acceptOrNotDeleteTask(state, bool) {
            state.actions.isDeleteTask.isAccept = bool
        },

        acceptOrNotEditInfoUser(state, bool) {
            state.actions.isEditInfoUser.isAccept = bool
        },

        acceptOrNotEditTask(state, bool) {
            state.actions.isEditTask.isAccept = bool
        },

        acceptOrNotDeleteChannel(state, bool) {
            state.actions.isDeleteChannel.isAccept = bool
        },

        acceptOrNotEditChannel(state, bool) {
            state.actions.isEditChannel.isAccept = bool
        }, 

        acceptOrNotDeleteUserFromChannel(state, bool) {
            state.actions.isDeleteUserFromChannel.isAccept = bool
        },

        acceptOrNotEditUserFunction(state, bool) {
            state.actions.isEditUserFunction.isAccept = bool
        },

        acceptOrNotLogout(state, bool) {
            state.actions.isLogout.isAccept = bool
        },

        

        openAcceptModal(state, obj) {
            state.modalAcceptedAction.isOpen = obj.bool
            state.modalAcceptedAction.currAction = obj.nameAction
        },
        
        closeAcceptModal(state) {
            state.modalAcceptedAction.isOpen = false
        },

        openProfileModal(state) {
            state.isProfileModal = true
        },

        closeProfileModal(state) {
            state.isProfileModal = false
        },

        changeChoosenDate(state, data) {
            state.chooseDate = {...data}
        },

        changeChoosenSettingsChannel(state, data) {
            state.choosenSettingsChannel = data;
        },

        changeChoosenUserForSetting(state, data) {
            state.choosenUserForSettings.id  = data
        },

        changeSelectCategory(state, newValue) {
            state.selectCategory = newValue
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
                } else {
                    response = await axios({
                        method: params.method,
                        url: urlFetch,
                        data: JSON.stringify(params.body),
                        headers: headers}); 
                }
                if (params.nameMutation) {
                    commit(params.nameMutation, response.data.data);
                }
                return response;
            } catch (e) {
                commit('changeStatusIsError', true)
                const error = JSON.parse(e.response.request.responseText).error
                if(error.message == 'Validation failed') {
                    const messgesResponse = error.errors
                    let fullMessageResponse = '';
                    for(let key in messgesResponse) {
                        fullMessageResponse += messgesResponse[key][0]
                        fullMessageResponse += ' '
                    }
                    console.log(error.errors);
                    commit('changeTextError', fullMessageResponse)
                } else {
                    commit('changeTextError', error.message)
                }
                
                setTimeout(() => commit('changeStatusIsError', false), 3000)
                return 'error'
            } finally {
                commit('isLoading', false);
            }
        },
    },
    modules: {}
})
