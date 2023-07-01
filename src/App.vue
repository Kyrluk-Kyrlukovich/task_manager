<template>
  <div class="h-full w-full flex bg-slate-300">
      <router-view></router-view>
      <div v-show="modalAcceptedAction.isOpen" class="h-full w-full z-10 absolute" @click="closeAccept">
        <transition name="modalAccept">
          <div v-if="modalAcceptedAction.isOpen" @click.stop class="absolute p-5 z-20 opacity-100 overflow-hidden left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[10px] shadow-[1px_3px_27px_8px_rgba(34,60,80,0.2)] bg-slate-200  h-[150px] w-[325px]">
            <ModalAcceptedAction :action="actions[modalAcceptedAction.currAction]" >{{actions[modalAcceptedAction.currAction].text}}</ModalAcceptedAction>
          </div>
        </transition>
      </div>
      <transition name="modalError">
        <div v-show="errorAction.isError" class="absolute  p-8 z-20 opacity-100 overflow-hidden right-[2%] bottom-[2%] rounded-[10px] shadow-[1px_3px_27px_8px_rgba(34,60,80,0.2)] bg-slate-200  h-[125px] w-[325px]">
          <ModalError>{{errorAction.text}}</ModalError>
        </div>
      </transition>

  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700&display=swap");

#app {
  height: 100vh;
  width: 100vw;
}

.modalAccept-enter-active {
  animation: open 0.7s;
}
.modalAccept-leave-active {
  animation: open 0.7s reverse;
}

.modalError-enter-active {
  animation: open-modal-error 0.7s;
}

.modalError-leave-active {
  animation: open-modal-error 0.7s reverse;
}

  @keyframes open-modal-error {
    0% {
      opacity: 0;
      bottom: 0;
    }
    100% {
      opacity: 1;
      bottom: 2%;
    }
  }

  @keyframes open {
    0% {
      max-height: 0;
    }
    100% {
      max-height: 150px;
    }
  }
</style>

<script>
import ModalAcceptedAction from "@/components/ModalAcceptedAction"
import ModalError from "@/components/ModalError"

import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "App",
  components: {ModalAcceptedAction, ModalError},


  data() {
    return {
    };
  },

  methods: {
    ...mapActions({
      fetchData: 'fetchData'
    }),

    ...mapMutations({
      login: 'login',
      openOrCloseAcceptModal: 'openOrCloseAcceptModal',
      closeAcceptModal: 'closeAcceptModal'
    }),

    closeAccept() {
        this.closeAcceptModal()
    }
  },

  created() {
    if(localStorage.getItem('token')) {
      const data = {token: localStorage.getItem('token')}
      this.login(data);
    }

    if(this.isAuth) {
      this.fetchData({
            url: 'profile',
            method: 'get',
            body: null,
            token: this.token,
            nameMutation: 'loadInfoUser'
      })
    }
  },

  computed: {
    ...mapState({
      isAuth: state => state.isAuth,
      token: state => state.token,
      modalAcceptedAction: state => state.modalAcceptedAction,
      actions: state => state.actions,
      errorAction: state => state.errorAction
    })
  },
};
</script>