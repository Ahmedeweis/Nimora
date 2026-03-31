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
                    <!-- Catalog Link Box -->
                    <!-- <div
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
                                    {{ catalogLink }}</p>
                            </div>
                        </div>
                        <button @click="copyLink"
                            class="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors"
                            :class="linkCopied ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'border-gray-200 text-gray-700 hover:bg-gray-50'">
                            <svg v-if="!linkCopied" width="16" height="16" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            {{ linkCopied ? 'Copied!' : 'Copy' }}
                        </button>
                    </div> -->
                    <!-- Categories Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="category in categories" :key="category.id"
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
                                <button @click="navigateToCategoryProducts(category.name)" style="margin-top: 10px;"
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
                                    <button @click.stop="toggleMenu(category.id)"
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
                                    <div v-if="activeMenu === category.id"
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

                                        <button @click="handleDeleteCategory(category)"
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
                        <input type="text" v-model="categoryForm.name" placeholder="e.g. Marble Surfaces"
                            class="w-full px-4 py-3 rounded-[12px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#847365]/20 focus:border-[#847365] transition-colors text-[14px]">
                    </div>

                    <!-- Category Description -->
                    <div>
                        <label class="block text-[14px] font-medium text-gray-900 mb-2">Description</label>
                        <textarea v-model="categoryForm.description" placeholder="Describe this category..." rows="3"
                            class="w-full px-4 py-3 rounded-[12px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#847365]/20 focus:border-[#847365] transition-colors text-[14px] resize-none"></textarea>
                    </div>

                    <!-- Category Image -->
                    <div>
                        <label class="block text-[14px] font-medium text-gray-900 mb-2">Category Image</label>
                        <input type="file" ref="categoryFileInput" class="hidden" @change="handleCategoryFileChange"
                            accept="image/*">
                        <div @click="triggerCategoryFileUpload"
                            class="border-2 border-dashed border-gray-200 rounded-[12px] p-0 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group min-h-[160px] relative overflow-hidden">
                            <img v-if="categoryForm.imagePreview" :src="categoryForm.imagePreview"
                                class="absolute inset-0 w-full h-full object-cover">
                            <template v-else>
                                <svg class="w-6 h-6 text-gray-600 mb-3 transition-colors" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="17 8 12 3 7 8"></polyline>
                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                </svg>
                                <span class="text-[14px] font-medium text-gray-600 mb-1">Upload Image</span>
                                <span class="text-[13px] text-gray-400">PNG, JPG up to 10MB</span>
                            </template>
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
                    <button @click="handleAddCategory" :disabled="isAddingCategory"
                        class="flex-1 py-3 px-4 bg-[#847365] hover:bg-[#736458] text-white rounded-xl text-[14px] font-semibold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                        {{ isAddingCategory ? 'Adding...' : 'Add Category' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../store/product'
import { useCatalogStore } from '../store/catalog'
import Navbar from '../components/Navbar.vue'
import HeaderComponent from '../components/header.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const router = useRouter()
const productStore = useProductStore()
const catalogStore = useCatalogStore()

const isSidebarOpen = ref(false)
const activeMenu = ref(null)
const isAddModalOpen = ref(false)
const categoryFileInput = ref(null)
const isAddingCategory = ref(false)

const categoryForm = reactive({
    name: '',
    description: '',
    imageFile: null,
    imagePreview: null
})

const triggerCategoryFileUpload = () => {
    categoryFileInput.value.click()
}

const handleCategoryFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        categoryForm.imageFile = file
        categoryForm.imagePreview = URL.createObjectURL(file)
    }
}

const toggleMenu = (index) => {
    if (activeMenu.value === index) {
        activeMenu.value = null
    } else {
        activeMenu.value = index
    }
}

const handleAddCategory = async () => {
    if (!categoryForm.name.trim()) {
        toast.warning('Please enter a category name')
        return
    }

    isAddingCategory.value = true
    try {
        await catalogStore.createCategory({
            name: categoryForm.name,
            description: categoryForm.description
            // image: categoryForm.imageFile // Schema doesn't explicitly list image in POST /api/v1/catalog/categories
        })

        toast.success(`Category "${categoryForm.name}" created successfully`)

        // Update local state or re-fetch
        await catalogStore.fetchCategories()

        // Reset form
        categoryForm.name = ''
        categoryForm.description = ''
        categoryForm.imageFile = null
        categoryForm.imagePreview = null
        isAddModalOpen.value = false
    } catch (error) {
        console.error('Failed to create category:', error)
        toast.error(error.message || 'Failed to create category')
    } finally {
        isAddingCategory.value = false
    }
}

const handleDeleteCategory = async (category) => {
    if (!confirm(`Are you sure you want to delete category "${category.name}"?`)) return
    try {
        if (category.id) {
            await catalogStore.deleteCategory(category.id)
            toast.success('Category deleted successfully')
            await catalogStore.fetchCategories()
        } else {
            toast.warning('Category ID not found')
        }
    } catch (error) {
        toast.error('Failed to delete category')
    }
    activeMenu.value = null
}

const navigateToCategoryProducts = (categoryName) => {
    router.push({
        path: '/products',
        query: { category: categoryName }
    })
}

// Close menu when clicking outside
const closeMenu = (e) => {
    activeMenu.value = null
}

onMounted(async () => {
    document.addEventListener('click', closeMenu)
    try {
        await Promise.all([
            catalogStore.fetchCategories().catch(() => {}),
            productStore.fetchProducts({ skip: 0, limit: 1000 })
        ])
    } catch (error) {
        console.error('Failed to fetch data:', error)
    }
})

onUnmounted(() => {
    document.removeEventListener('click', closeMenu)
})

// Categories derived from store
const categories = computed(() => {
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
