<template>
  <nav class="w-2/12 flex flex-col bg-slate-200 gap-5">
    <div class="h-1/5 flex">
      <div class="w-full p-3 px-10">
        <img src="../assets/4031560.jpg" class="w-[75px] h-[75px] rounded-[50%]" alt="Логотип">
      </div>
    </div>
    <div class="h-4/5">
      <ChannelList/>
    </div>
  </nav>
</template>

<script>
import ChannelList from "@/components/ChannelList";

export default {
  name: "NavMenu",
  components: {ChannelList}
}
</script>

<style>

</style>