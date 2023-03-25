<template>
  <div v-if="service.dataLoaded.value"
       class="flex flex-col p-0.5 border-r-[1px] max-w-[350px] h-full min-w-[250px] h-full gap-2 ">
    <div class="flex flex-row sticky p-3 text-gray-900 justify-between">
      <div class=" text-2xl font-bold">
        Lists
      </div>
      <button @click="signOut()">
        Sigh Out
      </button>
    </div>
    <div class="flex flex-col overflow-y-scroll ml-2 pr-1">
      <div v-for="list in service.lists.value" :key="list.id" class="flex flex-row w-full gap-2 border-b-[1px]"
           :class="store.state.selectedList === list.id ? 'bg-gray-100':''">
        <router-link :to="'/list?id=' + list.id"
                     class="w-full text-left hover:text-green-500 transition-all px-4 py-0.5 rounded-xl active:text-gray-400"
                     :class="store.state.selectedList === list.id ? 'text-green-600':''">
          {{ list.title }}
        </router-link>
        <el-dropdown trigger="click">
          <button>
            <el-icon class="rotate-90"><MoreFilled /></el-icon>
          </button>
          <template #dropdown>
            <div class="flex flex-col gap-1 p-1 w-full">
              <button @click="editList(list)" class="px-2 text-left border-[1px] w-full rounded-md hover:bg-gray-200">
                Edit
              </button>
              <button @click="service.deleteId.value = list.id" class="px-2 text-left border-[1px] w-full rounded-md hover:bg-gray-200">
                Delete
              </button>
            </div>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="flex flex-row font-bold sticky p-3">
      <button class="rounded-xl bg-green-500 px-4 py-2.5 text-white w-full"
              @click="service.showDialog.value = true">
          New List
      </button>
    </div>
  </div>
  <el-dialog v-model="service.showDialog.value"
             :align-center="true"
             title="New list">
    <ListForm @closeDialog="service.closeDialog()"/>
  </el-dialog>
  <el-dialog v-model="service.editDialog.value"
             :align-center="true"
             title="Edit list">
    <ListEdit @closeDialog="service.closeEditDialog()" :list-data="service.editInfo.value"/>
  </el-dialog>
  <el-dialog v-model="service.deleteId.value"
             :align-center="true"
             title="Edit list">
    <div class="flex flex-row">
      Do you wanna delete this?
    </div>
    <div class="flex flex-row">
      <button class="p-3 bg-green-500 text-white rounded-lg" @click="service.deleteList(service.deleteId.value)">
        Yes
      </button>
    </div>
  </el-dialog>
</template>

<script setup>
// Imports
import listService from "@/services/list-service";
import {MoreFilled} from "@element-plus/icons-vue";
import {useStore} from "vuex";
import ListForm from "@/components/Lists/ListForm.vue";
import ListEdit from "@/components/Lists/ListEdit.vue";

// State
const service = listService()
const store = useStore()

// Methods
function editList(list){
  console.log(list.title)
  service.editInfo.value = list
  service.editDialog.value = true
}

function signOut(){
  localStorage.clear()
  location.replace('/login')
}

</script>

<style scoped>

</style>