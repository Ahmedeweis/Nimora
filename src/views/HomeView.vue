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
                <span class="text-2xl font-bold text-gray-900">8</span>
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
                <span class="text-2xl font-bold text-gray-900">100</span>
              </div>
              <div class="text-xs text-gray-500 font-medium">
                Active Customers <span class="px-1 text-gray-300">•</span> approved
              </div>
            </div>
          </div>
          <div class="mb-5">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div class="grid grid-cols-2 lg:flex lg:flex-wrap items-center gap-2 sm:gap-3">
              <button
                class="hover-one flex items-center w-full lg:w-auto justify-center lg:justify-start space-x-2 bg-[#8C7A6B] hover:bg-[#7a6b5d] text-white px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span class="truncate">Add Product</span>
              </button>

              <button
                class="hover-two flex items-center w-full lg:w-auto justify-center lg:justify-start space-x-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors">
                <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span class="truncate">Update Inventory</span>
              </button>

              <button
                class="hover-two flex items-center w-full lg:w-auto justify-center lg:justify-start space-x-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors">
                <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span class="truncate">Permissions</span>
              </button>

              <button
                class=" hover-two flex items-center w-full lg:w-auto justify-center lg:justify-start space-x-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors">
                <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span class="truncate">View Catalog</span>
              </button>
            </div>
          </div>
          <!-- Header -->
          <div class="flex justify-between items-center mb-4">

            <h2 class="text-lg font-bold text-gray-900">Recent Products</h2>
            <a href="#"
              class="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center transition-colors">
              View all
              <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          <!-- Container -->
          <div
            class="bg-white border border-gray-200 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
            <div class="flex flex-col">

              <div v-for="(product, index) in products" :key="product.id" :class="['flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer',
                index !== products.length - 1 ? 'border-b border-gray-100' : '']">

                <div class="flex items-center space-x-4">
                  <div
                    class="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0 relative">
                    <img :src="getImageUrl(product.img)" :alt="product.name" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-900">{{ product.name }}</h3>
                    <p class="text-xs text-gray-500">{{ product.category }}</p>
                  </div>
                </div>

                <div
                  :class="['flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium border', product.statusClass]">
                  <span :class="['w-1.5 h-1.5 rounded-full mr-1.5', product.dotClass]"></span>
                  {{ product.status }}
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
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import HeaderComponent from '../components/header.vue'
import PaginationComponent from '../components/pagnetion.vue'

const isSidebarOpen = ref(false)

// مصفوفة المنتجات
const products = ref([
  { id: 1, name: 'Carrara Marble', category: 'Marble', status: 'Published', statusClass: 'bg-emerald-50 text-emerald-600 border-emerald-100/50', dotClass: 'bg-emerald-500', img: '1.webp' },
  { id: 2, name: 'Geometric Ceramic Tile', category: 'Ceramic', status: 'Draft', statusClass: 'bg-slate-100 text-slate-600 border-slate-200/50', dotClass: 'bg-slate-400', img: '2.webp' },
  { id: 3, name: 'Carrara Marble', category: 'Marble', status: 'Published', statusClass: 'bg-emerald-50 text-emerald-600 border-emerald-100/50', dotClass: 'bg-emerald-500', img: '3.webp' },
  { id: 4, name: 'Geometric Ceramic Tile', category: 'Ceramic', status: 'Draft', statusClass: 'bg-slate-100 text-slate-600 border-slate-200/50', dotClass: 'bg-slate-400', img: '4.webp' },
  { id: 5, name: 'Herringbone Oak Parquet', category: 'Parquet', status: 'AI Preview', statusClass: 'bg-orange-50 text-orange-600 border-orange-100/50', dotClass: 'bg-orange-500', img: '5.webp' },
])

// function عشان نجيب مسار الصورة الصح في Vite
const getImageUrl = (name) => {
  return new URL(`../assets/imgs/product/${name}`, import.meta.url).href
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
</style>