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
                            <h1 class="text-[24px] font-bold text-gray-900 leading-tight mb-1">Catalogs</h1>
                            <p class="text-[14px] text-gray-500">Create and manage catalogs</p>
                        </div>
                        <button @click="isAddModalOpen = true"
                            class="flex items-center gap-2 px-5 py-2.5 bg-[#847365] hover:bg-[#736458] text-white rounded-[12px] text-[14px] font-medium transition-colors shadow-sm whitespace-nowrap">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Add Catalog
                        </button>
                    </div>

                    <!-- Catalogs Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="catalog in catalogs" :key="catalog.id"
                            class="bg-white rounded-[16px] border border-gray-200 p-2 sm:p-3 flex flex-col transition-all hover:shadow-md relative">

                            <!-- Image -->
                            <div class="w-full h-[120px] rounded-[12px] overflow-hidden mb-3">
                                <img :src="catalog.image" :alt="catalog.name" class="w-full h-full object-cover">
                            </div>

                            <!-- Info Section -->
                            <div class="px-1 flex flex-col flex-1">
                                <!-- Top row: Icon & Menu -->
                                <div class="flex justify-between items-start mb-2">
                                    <!-- Stack Icon -->
                                    <div class="w-8 h-8 rounded-full bg-[#fafafa] flex items-center justify-center">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="text-gray-500">
                                            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                            <polyline points="2 12 12 17 22 12"></polyline>
                                            <polyline points="2 17 12 22 22 17"></polyline>
                                        </svg>
                                    </div>

                                    <!-- 3 Dots Menu -->
                                    <div class="relative">
                                        <button @click.stop="toggleMenu(catalog.id)"
                                            class="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-50 rounded-full transition-colors relative z-10">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round">
                                                <circle cx="12" cy="5" r="1.5"></circle>
                                                <circle cx="12" cy="12" r="1.5"></circle>
                                                <circle cx="12" cy="19" r="1.5"></circle>
                                            </svg>
                                        </button>

                                        <!-- Dropdown Menu -->
                                        <div v-if="activeMenu === catalog.id"
                                            class="absolute top-10 right-0 w-36 bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 py-1 z-20 overflow-hidden text-left origin-top-right flex flex-col">

                                            <!-- Backdrop specific to this menu -->
                                            <div class="fixed inset-0 z-[-1]" @click.stop="activeMenu = null"></div>

                                            <button @click="openEditModal(catalog)"
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

                                            <button
                                                class="w-full px-4 py-2.5 text-left text-[14px] text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round">
                                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1">
                                                    </path>
                                                </svg>
                                                Duplicate
                                            </button>

                                            <div class="w-full h-[1px] bg-gray-100 my-0.5"></div>

                                            <button @click="handleDeleteCatalog(catalog)"
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

                                <h3 class="text-[18px] font-bold text-gray-900 mb-0.5 mt-2">{{ catalog.name }}</h3>
                                <p class="text-[13px] text-gray-500 mb-4">{{ catalog.productCount }} Products</p>

                                <!-- View Products Button -->
                                <button @click="$router.push('/catalogs/' + catalog.id)"
                                    class="mt-auto flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-[13px] font-semibold transition-colors">
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
                    <h2 class="text-[20px] font-bold text-gray-900 mb-1">Add New Catalog</h2>
                    <p class="text-[14px] text-gray-500">Create a new Catalog to organize your products.</p>
                </div>

                <div class="px-6">
                    <div class="w-full h-[1px] bg-gray-100"></div>
                </div>

                <div class="p-6 flex flex-col gap-6">
                    <!-- Catalog Name -->
                    <div>
                        <label class="block text-[14px] font-medium text-gray-900 mb-2">Catalog Name</label>
                        <input type="text" v-model="catalogForm.name" placeholder="e.g. Summer Collection"
                            class="w-full px-4 py-3 rounded-[12px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#847365]/20 focus:border-[#847365] transition-colors text-[14px]">
                    </div>

                    <!-- Catalog Description -->
                    <div>
                        <label class="block text-[14px] font-medium text-gray-900 mb-2">Description</label>
                        <textarea v-model="catalogForm.description" placeholder="Describe this catalog..." rows="3"
                            class="w-full px-4 py-3 rounded-[12px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#847365]/20 focus:border-[#847365] transition-colors text-[14px] resize-none"></textarea>
                    </div>

                    <!-- Catalog Image -->
                    <div>
                        <label class="block text-[14px] font-medium text-gray-900 mb-2">Catalog Image</label>
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
                    <button @click="handleAddCatalog" :disabled="isSubmitting"
                        class="flex-1 py-3 px-4 bg-[#847365] text-white rounded-[12px] text-[15px] font-medium hover:bg-[#736458] transition-colors shadow-sm disabled:opacity-50">
                        {{ isSubmitting ? 'Adding...' : 'Add Catalog' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Edit Catalog Modal -->
        <div v-if="isEditModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" @click="isEditModalOpen = false">
            </div>

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
                        <input type="text" v-model="selectedCatalog.name"
                            class="w-full px-4 py-3 rounded-[12px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#847365]/20 focus:border-[#847365] transition-colors text-[14px]">
                    </div>

                    <!-- Catalog Image -->
                    <div>
                        <label class="block text-[14px] font-medium text-gray-900 mb-2">Catalog Image</label>
                        <div
                            class="relative w-full h-[220px] rounded-[12px] overflow-hidden group border border-gray-100 shadow-sm">
                            <img :src="selectedCatalog.image" :alt="selectedCatalog.name"
                                class="w-full h-full object-cover">

                            <!-- Upload Button -->
                            <button
                                class="absolute bottom-3 right-3 w-[38px] h-[38px] bg-white text-gray-700 rounded-lg flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
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
                    <button
                        class="flex-1 py-3 px-4 bg-[#847365] text-white rounded-[12px] text-[15px] font-medium hover:bg-[#736458] transition-colors shadow-sm">
                        Update
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCatalogStore } from '../store/catalog'
import { useProductStore } from '../store/product'
import Navbar from '../components/Navbar.vue'
import HeaderComponent from '../components/header.vue'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()
const catalogStore = useCatalogStore()
const productStore = useProductStore()

const isSidebarOpen = ref(false)
const activeMenu = ref(null)
const isAddModalOpen = ref(false)
const isEditModalOpen = ref(false)
const isSubmitting = ref(false)
const selectedCatalog = ref(null)

const catalogForm = reactive({
    name: '',
    description: '',
    imageFile: null,
    imagePreview: null
})

const openEditModal = (catalog) => {
    selectedCatalog.value = { ...catalog }
    isEditModalOpen.value = true
    activeMenu.value = null
}

const toggleMenu = (id) => {
    if (activeMenu.value === id) {
        activeMenu.value = null
    } else {
        activeMenu.value = id
    }
}

const triggerFileUpload = () => {
    // Hidden file input logic if needed, similar to Categories.vue
}

const handleAddCatalog = async () => {
    if (!catalogForm.name.trim()) {
        toast.warning('Please enter a catalog name')
        return
    }

    isSubmitting.value = true
    try {
        await catalogStore.createCategory({
            name: catalogForm.name,
            description: catalogForm.description
        })
        toast.success(`Catalog "${catalogForm.name}" created successfully`)
        await catalogStore.fetchCategories()
        
        catalogForm.name = ''
        catalogForm.description = ''
        isAddModalOpen.value = false
    } catch (error) {
        toast.error(error.message || 'Failed to create catalog')
    } finally {
        isSubmitting.value = false
    }
}

const handleDeleteCatalog = async (catalog) => {
    if (!confirm(`Are you sure you want to delete catalog "${catalog.name}"?`)) return
    try {
        await catalogStore.deleteCategory(catalog.id)
        toast.success('Catalog deleted successfully')
        await catalogStore.fetchCategories()
    } catch (error) {
        toast.error('Failed to delete catalog')
    }
    activeMenu.value = null
}

const closeMenu = () => {
    activeMenu.value = null
}

onMounted(async () => {
    document.addEventListener('click', closeMenu)
    try {
        await Promise.all([
            catalogStore.fetchCategories(),
            productStore.fetchProducts({ skip: 0, limit: 1000 })
        ])
    } catch (error) {
        console.error('Failed to fetch data:', error)
    }
})

onUnmounted(() => {
    document.removeEventListener('click', closeMenu)
})

// Catalogs derived from store (using categories store for catalogs)
const catalogs = computed(() => {
    const apiUrl = import.meta.env.VITE_API_URL || ''
    return catalogStore.categories.map(cat => ({
        ...cat,
        productCount: productStore.products.filter(p => p.metadata?.category === cat.name).length,
        image: cat.image ? (cat.image.startsWith('/') ? `${apiUrl}${cat.image}` : cat.image) : 'https://via.placeholder.com/400x400?text=No+Image'
    }))
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
</style>
