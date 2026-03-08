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
                            <h1 class="text-[24px] font-bold text-gray-900 leading-tight mb-1">{{ catalog.name }}</h1>
                            <p class="text-[14px] text-gray-500">{{ catalog.name }} Products</p>
                        </div>
                        <div class="flex items-center gap-3">
                            <!-- Normal mode buttons -->
                            <template v-if="!hasSelection">
                                <button @click="openEditModal"
                                    class="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-[12px] text-[14px] font-medium transition-colors">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M12 20h9"></path>
                                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                    </svg>
                                    Edit
                                </button>
                                <button @click="openAddProductsModal"
                                    class="flex items-center gap-2 px-5 py-2.5 bg-[#847365] hover:bg-[#736458] text-white rounded-[12px] text-[14px] font-medium transition-colors shadow-sm whitespace-nowrap">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Add Products
                                </button>
                            </template>
                            <!-- Selection mode buttons -->
                            <template v-else>
                                <button @click="selectedIds = []"
                                    class="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-[12px] text-[14px] font-medium transition-colors">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="15" y1="9" x2="9" y2="15"></line>
                                        <line x1="9" y1="9" x2="15" y2="15"></line>
                                    </svg>
                                    Cancel
                                </button>
                                <button
                                    class="flex items-center gap-2 px-5 py-2.5 bg-[#847365] hover:bg-[#736458] text-white rounded-[12px] text-[14px] font-medium transition-colors shadow-sm whitespace-nowrap">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z">
                                        </path>
                                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                        <polyline points="7 3 7 8 15 8"></polyline>
                                    </svg>
                                    Save
                                </button>
                            </template>
                        </div>
                    </div>

                    <!-- Filters & Search -->
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <!-- Filter Tabs -->
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

                        <!-- Search -->
                        <div class="relative w-full sm:w-auto">
                            <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input type="text" v-model="searchQuery" placeholder="Search products..."
                                class="w-full sm:w-[280px] pl-10 pr-4 py-2.5 rounded-[12px] border border-gray-200 bg-white text-[14px] focus:outline-none focus:ring-2 focus:ring-[#847365]/20 focus:border-[#847365] transition-colors">
                        </div>
                    </div>

                    <!-- Selection Bar -->
                    <div v-if="hasSelection"
                        class="mb-4 flex items-center justify-between px-4 py-3 bg-red-50 border border-red-100 rounded-[14px]">
                        <div class="flex items-center gap-3">
                            <input type="checkbox" :checked="isAllSelected" @change="toggleAll"
                                class="w-4 h-4 accent-[#847365] rounded cursor-pointer">
                            <span class="text-[14px] text-gray-700 font-medium">{{ selectedIds.length }} Product{{
                                selectedIds.length > 1 ?
                                    's' : '' }} Selected</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <button @click="deleteSelected"
                                class="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-[10px] text-[13px] font-medium transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path
                                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                    </path>
                                </svg>
                                Delete Selected
                            </button>
                            <button @click="selectedIds = []"
                                class="w-8 h-8 flex items-center justify-center rounded-[8px] hover:bg-red-100 text-gray-500 transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Products List -->
                    <div class="flex flex-col gap-3">
                        <div v-for="product in paginatedProducts" :key="product.id" :class="[
                            'bg-white rounded-[16px] border px-4 py-3 flex items-center gap-4 hover:shadow-sm transition-all',
                            selectedIds.includes(product.id) ? 'border-[#847365]/40 bg-[#faf8f6]' : 'border-gray-100'
                        ]">

                            <!-- Checkbox -->
                            <input type="checkbox" :checked="selectedIds.includes(product.id)"
                                @change="toggleSelect(product.id)" @click.stop
                                class="w-4 h-4 accent-[#847365] rounded cursor-pointer flex-shrink-0">

                            <!-- Product Image -->
                            <div class="w-[60px] h-[60px] flex-shrink-0 rounded-[10px] overflow-hidden bg-gray-50 cursor-pointer"
                                @click="$router.push('/products/' + product.id)">
                                <img :src="product.image" :alt="product.name" class="w-full h-full object-cover">
                            </div>

                            <!-- Product Info -->
                            <div class="flex-1 min-w-0">
                                <h3 class="text-[15px] font-semibold text-gray-900 truncate">{{ product.name }}</h3>
                                <p class="text-[13px] text-gray-400">{{ product.category }}</p>
                                <div class="flex items-center gap-3 mt-1">
                                    <span class="flex items-center gap-1 text-[12px] text-gray-400">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                        {{ product.views }}
                                    </span>
                                    <span class="flex items-center gap-1 text-[12px] text-gray-400">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <line x1="12" y1="1" x2="12" y2="23"></line>
                                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                        </svg>
                                        {{ product.price }}
                                    </span>
                                </div>
                            </div>

                            <!-- Status Badge -->
                            <div class="flex items-center gap-3 flex-shrink-0">
                                <span :class="[
                                    'flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium',
                                    product.status === 'Published' ? 'bg-green-50 text-green-600' :
                                        product.status === 'Draft' ? 'bg-gray-100 text-gray-500' :
                                            'bg-orange-50 text-orange-500'
                                ]">
                                    <span class="w-1.5 h-1.5 rounded-full inline-block" :class="[
                                        product.status === 'Published' ? 'bg-green-500' :
                                            product.status === 'Draft' ? 'bg-gray-400' :
                                                'bg-orange-400'
                                    ]"></span>
                                    {{ product.status }}
                                </span>
                                <svg class="text-gray-300" width="16" height="16" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Pagination -->
                    <Pagnetion :current-page="currentPage" :total-pages="totalPages"
                        :total-items="filteredProducts.length" :per-page="perPage"
                        @page-change="currentPage = $event" />

                </div>
            </main>
        </div>
    </div>

    <!-- Add Products Modal -->
    <div v-if="isAddProductsModalOpen" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="isAddProductsModalOpen = false"></div>

        <!-- Modal -->
        <div
            class="bg-white rounded-t-[24px] sm:rounded-[20px] w-full sm:max-w-[520px] z-10 shadow-xl flex flex-col max-h-[85vh]">
            <div class="p-6 pb-4">
                <h2 class="text-[20px] font-bold text-gray-900 mb-1">Select Products</h2>
                <p class="text-[14px] text-gray-500">Add products to {{ catalog.name }}.</p>
            </div>

            <div class="px-6">
                <div class="w-full h-[1px] bg-gray-100"></div>
            </div>

            <!-- Search -->
            <div class="px-6 py-4">
                <div class="relative">
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="text" v-model="addProductsSearch" placeholder="Search products..."
                        class="w-full pl-10 pr-4 py-2.5 rounded-[12px] border border-gray-200 bg-gray-50 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#847365]/20 focus:border-[#847365] transition-colors">
                </div>
            </div>

            <!-- Products list -->
            <div class="px-6 flex flex-col gap-2 overflow-y-auto flex-1 pb-4">
                <div v-for="product in availableProducts" :key="product.id" @click="toggleAddProduct(product.id)"
                    :class="[
                        'flex items-center gap-4 p-3 rounded-[14px] border cursor-pointer transition-all',
                        addSelectedIds.includes(product.id)
                            ? 'border-[#847365]/40 bg-[#faf8f6]'
                            : 'border-gray-100 bg-white hover:bg-gray-50'
                    ]">
                    <!-- Checkbox -->
                    <div :class="[
                        'w-5 h-5 rounded-[5px] border-2 flex items-center justify-center flex-shrink-0 transition-colors',
                        addSelectedIds.includes(product.id) ? 'border-[#847365] bg-[#847365]' : 'border-gray-300'
                    ]">
                        <svg v-if="addSelectedIds.includes(product.id)" width="12" height="12" viewBox="0 0 24 24"
                            fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <!-- Image -->
                    <div class="w-[56px] h-[56px] rounded-[10px] overflow-hidden flex-shrink-0">
                        <img :src="product.image" :alt="product.name" class="w-full h-full object-cover">
                    </div>
                    <!-- Info -->
                    <div class="flex-1 min-w-0">
                        <h3 class="text-[14px] font-semibold text-gray-900 truncate">{{ product.name }}</h3>
                        <p class="text-[12px] text-gray-400">{{ product.type }}</p>
                    </div>
                </div>
            </div>

            <div class="px-6">
                <div class="w-full h-[1px] bg-gray-100"></div>
            </div>

            <!-- Footer -->
            <div class="p-6 pt-4">
                <button @click="confirmAddProducts" :disabled="addSelectedIds.length === 0"
                    class="w-full py-3.5 bg-[#847365] hover:bg-[#736458] disabled:opacity-50 text-white rounded-[14px] text-[15px] font-semibold transition-colors shadow-sm">
                    Add products{{ addSelectedIds.length > 0 ? ` (${addSelectedIds.length})` : '' }}
                </button>
            </div>
        </div>
    </div>

    <!-- Edit Catalog Modal -->
    <div v-if="isEditModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="isEditModalOpen = false"></div>

        <!-- Modal Content -->
        <div class="bg-white rounded-[20px] w-full max-w-[500px] z-10 shadow-xl overflow-hidden flex flex-col">
            <div class="p-6 pb-4">
                <h2 class="text-[20px] font-bold text-gray-900 mb-1">Edit</h2>
                <p class="text-[14px] text-gray-500">Edit Catalog to organize your products.</p>
            </div>

            <div class="px-6">
                <div class="w-full h-[1px] bg-gray-100"></div>
            </div>

            <div class="p-6 flex flex-col gap-6">
                <!-- Catalog Name -->
                <div>
                    <label class="block text-[14px] font-medium text-gray-900 mb-2">Catalog Name</label>
                    <input type="text" v-model="editCatalog.name"
                        class="w-full px-4 py-3 rounded-[12px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#847365]/20 focus:border-[#847365] transition-colors text-[14px]">
                </div>

                <!-- Catalog Image -->
                <div>
                    <label class="block text-[14px] font-medium text-gray-900 mb-2">Catalog Image</label>
                    <div
                        class="relative w-full h-[200px] rounded-[12px] overflow-hidden border border-gray-100 shadow-sm">
                        <img :src="editCatalog.image" :alt="editCatalog.name" class="w-full h-full object-cover">
                        <!-- Upload Button -->
                        <button
                            class="absolute bottom-3 right-3 w-[38px] h-[38px] bg-white rounded-lg flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div class="px-6">
                <div class="w-full h-[1px] bg-gray-100"></div>
            </div>

            <div class="p-6 pt-5 flex gap-3">
                <button @click="isEditModalOpen = false"
                    class="flex-1 py-3 px-4 border border-gray-200 text-gray-900 rounded-[12px] text-[15px] font-medium hover:bg-gray-50 transition-colors">
                    Cancel
                </button>
                <button @click="saveEdit"
                    class="flex-1 py-3 px-4 bg-[#847365] text-white rounded-[12px] text-[15px] font-medium hover:bg-[#736458] transition-colors shadow-sm">
                    Update
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import HeaderComponent from '../components/header.vue'
import Pagnetion from '../components/pagnetion.vue'

import productImg1 from '../assets/imgs/product/1.webp'
import productImg2 from '../assets/imgs/product/2.webp'
import productImg3 from '../assets/imgs/product/3.webp'

const isSidebarOpen = ref(false)
const route = useRoute()
const searchQuery = ref('')
const activeFilter = ref('All')
const currentPage = ref(1)
const perPage = 5
const selectedIds = ref([])

const hasSelection = computed(() => selectedIds.value.length > 0)
const isAllSelected = computed(() =>
    paginatedProducts.value.length > 0 &&
    paginatedProducts.value.every(p => selectedIds.value.includes(p.id))
)

const toggleSelect = (id) => {
    if (selectedIds.value.includes(id)) {
        selectedIds.value = selectedIds.value.filter(i => i !== id)
    } else {
        selectedIds.value = [...selectedIds.value, id]
    }
}

const toggleAll = () => {
    if (isAllSelected.value) {
        selectedIds.value = selectedIds.value.filter(id =>
            !paginatedProducts.value.some(p => p.id === id)
        )
    } else {
        const newIds = paginatedProducts.value.map(p => p.id)
        selectedIds.value = [...new Set([...selectedIds.value, ...newIds])]
    }
}

const deleteSelected = () => {
    allProducts.value = allProducts.value.filter(p => !selectedIds.value.includes(p.id))
    selectedIds.value = []
}

// Mock catalog data based on route param
const catalogImages = [productImg1, productImg2, productImg3]
const catalogIndex = parseInt(route.params.id) || 0
const catalog = ref({
    name: 'Catalog ' + (catalogIndex + 1),
    image: catalogImages[catalogIndex % catalogImages.length]
})

const isEditModalOpen = ref(false)
const editCatalog = ref({ name: '', image: '' })
const isAddProductsModalOpen = ref(false)
const addProductsSearch = ref('')
const addSelectedIds = ref([])

// All products available in the store (outside the catalog)
const storeProducts = ref([
    { id: 101, name: 'Product1', type: 'Marbel', image: productImg1 },
    { id: 102, name: 'Product1', type: 'Marbel', image: productImg1 },
    { id: 103, name: 'Product1', type: 'Marbel', image: productImg1 },
    { id: 104, name: 'Product1', type: 'Marbel', image: productImg1 },
])

const availableProducts = computed(() => {
    if (!addProductsSearch.value) return storeProducts.value
    return storeProducts.value.filter(p =>
        p.name.toLowerCase().includes(addProductsSearch.value.toLowerCase())
    )
})

const openAddProductsModal = () => {
    addSelectedIds.value = []
    addProductsSearch.value = ''
    isAddProductsModalOpen.value = true
}

const toggleAddProduct = (id) => {
    if (addSelectedIds.value.includes(id)) {
        addSelectedIds.value = addSelectedIds.value.filter(i => i !== id)
    } else {
        addSelectedIds.value = [...addSelectedIds.value, id]
    }
}

const confirmAddProducts = () => {
    const toAdd = storeProducts.value.filter(p => addSelectedIds.value.includes(p.id))
    const nextId = Math.max(...allProducts.value.map(p => p.id)) + 1
    toAdd.forEach((p, i) => {
        allProducts.value.push({
            id: nextId + i,
            name: p.name,
            category: p.type,
            views: 0,
            price: 0,
            status: 'Draft',
            image: p.image,
            type: p.type
        })
    })
    isAddProductsModalOpen.value = false
}

const openEditModal = () => {
    editCatalog.value = { ...catalog.value }
    isEditModalOpen.value = true
}

const saveEdit = () => {
    catalog.value = { ...editCatalog.value }
    isEditModalOpen.value = false
}

const filters = ['All', 'Marbel', 'Porcelen']

// Mock Products
const allProducts = ref([
    { id: 1, name: 'Carrara Marble', category: 'Marble · Natural Stone', views: 50, price: 250, status: 'Published', image: productImg1, type: 'Marbel' },
    { id: 2, name: 'Geometric Ceramic Tile', category: 'Ceramic', views: 125, price: 250, status: 'Draft', image: productImg2, type: 'Porcelen' },
    { id: 3, name: 'Herringbone Oak Parquet', category: 'Wood', views: 200, price: 250, status: 'AI Preview', image: productImg3, type: 'Marbel' },
    { id: 4, name: 'Herringbone Oak Parquet', category: 'Wood', views: 200, price: 250, status: 'AI Preview', image: productImg1, type: 'Porcelen' },
    { id: 5, name: 'Travertine Stone', category: 'Natural Stone', views: 80, price: 350, status: 'Published', image: productImg2, type: 'Marbel' },
    { id: 6, name: 'Slate Flooring', category: 'Stone', views: 60, price: 180, status: 'Draft', image: productImg3, type: 'Porcelen' },
])

const filteredProducts = computed(() => {
    let list = allProducts.value
    if (activeFilter.value !== 'All') {
        list = list.filter(p => p.type === activeFilter.value)
    }
    if (searchQuery.value) {
        list = list.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    }
    return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / perPage)))

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * perPage
    return filteredProducts.value.slice(start, start + perPage)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
</style>
