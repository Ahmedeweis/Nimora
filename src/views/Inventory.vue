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
                            <h1 class="text-[24px] font-bold text-gray-900 leading-tight mb-1">Inventory Management</h1>
                            <p class="text-[14px] text-gray-500">Monitor and update product stock levels in real-time
                            </p>
                        </div>
                        <button @click="$router.push('/import')"
                            class="flex items-center gap-2 px-5 py-2.5 bg-[#847365] hover:bg-[#736458] text-white rounded-xl text-[14px] font-medium transition-colors shadow-sm whitespace-nowrap">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Update Inventory
                        </button>
                    </div>

                    <!-- Stats Cards -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <!-- All Products -->
                        <div
                            class="bg-white rounded-[16px] p-5 border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]">
                            <div class="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center mb-4">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    class="text-gray-600">
                                    <path
                                        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z">
                                    </path>
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                </svg>
                            </div>
                            <h3 class="text-[26px] font-bold text-gray-900 mb-1 leading-none tracking-tight">{{ stats.total }}</h3>
                            <p class="text-[13px] text-gray-500">All Products</p>
                        </div>

                        <!-- In Stock -->
                        <div
                            class="bg-white rounded-[16px] p-5 border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]">
                            <div class="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    class="text-emerald-500">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                    <polyline points="9 12 11 14 15 10"></polyline>
                                </svg>
                            </div>
                            <h3 class="text-[26px] font-bold text-gray-900 mb-1 leading-none tracking-tight">{{ stats.inStock }}</h3>
                            <p class="text-[13px] text-gray-500">In Stock</p>
                        </div>

                        <!-- Low Stock -->
                        <div
                            class="bg-white rounded-[16px] p-5 border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]">
                            <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    class="text-gray-600">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                            </div>
                            <h3 class="text-[26px] font-bold text-gray-900 mb-1 leading-none tracking-tight">{{ stats.lowStock }}</h3>
                            <p class="text-[13px] text-gray-500">Low Stock</p>
                        </div>

                        <!-- Out of Stock -->
                        <div
                            class="bg-white rounded-[16px] p-5 border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]">
                            <div class="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-4">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    class="text-red-500">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="15" y1="9" x2="9" y2="15"></line>
                                    <line x1="9" y1="9" x2="15" y2="15"></line>
                                </svg>
                            </div>
                            <h3 class="text-[26px] font-bold text-gray-900 mb-1 leading-none tracking-tight">{{ stats.outOfStock }}</h3>
                            <p class="text-[13px] text-gray-500">Out of Stock</p>
                        </div>
                    </div>

                    <!-- Toolbar -->
                    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                        <!-- Filters -->
                        <div
                            class="flex border border-gray-200 rounded-xl bg-white overflow-hidden w-full lg:w-auto overflow-x-auto no-scrollbar">
                            <button v-for="filter in ['All', 'In Stock', 'Low Stock', 'Out of Stock']" :key="filter"
                                @click="activeFilter = filter" :class="[
                                    'px-5 py-2.5 text-[14px] font-medium transition-colors whitespace-nowrap border-r border-gray-200 last:border-r-0',
                                    activeFilter === filter ? 'bg-[#3A3532] text-white' : 'text-gray-600 hover:bg-gray-50 bg-white'
                                ]">
                                {{ filter }}
                            </button>
                        </div>

                        <!-- Search & Export -->
                        <div class="flex items-center gap-3 w-full lg:w-auto">
                            <div class="relative w-full lg:w-[320px]">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </span>
                                <input type="text" v-model="searchQuery"
                                    class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 text-[14px] text-gray-700 bg-white"
                                    placeholder="Search products, categories...">
                            </div>
                            <button @click="handleExport"
                                class="w-11 h-11 flex-shrink-0 flex items-center justify-center bg-[#847365] hover:bg-[#736458] text-white rounded-xl transition-colors shadow-sm">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Table container -->
                    <div
                        class="bg-white rounded-[16px] border border-gray-100 overflow-hidden shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] overflow-x-auto mb-6">
                        <table class="w-full min-w-[900px]">
                            <!-- Table Header -->
                            <thead>
                                <tr class="bg-[#F8F9FA] border-b border-gray-100">
                                    <th class="px-6 py-4 text-left text-[13px] font-semibold text-gray-600">Product</th>
                                    <th class="px-6 py-4 text-left text-[13px] font-semibold text-gray-600">Stock</th>
                                    <th class="px-6 py-4 text-left text-[13px] font-semibold text-gray-600">Quantity
                                    </th>
                                    <th class="px-6 py-4 text-left text-[13px] font-semibold text-gray-600">Location
                                    </th>
                                    <th class="px-6 py-4 text-left text-[13px] font-semibold text-gray-600">Last Updated
                                    </th>
                                    <th class="px-6 py-4 text-center text-[13px] font-semibold text-gray-600">Actions
                                    </th>
                                </tr>
                            </thead>
                            <!-- Table Body -->
                            <tbody class="divide-y divide-gray-100">
                                <tr v-for="(item, index) in paginatedInventory" :key="index"
                                    class="hover:bg-gray-50/50 transition-colors">
                                    <!-- Product Info -->
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
                                                <img :src="item.image" :alt="item.name"
                                                    class="w-full h-full object-cover">
                                            </div>
                                            <div>
                                                <div class="text-[14px] font-medium text-gray-800 mb-0.5">{{ item.name
                                                }}</div>
                                                <div class="text-[12px] text-gray-500">{{ item.category }}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <!-- Stock Status -->
                                    <td class="px-6 py-4">
                                        <div class="inline-flex items-center justify-center px-3 py-1 rounded-full text-[12px] font-medium"
                                            :class="getStockClasses(item.status)">
                                            {{ item.status }}
                                        </div>
                                    </td>
                                    <!-- Quantity -->
                                    <td class="px-6 py-4 text-[14px] text-gray-600">
                                        {{ item.quantity }}
                                    </td>
                                    <!-- Location -->
                                    <td class="px-6 py-4 text-[14px] text-gray-600">
                                        {{ item.location }}
                                    </td>
                                    <!-- Last Updated -->
                                    <td class="px-6 py-4 text-[14px] text-gray-600">
                                        {{ item.lastUpdated }}
                                    </td>
                                    <!-- Actions -->
                                    <td class="px-6 py-4 text-center">
                                        <router-link :to="`/products/${item.id}`"
                                            class="inline-block p-2 text-gray-400 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round">
                                                <path d="M12 20h9"></path>
                                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z">
                                                </path>
                                            </svg>
                                        </router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <PaginationComponent :current-page="currentPage" :total-pages="totalPages"
                        :total-items="filteredInventory.length" :per-page="perPage"
                        @page-change="currentPage = $event" />

                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '../store/product'
import Navbar from '../components/Navbar.vue'
import HeaderComponent from '../components/header.vue'
import PaginationComponent from '../components/pagnetion.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const productStore = useProductStore()

const isSidebarOpen = ref(false)
const activeFilter = ref('All')
const searchQuery = ref('')

onMounted(async () => {
    try {
        await productStore.fetchProducts({ skip: 0, limit: 1000 })
    } catch (error) {
        console.error('Failed to fetch products:', error)
        toast.error('Failed to load inventory data')
    }
})

const mappedInventory = computed(() => {
    const apiUrl = import.meta.env.VITE_API_URL || ''
    return productStore.products.map(product => {
        let imageUrl = 'https://via.placeholder.com/400x400?text=No+Image'
        if (product.images?.[0]?.url) {
            imageUrl = product.images[0].url
            if (imageUrl.startsWith('/')) {
                imageUrl = `${apiUrl}${imageUrl}`
            }
        }

        const quantity = product.inventory?.total_quantity || 0
        let status = 'In stock'
        if (quantity === 0) {
            status = 'Out of Stock'
        } else if (quantity <= 20) {
            status = 'Low Stock'
        }

        return {
            id: product.id,
            name: product.name,
            category: product.metadata?.category || 'Uncategorized',
            image: imageUrl,
            status: status,
            quantity: `${quantity} units`, // Could use metadata for unit if available
            location: product.nimora_product_code || 'N/A',
            lastUpdated: product.updated_at ? new Date(product.updated_at).toLocaleDateString('en-GB') : 'N/A'
        }
    })
})

const stats = computed(() => {
    const items = mappedInventory.value
    return {
        total: items.length,
        inStock: items.filter(i => i.status === 'In stock').length,
        lowStock: items.filter(i => i.status === 'Low Stock').length,
        outOfStock: items.filter(i => i.status === 'Out of Stock').length
    }
})

const currentPage = ref(1)
const perPage = 10

const totalPages = computed(() => Math.max(1, Math.ceil(filteredInventory.value.length / perPage)))

const paginatedInventory = computed(() => {
    const start = (currentPage.value - 1) * perPage
    const end = start + perPage
    return filteredInventory.value.slice(start, end)
})

const filteredInventory = computed(() => {
    let items = mappedInventory.value
    
    // Status Filter
    if (activeFilter.value !== 'All') {
        items = items.filter(item => item.status.toLowerCase() === activeFilter.value.toLowerCase())
    }
    
    // Search Filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        items = items.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.category.toLowerCase().includes(query) ||
            item.location.toLowerCase().includes(query)
        )
    }
    
    return items
})

const handleExport = () => {
    toast.info('Exporting inventory data...')
    
    try {
        // Prepare CSV data
        const headers = ['Product Name', 'Category', 'Product Code', 'Stock Status', 'Quantity', 'Last Updated']
        const rows = mappedInventory.value.map(item => [
            `"${item.name}"`,
            `"${item.category}"`,
            `"${item.location}"`, // location stores product code
            `"${item.status}"`,
            `"${item.quantity}"`,
            `"${item.lastUpdated}"`
        ])
        
        const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
        
        // Create blob and download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        
        link.setAttribute('href', url)
        link.setAttribute('download', `nimora_inventory_${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        setTimeout(() => {
            toast.success('Inventory exported successfully as CSV')
        }, 500)
    } catch (error) {
        console.error('Export failed:', error)
        toast.error('Failed to export inventory')
    }
}

const getStockClasses = (status) => {
    const s = status.toLowerCase()
    if (s === 'in stock') return 'bg-emerald-50 text-emerald-600'
    if (s === 'low stock') return 'bg-orange-50 text-orange-500'
    if (s === 'out of stock') return 'bg-red-50 text-red-500'
    return 'bg-gray-50 text-gray-600'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
