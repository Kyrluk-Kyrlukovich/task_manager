<template>
  <div class="w-full h-full grid grid-cols-1 grid-rows-[1fr_3fr] justify-items-center p-10 gap-[10%]">
    <router-link to="/" class="fixed left-0 top-0 m-[40px] w-[10%] rounded-[5px]">
      <button
          class="w-[100%] h-fit rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
        На главную
      </button>
    </router-link>
    <div class="p-5 shadow-[1px_3px_27px_8px_rgba(34,60,80,0.2)] grid grid-cols-1 gap-3 rounded-[10px]">
      <div><img src="../assets/user.png" alt="Канал"></div>
      <div><input type="text" v-model="channelName" :disabled="!isEdit" class="rounded-[5px] p-1"></div>
      <div v-if="!isEdit && creator">
        <button
            @click="onEdit"
            class="w-[100%] h-full rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
          Изменить
        </button>
      </div>
      <div v-if="isEdit">
        <button
            @click="cancellChanges"
            class="w-[100%] h-full rounded-[5px] bg-red-600 hover:cursor-pointer hover:bg-red-800 transition-[background-color] ease-out duration-[0.25s] py-1">
          Отменить
        </button>
      </div>
      <div v-if="isEdit">
        <button
            @click="openAcceptModal({bool:true, nameAction:'isEditChannel'})"
            class="w-[100%] h-full rounded-[5px] bg-emerald-400 hover:cursor-pointer hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
          Сохранить
        </button>
      </div>
      <div v-if="!isEdit && creator">
        <button
            @click="openAcceptModal({bool:true, nameAction:'isDeleteChannel'})"
            class="w-[100%] h-full rounded-[5px] bg-red-600 hover:cursor-pointer hover:bg-red-800 transition-[background-color] ease-out duration-[0.25s] py-1">
          Удалить канал
        </button>
      </div>
      <div v-if="!isEdit && !creator">
        <button
            @click="leaveFromChannel"
            class="w-[100%] h-full rounded-[5px] bg-red-600 hover:cursor-pointer hover:bg-red-800 transition-[background-color] ease-out duration-[0.25s] py-1">
          Покинуть канал
        </button>
      </div>
    </div>
    <div class="w-[25%]">
      <h1 class="text-center text-[18px] font-medium mb-[3%]">Список участников</h1>
      <div class="relative overflow-hidden h-[90%] w-full shadow-[1px_3px_27px_8px_rgba(34,60,80,0.2)] rounded-[10px]">
        <ul class="absolute max-h-[100%] min-h-[100%] w-full overflow-y-scroll">
          <li v-for="user in usersChannel" :key="user['id_user']"
              class="grid grid-cols-[1fr_3fr_1fr] grid-rows-2 p-5 gap-5 justify-items-center items-center hover:bg-slate-400 hover:cursor-pointer transition-[background-color] duration-[0.25s] ease-out">
            <div class="row-start-1 row-end-3"><img src="../assets/user.png" alt="Пользователь"></div>
            <div :class="{'col-start-2':!creator, 'col-end-4':!creator}" class="row-start-1  self-end">
              {{ user['first_name'] }} {{ user['last_name'] }}
            </div>
            <div v-if="creator" class="row-start-1 row-end-3 self-center"><img v-if="creator"
                                                                               @click="openSmallFunctions(user['id_user'], $event)"
                                                                               src="../assets/gear.png" width="32"
                                                                               height="32"
                                                                               alt="Настройки участника"></div>
            <div :class="{'col-start-2':!creator, 'col-end-4':!creator}" class="self-start text-center">
              {{ user['name_role'] }}
            </div>
          </li>
          <li @click="openModalAddUserOnChannel"
              class="grid grid-cols-1 justify-items-center p-1 border border-dashed rounded-[5px] border-slate-600 hover:bg-slate-400 hover:cursor-pointer transition-[background-color] duration-[0.25s] ease-out">
            <img src="../assets/add-user.png" alt="Добавить пользователя" width="32" height="32">
          </li>
        </ul>
      </div>
    </div>
    <transition name="modalAddUser">
      <div v-if="isModalAddUserOnChannel" class="h-[410px] w-[500px] overflow-hidden bg-slate-300 absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] shadow-[1px_3px_27px_8px_rgba(34,60,80,0.2)] rounded-[10px]">
        <ModalAddUserOnChannel  @closeModalAddUserOnChannel="closeModalAddUserOnChannel"/>
      </div>
    </transition>
  </div>
    <transition name="modal">
      <div v-show="isAddFunctions" ref="modal" class="absolute h-[250px] w-[250px] right-0 top-0">
          <SmallFunctions  @closeSmallFunctions="closeSmallFunctions"
            class=" h-full w-full absolute bg-slate-300 shadow-[1px_3px_27px_8px_rgba(34,60,80,0.2)] rounded-[10px]"/>
      </div>
  </transition>
  <div v-show="modalAcceptedAction.isOpen" class="h-full w-full z-10 absolute" @click="closeAcceptModal">
    <transition name="modalAccept">
      <div v-if="modalAcceptedAction.isOpen" @click.stop class="absolute p-5 z-20 h-[150px] w-[300px] opacity-100 overflow-hidden left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[10px] shadow-[1px_3px_27px_8px_rgba(34,60,80,0.2)] bg-slate-200">
        <ModalAcceptedAction :action="actions[modalAcceptedAction.currAction]">{{actions[modalAcceptedAction.currAction].text}}</ModalAcceptedAction>
      </div>
    </transition>
  </div>
</template>

<script>

import {mapActions, mapMutations, mapState} from "vuex";
import ModalAddUserOnChannel from "@/components/ModalAddUserOnChannel";
import SmallFunctions from "@/components/SmallFunctions";
import store from '@/store';

export default {
  name: "ChannelSettings",
  components: {ModalAddUserOnChannel, SmallFunctions},


  data() {
    return {
      channelName: '',

      isEdit: false,
      isAddFunctions: false,
      isModalAddUserOnChannel: false,
      posYsmallFunction: 0,
      posXsmallFunction: 0,

      choosenUser: null
    }
  },

  beforeRouteEnter(to, from, next) {
    const path = to.path.slice(1, to.path.length);
    if (to.name == 'channelSettings') {
      next((vm) => {
        if (vm.isAuth) {
          vm.fetchData({
            url: path,
            method: 'get',
            body: null,
            token: vm.token,
            nameMutation: 'loadUsersChannel'
          })
          vm.fetchData({
            url: 'channel/' + vm.$route.params.id + '/creator',
            method: 'get',
            body: null,
            token: vm.token,
            nameMutation: 'loadCreator'
          })
        }
      });
    } else {
      next();
    }
  },

  created() {
    this.channelName = this.choosenSettingsChannel;

    store.subscribe((mutation) => {
    if(mutation.type == 'acceptOrNotDeleteChannel') {
        if(this.actions.isDeleteChannel.isAccept) {
          this.deleteChannel();
        }
      } else if(mutation.type == 'acceptOrNotEditChannel') {
        if(this.actions.isEditChannel.isAccept) {
          this.saveChanges();
        }
      }
    })
  },

  computed: {
    ...mapState({
      choosenSettingsChannel: state => state.choosenSettingsChannel,
      isAuth: state => state.isAuth,
      token: state => state.token,
      usersChannel: state => state.usersChannel,
      creator: state => state.creatorChannel,
      modalAcceptedAction: state => state.modalAcceptedAction,
      actions: state => state.actions
    }),
  },

  methods: {
    ...mapMutations({
      changeChoosenSettingsChannel: 'changeChoosenSettingsChannel',
      changeChoosenUserForSetting: 'changeChoosenUserForSetting',
      openOrCloseAcceptModal: 'openOrCloseAcceptModal',
      openAcceptModal: 'openAcceptModal'
    }),

    async deleteChannel() {
      const path = (this.$route.fullPath + '/deletechannel').slice(1);
      this.fetchData({
        url: path,
        method: 'get',
        body: null,
        token: this.token,
        nameMutation: null
      });

      this.$router.push('/')
    },

    ...mapActions({
      fetchData: 'fetchData'
    }),

    leaveFromChannel() {
      const deleteUserFromChannelPath = (this.$route.fullPath + '/leave').slice(1)
      this.fetchData({
        url: deleteUserFromChannelPath,
        method: 'get',
        body: null,
        token: this.token,
        nameMutation: null
      })
      this.$router.push('/');
    },


    closeSmallFunctions() {
      this.isAddFunctions = false
    },

    async openSmallFunctions(id, event) {
      this.closeModalAddUserOnChannel();
      if(this.isAddFunctions) {
        if(this.choosenUser == id) {
          this.closeSmallFunctions();
        } else {
          await this.closeSmallFunctions();
          this.openSmallFunctions(id, event);
        }
        
      } else {
        this.locationSmallFunction(event.clientX, event.clientY, id)
        this.changeChoosenUserForSetting(id)
        this.fetchData({
          url: `userfunctions/${this.$route.params.id}`,
          method: 'post',
          body: {id_user: id},
          token: this.token,
          nameMutation: 'loadUserFunctions'
        })
        this.isAddFunctions = true
        this.choosenUser = id
      }
      
    },

    locationSmallFunction(x, y) {
      const elem = this.$refs.modal.style;
      elem.left = x + 'px';
      if (window.outerHeight < y + 250) {
        elem.top = y - 50 + 'px'
      } else {
        elem.top = y + 'px'
      }
    },

    openModalAddUserOnChannel() {
      this.closeSmallFunctions();
      this.cancellChanges();
      this.isModalAddUserOnChannel = true
    },

    closeModalAddUserOnChannel() {
      this.isModalAddUserOnChannel = false
    },

    onEdit() {
      this.isEdit = true;
    },

    offEdit() {
      this.isEdit = false;
    },

    cancellChanges() {
      this.channelName = this.choosenSettingsChannel
      this.offEdit();
    },

    saveChanges() {
      this.changeChoosenSettingsChannel(this.channelName)
      let path = this.$route.fullPath.substring(1)
      console.log(this.channelName);
      this.fetchData({url: path, method: 'post', body: {'name_channel': this.channelName}, token: this.token})
      this.offEdit();
    }
  }
}
</script>

<style scoped>
  .modal-enter-active {
  animation: open 0.7s ease-in-out;
}
.modal-leave-active {
  animation: open 0.7s reverse ease-in-out;
}

.modalAddUser-enter-active {
  animation: openModalAddUser 0.7s ease-in-out;
}
.modalAddUser-leave-active {
  animation: openModalAddUser 0.7s reverse ease-in-out;
}

  @keyframes openModalAddUser {
    0% {
      max-height: 0;
    }
    100% {
      max-height: 500px;
    }
  }

    @keyframes open {
    0% {
      max-height: 0;
    }
    100% {
      max-height: 250px;
    }
  }
</style>