<template>
    <div
        class="flex h-screen bg-[#fafafa] overflow-hidden flex-col lg:flex-row relative w-full font-['Inter',sans-serif]">
        <Navbar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

        <!-- Backdrop for mobile -->
        <div v-if="isSidebarOpen" @click="isSidebarOpen = false"
            class="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm transition-opacity"></div>

        <div class="flex-1 overflow-y-auto w-full">
            <main class="min-h-full flex flex-col">
                <HeaderComponent @open-sidebar="isSidebarOpen = true" />

                <!-- Page Content -->
                <div class="px-4 lg:px-8 py-4 lg:py-6 max-w-[1200px] mx-auto w-full pb-20" style="padding-top: 0;">

                    <!-- Header Area -->
                    <div class="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 class="text-[24px] font-bold text-gray-900 leading-tight mb-1">Categories</h1>
                            <p class="text-[14px] text-gray-500">Create and manage categories</p>
                        </div>
                        <button @click="isAddModalOpen = true"
                            class="flex items-center gap-2 px-5 py-2.5 bg-[#847365] hover:bg-[#736458] text-white rounded-xl text-[14px] font-medium transition-colors shadow-sm whitespace-nowrap">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Add Category
                        </button>
                    </div>

                    <!-- Categories Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="(category, index) in categories" :key="index"
                            class="bg-white rounded-[20px] p-4 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex items-stretch gap-4 transition-all hover:shadow-md relative group">

                            <!-- Left Content -->
                            <div class="flex-1 flex flex-col py-1">
                                <!-- Category Icon -->
                                <div
                                    class="w-10 h-10 rounded-[12px] bg-[#fafafa] border border-gray-100 flex items-center justify-center mb-3">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                        class="text-gray-500 stroke-current" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                                        <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                                        <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                                        <path d="M3 14h7v7H3z"></path>
                                        <circle cx="6.5" cy="17.5" r="1.5"></circle>
                                    </svg>
                                </div>

                                <h3 class="text-[18px] font-bold text-gray-900 mb-0.5 tracking-tight">{{ category.name
                                    }}</h3>
                                <p class="text-[13px] text-gray-500 mb-auto">{{ category.productCount }} Products</p>

                                <!-- View Products Button -->
                                <button style="margin-top: 10px;"
                                    class="mt-4  flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-[13px]  font-semibold transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path
                                            d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z">
                                        </path>
                                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                    </svg>
                                    View Products
                                </button>
                            </div>

                            <!-- Right Content (Image & Menu) -->
                            <div class="relative w-[130px] flex-shrink-0">
                                <img :src="category.image" :alt="category.name"
                                    class="w-full h-full object-cover rounded-[14px]">

                                <!-- 3 Dot Menu -->
                                <div class="absolute top-2 left-[-28px]">
                                    <button @click.stop="toggleMenu(index)"
                                        class="w-8 h-8 flex items-center justify-center text-gray-700 relative z-10">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <circle cx="12" cy="5" r="1"></circle>
                                            <circle cx="12" cy="12" r="1"></circle>
                                            <circle cx="12" cy="19" r="1"></circle>
                                        </svg>
                                    </button>

                                    <!-- Dropdown Menu -->
                                    <div v-if="activeMenu === index"
                                        class="absolute top-10 left-0 w-32 bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 py-1 z-20 overflow-hidden text-left origin-top-left flex flex-col">
                                        <!-- Backdrop specific to this menu -->
                                        <div class="fixed inset-0 z-[-1]" @click.stop="activeMenu = null"></div>

                                        <button
                                            class="w-full px-4 py-2.5 text-left text-[14px] text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round">
                                                <path d="M12 20h9"></path>
                                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z">
                                                </path>
                                            </svg>
                                            Edit
                                        </button>

                                        <div class="w-full h-[1px] bg-gray-100 my-0.5"></div>

                                        <button
                                            class="w-full px-4 py-2.5 text-left text-[14px] text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round">
                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                <path
                                                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                                </path>
                                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                                <line x1="14" y1="11" x2="14" y2="17"></line>
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>

        <!-- Add Category Modal -->
        <div v-if="isAddModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" @click="isAddModalOpen = false">
            </div>

            <!-- Modal Content -->
            <div class="bg-white rounded-[20px] w-full max-w-[500px] z-10 shadow-xl overflow-hidden flex flex-col">
                <div class="p-6 pb-4">
                    <h2 class="text-[20px] font-bold text-gray-900 mb-1">Add New Category</h2>
                    <p class="text-[14px] text-gray-500">Create a new Category to organize your products.</p>
                </div>

                <div class="px-6">
                    <div class="w-full h-[1px] bg-gray-100"></div>
                </div>

                <div class="p-6 flex flex-col gap-6">
                    <!-- Category Name -->
                    <div>
                        <label class="block text-[14px] font-medium text-gray-900 mb-2">Category Name</label>
                        <input type="text" placeholder="e.g. Catalog1"
                            class="w-full px-4 py-3 rounded-[12px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#847365]/20 focus:border-[#847365] transition-colors text-[14px]">
                    </div>

                    <!-- Category Image -->
                    <div>
                        <label class="block text-[14px] font-medium text-gray-900 mb-2">Category Image</label>
                        <div
                            class="border-2 border-dashed border-gray-200 rounded-[12px] p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group">
                            <svg class="w-6 h-6 text-gray-600 mb-3 transition-colors" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                            <span class="text-[14px] font-medium text-gray-600 mb-1">Upload Image</span>
                            <span class="text-[13px] text-gray-400">PNG, JPG up to 10MB</span>
                        </div>
                    </div>
                </div>

                <div class="px-6">
                    <div class="w-full h-[1px] bg-gray-100"></div>
                </div>

                <div class="p-6 pt-5 flex gap-3">
                    <button @click="isAddModalOpen = false"
                        class="flex-1 py-3 px-4 border border-gray-200 text-gray-900 rounded-[12px] text-[15px] font-medium hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                    <button
                        class="flex-1 py-3 px-4 bg-[#847365] text-white rounded-[12px] text-[15px] font-medium hover:bg-[#736458] transition-colors shadow-sm">
                        Add Category
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import HeaderComponent from '../components/header.vue'

// Temporary image paths based on AllProducts.vue patterns
import productImg1 from '../assets/imgs/product/1.webp'
import productImg2 from '../assets/imgs/product/2.webp'
import productImg3 from '../assets/imgs/product/3.webp'

const isSidebarOpen = ref(false)
const activeMenu = ref(null)
const isAddModalOpen = ref(false)

const toggleMenu = (index) => {
    if (activeMenu.value === index) {
        activeMenu.value = null
    } else {
        activeMenu.value = index
    }
}

// Close menu when clicking outside
const closeMenu = (e) => {
    // If we click anywhere, just close the menu. The click.stop on the toggle button prevents it from immediately closing when opening.
    activeMenu.value = null
}

onMounted(() => {
    document.addEventListener('click', closeMenu)
})

onUnmounted(() => {
    document.removeEventListener('click', closeMenu)
})

// Mock Data for Categories
const categories = ref([
    {
        name: 'Porcelain',
        productCount: 2,
        image: productImg1
    },
    {
        name: 'Category1',
        productCount: 2,
        image: productImg2
    },
    {
        name: 'Category1',
        productCount: 2,
        image: productImg3
    },
    {
        name: 'Porcelain',
        productCount: 2,
        image: productImg1
    },
    {
        name: 'Category1',
        productCount: 2,
        image: productImg2
    },
    {
        name: 'Category1',
        productCount: 2,
        image: productImg3
    }
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
</style>
