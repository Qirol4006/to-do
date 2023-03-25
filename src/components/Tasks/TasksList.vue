<template>
  <div v-if="service.dataLoaded.value" class="flex flex-col gap-2 p-4 w-full">
    <div v-for="task in service.tasksList.value"
         class="flex flex-row w-full"
         :key="task">
      <div class="flex flex-row gap-2 border-[1px] w-full rounded-lg px-4 py-2 items-center justify-between">
        <div class="flex flex-row gap-2 items-center">
          <el-checkbox v-model="task.isCompleted"
                       text-color="green"
                       @click="service.chekTask(task)"
                       class="text-color-green"
                       size="default"/>
          <div class="-mt-0.5" :class="task.isCompleted ? 'line-through':''">
            {{ task.name }}
          </div>
        </div>
        <el-dropdown trigger="click" class="justify-self-end">
          <button class="p-1">
            <el-icon class="rotate-90"><MoreFilled /></el-icon>
          </button>
          <template #dropdown>
            <div class="flex flex-col gap-1 p-1 w-full">
              <button @click="editTask(task)" class="px-2 text-left border-[1px] w-full rounded-md hover:bg-gray-200">
                Edit
              </button>
              <button @click="service.deleteId.value = task.id" class="px-2 text-left border-[1px] w-full rounded-md hover:bg-gray-200">
                Delete
              </button>
            </div>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="flex flex-row justify-end">
      <button class="rounded-xl bg-green-500 px-4 py-2.5 text-white transition-all hover:bg-green-600"
              @click="service.newTaskDialogShow.value = true">
        New task
      </button>
    </div>
  </div>
  <el-dialog v-model="service.newTaskDialogShow.value"
             :align-center="true"
             title="New task">
    <TaskCreateForm @closeDialog="service.closeDialog()"/>
  </el-dialog>
  <el-dialog v-model="service.editTaskDialog.value"
             :align-center="true"
             title="Edit task">
    <TaskEdit @closeDialog="service.closeDialog()" :list-data="service.newTaskData.value"/>
  </el-dialog>
  <el-dialog v-model="service.deleteId.value"
             :align-center="true"
             title="Edit list">
    <div class="flex flex-row">
      Do you wanna delete this?
    </div>
    <div class="flex flex-row">
      <button class="p-3 bg-green-500 text-white rounded-lg" @click="service.deleteTask(service.deleteId.value)">
        Yes
      </button>
    </div>
  </el-dialog>
</template>

<script setup>
// Imports
import taskService from "@/services/task-service";
import TaskCreateForm from "@/components/Tasks/TaskCreateForm.vue";
import {onMounted} from "vue";
import {MoreFilled} from "@element-plus/icons-vue";
import TaskEdit from "@/components/Tasks/TaskEdit.vue";

// State
const service = taskService()

// Directives
onMounted(async () => {
  await service.getTasks()
})

// Methods
function editTask(task){
  service.newTaskData.value = task
  service.editTaskDialog.value = true
}
</script>