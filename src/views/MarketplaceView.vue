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
                <div class="px-4 lg:px-8 py-4 lg:py-6 max-w-[1400px] mx-auto w-full pb-20" style="padding-top: 0;">

                    <!-- Marketplace Header -->
                    <div class="mb-10 text-center max-w-[800px] mx-auto pt-8">
                        <span class="px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-[13px] font-bold mb-4 inline-block tracking-wide uppercase">Explore Global Catalog</span>
                        <h1 class="text-[36px] lg:text-[48px] font-black text-gray-900 leading-tight mb-4 tracking-tight text-stroke">Discover Premium Stone & Materials</h1>
                        <p class="text-[16px] text-gray-500 mb-8 leading-relaxed">Browse high-quality products from top merchants worldwide. Connect with suppliers and find the perfect match for your project.</p>
                        
                        <!-- Search & Filter Bar -->
                        <div class="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 items-center">
                            <div class="relative flex-1 w-full">
                                <svg class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input v-model="searchQuery" type="text" placeholder="Search products, materials, or SKU..."
                                    class="w-full pl-12 pr-4 py-3.5 rounded-[18px] border-none focus:outline-none focus:ring-0 text-[15px] text-gray-700 bg-transparent">
                            </div>
                            
                            <div class="h-8 w-[1px] bg-gray-100 hidden sm:block"></div>

                            <!-- Country Selector -->
                            <div class="relative w-full sm:w-[200px]">
                                <select v-model="selectedCountry" @change="handleFilterChange"
                                    class="w-full pl-4 pr-10 py-3.5 rounded-[18px] border-none focus:outline-none focus:ring-0 text-[15px] font-medium text-gray-700 bg-transparent appearance-none cursor-pointer">
                                    <option :value="null">All Countries</option>
                                    <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
                                </select>
                                <svg class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </div>

                            <button @click="handleFilterChange"
                                class="bg-gray-900 hover:bg-black text-white px-8 py-3.5 rounded-[18px] font-bold text-[15px] transition-all transform hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto">
                                Search
                            </button>
                        </div>
                    </div>

                    <!-- Loading State -->
                    <div v-if="productStore.loading" class="flex flex-col items-center justify-center py-20">
                        <div class="w-12 h-12 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin mb-4"></div>
                        <p class="text-gray-500 font-medium">Fetching global products...</p>
                    </div>

                    <!-- Empty State -->
                    <div v-else-if="mappedProducts.length === 0" class="text-center py-20 bg-white rounded-[32px] border border-dashed border-gray-200">
                        <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                        <h3 class="text-[20px] font-bold text-gray-900 mb-2">No products found</h3>
                        <p class="text-gray-500">Try adjusting your filters or searching for something else.</p>
                        <button @click="resetFilters" class="mt-6 text-orange-500 font-bold hover:underline">Clear all filters</button>
                    </div>

                    <!-- Product Grid -->
                    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                        <div v-for="product in mappedProducts" :key="product.id"
                            class="group bg-white rounded-[28px] border border-gray-100 p-3 transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 flex flex-col relative overflow-hidden">
                            
                            <!-- Product Image -->
                            <div class="aspect-[4/3] rounded-[22px] overflow-hidden mb-5 bg-[#F8F9FA] relative">
                                <img :src="product.image" :alt="product.name"
                                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                                
                                <!-- Tenant Badge -->
                                <div class="absolute top-3 left-3 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-black text-gray-900 shadow-sm uppercase tracking-tighter">
                                    {{ product.tenant_name }}
                                </div>

                                <!-- Country Code -->
                                <div v-if="product.country" class="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[12px] font-bold text-gray-900 shadow-sm border border-gray-50">
                                    {{ product.country }}
                                </div>
                            </div>

                            <!-- Details -->
                            <div class="px-2 flex flex-col flex-1 pb-2">
                                <div class="flex justify-between items-start mb-2 gap-2">
                                    <h3 class="text-[17px] font-bold text-gray-900 leading-tight group-hover:text-orange-600 transition-colors line-clamp-1 italic">{{ product.name }}</h3>
                                </div>
                                
                                <p class="text-[13px] text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                                    {{ product.description || 'Premium architectural material selected for global standards.' }}
                                </p>

                                <div class="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
                                    <!-- Price / Action -->
                                    <div class="flex flex-col">
                                        <p v-if="product.price" class="text-[18px] font-black text-gray-900">
                                            {{ product.price.amount }} <span class="text-[12px] font-bold text-gray-400 ml-0.5">{{ product.price.currency }}</span>
                                        </p>
                                        <div v-else class="flex items-center gap-1.5">
                                            <svg class="text-orange-500" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                            </svg>
                                            <span class="text-[11px] font-bold text-orange-600 uppercase tracking-widest leading-none">Price Locked</span>
                                        </div>
                                    </div>

                                    <router-link :to="'/products/' + product.id"
                                        class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 hover:bg-orange-600 hover:text-white transition-all transform hover:rotate-45">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                            <line x1="7" y1="17" x2="17" y2="7"></line>
                                            <polyline points="7 7 17 7 17 17"></polyline>
                                        </svg>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Pagination -->
                    <div v-if="mappedProducts.length > 0" class="mt-16 flex justify-center gap-2 items-center">
                        <button class="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-900 hover:text-gray-900 transition-colors bg-white shadow-sm">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <div class="px-6 py-2 bg-gray-900 text-white rounded-full text-[14px] font-bold shadow-md">1</div>
                        <button class="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-900 hover:text-gray-900 transition-colors bg-white shadow-sm">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </div>

                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useProductStore } from '../store/product'
import Navbar from '../components/Navbar.vue'
import HeaderComponent from '../components/header.vue'

const productStore = useProductStore()
const isSidebarOpen = ref(false)
const searchQuery = ref('')
const selectedCountry = ref(null)

const apiUrl = import.meta.env.VITE_API_URL || ''

const countries = computed(() => productStore.marketplaceCountries)

const mappedProducts = computed(() => {
    return productStore.marketplaceProducts.map(p => {
        let image = 'https://via.placeholder.com/600x450?text=No+Image'
        if (p.images && p.images.length > 0) {
            image = p.images[0].url.startsWith('/') ? `${apiUrl}${p.images[0].url}` : p.images[0].url
        } else if (p.image_url) {
             image = p.image_url.startsWith('/') ? `${apiUrl}${p.image_url}` : p.image_url
        }

        return {
            ...p,
            image
        }
    }).filter(p => {
        if (!searchQuery.value) return true
        const query = searchQuery.value.toLowerCase()
        return p.name.toLowerCase().includes(query) || 
               p.description?.toLowerCase().includes(query) ||
               p.tenant_name?.toLowerCase().includes(query) ||
               p.merchant_sku?.toLowerCase().includes(query)
    })
})

const fetchProducts = async () => {
    try {
        await productStore.fetchMarketplaceProducts({
            country: selectedCountry.value,
            limit: 100
        })
    } catch (error) {
        console.error('Marketplace fetch error:', error)
    }
}

const handleFilterChange = () => {
    fetchProducts()
}

const resetFilters = () => {
    searchQuery.value = ''
    selectedCountry.value = null
    fetchProducts()
}

onMounted(async () => {
    fetchProducts()
    productStore.fetchMarketplaceCountries()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.text-stroke {
    -webkit-text-stroke: 0.5px rgba(0,0,0,0.1);
}

.line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
