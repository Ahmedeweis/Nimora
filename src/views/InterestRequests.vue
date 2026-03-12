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

                <div class="px-4 lg:px-8 py-4 lg:py-6 max-w-[1200px] mx-auto w-full pb-20" style="padding-top: 0;">

                    <!-- Header -->
                    <div class="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 class="text-[24px] font-bold text-gray-900 leading-tight mb-1">Interest Requests</h1>
                            <p class="text-[14px] text-gray-500">Customer inquiries and product interest lists.</p>
                        </div>
                    </div>

                    <!-- Stats Cards -->
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div
                            class="bg-white rounded-[16px] border border-gray-100 p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                            <div class="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    class="text-gray-500">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                            <p class="text-[26px] font-bold text-gray-900 mb-0.5">1</p>
                            <p class="text-[13px] text-gray-500">New</p>
                        </div>
                        <div
                            class="bg-white rounded-[16px] border border-gray-100 p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                            <div class="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center mb-3">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path
                                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
                                    </path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </div>
                            <p class="text-[26px] font-bold text-gray-900 mb-0.5">1</p>
                            <p class="text-[13px] text-gray-500">Contacted</p>
                        </div>
                        <div
                            class="bg-white rounded-[16px] border border-gray-100 p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                            <div class="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M22 2L11 13"></path>
                                    <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                                </svg>
                            </div>
                            <p class="text-[26px] font-bold text-gray-900 mb-0.5">0</p>
                            <p class="text-[13px] text-gray-500">Quoted</p>
                        </div>
                        <div
                            class="bg-white rounded-[16px] border border-gray-100 p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                            <div class="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center mb-3">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            </div>
                            <p class="text-[26px] font-bold text-gray-900 mb-0.5">0</p>
                            <p class="text-[13px] text-gray-500">Finished</p>
                        </div>
                    </div>

                    <!-- Filters & Search -->
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
                        <div class="flex items-center gap-2">
                            <button v-for="filter in filters" :key="filter" @click="activeFilter = filter" :class="[
                                'px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors border',
                                activeFilter === filter
                                    ? 'bg-[#2A2421] text-white border-[#2A2421]'
                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                            ]">
                                {{ filter }}
                            </button>
                        </div>
                        <div class="relative w-full sm:w-auto">
                            <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="15" height="15"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input type="text" v-model="searchQuery" placeholder="Search customers..."
                                class="w-full sm:w-[300px] pl-10 pr-4 py-2.5 rounded-[12px] border border-gray-200 bg-white text-[14px] focus:outline-none focus:ring-2 focus:ring-[#847365]/20 focus:border-[#847365] transition-colors">
                        </div>
                    </div>

                    <!-- Requests List -->
                    <div class="flex flex-col gap-4">
                        <div v-for="request in filteredRequests" :key="request.id"
                            class="bg-white rounded-[16px] border border-gray-100 p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                            <!-- Request Header -->
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                <div>
                                    <div class="flex items-center gap-3 mb-1">
                                        <h3 class="text-[16px] font-bold text-gray-900">{{ request.customerName }}</h3>
                                        <span :class="[
                                            'px-2.5 py-1 rounded-full text-[12px] font-medium flex items-center gap-1.5',
                                            getStatusStyles(request.status)
                                        ]">
                                            <span
                                                :class="['w-1.5 h-1.5 rounded-full', getStatusDotClass(request.status)]"></span>
                                            {{ request.status }}
                                        </span>
                                    </div>
                                    <div class="flex flex-wrap items-center gap-4 text-[13px] text-gray-500">
                                        <span>{{ request.customerEmail }}</span>
                                        <span>{{ request.date }}</span>
                                        <span>{{ request.products.length }} products</span>
                                    </div>
                                </div>
                                <div class="relative">
                                    <select v-model="request.status" @change="handleStatusChange(request)"
                                        class="appearance-none pl-4 pr-10 py-2 rounded-[10px] border border-gray-200 bg-white text-[14px] font-medium text-gray-700 outline-none focus:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer min-w-[130px]">
                                        <option value="New">New</option>
                                        <option value="Contacted">Contacted</option>
                                        <option value="Quoted">Quoted</option>
                                        <option value="Finished">Finished</option>
                                    </select>
                                    <svg class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                            </div>

                            <!-- Comment -->
                            <div class="flex items-start gap-2 text-gray-600 bg-gray-50 rounded-[12px] p-3 mb-4">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    class="flex-shrink-0 mt-0.5 text-gray-400">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                                <p class="text-[14px] leading-relaxed">{{ request.message }}</p>
                            </div>

                            <div class="w-full h-[1px] bg-gray-100 mb-4"></div>

                            <!-- Products Toggle -->
                            <div>
                                <button @click="request.showProducts = !request.showProducts"
                                    class="flex items-center gap-2 text-[#e87030] hover:text-[#d35a1b] font-medium text-[14px] mb-4 transition-colors">
                                    View interested products
                                    <svg :class="['w-4 h-4 transition-transform duration-200', request.showProducts ? 'rotate-180' : '']"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <!-- Products Grid -->
                                <div v-if="request.showProducts"
                                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div v-for="product in request.products" :key="product.id"
                                        class="flex items-start gap-3">
                                        <div
                                            class="w-[60px] h-[60px] rounded-[10px] overflow-hidden bg-gray-100 flex-shrink-0">
                                            <img :src="product.image" :alt="product.name"
                                                class="w-full h-full object-cover">
                                        </div>
                                        <div class="py-0.5">
                                            <h4 class="text-[14px] font-bold text-gray-900">{{ product.name }}</h4>
                                            <p class="text-[12px] text-gray-400 mb-1.5">{{ product.category }}</p>
                                            <div class="flex items-center gap-1.5 text-gray-500">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round">
                                                    <path
                                                        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z">
                                                    </path>
                                                    <circle cx="8" cy="11" r="1" fill="currentColor"></circle>
                                                    <circle cx="12" cy="11" r="1" fill="currentColor"></circle>
                                                    <circle cx="16" cy="11" r="1" fill="currentColor"></circle>
                                                </svg>
                                                <span class="text-[12px]">"{{ product.note }}"</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import Navbar from '../components/Navbar.vue'
import HeaderComponent from '../components/header.vue'

const toast = useToast()

const isSidebarOpen = ref(false)
const activeFilter = ref('All')
const searchQuery = ref('')
const filters = ['All', 'New', 'Contacted', 'Quoted', 'Finished']

const requests = ref([
    {
        id: 1,
        customerName: 'Salma',
        customerEmail: 'Salma@gmail.com',
        date: '20/1/2026',
        status: 'New',
        message: 'I am interested in these tiles for my new villa project. Can you provide pricing for bulk order of 500+ sqm?',
        showProducts: true,
        products: [
            { id: 101, name: 'Product1', category: 'Marbel', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop', note: '200 sqm for restrooms' },
            { id: 102, name: 'Product1', category: 'Marbel', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop', note: '200 sqm for restrooms' },
            { id: 103, name: 'Product1', category: 'Marbel', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop', note: '200 sqm for restrooms' }
        ]
    },
    {
        id: 2,
        customerName: 'Salma',
        customerEmail: 'Salma@gmail.com',
        date: '20/1/2026',
        status: 'Contacted',
        message: 'I am interested in these tiles for my new villa project. Can you provide pricing for bulk order of 500+ sqm?',
        showProducts: false,
        products: [
            { id: 104, name: 'Product1', category: 'Marbel', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop', note: '200 sqm for restrooms' },
            { id: 105, name: 'Product1', category: 'Marbel', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop', note: '200 sqm for restrooms' },
            { id: 106, name: 'Product1', category: 'Marbel', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop', note: '200 sqm for restrooms' }
        ]
    }
])

const filteredRequests = computed(() => {
    let list = requests.value
    if (activeFilter.value !== 'All') {
        list = list.filter(r => r.status === activeFilter.value)
    }
    if (searchQuery.value) {
        list = list.filter(r =>
            r.customerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            r.customerEmail.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    }
    return list
})

const handleStatusChange = (request) => {
    toast.success(`Request status updated to ${request.status}`)
}

const getStatusStyles = (status) => {
    switch (status) {
        case 'New': return 'bg-gray-100 text-gray-600'
        case 'Contacted': return 'bg-orange-50 text-[#e87030]'
        case 'Quoted': return 'bg-blue-50 text-blue-600'
        case 'Finished': return 'bg-green-50 text-green-600'
        default: return 'bg-gray-100 text-gray-600'
    }
}

const getStatusDotClass = (status) => {
    switch (status) {
        case 'New': return 'bg-gray-400'
        case 'Contacted': return 'bg-[#e87030]'
        case 'Quoted': return 'bg-blue-500'
        case 'Finished': return 'bg-green-500'
        default: return 'bg-gray-400'
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
</style>
