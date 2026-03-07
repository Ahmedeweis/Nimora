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
                <div class="px-4 lg:px-8 py-4 lg:py-6 max-w-7xl mx-auto w-full" style="padding-top: 0;">
                    <!-- Welcome Section -->
                    <div class=" mb-8">
                        <h1 style="margin: 0 0;" class="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
                        <p class="text-gray-500 text-sm">Manage your store operations quickly.</p>
                    </div>

                    <!-- Quick Actions -->
                    <div>
                        <h2 class="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                        <div class="grid grid-cols-2 lg:flex lg:flex-wrap items-center gap-2 sm:gap-3">
                            <button
                                class="flex items-center w-full lg:w-auto justify-center lg:justify-start space-x-2 bg-[#8C7A6B] hover:bg-[#7a6b5d] hover:cursor-pointer text-white px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors">
                                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4v16m8-8H4" />
                                </svg>
                                <span class="truncate">Add Product</span>
                            </button>

                            <button
                                class="flex items-center w-full lg:w-auto justify-center lg:justify-start space-x-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:cursor-pointer text-gray-700 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors">
                                <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                <span class="truncate">Update Inventory</span>
                            </button>

                            <button
                                class="flex items-center w-full lg:w-auto justify-center lg:justify-start space-x-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:cursor-pointer text-gray-700 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors">
                                <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <span class="truncate">Permissions</span>
                            </button>

                            <button
                                class="flex items-center w-full lg:w-auto justify-center lg:justify-start space-x-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:cursor-pointer text-gray-700 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors">
                                <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                <span class="truncate">View Catalog</span>
                            </button>
                        </div>
                    </div>
                </div>
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
