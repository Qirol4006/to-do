<template>
  <div class="bg-white p-6 rounded-lg shadow-lg border-1 min-w-[350px]">
    <h2 class="text-2xl font-bold mb-8 text-center">Sign Up</h2>
    <form>
      <div class="mb-6" v-for="val in values" :key="val">
        <label class="block text-gray-700 font-bold mb-2"
               :for="val.key">
          {{ val.name }}
        </label>
        <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :id="val.key"
            v-model="service[val.key].value"
            :type="val['type']"
            :placeholder="val.name">
      </div>
      <div class="flex justify-between items-center">
        <button
            class="bg-blue-500 hover:bg-blue-700 active:bg-blue-800 transition-all text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="service.register()"
            type="button">
          Sign Up
        </button>
        <router-link to="/login"
                     class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 transition-all">
          Sign In
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import authService from "@/services/auth-service";
import {ref} from "vue";

// State
const service = authService()
const values = ref([
  {name: "First name", key: 'name', type: 'text'},
  {name: "Last name", key: 'lastName', type: 'text'},
  {name: "Username", key: 'username', type: 'text'},
  {name: "Password", key: 'password', type: 'password'},
  {name: "Confirm password", key: 'confirmPassword', type: 'password'},
])

</script>

<style scoped>

</style>