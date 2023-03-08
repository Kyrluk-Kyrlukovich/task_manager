<template>
  <div class="h-full w-full flex bg-slate-300 font-mont">
    <nav class="w-2/12 flex flex-col bg-slate-200 gap-5">
      <div class="h-1/5 flex">logo</div>
      <div class="h-4/5">
        <ul class="">
          <li
            class="flex items-center gap-5 p-5 hover:bg-slate-300 transition-[background-color] ease-out"
          >
            <div>
              <img src="./assets/user.png" width="45" height="45" />
            </div>
            <div>KYRLUK</div>
          </li>
          <li
            class="flex items-center gap-5 p-5 hover:bg-slate-300 transition-[background-color] ease-out"
          >
            <div>
              <img src="./assets/user.png" width="45" height="45" />
            </div>
            <div>KYRLUK</div>
          </li>
          <li
            class="flex items-center gap-5 hover:bg-slate-300 p-5 transition-[background-color] ease-out"
          >
            <div>
              <img src="./assets/user.png" width="45" height="45" />
            </div>
            <div>KYRLUK</div>
          </li>
        </ul>
      </div>
    </nav>
    <main class="w-10/12 h-full">
      <div class="h-[9%] flex justify-between items-center bg-slate-200 px-6">
        <div class="w-9/12">
          <div
            class="rounded-[5px] border-[1px] border-slate-400 bg-slate-50 w-5/12"
          >
            <input
              class="p-1 rounded-[5px] border-slate-400 bg-slate-50 w-11/12 focus:outline-none"
              type="text"
              placeholder="Поиск"
            />
            <button class="ml-2">
              <img src="./assets/search.png" width="18" height="18" />
            </button>
          </div>
        </div>
        <div class="flex items-center w-3/12 justify-self-end">
          <img
            class="mx-5"
            src="./assets/user.png"
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
      </div>
      <div class="flex h-[91%]">
        <div
          class=" w-9/12 px-6 py-4 flex gap-y-10 flex-wrap"
        >
          <div class="flex justify-between h-[10%] w-full">
            <div class="flex flex-wrap w-5/12">
              <h2 class="text-lg font-medium opacity-50 w-full">Сегодня</h2>
              <h1 class="text-2xl font-semibold w-6/12">2 Февраля, 2023</h1>
              <div class="w-6/12 flex gap-2">
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
            <div class="w-7/12 flex justify-end self-end">
              <select
                name="categories"
                class="p-3 rounded-[5px] h-[65%] w-8/12"
              >
                <option value="">Срочные</option>
                <option value="">Невыполненые</option>
                <option value="">Просроченые</option>
                <option value="">Выполненые</option>
                <option value="">В процессе</option>
              </select>
            </div>
          </div>
          <div class="h-[80%] w-full">
            <div
              class="grid grid-cols-7 bg-slate-600 h-[9%] px-2 text-slate-200 text-center rounded-t-[15px]"
            >
              <div class="flex items-center justify-center">Понедельник</div>
              <div class="flex items-center justify-center">Вторник</div>
              <div class="flex items-center justify-center">Среда</div>
              <div class="flex items-center justify-center">Четверг</div>
              <div class="flex items-center justify-center">Пятница</div>
              <div class="flex items-center justify-center">Суббота</div>
              <div class="flex items-center justify-center">Воскресенье</div>
            </div>
            <div
              class="grid grid-cols-1 grid-rows-4 h-[91%] bg-slate-200 rounded-b-[15px]"
            >
              <div
                v-for="items in date"
                v-bind:key="items"
                class="border-y-[1px] border-slate-300 last-of-type:border-b-[2px] last-of-type:rounded-b-[15px] grid grid-cols-7 grid-rows-1"
              >
                <div
                  v-for="item in items"
                  v-bind:key="item"
                  class="border-r-[2px] last-of-type:border-r-[0px] border-slate-300"
                >
                  4
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-3/12 p-2 flex flex-wrap">
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
          <div class="h-[821%] relative w-full overflow-hidden bg-slate-200 rounded-[10px]">
            <div
              class="overflow-y-scroll absolute w-full p-5 flex flex-wrap max-h-[100%]"
            >
              <div v-for="hour in time" :key="hour" class="w-full h-[60px] flex">
                <div class="w-2/12">{{ hour }}</div>
                <div class="w-[5px] border-r-[1px] border-slate-400 relative -mr-3"></div>
                <div class="w-10/12 pl-4 pr-2 py-2 border-t-[1px] border-slate-400 text-[14px]">
                  <div class="h-full rounded-r-[7px] border-l-[3px] border-lime-600">
                      <div class="absolute p-2">safsfsdfsdsdf</div>
                      <div class="bg-lime-400 h-full rounded-r-[7px] p-1 opacity-25"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700&display=swap");

#app {
  height: 100vh;
  width: 100vw;
}
</style>

<script>
export default {
  name: "App",

  data() {
    return {
      date: [],
      time: [],
    };
  },

  created() {
    for (let i = 1; i < 5; i++) {
      let arr = [];
      for (let j = 1; j < 8; j++) {
        arr.push(j);
      }
      this.date.push(arr);
    }

    for (let i = 1; i <= 23; i++) {
      if (i < 10) {
        this.time.push(`0${i}:00`);
      } else {
        this.time.push(`${i}:00`);
      }

      if (i === 23) {
        this.time.push("00:00");
      }
    }
  },
};
</script>