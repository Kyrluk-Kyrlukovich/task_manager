<template>
  <div class="bg-slate-200 grid justify-center gap-[25px] w-[350px] p-4 rounded-[5px]">
    <div class="text-center-web"><img src="../assets/user.png" alt=""></div>
    <input type="text" class="h-[30px] p-1 rounded" v-model="nameChannel" placeholder="Название канала">
    <div class="grid grid-cols-1 gap-[10px]">
      <button
          @click="createChannel"
          class="w-[100%] h-[100%] rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
        Создать Канал
      </button>
      <button @click="closeModalCreateChannel"
              class="w-[100%] h-fit rounded-[5px] bg-red-600 hover:bg-red-800 transition-[background-color] ease-out duration-[0.25s] py-1">
        Отменить и Закрыть
      </button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: "ModalCreateChannel",

  data() {
    return {
      nameChannel: ''
    }
  },

  computed: {
    ...mapState({
      token: state => state.token
    })
  },

  methods: {
    ...mapActions({
      fetchData: 'fetchData'
    }),

    closeModalCreateChannel() {
      this.$emit('closeModalCreateChannel')
    },

    async createChannel() {
      await this.fetchData({
        url: 'channels/create-channel',
        method: 'post',
        body: {
          name_channel: this.nameChannel
        },
        token: this.token,
        nameMutation: null
      })

      this.tryGetChannels();

      this.closeModalCreateChannel();
    },

    async tryGetChannels() {
      await this.fetchData({
        url: 'channels',
        method: 'get',
        body: {},
        token: this.token,
        nameMutation: 'loadChannels'
      });
    }
  }
}
</script>

<style>
.text-center-web {
  text-align: -webkit-center;
  text-align: -moz-center;
  text-align: -o-center;
}
</style>