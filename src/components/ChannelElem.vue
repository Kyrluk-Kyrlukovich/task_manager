<template>
  <router-link  v-for="channel in channels" :key="channel['id_channel']" :to="{name:'channel', params:{id:channel['id_channel']}}">
    <li
        class=" flex items-center gap-5 p-5 hover:bg-slate-300 transition-[background-color] ease-out"
    >
      <div class="w-[45px] h-[45px]">
        <img src="../assets/user.png" width="45" height="45"/>
      </div>
      <div>{{ channel['name_channel'] }}</div>
    </li>
  </router-link>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ChannelElem",

  computed: {
    ...mapState({
      channels: state => state.channels
    })
  }
}
</script>

<style scoped>

</style>