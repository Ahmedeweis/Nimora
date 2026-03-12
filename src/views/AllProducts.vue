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
                    <div class="mb-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                            <h1 class="text-[26px] font-bold text-gray-900 mb-1 tracking-tight" style="margin: 0 0;">
                                Product
                                Management</h1>
                            <p class="text-gray-500 text-[15px]">Manage your product catalog</p>
                        </div>
                        <router-link to="/add-product" style="background-color: #8C7A6B"
                            class="flex w-max items-center gap-2 px-5 py-2.5 bg-[#8C7A6B] hover:bg-[#7a6b5d] text-white rounded-xl text-sm font-medium transition-colors shadow-sm">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Add Product
                        </router-link>
                    </div>



                    <!-- Controls Toolbar -->
                    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">

                        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <!-- View Toggles -->
                            <div class="flex bg-white p-1 rounded-xl" style="border: solid 2px #8C7A6B;">
                                <button @click="currentView = 'list'" style="margin: 0 5px;"
                                    :class="currentView === 'list' ? 'bg-[#8c7a6b] text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'"
                                    class="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer">
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
                                <button @click="currentView = 'grid'"
                                    :class="currentView === 'grid' ? 'bg-[#8c7a6b] text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'"
                                    class="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer">
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
                            <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 ">
                                <button v-for="filter in ['All', 'Published', 'Draft', 'AI Preview']" :key="filter"
                                    class=" cursor-pointer" @click="activeFilter = filter" :class="[
                                        'px-5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border',
                                        activeFilter === filter
                                            ? 'bg-gray-900 text-white border-transparent'
                                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                    ]">
                                    {{ filter }}
                                </button>
                                
                                <!-- Category Badge -->
                                <div v-if="selectedCategory" 
                                    class="flex items-center gap-2 px-3 py-1.5 bg-[#847365]/10 border border-[#847365]/20 rounded-full text-[13px] font-medium text-[#847365] whitespace-nowrap">
                                    <span>Category: {{ selectedCategory }}</span>
                                    <button @click="clearCategoryFilter" class="hover:text-[#736458] transition-colors p-0.5">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </div>
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

                    <!-- Products List View-->
                    <div v-if="currentView === 'list'" class="flex flex-col gap-3 mb-6">
                        <router-link v-for="product in paginatedProducts" :key="'list-' + product.id"
                            :to="`/products/${product.id}`"
                            class="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between hover:border-gray-300 hover:shadow-sm transition-all group">
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
                                <div class="hidden sm:flex items-center justify-center px-3 py-1 rounded-full text-[13px] font-medium"
                                    :class="getStatusClasses(product.status)">
                                    <span class="w-1.5 h-1.5 rounded-full mr-2"
                                        :class="getStatusDotClass(product.status)"></span>
                                    {{ product.status }}
                                </div>
                                <div class="flex items-center gap-2">
                                    <button @click.prevent="handleDeleteProduct(product.id)"
                                        class="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path
                                                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                            </path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>
                                    </button>
                                    <div class="text-gray-300 group-hover:text-gray-500 transition-colors">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>

                    <!-- Products Grid View -->
                    <div v-if="currentView === 'grid'"
                        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mb-6">
                        <router-link v-for="product in paginatedProducts" :key="'grid-' + product.id"
                            :to="`/products/${product.id}`"
                            class="bg-white border border-gray-200 rounded-[20px] p-2 flex flex-col hover:border-gray-300 hover:shadow-md transition-all group">
                            <!-- Image Area -->
                            <div class="relative w-full aspect-square rounded-[14px] overflow-hidden mb-3 bg-gray-50">
                                <img :src="product.image" :alt="product.name"
                                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <!-- Absolute Badge -->
                                <div class="absolute top-3 right-3 flex items-center justify-center px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-[13px] font-medium shadow-sm transition-transform group-hover:-translate-y-0.5"
                                    :class="getGridBadgeTextClass(product.status)">
                                    <span class="w-1.5 h-1.5 rounded-full mr-2"
                                        :class="getStatusDotClass(product.status)"></span>
                                    {{ product.status }}
                                </div>
                            </div>

                            <!-- Content Area -->
                            <div class="flex flex-col flex-1 px-2 pb-2 min-w-0">
                                <div class="flex justify-between items-start mb-2 gap-2">
                                    <div class="min-w-0 flex-1">
                                        <h3 class="text-[15px] font-semibold text-gray-900 mb-0.5 truncate">{{
                                            product.name }}
                                        </h3>
                                        <p class="text-[13px] text-gray-500 truncate">{{ product.category }}</p>
                                    </div>
                                    <div class="flex flex-wrap gap-1.5 flex-shrink-0 justify-end max-w-[120px]">
                                        <span v-for="tag in (product.tags || []).slice(0, 2)" :key="tag"
                                            class="px-2.5 py-1 bg-[#f7f7f7] text-gray-600 rounded-full text-[11px] font-medium whitespace-nowrap">
                                            {{ tag }}
                                        </span>
                                        <span v-if="(product.tags || []).length > 2"
                                            class="px-2.5 py-1 bg-[#f7f7f7] text-gray-400 rounded-full text-[11px] font-medium whitespace-nowrap">
                                            +{{ (product.tags || []).length - 2 }}
                                        </span>
                                    </div>
                                </div>

                                <div class="flex items-center gap-4 mt-auto text-[13px] text-gray-500 font-medium pt-2">
                                    <span class="flex items-center gap-1.5">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="text-gray-400">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                        {{ product.views }}
                                    </span>
                                    <span class="flex items-center gap-1 text-gray-400">
                                        $ <span class="text-gray-600 font-semibold">{{ product.price }}</span>
                                    </span>
                                </div>
                            </div>
                        </router-link>
                    </div>

                    <PaginationComponent :current-page="currentPage" :total-pages="totalPages"
                        :total-items="filteredProducts.length" :per-page="perPage"
                        @page-change="currentPage = $event" />

                </div>
            </main>
        </div>

        <DeleteModal :is-open="showDeleteModal" title="Delete Product?"
            description="Are you sure you want to delete this product? This action cannot be undone."
            :loading="isDeleting" @close="showDeleteModal = false" @confirm="confirmDelete" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../store/product'
import { useSettingStore } from '../store/setting'
import Navbar from '../components/Navbar.vue'
import HeaderComponent from '../components/header.vue'
import PaginationComponent from '../components/pagnetion.vue'
import DeleteModal from '../components/DeleteModal.vue'
import { useToast } from 'vue-toastification'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const productStore = useProductStore()
const settingStore = useSettingStore()
const isSidebarOpen = ref(false)
const currentView = ref('grid')
const activeFilter = ref('All')
const selectedCategory = ref(route.query.category || null)

// Watch for route query changes (e.g. when navigating from categories)
watch(() => route.query.category, (newCat) => {
    selectedCategory.value = newCat || null
})

const clearCategoryFilter = () => {
    selectedCategory.value = null
    const query = { ...route.query }
    delete query.category
    router.replace({ query })
}

const currentPage = ref(1)
const perPage = 10
const showDeleteModal = ref(false)
const productIdToDelete = ref(null)
const isDeleting = ref(false)

const catalogLink = computed(() => {
    const origin = window.location.origin
    const slug = settingStore.marketplaceVisibility?.slug || 'nimora-studio'
    return `${origin}/catalog/${slug}`
})
const linkCopied = ref(false)

const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(catalogLink.value)
        linkCopied.value = true
        setTimeout(() => {
            linkCopied.value = false
        }, 2000)
    } catch (err) {
        console.error('Failed to copy link:', err)
    }
}

onMounted(async () => {
    try {
        await Promise.all([
            productStore.fetchProducts({ skip: 0, limit: 1000 }),
            settingStore.fetchMarketplaceVisibility()
        ])
    } catch (error) {
        console.error('Failed to load data:', error)
    }
})

const handleDeleteProduct = (productId) => {
    productIdToDelete.value = productId
    showDeleteModal.value = true
}

const confirmDelete = async () => {
    if (!productIdToDelete.value) return
    isDeleting.value = true
    try {
        await productStore.deleteProduct(productIdToDelete.value)
        toast.success('Product deleted successfully')
        showDeleteModal.value = false
        productIdToDelete.value = null
    } catch (error) {
        toast.error(error.message || 'Failed to delete product')
    } finally {
        isDeleting.value = false
    }
}

const mappedProducts = computed(() => {
    const apiUrl = import.meta.env.VITE_API_URL || ''
    return productStore.products.map(product => {
        let imageUrl = 'https://via.placeholder.com/400x400?text=No+Image'
        if (product.images?.[0]?.url) {
            imageUrl = product.images[0].url
            if (imageUrl.startsWith('/')) {
                imageUrl = `${apiUrl}${imageUrl}`
            }
        }

        const rawCategory = product.metadata?.category || 'Uncategorized'

        return {
            id: product.id,
            name: product.name,
            rawCategory: rawCategory,
            category: rawCategory + (product.metadata?.classification ? ` • ${product.metadata.classification}` : ''),
            image: imageUrl,
            views: product.metadata?.views || '0',
            price: product.price?.amount || '0',
            status: product.status || product.metadata?.status || 'Published',
            tags: product.applications?.map(app => app.name) || []
        }
    })
})

const filteredProducts = computed(() => {
    let items = mappedProducts.value

    // Status Filter
    if (activeFilter.value !== 'All') {
        items = items.filter(p => p.status === activeFilter.value)
    }

    // Category Filter
    if (selectedCategory.value) {
        items = items.filter(p => p.rawCategory === selectedCategory.value)
    }

    return items
})

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * perPage
    const end = start + perPage
    return filteredProducts.value.slice(start, end)
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / perPage)))

const getGridBadgeTextClass = (status) => {
    switch (status) {
        case 'Published': return 'text-emerald-500'
        case 'Draft': return 'text-slate-500'
        case 'AI Preview': return 'text-orange-500'
        default: return 'text-gray-600'
    }
}

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