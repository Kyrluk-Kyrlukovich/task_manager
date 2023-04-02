<template>
  <div class="flex h-[91%]">
    <div
        class=" w-9/12 px-6 py-4 flex gap-y-10 flex-wrap"
    >
      <CalendarTasks/>
    </div>
    <div class="w-3/12 p-2 flex flex-wrap">
      <ChoosenDate/>
      <ListTasks/>
    </div>
  </div>
</template>

<script>
import CalendarTasks from "@/components/CalendarTasks";
import ChoosenDate from "@/components/ChoosenDate";
import ListTasks from "@/components/ListTasks";

export default {
  name: "MainBottom",
  components: { CalendarTasks, ChoosenDate, ListTasks},
}
</script>

<style>

</style>