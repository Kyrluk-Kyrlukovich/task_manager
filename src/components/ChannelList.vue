<template>
    <div class="px-2 grid gap-[10px]">
      <button
        @click="openModalCreateChannel" 
        class="w-[100%] h-[100%] rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">
        Создать Канал
      </button>
        <transition>
          <div v-show="isCreateChannel" @click="op"  ref="modalCreateChannel" :class="{'openningModale':isCreateChannel}" class="openningModal absolute shadow-[1px_3px_27px_8px_rgba(34,60,80,0.2)] overflow-hidden rounded-[10px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            <ModalCreateChannel class="h-full" />
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
    op() {
      this.$refs.modalCreateChannel.style.maxHeight = '200px'
    },

    openModalCreateChannel() {
      this.$refs.modalCreateChannel.style.display = 'block'
      this.$refs.modalCreateChannel.style.maxHeight = '20px';
    },

    enter() {

    }
  }

}
</script>

<style>
  .openningModal {
    max-height: 0;
    transition: max-height 2s ease-in-out 2s;
    -moz-transition: max-height 2s ease-in-out 2s;
    -webkit-transition: max-height 2s ease-in-out 2s;
    -o-transition: max-height 2s ease-in-out 2s;
  }


</style>