<template>
  <div class="flex h-screen bg-[#fafafa] overflow-hidden flex-col lg:flex-row relative w-full">
    <Navbar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

    <!-- Backdrop for mobile -->
    <div v-if="isSidebarOpen" @click="isSidebarOpen = false"
      class="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm transition-opacity"></div>

    <div class="flex-1 overflow-y-auto w-full">
      <main class="min-h-full flex flex-col">
        <HeaderComponent @open-sidebar="isSidebarOpen = true" />

        <div class="px-4 lg:px-8 py-4 lg:py-6 max-w-7xl mx-auto w-full" style="padding-top: 0;">
          <!-- Welcome Section -->
          <div class=" mb-8">
            <h1 style="margin: 0 0;" class="text-2xl font-bold text-gray-900 mb-1">Welcome back <span
                class="wave"></span>
            </h1>
            <p class="text-gray-500 text-sm">Here's what's happening with your store today.</p>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-10">
            <!-- Card 1 -->
            <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
              <div class="flex justify-between items-start mb-4">
                <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div
                  class="flex items-center text-emerald-500 text-xs font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                  <svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  +3
                </div>
              </div>
              <div class="mb-1">
                <span class="text-2xl font-bold text-gray-900">{{ productStore.products.length }}</span>
              </div>
              <div class="text-xs text-gray-500 font-medium">
                Total Products <span class="px-1 text-gray-300">•</span> this month
              </div>
            </div>

            <!-- Card 2 -->
            <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
              <div class="flex justify-between items-start mb-4">
                <div class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div
                  class="flex items-center text-emerald-500 text-xs font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                  <svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  +18%
                </div>
              </div>
              <div class="mb-1">
                <span class="text-2xl font-bold text-gray-900">1,000</span>
              </div>
              <div class="text-xs text-gray-500 font-medium">
                Catalog Views <span class="px-1 text-gray-300">•</span> vs last week
              </div>
            </div>

            <!-- Card 3 -->
            <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
              <div class="flex justify-between items-start mb-4">
                <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div
                  class="flex items-center text-emerald-500 text-xs font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                  <svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  +5
                </div>
              </div>
              <div class="mb-1">
                <span class="text-2xl font-bold text-gray-900">100</span>
              </div>
              <div class="text-xs text-gray-500 font-medium">
                Interest Lists <span class="px-1 text-gray-300">•</span> pending
              </div>
            </div>

            <!-- Card 4 -->
            <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
              <div class="flex justify-between items-start mb-4">
                <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div class="flex items-center text-red-500 text-xs font-medium bg-red-50 px-2 py-0.5 rounded-full">
                  <svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                  </svg>
                  -5
                </div>
              </div>
              <div class="mb-1">
                <span class="text-2xl font-bold text-gray-900">0</span>
              </div>
              <div class="text-xs text-gray-500 font-medium">
                Active Customers <span class="px-1 text-gray-300">•</span> approved
              </div>
            </div>
          </div>
          <div class="mb-5">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div class="grid grid-cols-2 lg:flex lg:flex-wrap items-center gap-2 sm:gap-3">
              <router-link to="/add-product"
                class=" flex items-center w-full lg:w-auto justify-center lg:justify-start space-x-2 hovery px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span class="truncate">Add Product</span>
              </router-link>

              <router-link to="/inventory"
                class="hover-two flex items-center w-full lg:w-auto justify-center lg:justify-start space-x-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors">
                <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span class="truncate">Update Inventory</span>
              </router-link>

              <router-link to="/permissions"
                class="hover-two flex items-center w-full lg:w-auto justify-center lg:justify-start space-x-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors">
                <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span class="truncate">Permissions</span>
              </router-link>

              <router-link to="/products"
                class=" hover-two flex items-center w-full lg:w-auto justify-center lg:justify-start space-x-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors">
                <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span class="truncate">View Catalog</span>
              </router-link>
            </div>
          </div>
          <!-- Header -->
          <div class="flex justify-between items-center mb-4">

            <h2 class="text-lg font-bold text-gray-900">Recent Products</h2>
            <router-link to="/products"
              class="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center transition-colors">
              View all
              <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </router-link>
          </div>

          <!-- Container -->
          <div
            class="bg-white border border-gray-200 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
            <div class="flex flex-col">

              <div v-if="productStore.loading" class="p-8 text-center text-gray-500">
                Loading products...
              </div>
              <div v-else-if="recentProducts.length === 0" class="p-8 text-center text-gray-500">
                No products found. Start by adding one!
              </div>
              <div v-else v-for="(product, index) in recentProducts" :key="product.id" :class="['flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer',
                index !== recentProducts.length - 1 ? 'border-b border-gray-100' : '']">

                <div class="flex items-center space-x-4 min-w-0 flex-1 mr-4">
                  <div
                    class="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0 relative">
                    <img :src="getImageUrl(product)" :alt="product.name" class="w-full h-full object-cover" />
                  </div>
                  <div class="min-w-0">
                    <h3 class="text-sm font-medium text-gray-900 truncate">{{ product.name }}</h3>
                    <p class="text-xs text-gray-500 truncate">{{ product.metadata?.category || 'General' }}</p>
                  </div>
                </div>

                <div
                  :class="['flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium border', getStatusClass(product)]">
                  <span :class="['w-1.5 h-1.5 rounded-full mr-1.5', getDotClass(product)]"></span>
                  {{ getStatusLabel(product) }}
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
import { ref, onMounted, computed } from 'vue'
import { useToast } from 'vue-toastification'
import Navbar from '../components/Navbar.vue'
import HeaderComponent from '../components/header.vue'
import { useProductStore } from '../store/product'
import { usePermissionStore } from '../store/permission'

const toast = useToast()

const isSidebarOpen = ref(false)
const productStore = useProductStore()
const permissionStore = usePermissionStore()

onMounted(async () => {
  try {
    await productStore.fetchProducts({ skip: 0, limit: 100 })
  } catch (error) {
    toast.error('Failed to load dashboard data. Please refresh.')
  }
})

const recentProducts = computed(() => {
  return productStore.products.slice(0, 5)
})

const getImageUrl = (product) => {
  const url = product.images?.find(img => img.is_primary)?.url || product.images?.[0]?.url
  if (!url) return 'https://via.placeholder.com/150'
  if (url.startsWith('http')) return url
  return `${import.meta.env.VITE_API_URL}${url}`
}

const getStatusLabel = (product) => {
  if (product.marketplace_visible) return 'Published'
  if (product.customer_visible) return 'Private'
  return 'Draft'
}

const getStatusClass = (product) => {
  if (product.marketplace_visible) return 'bg-emerald-50 text-emerald-600 border-emerald-100/50'
  if (product.customer_visible) return 'bg-blue-50 text-blue-600 border-blue-100/50'
  return 'bg-slate-100 text-slate-600 border-slate-200/50'
}

const getDotClass = (product) => {
  if (product.marketplace_visible) return 'bg-emerald-500'
  if (product.customer_visible) return 'bg-blue-500'
  return 'bg-slate-400'
}
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

.hover-one {

  transition: 0.5s;
  cursor: pointer;
}

.hover-two {

  transition: 0.5s;
  cursor: pointer;
}

.hover-one:hover {
  background-color: white;
  color: black;
}

.hover-two:hover {
  background-color: #8C7A6B;
  color: white;
}

.hovery {
  background-color: #8C7A6B;
  color: white;
  transition: 0.5s;
}

.hovery:hover {
  background-color: white;
  color: black;
}
</style>