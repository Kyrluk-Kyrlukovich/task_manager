<template>
    <div class="px-2 grid gap-[10px]">
      <button
        @click="openModalCreateChannel" 
        class="w-[100%] h-[100%] rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
        Создать Канал
      </button>
        <transition name="modal">
          <div v-show="isCreateChannel"  ref="modalCreateChannel"  class="z-10 absolute shadow-[1px_3px_27px_8px_rgba(34,60,80,0.2)] overflow-hidden rounded-[10px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            <ModalCreateChannel @closeModalCreateChannel="closeModalCreateChannel" class="h-full" />
          </div>
        </transition>
      <ul>
        <ChannelElem v-for="channel in channels" :key="channel['id_channel']" :channel="channel"/>
      </ul>
    </div>
</template>

<script>
import ChannelElem from "@/components/ChannelElem";
import ModalCreateChannel from "@/components/ModalCreateChannel"
import { mapState } from 'vuex';

export default {
  name: "ChannelList",
  components: {ChannelElem, ModalCreateChannel},

  data() {
    return {
      isCreateChannel: false
    }
  },

  computed: {
    ...mapState({
      channels: state => state.channels
    })
  },

  methods: {
    openModalCreateChannel() {
        this.isCreateChannel=true;
    },

    closeModalCreateChannel() {
      this.isCreateChannel = false
    }
  }

}
</script>

<style>
  .modal-enter-active {
  animation: open 0.7s ease-in-out;
}
.modal-leave-active {
  animation: open 0.7s reverse ease-in-out;
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