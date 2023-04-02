<template>
  <nav class="w-2/12 flex flex-col bg-slate-200 gap-5">
    <div class="h-1/5 flex">logo</div>
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