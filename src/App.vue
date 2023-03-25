<template>
  <router-view/>
</template>

<script setup>
// region Imports
import {watch} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

// endregion

// region State
const router = useRouter()
const store = useStore()

// endregion

// region Directives
watch(() => router.currentRoute.value,
    (newRoute) => {
      if (!localStorage.getItem("token") && (newRoute.path !== '/login' && newRoute.path !== '/register')){
        router.push('/login')
        store.commit('changeLoginPage', true)
      }else {
        store.commit('changeLoginPage', false)
      }
    })

// endregion
</script>

<style>

/* total width */
::-webkit-scrollbar {
  width: 14px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 14px 14px transparent;
  border: solid 4px transparent;
}

::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 14px 14px #bbbbbe;
  border: solid 4px transparent;
  border-radius: 14px;
}

/* set button(top and bottom of the scrollbar) */
::-webkit-scrollbar-button {
  display: none;
}
</style>
