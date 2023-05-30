<template>
  <router-link v-for="channel in channels" :key="channel['id_channel']"
               :to="{name:'channel', params:{id:channel['id_channel']}}">
    <li
        class=" flex items-center gap-5 p-5 hover:bg-slate-300 transition-[background-color] ease-out"
    >
      <div class="w-[45px] h-[45px]">
        <img src="../assets/user.png" width="45" height="45"/>
      </div>
      <div>{{ channel['name_channel'] }}</div>
      <router-link :to="{name:'channelSettings', params:{id:channel['id_channel']}}" @click.stop class="ml-auto">
        <div @click="changeChoosenSettingsChannel(channel['name_channel'])" ><img src="../assets/gear.png" height="22" width="22" alt=""></div>
      </router-link>
    </li>
  </router-link>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "ChannelElem",

  computed: {
    ...mapState({
      channels: state => state.channels
    })
  },

  methods: {
    ...mapMutations({
      changeChoosenSettingsChannel: 'changeChoosenSettingsChannel'
    })
  }
}
</script>

<style scoped>

</style>