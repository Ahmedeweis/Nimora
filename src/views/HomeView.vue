<template>
  <div class="flex h-screen bg-[#fafafa] overflow-hidden flex-col lg:flex-row relative w-full">
    <Navbar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

    <!-- Backdrop for mobile -->
    <div v-if="isSidebarOpen" @click="isSidebarOpen = false"
      class="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm transition-opacity"></div>

    <div class="flex-1 overflow-y-auto w-full">
      <main class="min-h-full flex flex-col">
        <HeaderComponent @open-sidebar="isSidebarOpen = true" />
        <PaginationComponent />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import HeaderComponent from '../components/header.vue'
import PaginationComponent from '../components/pagnetion.vue'

const isSidebarOpen = ref(false)
</script>

<style scoped>
/* Custom scrollbar for categories if needed */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>