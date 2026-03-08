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

                <div class="px-4 lg:px-8 py-4 lg:py-6 mx-auto w-full pb-24" style="padding-top: 0;">

                    <!-- Header -->
                    <div class="mb-6">
                        <h1 class="text-[24px] font-bold text-gray-900 leading-tight mb-1">Store Settings</h1>
                        <p class="text-[14px] text-gray-500">Customize your store appearance and preferences</p>
                    </div>

                    <div class="flex flex-col gap-6">

                        <!-- Store Information -->
                        <section
                            class="bg-white rounded-[16px] border border-gray-100 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
                            <div class="flex items-center gap-2 mb-5">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                <h2 class="text-[16px] font-bold text-gray-700">Store Information</h2>
                            </div>

                            <div class="flex flex-col gap-4">
                                <div>
                                    <label class="block text-[13px] font-medium text-gray-700 mb-1.5">Store Name</label>
                                    <input type="text" v-model="settings.storeName"
                                        placeholder="e.g. Carrara White Marble"
                                        class="w-full px-4 py-2.5 rounded-[10px] border border-gray-200 bg-white text-[14px] focus:outline-none focus:ring-2 focus:ring-[#8C7A6B]/20 focus:border-[#8C7A6B] transition-colors">
                                </div>
                                <div>
                                    <label class="block text-[13px] font-medium text-gray-700 mb-1.5">Store URL</label>
                                    <input type="text" v-model="settings.storeUrl" placeholder="nimora/catalog/....."
                                        class="w-full px-4 py-2.5 rounded-[10px] border border-gray-200 bg-white text-[14px] focus:outline-none focus:ring-2 focus:ring-[#8C7A6B]/20 focus:border-[#8C7A6B] transition-colors">
                                </div>
                                <div>
                                    <label class="block text-[13px] font-medium text-gray-700 mb-1.5">Collection
                                        Tagline</label>
                                    <input type="text" v-model="settings.tagline" placeholder="e.g. Premium"
                                        class="w-full px-4 py-2.5 rounded-[10px] border border-gray-200 bg-white text-[14px] focus:outline-none focus:ring-2 focus:ring-[#8C7A6B]/20 focus:border-[#8C7A6B] transition-colors">
                                </div>

                                <button
                                    class="mt-2 flex items-center justify-center gap-2 w-[140px] py-2.5 bg-[#8C7A6B] text-white rounded-[8px] text-[13px] font-medium hover:bg-[#7a6b5d] transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="17 8 12 3 7 8"></polyline>
                                        <line x1="12" y1="3" x2="12" y2="15"></line>
                                    </svg>
                                    Upload Logo
                                </button>
                            </div>
                        </section>

                        <!-- Location -->
                        <section
                            class="bg-white rounded-[16px] border border-gray-100 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
                            <div class="flex items-center gap-2 mb-5">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="10" r="3"></circle>
                                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"></path>
                                </svg>
                                <h2 class="text-[16px] font-bold text-gray-700">Location</h2>
                            </div>

                            <div class="flex flex-col gap-4">
                                <div>
                                    <label class="block text-[13px] font-medium text-gray-700 mb-1.5">Country*</label>
                                    <div class="relative">
                                        <select v-model="settings.country"
                                            class="appearance-none w-full px-4 py-2.5 rounded-[10px] border border-gray-200 bg-white text-[14px] focus:outline-none focus:ring-2 focus:ring-[#8C7A6B]/20 focus:border-[#8C7A6B] transition-colors cursor-pointer text-gray-600">
                                            <option value="" disabled selected>Select Country</option>
                                            <option value="Egypt">Egypt</option>
                                            <option value="Saudi Arabia">Saudi Arabia</option>
                                            <option value="UAE">UAE</option>
                                        </select>
                                        <svg class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </div>
                                    <p class="mt-2 text-[11px] text-gray-500 flex items-center gap-1.5">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f97316"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="8" x2="12" y2="12"></line>
                                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                        </svg>
                                        Used to display your catalog in Nimora's marketplace and match it with customers
                                        in your region.
                                    </p>
                                </div>

                                <div>
                                    <label class="block text-[13px] font-medium text-gray-700 mb-1.5">City</label>
                                    <div class="relative">
                                        <select v-model="settings.city"
                                            class="appearance-none w-full px-4 py-2.5 rounded-[10px] border border-gray-200 bg-white text-[14px] focus:outline-none focus:ring-2 focus:ring-[#8C7A6B]/20 focus:border-[#8C7A6B] transition-colors cursor-pointer text-gray-600">
                                            <option value="" disabled selected>Select City</option>
                                            <option value="Cairo">Cairo</option>
                                            <option value="Riyadh">Riyadh</option>
                                            <option value="Dubai">Dubai</option>
                                        </select>
                                        <svg class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- Catalog Access & Visibility -->
                        <section
                            class="bg-white rounded-[16px] border border-gray-100 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
                            <div class="flex items-center gap-2 mb-5">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                                <h2 class="text-[16px] font-bold text-gray-700">Catalog Access & Visibility</h2>
                            </div>

                            <!-- Catalog Access -->
                            <div class="mb-6">
                                <p class="text-[13px] font-medium text-gray-500 mb-3">Catalog Access</p>
                                <div class="flex flex-col gap-3">

                                    <!-- Public Option -->
                                    <label
                                        class="flex items-start gap-3 p-4 rounded-[12px] border cursor-pointer transition-colors"
                                        :class="settings.accessType === 'public' ? 'border-[#8C7A6B]/30 bg-[#faf8f6]' : 'border-gray-100 hover:bg-gray-50'">
                                        <div class="mt-0.5 relative flex items-center justify-center">
                                            <input type="radio" value="public" v-model="settings.accessType"
                                                class="peer sr-only">
                                            <div
                                                class="w-4 h-4 rounded-full border border-gray-300 peer-checked:border-[#8C7A6B] peer-checked:bg-[#8C7A6B] flex items-center justify-center transition-colors">
                                                <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                                                    viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"
                                                    stroke-linecap="round" stroke-linejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="flex-1">
                                            <div class="flex items-center gap-2 mb-0.5">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                    stroke="#10b981" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                                    <path
                                                        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z">
                                                    </path>
                                                </svg>
                                                <span class="text-[14px] font-semibold text-gray-900">Public</span>
                                            </div>
                                            <p class="text-[12px] text-gray-500">Anyone with the link can browse the
                                                catalog without login.</p>
                                        </div>
                                    </label>

                                    <!-- Private Option -->
                                    <label
                                        class="flex items-start gap-3 p-4 rounded-[12px] border cursor-pointer transition-colors"
                                        :class="settings.accessType === 'private' ? 'border-[#8C7A6B]/30 bg-[#faf8f6]' : 'border-gray-100 hover:bg-gray-50'">
                                        <div class="mt-0.5 relative flex items-center justify-center">
                                            <input type="radio" value="private" v-model="settings.accessType"
                                                class="peer sr-only">
                                            <div
                                                class="w-4 h-4 rounded-full border border-gray-300 peer-checked:border-[#8C7A6B] peer-checked:bg-[#8C7A6B] flex items-center justify-center transition-colors">
                                                <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                                                    viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"
                                                    stroke-linecap="round" stroke-linejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="flex-1">
                                            <div class="flex items-center gap-2 mb-0.5">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                    stroke="#6b7280" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round">
                                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                                </svg>
                                                <span class="text-[14px] font-semibold text-gray-900">Private</span>
                                            </div>
                                            <p class="text-[12px] text-gray-500">Catalog access requires user login.</p>
                                        </div>
                                    </label>

                                    <!-- Specific Option -->
                                    <div class="flex flex-col gap-3 p-4 rounded-[12px] border cursor-pointer transition-colors"
                                        :class="settings.accessType === 'specific' ? 'border-[#8C7A6B]/30 bg-[#faf8f6]' : 'border-gray-100 hover:bg-gray-50'">
                                        <div class="flex items-start justify-between gap-3 w-full">
                                            <label class="flex items-start gap-3 flex-1 cursor-pointer">
                                                <div
                                                    class="mt-1 relative flex items-center justify-center flex-shrink-0">
                                                    <input type="radio" value="specific" v-model="settings.accessType"
                                                        class="peer sr-only">
                                                    <div
                                                        class="w-4 h-4 rounded-full border border-gray-300 peer-checked:border-[#8C7A6B] peer-checked:bg-[#8C7A6B] flex items-center justify-center transition-colors">
                                                        <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                                                            viewBox="0 0 24 24" fill="none" stroke="white"
                                                            stroke-width="3" stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <polyline points="20 6 9 17 4 12"></polyline>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div class="flex-1">
                                                    <div class="flex items-center gap-2 mb-0.5">
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                            stroke="#6b7280" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z">
                                                            </path>
                                                        </svg>
                                                        <span
                                                            class="text-[14px] font-semibold text-gray-900">Specific</span>
                                                    </div>
                                                    <p class="text-[12px] text-gray-500">Selected catalog.</p>
                                                </div>
                                            </label>
                                            <button @click.stop="showCatalogModal = true"
                                                class="px-4 py-1.5 bg-[#8C7A6B] text-white text-[12px] font-medium rounded-[6px] hover:bg-[#7a6b5d] transition-colors flex-shrink-0">
                                                Select
                                            </button>
                                        </div>

                                        <!-- Selected Catalogs Cards -->
                                        <div v-if="settings.accessType === 'specific' && selectedCatalogs.length > 0"
                                            class="mt-2">
                                            <div class="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                                                <div v-for="catalog in selectedCatalogs" :key="catalog.id"
                                                    class="flex-shrink-0 w-[140px] flex flex-col p-3 rounded-[12px] border border-[#8C7A6B]/40 bg-white group relative">
                                                    <div class="flex items-center justify-between mb-2">
                                                        <div @click="toggleCatalogId(catalog.id)"
                                                            class="w-4 h-4 rounded-[4px] border-2 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer border-[#8C7A6B] bg-[#8C7A6B]">
                                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                                                                stroke="white" stroke-width="3.5" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <polyline points="20 6 9 17 4 12"></polyline>
                                                            </svg>
                                                        </div>
                                                        <button @click.stop="openProductsModal(catalog)"
                                                            class="text-[#8C7A6B] hover:text-[#7a6b5d] transition-colors flex items-center gap-1">
                                                            <span class="text-[10px] font-medium">{{
                                                                catalog.products?.filter(p =>
                                                                    selectedProductIds.includes(p.id)).length || 0}}/{{
                                                                    catalog.productCount }}</span>
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round">
                                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">
                                                                </path>
                                                                <circle cx="12" cy="12" r="3"></circle>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <p class="text-[13px] font-bold text-gray-900 truncate">{{
                                                        catalog.name }}</p>
                                                    <p class="text-[11px] text-gray-400">
                                                        {{ getProductSelectionLabel(catalog) }}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <!-- Price Visibility -->
                            <div class="mb-6">
                                <p class="text-[13px] font-medium text-gray-500 mb-3">Price Visibility</p>
                                <div class="flex flex-col gap-3">

                                    <label
                                        class="flex items-start gap-3 p-4 rounded-[12px] border cursor-pointer transition-colors"
                                        :class="settings.priceVisibility === 'hide' ? 'border-[#8C7A6B]/30 bg-[#faf8f6]' : 'border-gray-100 hover:bg-gray-50'">
                                        <div class="mt-0.5 relative flex items-center justify-center">
                                            <input type="radio" value="hide" v-model="settings.priceVisibility"
                                                class="peer sr-only">
                                            <div
                                                class="w-4 h-4 rounded-full border border-gray-300 peer-checked:border-[#8C7A6B] peer-checked:bg-[#8C7A6B] flex items-center justify-center transition-colors">
                                                <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                                                    viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"
                                                    stroke-linecap="round" stroke-linejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="flex-1">
                                            <div class="flex items-center gap-2 mb-0.5">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                    stroke="#6b7280" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round">
                                                    <path
                                                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24">
                                                    </path>
                                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                                </svg>
                                                <span class="text-[14px] font-semibold text-gray-900">Hide prices from
                                                    everyone</span>
                                            </div>
                                            <p class="text-[12px] text-gray-500">Prices will not be visible to anyone,
                                                including logged-in users.</p>
                                        </div>
                                    </label>

                                    <label
                                        class="flex items-start gap-3 p-4 rounded-[12px] border cursor-pointer transition-colors"
                                        :class="settings.priceVisibility === 'approved' ? 'border-[#8C7A6B]/30 bg-[#faf8f6]' : 'border-gray-100 hover:bg-gray-50'">
                                        <div class="mt-0.5 relative flex items-center justify-center">
                                            <input type="radio" value="approved" v-model="settings.priceVisibility"
                                                class="peer sr-only">
                                            <div
                                                class="w-4 h-4 rounded-full border border-gray-300 peer-checked:border-[#8C7A6B] peer-checked:bg-[#8C7A6B] flex items-center justify-center transition-colors">
                                                <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                                                    viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"
                                                    stroke-linecap="round" stroke-linejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="flex-1">
                                            <div class="flex items-center gap-2 mb-0.5">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                    stroke="#f97316" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                </svg>
                                                <span class="text-[14px] font-semibold text-gray-900">Show prices to
                                                    approved users only</span>
                                            </div>
                                            <p class="text-[12px] text-gray-500">Login required. Prices are visible only
                                                to approved users.</p>
                                        </div>
                                    </label>

                                </div>
                                <p class="mt-3 text-[11px] text-[#f97316] flex items-center gap-1.5">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                    </svg>
                                    Prices can be restricted even if the catalog is public.
                                </p>
                            </div>

                            <!-- Nimora Marketplace -->
                            <div>
                                <p class="text-[13px] font-medium text-gray-500 mb-3">Nimora Marketplace Listing</p>
                                <div class="flex flex-col gap-3">
                                    <label
                                        class="flex items-center gap-3 p-4 rounded-[12px] border cursor-pointer transition-colors"
                                        :class="settings.marketplaceListing ? 'border-[#8C7A6B]/30 bg-[#faf8f6]' : 'border-gray-100 hover:bg-gray-50'">
                                        <div class="relative flex items-center justify-center">
                                            <input type="radio" :value="true" v-model="settings.marketplaceListing"
                                                class="peer sr-only">
                                            <div
                                                class="w-4 h-4 rounded-full border border-gray-300 peer-checked:border-[#8C7A6B] peer-checked:bg-[#8C7A6B] flex items-center justify-center transition-colors">
                                                <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                                                    viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"
                                                    stroke-linecap="round" stroke-linejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </div>
                                        </div>
                                        <span class="text-[14px] font-semibold text-gray-900">Show my catalog on Nimora
                                            marketplace</span>
                                    </label>
                                    <label
                                        class="flex items-center gap-3 p-4 rounded-[12px] border cursor-pointer transition-colors"
                                        :class="!settings.marketplaceListing ? 'border-[#8C7A6B]/30 bg-[#faf8f6]' : 'border-gray-100 hover:bg-gray-50'">
                                        <div class="relative flex items-center justify-center">
                                            <input type="radio" :value="false" v-model="settings.marketplaceListing"
                                                class="peer sr-only">
                                            <div
                                                class="w-4 h-4 rounded-full border border-gray-300 peer-checked:border-[#8C7A6B] peer-checked:bg-[#8C7A6B] flex items-center justify-center transition-colors">
                                                <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                                                    viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"
                                                    stroke-linecap="round" stroke-linejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </div>
                                        </div>
                                        <span class="text-[14px] font-semibold text-gray-900">Do not show my catalog on
                                            Nimora marketplace</span>
                                    </label>
                                </div>
                            </div>
                        </section>

                        <!-- Display Settings -->
                        <section
                            class="bg-white rounded-[16px] border border-gray-100 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
                            <div class="flex items-center gap-2 mb-5">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 20V10"></path>
                                    <path d="M18 20V4"></path>
                                    <path d="M6 20v-4"></path>
                                </svg>
                                <h2 class="text-[16px] font-bold text-gray-700">Display Settings</h2>
                            </div>

                            <!-- Default Catalog View -->
                            <div class="mb-5">
                                <p class="text-[13px] font-medium text-gray-500 mb-3">Default Catalog View</p>
                                <div class="flex flex-col gap-3">
                                    <label
                                        class="flex items-center gap-3 p-4 rounded-[12px] border cursor-pointer transition-colors"
                                        :class="settings.defaultView === 'catalog' ? 'border-[#8C7A6B]/30 bg-[#faf8f6]' : 'border-gray-100 hover:bg-gray-50'">
                                        <div class="relative flex items-center justify-center">
                                            <input type="radio" value="catalog" v-model="settings.defaultView"
                                                class="peer sr-only">
                                            <div
                                                class="w-4 h-4 rounded-full border border-gray-300 peer-checked:border-[#8C7A6B] peer-checked:bg-[#8C7A6B] flex items-center justify-center transition-colors">
                                                <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                                                    viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"
                                                    stroke-linecap="round" stroke-linejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </div>
                                        </div>
                                        <span class="text-[14px] font-semibold text-gray-900">Catalog View</span>
                                    </label>
                                    <label
                                        class="flex items-center gap-3 p-4 rounded-[12px] border cursor-pointer transition-colors"
                                        :class="settings.defaultView === 'grid' ? 'border-[#8C7A6B]/30 bg-[#faf8f6]' : 'border-gray-100 hover:bg-gray-50'">
                                        <div class="relative flex items-center justify-center">
                                            <input type="radio" value="grid" v-model="settings.defaultView"
                                                class="peer sr-only">
                                            <div
                                                class="w-4 h-4 rounded-full border border-gray-300 peer-checked:border-[#8C7A6B] peer-checked:bg-[#8C7A6B] flex items-center justify-center transition-colors">
                                                <svg class="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </div>
                                        </div>
                                        <span class="text-[14px] font-semibold text-gray-900">Grid View</span>
                                    </label>
                                </div>
                            </div>

                            <!-- Show Product Code -->
                            <div>
                                <label
                                    class="flex items-start gap-3 p-4 rounded-[12px] border cursor-pointer transition-colors"
                                    :class="settings.showProductCode ? 'border-[#8C7A6B]/30 bg-[#faf8f6]' : 'border-gray-100 hover:bg-gray-50'">
                                    <div class="mt-0.5 relative flex items-center justify-center">
                                        <input type="checkbox" v-model="settings.showProductCode" class="peer sr-only">
                                        <div
                                            class="w-4 h-4 rounded-[4px] border border-gray-300 peer-checked:border-[#8C7A6B] peer-checked:bg-[#8C7A6B] flex items-center justify-center transition-colors">
                                            <svg v-if="settings.showProductCode" width="10" height="10"
                                                viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="flex-1">
                                        <span class="block text-[14px] font-semibold text-gray-900 mb-0.5">Show Product
                                            Code in catalog</span>
                                        <span class="block text-[12px] text-gray-500">Customers can reference product
                                            code when inquiring.</span>
                                    </div>
                                </label>
                            </div>

                        </section>

                        <button @click="handleSave"
                            class="w-full flex items-center justify-center gap-2 py-3 bg-[#8C7A6B] hover:bg-[#7a6b5d] text-white rounded-[10px] text-[15px] font-semibold transition-colors shadow-sm">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                <polyline points="7 3 7 8 15 8"></polyline>
                            </svg>
                            Save
                        </button>

                    </div>
                </div>
            </main>
        </div>

        <!-- Success Modal -->
        <Teleport to="body">
            <div v-if="showSuccessModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="showSuccessModal = false"></div>
                <div @click.stop
                    class="bg-white rounded-[20px] w-full max-w-[400px] z-10 shadow-xl flex flex-col items-center p-8 relative animate-in fade-in zoom-in duration-300">
                    <div class="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <h2 class="text-[22px] font-bold text-gray-900 mb-2">Settings Saved!</h2>
                    <p class="text-[15px] text-gray-500 text-center mb-8">Your store preferences have been updated
                        successfully.</p>
                    <button @click="showSuccessModal = false"
                        class="w-full py-3 bg-[#8C7A6B] text-white rounded-[12px] text-[15px] font-semibold hover:bg-[#7a6b5d] transition-colors shadow-sm">
                        Got it!
                    </button>
                </div>
            </div>
        </Teleport>

        <!-- Select Catalogs Modal (Modal 2) -->
        <Teleport to="body">
            <div v-if="showCatalogModal" class="fixed inset-0 z-[110] flex items-center justify-center p-4">
                <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="showCatalogModal = false"></div>
                <div @click.stop
                    class="bg-white rounded-[24px] w-full max-w-[500px] z-10 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">

                    <!-- Header -->
                    <div class="p-6 border-b border-gray-100 flex items-center justify-between">
                        <div>
                            <h2 class="text-[20px] font-bold text-gray-900 mb-1">Select Catalogs</h2>
                            <p class="text-[13px] text-gray-400">Add new customer access with specific permissions</p>
                        </div>
                        <button @click="showCatalogModal = false"
                            class="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <!-- Search -->
                    <div class="p-6 pb-4">
                        <div class="relative">
                            <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input type="text" v-model="catalogSearch" placeholder="Search catalog..."
                                class="w-full pl-11 pr-4 py-3 rounded-[14px] border border-gray-200 bg-gray-50 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#8C7A6B]/20 focus:border-[#8C7A6B] transition-all">
                        </div>
                    </div>

                    <!-- Catalogs Grid -->
                    <div class="flex-1 overflow-y-auto px-6 pb-6 scrollbar-hide">
                        <div class="grid grid-cols-2 gap-4">
                            <div v-for="catalog in filteredCatalogs" :key="catalog.id"
                                @click="toggleCatalogId(catalog.id)"
                                :class="['p-4 rounded-[18px] border transition-all cursor-pointer flex flex-col gap-3',
                                    catalogSelectedIds.includes(catalog.id) ? 'border-[#8C7A6B] bg-[#faf8f6]' : 'border-gray-100 bg-white hover:border-gray-200']">

                                <div class="flex items-center justify-between">
                                    <div
                                        :class="['w-5 h-5 rounded-[6px] border-2 flex items-center justify-center transition-all',
                                            catalogSelectedIds.includes(catalog.id) ? 'border-[#8C7A6B] bg-[#8C7A6B]' : 'border-gray-200 bg-white']">
                                        <svg v-if="catalogSelectedIds.includes(catalog.id)" width="12" height="12"
                                            viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <button @click.stop="openProductsModal(catalog)"
                                        class="px-2 py-1 rounded-[6px] hover:bg-gray-100 transition-colors text-[#8C7A6B] flex items-center gap-1.5 border border-[#8C7A6B]/20">
                                        <span class="text-[11px] font-medium">Select Products</span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </button>
                                </div>

                                <div>
                                    <h3 class="text-[15px] font-bold text-gray-900 mb-0.5">{{ catalog.name }}</h3>
                                    <p class="text-[12px] text-gray-500">
                                        {{catalog.products?.filter(p => selectedProductIds.includes(p.id)).length || 0
                                        }} of {{ catalog.productCount }} products selected
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="p-6 border-t border-gray-100 flex gap-3">
                        <button @click="showCatalogModal = false"
                            class="flex-1 py-3.5 border border-gray-200 text-gray-700 rounded-[14px] text-[15px] font-semibold hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                        <button @click="showCatalogModal = false"
                            class="flex-1 py-3.5 bg-[#8C7A6B] text-white rounded-[14px] text-[15px] font-semibold hover:bg-[#7a6b5d] transition-colors shadow-sm">
                            Add Permission
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>

        <!-- Select Products Modal (Modal 3) -->
        <Teleport to="body">
            <div v-if="showProductsModal" class="fixed inset-0 z-[120] flex items-center justify-center p-4">
                <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="showProductsModal = false"></div>
                <div @click.stop
                    class="bg-white rounded-[24px] w-full max-w-[500px] z-10 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">

                    <!-- Header -->
                    <div class="p-6 border-b border-gray-100 flex items-center gap-3">
                        <button @click="showProductsModal = false"
                            class="text-gray-400 hover:text-gray-900 transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                        </button>
                        <div>
                            <h2 class="text-[20px] font-bold text-gray-900 mb-1">Select Products</h2>
                            <p class="text-[13px] text-gray-400">{{ activeCatalog?.name }} Products selection</p>
                        </div>
                    </div>

                    <!-- Search & Toggle -->
                    <div class="px-6 py-4 flex flex-col gap-4">
                        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-[14px]">
                            <div>
                                <p class="text-[14px] font-semibold text-gray-900">Allow All Products</p>
                                <p class="text-[11px] text-gray-400 mt-0.5">Toggle to select all items in this catalog
                                </p>
                            </div>
                            <button @click="allowAllProducts = !allowAllProducts"
                                :class="['relative w-11 h-6 rounded-full transition-colors flex-shrink-0', allowAllProducts ? 'bg-[#8C7A6B]' : 'bg-gray-200']">
                                <span
                                    :class="['absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform', allowAllProducts ? 'translate-x-5' : 'translate-x-0']"></span>
                            </button>
                        </div>

                        <div class="relative">
                            <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input type="text" v-model="productSearch" placeholder="Search products..."
                                class="w-full pl-11 pr-4 py-3 rounded-[14px] border border-gray-200 bg-gray-50 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#8C7A6B]/20 focus:border-[#8C7A6B] transition-all">
                        </div>
                    </div>

                    <!-- Products List -->
                    <div class="flex-1 overflow-y-auto px-6 pb-6 scrollbar-hide">
                        <div class="flex flex-col gap-2">
                            <div v-for="product in filteredActiveProducts" :key="product.id"
                                @click="toggleSelectedProduct(product.id)"
                                :class="['flex items-center gap-4 p-3 rounded-[18px] border transition-all cursor-pointer',
                                    selectedProductIds.includes(product.id) ? 'border-[#8C7A6B] bg-[#faf8f6]' : 'border-gray-100 bg-white hover:border-gray-200']">

                                <div
                                    :class="['w-5 h-5 rounded-[6px] border-2 flex items-center justify-center transition-all flex-shrink-0',
                                        selectedProductIds.includes(product.id) ? 'border-[#8C7A6B] bg-[#8C7A6B]' : 'border-gray-200 bg-white']">
                                    <svg v-if="selectedProductIds.includes(product.id)" width="12" height="12"
                                        viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>

                                <img :src="product.image" class="w-12 h-12 rounded-[10px] object-cover bg-gray-100">

                                <div class="flex-1 min-w-0">
                                    <h4 class="text-[14px] font-bold text-gray-900 truncate">{{ product.name }}</h4>
                                    <p class="text-[12px] text-gray-500">{{ product.type }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="p-6 border-t border-gray-100 flex gap-3">
                        <button @click="showProductsModal = false"
                            class="flex-1 py-3.5 bg-[#8C7A6B] text-white rounded-[14px] text-[15px] font-semibold hover:bg-[#7a6b5d] transition-colors shadow-sm">
                            Add products{{ selectedProductIds.length > 0 ? ` (${selectedProductIds.length})` : '' }}
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Navbar from '../components/Navbar.vue'
import HeaderComponent from '../components/header.vue'

const isSidebarOpen = ref(false)
const showSuccessModal = ref(false)

// Catalog Selection State
const showCatalogModal = ref(false)
const catalogSearch = ref('')
const catalogSelectedIds = ref([])

const catalogs = ref([
    {
        id: 1, name: 'Catalog1', productCount: 2,
        products: [
            { id: 101, name: 'Product 1', type: 'Marble', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop' },
            { id: 102, name: 'Product 2', type: 'Marble', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop' },
        ]
    },
    {
        id: 2, name: 'Catalog1', productCount: 2,
        products: [
            { id: 201, name: 'Product 1', type: 'Granite', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop' },
            { id: 202, name: 'Product 2', type: 'Granite', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop' },
        ]
    },
    {
        id: 3, name: 'Catalog1', productCount: 2,
        products: [
            { id: 301, name: 'Product 1', type: 'Marble', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop' },
            { id: 302, name: 'Product 2', type: 'Marble', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop' },
        ]
    },
    { id: 4, name: 'Catalog1', productCount: 2, products: [] },
    { id: 5, name: 'Catalog1', productCount: 2, products: [] },
    { id: 6, name: 'Catalog1', productCount: 2, products: [] },
    { id: 7, name: 'Catalog1', productCount: 2, products: [] },
    { id: 8, name: 'Catalog1', productCount: 2, products: [] },
])

const filteredCatalogs = computed(() => {
    if (!catalogSearch.value) return catalogs.value
    return catalogs.value.filter(c => c.name.toLowerCase().includes(catalogSearch.value.toLowerCase()))
})

const selectedCatalogs = computed(() =>
    catalogs.value.filter(c => catalogSelectedIds.value.includes(c.id))
)

const toggleCatalogId = (id) => {
    if (catalogSelectedIds.value.includes(id)) {
        catalogSelectedIds.value = catalogSelectedIds.value.filter(i => i !== id)
    } else {
        catalogSelectedIds.value = [...catalogSelectedIds.value, id]
    }
}

// Modal 3 – Select Products
const showProductsModal = ref(false)
const activeCatalog = ref(null)
const allowAllProducts = ref(false)
const productSearch = ref('')
const selectedProductIds = ref([])

const activeCatalogProducts = computed(() => activeCatalog.value?.products ?? [])

const filteredActiveProducts = computed(() => {
    if (!productSearch.value) return activeCatalogProducts.value
    return activeCatalogProducts.value.filter(p =>
        p.name.toLowerCase().includes(productSearch.value.toLowerCase())
    )
})

const toggleSelectedProduct = (id) => {
    if (selectedProductIds.value.includes(id)) {
        selectedProductIds.value = selectedProductIds.value.filter(i => i !== id)
    } else {
        selectedProductIds.value = [...selectedProductIds.value, id]
    }
}

const openProductsModal = (catalog) => {
    activeCatalog.value = catalog
    productSearch.value = ''
    // Check if all products of this catalog are already selected
    const allIds = catalog.products.map(p => p.id)
    allowAllProducts.value = allIds.every(id => selectedProductIds.value.includes(id)) && allIds.length > 0
    showProductsModal.value = true
}

watch(allowAllProducts, (newVal) => {
    if (!activeCatalog.value) return
    const allIds = activeCatalog.value.products.map(p => p.id)
    if (newVal) {
        // Add all IDs from active catalog if not already present
        const currentIds = new Set(selectedProductIds.value)
        allIds.forEach(id => currentIds.add(id))
        selectedProductIds.value = Array.from(currentIds)
    } else {
        // Remove all IDs from active catalog
        selectedProductIds.value = selectedProductIds.value.filter(id => !allIds.includes(id))
    }
})

const getProductSelectionLabel = (catalog) => {
    const selectedCount = catalog.products?.filter(p => selectedProductIds.value.includes(p.id)).length || 0
    if (selectedCount === catalog.productCount && catalog.productCount > 0) return 'All Products'
    if (selectedCount > 0) return 'Custom Selection'
    return 'No Products'
}

const settings = ref({
    storeName: '',
    storeUrl: '',
    tagline: '',
    country: '',
    city: '',
    accessType: 'public', // 'public', 'private', 'specific'
    priceVisibility: 'hide', // 'hide', 'approved'
    marketplaceListing: true,
    defaultView: 'catalog', // 'catalog', 'grid'
    showProductCode: false
})

const handleSave = () => {
    // Logic to save settings
    showSuccessModal.value = true
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
</style>
