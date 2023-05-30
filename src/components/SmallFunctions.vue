<template>
  <div>
    <div class="relative overflow-hidden h-full rounded-[10px]">
      <div class="absolute overflow-y-scroll p-3 w-full max-h-[100%] min-h-[100%] grid grid-cols-1 gap-2">
        <div v-for="func in checkFunctions" :key="func['id_user_functions']" class="grid grid-cols-[8fr_1fr] py-3">
          <div>{{func['name_function']}}</div>
          <label class="switch">
            <input type="checkbox" ref="check" :checked="checkFunctions.checked" name="functions" :value="func['id_user_functions']"/>
            <span class="slider round"></span>
          </label>
        </div>
        <button @click="save" class="w-[100%] h-fit rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-1">Сохранить</button>
        <button @click="closeSmallFunctions" class="w-[100%] h-fit rounded-[5px] bg-red-600 hover:bg-red-800 transition-[background-color] ease-out duration-[0.25s] py-1">Отменить и Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "SmallFunctions",

  computed: {
    ...mapState({
      token: state => state.token,
      usersFunctions: state => state.usersFunctions,
      choosenUserForSettings: state => state.choosenUserForSettings
    }),

    checkFunctions() {
      return this.usersFunctions.map(func => {
          this.choosenUserForSettings.functions.forEach(userFunc => {
            if(userFunc.function == func.function) {
              func.checked = true
            } else {
              func.checked = false
            }
          })
      })
    }
  },

  created() {
    this.fetchData({url:`userfunctions`, method: 'get', body:null, token:this.token, nameMutation: 'loadUsersFunctions'})
    this.fetchData({url:`userfunctions/${this.$route.params.id}`, method: 'post', body:{id_user:this.choosenUserForSettings.id}, token:this.token, nameMutation: 'loadUserFunctions'})
  },

  methods: {
    ...mapActions({
      fetchData: 'fetchData'
    }),

    closeSmallFunctions() {
      this.$emit('closeSmallFunctions')
    },

    save() {
      this.$refs.check.forEach(el => console.log(el.checked, el.value))
    }
  }
}
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 23px;
}

/* Hide default HTML checkbox */
.switch input {
  display: none;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 19px;
  width: 19px;
  left: 4px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(24px);
  -ms-transform: translateX(24px);
  transform: translateX(24px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>