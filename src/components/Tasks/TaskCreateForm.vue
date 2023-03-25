<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-row">
      <el-input v-model="service.newTaskData.value.name"
                placeholder="Name" />
    </div>
    <div class="flex flex-row">
      <el-input
          v-model="service.newTaskData.value.description"
          type="textarea"
          placeholder="Description"
      />
    </div>
    <div class="flex flex-row gap">
      <el-checkbox v-model="service.newTaskData.value.isCompleted"
                   label="Is completed"
                   size="large" />
    </div>
    <div class="flex flex-row justify-end">
      <button class="rounded-xl bg-green-500 px-8 py-2.5 text-white transition-all hover:bg-green-600"
              @click="saveAndClose()">
        Save
      </button>
    </div>
  </div>
</template>

<script setup>
// Imports
import taskService from "@/services/task-service";
import { defineEmits } from 'vue';

// State
const service = taskService()
const emit = defineEmits(['closeDialog'])

// Methods
async function saveAndClose() {
  await service.saveTask()
  emit('closeDialog')
}

</script>

<style scoped>

</style>