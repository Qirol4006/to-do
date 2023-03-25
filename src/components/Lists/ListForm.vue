<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-row">
      <el-input v-model="service.listInfo.value.title"
                placeholder="Title" />
    </div>
    <div class="flex flex-row">
      <el-input
          v-model="service.listInfo.value.description"
          type="textarea"
          placeholder="Description"
      />
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
import { defineEmits } from 'vue';
import ListService from "@/services/list-service";

// State
const service = ListService()
const emit = defineEmits(['closeDialog'])

// Methods
async function saveAndClose() {
  await service.saveList()
  emit('closeDialog')
}
</script>

<style scoped>

</style>