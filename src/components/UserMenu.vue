<template>
  <div class="flex items-center w-3/12 justify-self-end">
    <img
        class="mx-5"
        src="../assets/user.png"
        width="40px"
        height="40px"
    />
    <a
        class="flex items-center bg-slate-200 p-2 rounded-[5px] hover:bg-slate-100 transition-[background-color] ease-out cursor-pointer"
    >
      <div class="mx-2" href="#">KYRLUL KYRLUKOVICH</div>
      <div>
        <svg
            fill="none"
            height="8"
            viewBox="0 0 12 8"
            width="12"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              clip-rule="evenodd"
              d="M2.16 2.3a.75.75 0 0 1 1.05-.14L6 4.3l2.8-2.15a.75.75 0 1 1 .9 1.19l-3.24 2.5c-.27.2-.65.2-.92 0L2.3 3.35a.75.75 0 0 1-.13-1.05z"
              fill="currentColor"
              fill-rule="evenodd"
          ></path>
        </svg>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "UserMenu"
}
</script>

<style scoped>

</style>