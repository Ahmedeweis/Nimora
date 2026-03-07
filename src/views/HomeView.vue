<template>
  <div class="flex h-screen bg-[#fafafa] overflow-hidden flex-col lg:flex-row">
    <Navbar />

    <div class="flex-1 overflow-y-auto w-full">
      <main class="min-h-full flex flex-col">
        <HeaderComponent />
        <PaginationComponent />
      </main>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import HeaderComponent from '../components/header.vue'
import PaginationComponent from '../components/pagnetion.vue'
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