<template>
  <div class="h-full w-full flex bg-slate-300 font-['Montserrat']">
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
        <div class="border-[1px] border-slate-100 w-9/12 px-6 py-4">
          <div class="flex justify-between">
            <div>
              <h2 class="text-lg font-medium opacity-50">Сегодня</h2>
              <h1 class="text-2xl font-semibold">2 Февраля, 2023</h1>
            </div>
            <div>
              <select name="categories" class="p-2 rounded-[5px]">
                <option value="">Срочные</option>
                <option value="">Невыполненые</option>
                <option value="">Просроченые</option>
                <option value="">Выполненые</option>
                <option value="">В процессе</option>
              </select>
            </div>
          </div>
          <div></div>
        </div>
        <div class="w-2/12"></div>
      </div>
    </main>
  </div>
</template>

<style>
#app {
  height: 100vh;
  width: 100vw;
}
</style>
