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

                <div class="px-4 lg:px-8 py-4 lg:py-6 max-w-7xl mx-auto w-full pt-6" style="padding-top: 0;">

                    <!-- Page Title -->
                    <div class="mb-5">
                        <h1 class="text-[26px] font-bold text-gray-900 mb-1 tracking-tight" style="margin: 0 0;">Product
                            Management</h1>
                        <p class="text-gray-500 text-[15px]">Manage your product catalog</p>
                    </div>

                    <!-- Catalog Link Box -->
                    <div
                        class="mb-8 border border-gray-200 rounded-2xl bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]">
                        <div class="flex items-start sm:items-center gap-3 mb-3 sm:mb-0">
                            <div class="mt-0.5 sm:mt-0 text-gray-400">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-900 mb-0.5">Catalog Link</p>
                                <p class="text-sm text-gray-500 truncate max-w-[200px] sm:max-w-none">
                                    https://nimora-studio.lovable.app/catalog/nimora-studio</p>
                            </div>
                        </div>
                        <button
                            class="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            Copy
                        </button>
                    </div>

                    <!-- Controls Toolbar -->
                    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">

                        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <!-- View Toggles -->
                            <div class="flex bg-gray-100 p-1 rounded-xl">
                                <button
                                    class="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#8c7a6b] text-white text-sm font-medium shadow-sm transition-colors">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="8" y1="6" x2="21" y2="6"></line>
                                        <line x1="8" y1="12" x2="21" y2="12"></line>
                                        <line x1="8" y1="18" x2="21" y2="18"></line>
                                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                    </svg>
                                    List View
                                </button>
                                <button
                                    class="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="3" y="3" width="7" height="7"></rect>
                                        <rect x="14" y="3" width="7" height="7"></rect>
                                        <rect x="14" y="14" width="7" height="7"></rect>
                                        <rect x="3" y="14" width="7" height="7"></rect>
                                    </svg>
                                    Grid View
                                </button>
                            </div>

                            <!-- Status Filters -->
                            <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                                <button
                                    class="px-5 py-1.5 rounded-full bg-gray-900 text-white text-sm font-medium">All</button>
                                <button
                                    class="px-5 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium whitespace-nowrap">Published</button>
                                <button
                                    class="px-5 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium whitespace-nowrap">Draft</button>
                                <button
                                    class="px-5 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium whitespace-nowrap">AI
                                    Preview</button>
                            </div>
                        </div>

                        <!-- Search -->
                        <div class="relative w-full lg:w-80">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </span>
                            <input type="text"
                                class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 text-sm"
                                placeholder="Search Products, categories...">
                        </div>

                    </div>

                    <!-- Products List -->
                    <div class="flex flex-col gap-3 mb-6">
                        <div v-for="(product, index) in products" :key="index"
                            class="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
                            <div class="flex items-center gap-4">
                                <div
                                    class="w-[60px] h-[60px] rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                                    <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
                                </div>
                                <div class="flex flex-col justify-center">
                                    <h3 class="text-[15px] font-medium text-gray-900 mb-0.5">{{ product.name }}</h3>
                                    <p class="text-[13px] text-gray-500 mb-1.5">{{ product.category }}</p>
                                    <div class="flex items-center gap-3 text-[13px] text-gray-500 font-medium">
                                        <span class="flex items-center gap-1.5">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </svg>
                                            {{ product.views }}
                                        </span>
                                        <span class="flex items-center gap-1 text-gray-400">
                                            $ <span class="text-gray-500">{{ product.price }}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center gap-4">
                                <div class="flex items-center justify-center px-3 py-1 rounded-full text-[13px] font-medium"
                                    :class="getStatusClasses(product.status)">
                                    <span class="w-1.5 h-1.5 rounded-full mr-2"
                                        :class="getStatusDotClass(product.status)"></span>
                                    {{ product.status }}
                                </div>
                                <div class="text-gray-300 group-hover:text-gray-500 transition-colors">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <PaginationComponent />

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

// Needed to construct image path imports in Vite
import productImg1 from '../assets/imgs/product/1.webp'
import productImg2 from '../assets/imgs/product/2.webp'
import productImg3 from '../assets/imgs/product/3.webp'
import productImg4 from '../assets/imgs/product/4.webp'
import productImg5 from '../assets/imgs/product/5.webp'

const isSidebarOpen = ref(false)

const products = ref([
    {
        name: 'Carrara Marble',
        category: 'Marble • Natural Stone',
        image: productImg1,
        views: '50',
        price: '250',
        status: 'Published'
    },
    {
        name: 'Geometric Ceramic Tile',
        category: 'Ceramic',
        image: productImg2,
        views: '125',
        price: '250',
        status: 'Draft'
    },
    {
        name: 'Herringbone Oak Parquet',
        category: 'Wood',
        image: productImg3,
        views: '200',
        price: '250',
        status: 'AI Preview'
    },
    {
        name: 'Herringbone Oak Parquet',
        category: 'Wood',
        image: productImg4,
        views: '200',
        price: '250',
        status: 'AI Preview'
    },
    {
        name: 'Herringbone Oak Parquet',
        category: 'Wood',
        image: productImg5,
        views: '200',
        price: '250',
        status: 'AI Preview'
    }
])

const getStatusClasses = (status) => {
    switch (status) {
        case 'Published':
            return 'bg-emerald-50 text-emerald-500'
        case 'Draft':
            return 'bg-slate-100 text-slate-500'
        case 'AI Preview':
            return 'bg-orange-50 text-orange-500'
        default:
            return 'bg-gray-50 text-gray-600'
    }
}

const getStatusDotClass = (status) => {
    switch (status) {
        case 'Published':
            return 'bg-emerald-500'
        case 'Draft':
            return 'bg-slate-400'
        case 'AI Preview':
            return 'bg-orange-400'
        default:
            return 'bg-gray-400'
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Custom scrollbar for horizontal scroll views if needed */
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