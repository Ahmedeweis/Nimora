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

                <div class="px-4 lg:px-8 py-4 lg:py-6 max-w-7xl mx-auto w-full pt-2" style="padding-top: 0;">

                    <!-- Top Header Area -->
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 mt-6">
                        <div class="flex items-center gap-3">
                            <router-link to="/products"
                                class="p-1.5 rounded-lg hover:bg-gray-200 transition-colors text-gray-400 hover:text-gray-700">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="19" y1="12" x2="5" y2="12"></line>
                                    <polyline points="12 19 5 12 12 5"></polyline>
                                </svg>
                            </router-link>
                            <div>
                                <h1 class="text-[26px] font-bold text-gray-900 mb-0.5 tracking-tight"
                                    style="margin: 0 0;">Product Management</h1>
                                <p class="text-gray-500 text-[14px]">Manage your product catalog</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <router-link :to="`/edit-product/${$route.params.id || 1}`"
                                class="flex  cursor-pointer items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white shadow-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 20h9"></path>
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                </svg>
                                Edit
                            </router-link>
                            <button @click="showDeleteModal = true"
                                class="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors shadow-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

                    <!-- Catalog Link Box -->
                    <div
                        class="mb-6 border border-gray-200 rounded-2xl bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]">
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
                                <p class="text-sm font-bold text-gray-900 mb-0.5">Catalog Link</p>
                                <p class="text-sm text-gray-500 truncate max-w-[200px] sm:max-w-none">
                                    {{ catalogLink }}</p>
                            </div>
                        </div>
                        <button @click="copyLink"
                            class="flex cursor-pointer items-center justify-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors"
                            :class="linkCopied ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'border-gray-200 text-gray-700 hover:bg-gray-50 bg-white'">
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
                    </div>

                    <!-- Main Grid Layout -->
                    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        <!-- LEFT COLUMN: Product Details -->
                        <div class="xl:col-span-2 space-y-6">

                            <!-- Hero Image & Basic Info Card -->
                            <div class="bg-white border border-gray-200 rounded-3xl p-4 shadow-sm">
                                <!-- Main Image Gallery -->
                                <div class="relative w-full h-[320px] rounded-2xl overflow-hidden mb-5 bg-[#F9F9F9]">
                                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                        alt="Carrara Marble"
                                        class="w-full h-full object-cover mix-blend-multiply opacity-50" />

                                    <!-- Status Badge -->
                                    <div
                                        class="absolute top-4 right-4 flex items-center justify-center px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[13px] font-medium text-emerald-500 shadow-sm">
                                        <span class="w-1.5 h-1.5 rounded-full mr-2 bg-emerald-500"></span>
                                        Published
                                    </div>

                                    <!-- Dots & AR Icon -->
                                    <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                                        <div class="w-2 h-2 rounded-full bg-orange-500"></div>
                                        <div class="w-2 h-2 rounded-full bg-gray-300"></div>
                                        <div class="w-2 h-2 rounded-full bg-gray-300"></div>
                                    </div>
                                    <button
                                        class="absolute cursor-pointer bottom-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-600 shadow-sm hover:bg-white transition-colors">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </button>
                                </div>

                                <!-- Product Title Area -->
                                <div class="px-2 mb-5">
                                    <div class="flex justify-between items-center mb-4">
                                        <h2 class="text-[22px] font-bold text-gray-900">Carrara Marble</h2>
                                        <span class="text-orange-500 font-medium text-[15px]">Premium</span>
                                    </div>

                                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-wrap">
                                        <!-- Price -->
                                        <div class="bg-[#F8F9FA] rounded-[14px] p-3 flex items-center gap-3">
                                            <div
                                                class="w-8 h-8 rounded-full bg-[#EAEAEA] flex items-center justify-center text-gray-500 font-medium">
                                                $</div>
                                            <div>
                                                <p class="text-[11px] text-gray-500 font-medium">Price</p>
                                                <p class="text-sm font-bold text-gray-900">250$</p>
                                            </div>
                                        </div>
                                        <!-- Category -->
                                        <div class="bg-[#F8F9FA] rounded-[14px] p-3 flex items-center gap-3">
                                            <div
                                                class="w-8 h-8 rounded-full bg-[#EAEAEA] flex items-center justify-center text-gray-500">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round">
                                                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                                    <polyline points="2 17 12 22 22 17"></polyline>
                                                    <polyline points="2 12 12 17 22 12"></polyline>
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-[11px] text-gray-500 font-medium">Category</p>
                                                <p class="text-sm font-bold text-gray-900">Marble</p>
                                            </div>
                                        </div>
                                        <!-- Colors -->
                                        <div class="bg-[#F8F9FA] rounded-[14px] p-3 flex items-center gap-3">
                                            <div
                                                class="w-8 h-8 rounded-full bg-[#EAEAEA] flex items-center justify-center text-gray-500">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round">
                                                    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
                                                    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
                                                    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                                    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
                                                    <path
                                                        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z">
                                                    </path>
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-[11px] text-gray-500 font-medium">Colors</p>
                                                <p class="text-sm font-bold text-gray-900 truncate">White, Grey-v...</p>
                                            </div>
                                        </div>
                                        <!-- Sizes -->
                                        <div class="bg-[#F8F9FA] rounded-[14px] p-3 flex items-center gap-3">
                                            <div
                                                class="w-8 h-8 rounded-full bg-[#EAEAEA] flex items-center justify-center text-gray-500">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round">
                                                    <line x1="21" y1="14" x2="14" y2="21"></line>
                                                    <line x1="14" y1="14" x2="21" y2="21"></line>
                                                    <path d="M3 14h7v7H3z"></path>
                                                    <path d="M14 3h7v7h-7z"></path>
                                                    <path d="M3 3h7v7H3z"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-[11px] text-gray-500 font-medium">Sizes</p>
                                                <p class="text-sm font-bold text-gray-900">24x24</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex gap-2 mt-4">
                                        <span
                                            class="px-4 py-1.5 bg-[#F8F9FA] border border-gray-100 text-gray-600 rounded-full text-[12px] font-medium">Floor</span>
                                        <span
                                            class="px-4 py-1.5 bg-[#F8F9FA] border border-gray-100 text-gray-600 rounded-full text-[12px] font-medium">Wall</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Variants List -->
                            <div class="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">
                                <div class="flex items-center gap-2 mb-5">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="text-gray-400">
                                        <path
                                            d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z">
                                        </path>
                                        <line x1="7" y1="7" x2="7.01" y2="7"></line>
                                    </svg>
                                    <h3 class="text-[18px] font-bold text-gray-900">Product Variants (3)</h3>
                                </div>

                                <div class="w-full overflow-x-auto no-scrollbar">
                                    <table class="w-full text-left border-collapse min-w-[600px]">
                                        <thead>
                                            <tr>
                                                <th
                                                    class="py-3 px-2 border-b border-gray-100 text-[13px] font-medium text-gray-500 uppercase tracking-wider">
                                                    Variant</th>
                                                <th
                                                    class="py-3 px-2 border-b border-gray-100 text-[13px] font-medium text-gray-500 uppercase tracking-wider">
                                                    SKU</th>
                                                <th
                                                    class="py-3 px-2 border-b border-gray-100 text-[13px] font-medium text-gray-500 uppercase tracking-wider">
                                                    Color</th>
                                                <th
                                                    class="py-3 px-2 border-b border-gray-100 text-[13px] font-medium text-gray-500 uppercase tracking-wider">
                                                    Size</th>
                                                <th
                                                    class="py-3 px-2 border-b border-gray-100 text-[13px] font-medium text-gray-500 uppercase tracking-wider">
                                                    Price</th>
                                                <th
                                                    class="py-3 px-2 border-b border-gray-100 text-[13px] font-medium text-gray-500 uppercase tracking-wider text-right pr-4">
                                                    Stock</th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-[14px]">
                                            <tr class="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                                <td class="py-4 px-2 text-gray-900 font-medium">Polished 24x24</td>
                                                <td class="py-4 px-2 text-gray-400 tracking-wide text-[13px]">CM-P-24
                                                </td>
                                                <td class="py-4 px-2 text-gray-600">White</td>
                                                <td class="py-4 px-2 text-gray-600 text-[13px]">24x24</td>
                                                <td class="py-4 px-2 text-gray-900 font-bold">$45.99</td>
                                                <td class="py-4 px-2 text-right pr-4 text-emerald-500 font-medium">150
                                                </td>
                                            </tr>
                                            <tr class="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                                <td class="py-4 px-2 text-gray-900 font-medium">Polished 36x36</td>
                                                <td class="py-4 px-2 text-gray-400 tracking-wide text-[13px]">CM-P-36
                                                </td>
                                                <td class="py-4 px-2 text-gray-600">White</td>
                                                <td class="py-4 px-2 text-gray-600 text-[13px]">36x36</td>
                                                <td class="py-4 px-2 text-gray-900 font-bold">$62.99</td>
                                                <td class="py-4 px-2 text-right pr-4 text-red-500 font-medium">80</td>
                                            </tr>
                                            <tr class="hover:bg-gray-50/50 transition-colors">
                                                <td class="py-4 px-2 text-gray-900 font-medium">Honed 24x24</td>
                                                <td class="py-4 px-2 text-gray-400 tracking-wide text-[13px]">CM-H-24
                                                </td>
                                                <td class="py-4 px-2 text-gray-600">Grey-veined</td>
                                                <td class="py-4 px-2 text-gray-600 text-[13px]">24x24</td>
                                                <td class="py-4 px-2 text-gray-900 font-bold">$48.99</td>
                                                <td class="py-4 px-2 text-right pr-4 text-emerald-500 font-medium">120
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <!-- Price Visibility & Approved Buyers -->
                            <div class="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">
                                <div class="flex justify-between items-center mb-6">
                                    <div class="flex items-center gap-2">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="text-gray-400">
                                            <line x1="12" y1="1" x2="12" y2="23"></line>
                                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                        </svg>
                                        <h3 class="text-[18px] font-bold text-gray-900">Price Visibility & Approved
                                            Buyers</h3>
                                    </div>
                                    <button @click="showAddUserModal = true"
                                        class="flex cursor-pointer items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                        </svg>
                                        Add User
                                    </button>
                                </div>

                                <div class="bg-[#F8F9FA] rounded-2xl p-4 flex justify-between items-center mb-6">
                                    <div class="flex gap-3">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="text-gray-400 mt-1">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                            <line x1="1" y1="1" x2="23" y2="23"></line>
                                        </svg>
                                        <div>
                                            <p class="text-[14px] font-bold text-gray-900">Price requires approval</p>
                                            <p class="text-[13px] text-gray-500">Only approved buyers can view the price
                                            </p>
                                        </div>
                                    </div>
                                    <div @click="priceRequiresApproval = !priceRequiresApproval"
                                        :class="priceRequiresApproval ? 'bg-[#8C7A6B]' : 'bg-gray-200'"
                                        class="w-11 h-6 rounded-full relative cursor-pointer transition-colors duration-200">
                                        <div :class="priceRequiresApproval ? 'translate-x-5' : 'translate-x-0'"
                                            class="w-5 h-5 bg-white rounded-full absolute top-[2px] left-[2px] shadow-sm transition-transform duration-200">
                                        </div>
                                    </div>
                                </div>

                                <div class="flex justify-between items-center mb-3">
                                    <h4 class="text-[14px] font-bold text-gray-700">Approved Buyers (5)</h4>
                                    <button @click="showViewAllModal = true"
                                        class="text-[13px] cursor-pointer font-medium text-orange-500 hover:text-orange-600">View
                                        all</button>
                                </div>

                                <div class="space-y-3">
                                    <div v-for="i in 3" :key="i"
                                        class="flex items-center justify-between border border-gray-100 rounded-2xl p-3 hover:border-gray-200 transition-colors">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="w-10 h-10 rounded-full bg-[#f4ece4] text-[#a98f73] flex items-center justify-center font-bold text-sm">
                                                {{ i === 3 ? 'SM' : 'AH' }}
                                            </div>
                                            <div>
                                                <p class="text-sm font-bold text-gray-900">{{ i === 3 ? 'Sara Mohamed' :
                                                    'Ahmed Hassan' }}</p>
                                                <p class="text-[12px] text-gray-500 flex items-center gap-1">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round">
                                                        <path
                                                            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
                                                        </path>
                                                        <polyline points="22,6 12,13 2,6"></polyline>
                                                    </svg>
                                                    {{ i === 3 ? 'sara@interiors.com' : 'ahmed@designco.com' }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-4">
                                            <p class="text-[13px] text-gray-400 hidden sm:block">Approved {{ i === 3 ?
                                                '2026-02-01' : '2026-01-15' }}</p>
                                            <button
                                                class="w-8 h-8 cursor-pointer rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path
                                                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                                    </path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div> <!-- End Left Column -->

                        <!-- RIGHT COLUMN: AI Sidebar -->
                        <div class="xl:col-span-1 space-y-6">

                            <!-- AI Tokens widget -->
                            <div class="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">
                                <div class="flex items-center gap-2 mb-4 text-gray-700 font-bold text-[15px]">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                    </svg>
                                    AI Image Tokens
                                </div>
                                <div class="flex items-end gap-2 mb-2">
                                    <span class="text-2xl font-bold text-gray-900">53</span>
                                    <span class="text-[13px] text-gray-500 mb-1">/ 100 remaining</span>
                                </div>
                                <div class="w-full bg-gray-100 h-2 rounded-full mb-3 overflow-hidden">
                                    <div class="bg-[#8C7A6B] h-full rounded-full w-[47%]"></div>
                                </div>
                                <p class="text-[12px] text-gray-400 flex items-center gap-1.5">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                                    </svg>
                                    47 tokens used this month
                                </p>
                            </div>

                            <!-- AI Output Widget -->
                            <div class="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">
                                <div class="flex justify-between items-center mb-5">
                                    <div class="flex items-center gap-2 font-bold text-[15px] text-gray-900">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                            <polyline points="21 15 16 10 5 21"></polyline>
                                        </svg>
                                        AI Generated Images
                                    </div>
                                    <button
                                        class="flex items-center cursor-pointer gap-1.5 px-3 py-1.5 bg-[#8C7A6B] hover:bg-[#7a6b5d] text-white rounded-lg text-sm font-medium transition-colors">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                                        </svg>
                                        Generate
                                    </button>
                                </div>

                                <div class="mb-5">
                                    <h4 class="text-sm font-bold text-gray-800 mb-2">AI Visualization Description</h4>
                                    <textarea
                                        class="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 min-h-[80px] text-gray-700 bg-[#fbfbfb]"
                                        placeholder="Describe the desired scene for AI visualization"></textarea>
                                    <p class="text-[11px] text-gray-400 mt-2 flex gap-1 items-start leading-tight">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="text-orange-400 flex-shrink-0 mt-0.5">
                                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                                        </svg>
                                        Accurate descriptions improve the quality of previews and final renders.
                                    </p>
                                </div>

                                <div class="space-y-3">
                                    <!-- Room 1 -->
                                    <div
                                        class="relative w-full h-32 rounded-xl overflow-hidden group cursor-pointer border-2 border-transparent hover:border-gray-300 transition-all">
                                        <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                            alt="Bathroom" class="w-full h-full object-cover">
                                        <div
                                            class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                                        </div>
                                        <p
                                            class="absolute bottom-3 left-3 right-3 text-white text-[13px] font-medium leading-snug">
                                            Luxury bathroom with Carrara marble walls</p>
                                        <div
                                            class="absolute top-2 left-2 w-7 h-7 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-colors">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                <polyline points="7 10 12 15 17 10"></polyline>
                                                <line x1="12" y1="15" x2="12" y2="3"></line>
                                            </svg>
                                        </div>
                                        <div
                                            class="absolute top-2 right-2 w-6 h-6 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white/80">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                    </div>

                                    <!-- Room 2 -->
                                    <div
                                        class="relative w-full h-32 rounded-xl overflow-hidden group cursor-pointer border-2 border-transparent hover:border-gray-300 transition-all">
                                        <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                            alt="Kitchen" class="w-full h-full object-cover">
                                        <div
                                            class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                                        </div>
                                        <p
                                            class="absolute bottom-3 left-3 right-3 text-white text-[13px] font-medium leading-snug">
                                            Modern kitchen with marble backsplash</p>
                                        <div
                                            class="absolute top-2 left-2 w-7 h-7 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-colors">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                <polyline points="17 8 12 3 7 8"></polyline>
                                                <line x1="12" y1="3" x2="12" y2="15"></line>
                                            </svg>
                                        </div>
                                    </div>

                                    <!-- Room 3 -->
                                    <div
                                        class="relative w-full h-32 rounded-xl overflow-hidden group cursor-pointer border-2 border-transparent hover:border-gray-300 transition-all">
                                        <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                            alt="Living Room" class="w-full h-full object-cover">
                                        <div
                                            class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                                        </div>
                                        <p
                                            class="absolute bottom-3 left-3 right-3 text-white text-[13px] font-medium leading-snug">
                                            Living room with marble accent wall</p>
                                        <div
                                            class="absolute top-2 left-2 w-7 h-7 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-colors">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                <polyline points="7 10 12 15 17 10"></polyline>
                                                <line x1="12" y1="15" x2="12" y2="3"></line>
                                            </svg>
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

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
        <div v-if="showDeleteModal"
            class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div class="bg-white rounded-[20px] p-6 sm:p-8 w-full max-w-[450px] shadow-2xl text-center transform transition-all"
                :class="showDeleteModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'">
                <!-- Icon -->
                <div class="mb-5 flex justify-center">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </div>

                <h3 class="text-xl font-bold text-gray-700 mb-3">Delete Product ?</h3>
                <p class="text-[14px] text-gray-500 mb-8 leading-relaxed font-medium">
                    Are you sure you want to delete this product? This action cannot be undone and all associated
                    variants
                    and data will be permanently removed.
                </p>

                <div class="flex gap-3">
                    <button @click="showDeleteModal = false"
                        class="flex-1 py-3 cursor-pointer border border-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                    <button @click="showDeleteModal = false"
                        class="flex-1 cursor-pointer py-3 bg-[#f24141] text-white rounded-xl font-medium hover:bg-red-600 transition-colors shadow-sm">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </Teleport>

    <!-- Add User Modal -->
    <div v-show="showAddUserModal"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
        <div class="bg-white rounded-[20px] p-6 lg:p-8 w-full max-w-[500px] shadow-2xl transform transition-all text-left"
            :class="showAddUserModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'">

            <h3 class="text-[22px] font-bold text-gray-900 mb-1">Add User</h3>
            <p class="text-[15px] text-gray-500 mb-6 font-medium">Manage users who can view product prices</p>

            <hr class="border-gray-100 mb-6">

            <div class="mb-6">
                <label class="block text-[15px] font-medium text-gray-900 mb-2">Email*</label>
                <input type="email" placeholder="e.g. customer@gmail.com"
                    class="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
            </div>

            <hr class="border-gray-100 mb-6">

            <div class="flex gap-4">
                <button @click="showAddUserModal = false"
                    class="flex-1 py-3 border cursor-pointer border-gray-200 text-gray-800 rounded-xl text-[15px] font-medium hover:bg-gray-50 transition-colors">
                    Cancel
                </button>
                <button @click="showAddUserModal = false"
                    class="flex-1 py-3 bg-[#847365] cursor-pointer text-white rounded-xl text-[15px] font-medium hover:bg-[#736458] transition-colors shadow-sm">
                    Add
                </button>
            </div>
        </div>
    </div>

    <!-- View All Approved Buyers Modal -->
    <Teleport to="body">
        <div v-show="showViewAllModal"
            class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div class="bg-white rounded-[20px] p-6 lg:p-8 w-full max-w-[550px] shadow-2xl transform transition-all text-left flex flex-col max-h-[90vh]"
                :class="showViewAllModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'">

                <h3 class="text-[22px] font-bold text-gray-900 mb-1">Approved Buyers</h3>
                <p class="text-[15px] text-gray-500 mb-6 font-medium">Only approved buyers can view the price</p>

                <hr class="border-gray-100 mb-4">

                <!-- Search box -->
                <div class="relative mb-4">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <input type="text" placeholder="Search users..."
                        class="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fcfcfc]">
                </div>

                <!-- Users List -->
                <div class="overflow-y-auto no-scrollbar flex-1 mb-4 flex flex-col gap-3 min-h-0">
                    <div v-for="i in 5" :key="i"
                        class="flex flex-col sm:flex-row sm:items-center justify-between border border-gray-200 rounded-[14px] p-3 hover:border-gray-300 transition-colors gap-3 sm:gap-0">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-11 h-11 rounded-full bg-[#f4ece4] text-[#a98f73] flex items-center justify-center font-bold text-[15px]">
                                {{ i % 2 === 0 ? 'SM' : 'AH' }}
                            </div>
                            <div>
                                <p v-if="i % 2 === 0" class="text-[15px] font-bold text-gray-900">Sara Mohamed</p>
                                <p v-else class="text-[15px] font-bold text-gray-900">Ahmed Hassan</p>
                                <p class="text-[13px] text-gray-500 flex items-center gap-1.5 mt-0.5">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path
                                            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
                                        </path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                    <span v-if="i % 2 === 0">sara@interiors.com</span>
                                    <span v-else>ahmed@designco.com</span>
                                </p>
                            </div>
                        </div>
                        <div class="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                            <p v-if="i % 2 === 0" class="text-[13px] text-gray-500 font-medium whitespace-nowrap">
                                Approved 2026-02-01</p>
                            <p v-else class="text-[13px] text-gray-500 font-medium whitespace-nowrap">Approved
                                2026-01-15</p>
                            <button
                                class="w-9 h-9 flex-shrink-0 cursor-pointer rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                                title="Remove User">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path
                                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                    </path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <hr class="border-gray-100 mb-6">

                <button @click="showViewAllModal = false"
                    class="w-full py-3.5 cursor-pointer bg-[#847365] text-white rounded-xl text-[15px] font-medium hover:bg-[#736458] transition-colors shadow-sm">
                    Done
                </button>
            </div>
        </div>
    </Teleport>

</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import HeaderComponent from '../components/header.vue'

const isSidebarOpen = ref(false)
const showDeleteModal = ref(false)
const showAddUserModal = ref(false)
const showViewAllModal = ref(false)
const priceRequiresApproval = ref(true)

const catalogLink = 'https://nimora-studio.lovable.app/catalog/nimora-studio'
const linkCopied = ref(false)

const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(catalogLink)
        linkCopied.value = true
        setTimeout(() => {
            linkCopied.value = false
        }, 2000)
    } catch (err) {
        console.error('Failed to copy link:', err)
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

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
