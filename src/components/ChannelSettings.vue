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
      <div v-if="!isEdit">
        <button
            @click="onEdit"
            class="w-[100%] h-full rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
          Изменить
        </button>
      </div>
      <div v-if="isEdit">
        <button
            @click="cancellChanges"
            class="w-[100%] h-full rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
          Отменить
        </button>
      </div>
      <div v-if="isEdit">
        <button
            @click="saveChanges"
            class="w-[100%] h-full rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
          Сохранить
        </button>
      </div>
      <div v-if="!isEdit">
        <button
            class="w-[100%] h-full rounded-[5px] bg-red-600 hover:bg-red-800 transition-[background-color] ease-out duration-[0.25s] py-1">
          Удалить канал
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
            <div class="row-start-1 self-end">{{ user['first_name'] }} {{ user['last_name'] }}</div>
            <div class="row-start-1 row-end-3 self-center"><img @click="openSmallFunctions(user['id_user'], $event)"
                                                                src="../assets/gear.png" width="32" height="32"
                                                                alt="Настройки участника"></div>
            <div class="self-start">{{ user['name_role'] }}</div>
          </li>
          <li @click="openModalAddUserOnChannel"
              class="grid grid-cols-1 justify-items-center p-1 border border-dashed rounded-[5px] border-slate-600 hover:bg-slate-400 hover:cursor-pointer transition-[background-color] duration-[0.25s] ease-out">
            <img src="../assets/add-user.png" alt="Добавить пользователя" width="32" height="32">
          </li>
        </ul>
      </div>
    </div>
    <ModalAddUserOnChannel v-if="isModalAddUserOnChannel" @closeModalAddUserOnChannel="closeModalAddUserOnChannel"
                           class=" h-[500px] w-[500px] bg-slate-300 absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] shadow-[1px_3px_27px_8px_rgba(34,60,80,0.2)] rounded-[10px]"/>
    <div class="absolute h-[250px] w-[250px]" ref="smallFunctions">
      <SmallFunctions v-if="isAddFunctions" @closeSmallFunctions="closeSmallFunctions"
                      class=" h-full w-full absolute bg-slate-300 shadow-[1px_3px_27px_8px_rgba(34,60,80,0.2)] rounded-[10px]"/>
    </div>
  </div>
</template>

<script>

import {mapActions, mapMutations, mapState} from "vuex";
import ModalAddUserOnChannel from "@/components/ModalAddUserOnChannel";
import SmallFunctions from "@/components/SmallFunctions";

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
    }
  },

  beforeRouteEnter(to, from, next) {
    let path = to.path.slice(1, to.path.length);
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
        }
      });
    } else {
      next();
    }
  },

  created() {
    this.channelName = this.choosenSettingsChannel;
  },

  computed: {
    ...mapState({
      choosenSettingsChannel: state => state.choosenSettingsChannel,
      isAuth: state => state.isAuth,
      token: state => state.token,
      usersChannel: state => state.usersChannel,
    }),
  },

  methods: {
    ...mapMutations({
      changeChoosenSettingsChannel: 'changeChoosenSettingsChannel',
      changeChoosenUserForSetting: 'changeChoosenUserForSetting'
    }),

    ...mapActions({
      fetchData: 'fetchData'
    }),

    closeSmallFunctions() {
      this.isAddFunctions = false
    },

    openSmallFunctions(id, event) {
      this.locationSmallFunction(event.clientX, event.clientY)
      this.changeChoosenUserForSetting(id)

      this.isAddFunctions = true
    },

    locationSmallFunction(x, y) {
      this.$refs.smallFunctions.style.left = x + 'px'
      if (window.outerHeight < y + 250) {
        this.$refs.smallFunctions.style.height = 250 - (y + 250 - window.innerHeight) + 'px'
        this.$refs.smallFunctions.style.top = y - 50 + 'px'
      } else {
        this.$refs.smallFunctions.style.top = y + 'px'
        this.$refs.smallFunctions.style.height = 200 + 'px'
      }
    },

    openModalAddUserOnChannel() {
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
      this.fetchData({url: path, method: 'post', body: {'name_channel': this.channelName}, token: this.token})
      this.offEdit();
    }
  }
}
</script>

<style scoped>

</style>