<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-row">
      <input v-model="newData.title"
             class="border-2 rounded-lg px-2 py-1"
                placeholder="Title" />
    </div>
    <div class="flex flex-row">
      <input
          v-model="newData.description"
          class="border-2 rounded-lg px-2 py-1"
          type="textarea"
          placeholder="Description"
      />
    </div>
    <div class="flex flex-row justify-end">
      <button class="rounded-xl bg-green-500 px-8 py-2.5 text-white transition-all hover:bg-green-600"
              @click="saveAndClose()">
        Update
      </button>
    </div>
  </div>
</template>

<script setup>
// Imports
import { defineEmits, defineProps } from 'vue';
import ListService from "@/services/list-service";

// State
const service = ListService()
const emit = defineEmits(['closeDialog'])
const props = defineProps({listData: Object})
const newData = JSON.parse(JSON.stringify(props.listData))

// Methods
async function saveAndClose() {
  await service.updateList(newData)
  emit('closeDialog')
}
</script>

<style scoped>

</style>