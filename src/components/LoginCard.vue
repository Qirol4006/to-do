<template>
  <div class="bg-white p-6 rounded-lg shadow-lg border-1 min-w-[350px]">
    <h2 class="text-2xl font-bold mb-8 text-center">Login</h2>
    <form>
      <div class="mb-6">
        <label class="block text-gray-700 font-bold mb-2"
               for="username">
          Username
        </label>
        <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            v-model="service.username.value"
            type="text"
            placeholder="Username">
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 font-bold mb-2" for="password">
          Password
        </label>
        <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            v-model="service.password.value"
            placeholder="Password">
      </div>
      <div class="flex justify-between items-center">
        <button
            class="bg-blue-500 hover:bg-blue-700 active:bg-blue-800 transition-all text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="service.login()"
            type="button">
          Sign In
        </button>
        <router-link to="/register"
                     class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 transition-all">
          Sign Up
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
// imports
import authService from "@/services/auth-service";
import {onMounted} from "vue";
import {useRouter} from "vue-router";

// State
const service = authService()
const router = useRouter()

onMounted(() => {
  if (localStorage.getItem('token')){
    router.push('/list')
  }
})
</script>

<style scoped>
</style>