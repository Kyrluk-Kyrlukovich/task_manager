<template>
  <div class="grid gap-6">
    <div class="text-center">
        <slot></slot>
    </div>
    <div class="grid grid-cols-2 gap-2">
        <button @click="accept"
                class="w-[100%] h-[90%] rounded-[5px] bg-emerald-400 hover:bg-emerald-600 transition-[background-color] ease-out duration-[0.25s] py-2">
          Да, уверен
        </button>
        <button @click="cancel"
                class="w-[100%] h-[90%] rounded-[5px] bg-red-600 hover:bg-red-800 transition-[background-color] ease-out duration-[0.25s] py-2">
          Отмена
        </button>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { mapMutations } from 'vuex'
export default {
    name: "ModalAcceptedAction",
    props: {
        action: Object
    },

    methods: {
        ...mapMutations({
            closeAcceptmodal: 'closeAcceptmodal'
        }),

        accept() {
            store.commit(this.action.nameMutation, true)
            this.closeAcceptmodal();
        },

        cancel() {
            store.commit(this.action.nameMutation, false)
            this.closeAcceptmodal();
        }
    }

}
</script>

<style>

</style>