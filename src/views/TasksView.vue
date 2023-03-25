<template>
  <div class="flex justify-center max-w-[768px]">
    <div class="list-col">
      <TasksList v-if="store.state.selectedList"/>
    </div>
  </div>
</template>

<style>
.list-col {
  max-width: 768px;
  min-width: 400px;
}
</style>
<script setup lang="ts">
// Import
import TasksList from "@/components/Tasks/TasksList.vue";
import {useStore} from "vuex";

// State
const store = useStore()

</script>