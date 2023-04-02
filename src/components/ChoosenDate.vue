<template>
  <div class="h-[10%] w-full p-5 flex text-xl font-semibold">
    <div class="w-6/12">5 Марта, 2023</div>
    <div class="flex gap-2">
      <button
          class="rounded-full w-[30px] h-[30px] bg-slate-500 hover:bg-slate-400 transition-[background-color] ease-out"
      >
        <svg
            width="25"
            height="25"
            viewBox="0 0 25 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M19.3745 5.40991L10.521 14.3224C10.1317 14.7142 10.1338 15.3474 10.5256 15.7366L19.4381 24.5901"
              stroke="rgb(203 213 225)"
              stroke-width="2"
          />
        </svg>
      </button>
      <button
          class="rounded-full w-[30px] h-[30px] bg-slate-500 hover:bg-slate-400 transition-[background-color] ease-out"
      >
        <svg
            width="25"
            height="25"
            viewBox="0 0 25 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M13.0328 6.10059L22.1947 15.3234C22.5839 15.7152 22.5818 16.3484 22.19 16.7376L12.9671 25.8995"
              stroke="rgb(203 213 225)"
              stroke-width="2"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChoosenDate"
}
</script>

<style scoped>

</style>