<template>
  <div class="flex flex-row w-full h-[100vh]">
    <div class="flex flex-col">
      <ListsComponent/>
    </div>
    <div class="flex flex-col w-full items-center">
      <router-view/>
    </div>
  </div>
</template>

<script setup>
import ListsComponent from "@/components/Lists/ListsComponent.vue";

// Hooks

</script>