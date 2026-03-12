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

                <div class="px-4 lg:px-8 py-4 lg:py-6 max-w-[1200px] mx-auto w-full pb-20" style="padding-top: 0;">

                    <!-- Header -->
                    <div class="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 class="text-[24px] font-bold text-gray-900 leading-tight mb-1">Customer Permissions</h1>
                            <p class="text-[14px] text-gray-500">Manage customer access, pricing visibility, and
                                time-limited permissions</p>
                        </div>
                        <button @click="isAddModalOpen = true"
                            class="flex items-center gap-2 px-5 py-2.5 bg-[#847365] hover:bg-[#736458] text-white rounded-[12px] text-[14px] font-medium transition-colors shadow-sm whitespace-nowrap">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Add Permision
                        </button>
                    </div>

                    <!-- Stats Cards -->
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div
                            class="bg-white rounded-[16px] border border-gray-100 p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                            <div class="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    class="text-gray-500">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                            <p class="text-[26px] font-bold text-gray-900 mb-0.5">{{ totalPermissions }}</p>
                            <p class="text-[13px] text-gray-500">Total Permissions</p>
                        </div>
                        <div
                            class="bg-white rounded-[16px] border border-gray-100 p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                            <div class="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center mb-3">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            </div>
                            <p class="text-[26px] font-bold text-gray-900 mb-0.5">{{ activePermissions }}</p>
                            <p class="text-[13px] text-gray-500">Active & Valid</p>
                        </div>
                        <div
                            class="bg-white rounded-[16px] border border-gray-100 p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                            <div class="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center mb-3">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                            </div>
                            <p class="text-[26px] font-bold text-gray-900 mb-0.5">{{ expiringSoonCount }}</p>
                            <p class="text-[13px] text-gray-500">Expiring Soon</p>
                        </div>
                        <div
                            class="bg-white rounded-[16px] border border-gray-100 p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                            <div class="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center mb-3">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="15" y1="9" x2="9" y2="15"></line>
                                    <line x1="9" y1="9" x2="15" y2="15"></line>
                                </svg>
                            </div>
                            <p class="text-[26px] font-bold text-gray-900 mb-0.5">{{ expiredCount }}</p>
                            <p class="text-[13px] text-gray-500">Expired</p>
                        </div>
                    </div>

                    <!-- Filters & Search -->
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
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
                        <div class="relative w-full sm:w-auto">
                            <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="15" height="15"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input type="text" v-model="searchQuery" placeholder="Search permissions, customers..."
                                class="w-full sm:w-[300px] pl-10 pr-4 py-2.5 rounded-[12px] border border-gray-200 bg-white text-[14px] focus:outline-none focus:ring-2 focus:ring-[#847365]/20 focus:border-[#847365] transition-colors">
                        </div>
                    </div>

                    <!-- Table -->
                    <div
                        class="bg-white rounded-[16px] border border-gray-100 overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                        <!-- Header -->
                        <div class="grid grid-cols-6 px-5 py-3 bg-gray-50 border-b border-gray-100">
                            <span class="text-[13px] font-semibold text-gray-600">Customer</span>
                            <span class="text-[13px] font-semibold text-gray-600">Permissions</span>
                            <span class="text-[13px] font-semibold text-gray-600">Status</span>
                            <span class="text-[13px] font-semibold text-gray-600">Expiration</span>
                            <span class="text-[13px] font-semibold text-gray-600">Notes</span>
                            <span class="text-[13px] font-semibold text-gray-600 text-right">Actions</span>
                        </div>

                        <!-- Rows -->
                        <div v-for="(perm, idx) in paginatedPermissions" :key="idx"
                            class="grid grid-cols-6 px-5 py-4 border-b border-gray-50 last:border-0 items-center hover:bg-gray-50/50 transition-colors">
                            <span class="text-[14px] text-gray-700 truncate pr-4">{{ perm.customer_email ||
                                perm.customer_id }}</span>
                            <span>
                                <span :class="[
                                    'px-3 py-1 rounded-full text-[12px] font-medium',
                                    perm.can_view_catalog && perm.can_view_price ? 'bg-orange-100 text-orange-600' :
                                        perm.can_view_price ? 'bg-green-100 text-green-600' :
                                            'bg-blue-100 text-blue-600'
                                ]">
                                    {{ perm.can_view_catalog && perm.can_view_price ? 'Full Access' :
                                        (perm.can_view_price ? 'View Price' : 'View Catalog') }}
                                </span>
                            </span>
                            <span>
                                <span :class="[
                                    'flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-[12px] font-medium',
                                    perm.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
                                ]">
                                    <span
                                        :class="['w-1.5 h-1.5 rounded-full', perm.status === 'active' ? 'bg-green-500' : 'bg-red-400']"></span>
                                    {{ perm.status.charAt(0).toUpperCase() + perm.status.slice(1) }}
                                </span>
                            </span>
                            <span class="text-[14px] text-gray-500">{{ formatDate(perm.expires_at) }}</span>
                            <span class="text-[14px] text-gray-500 truncate" :title="perm.catalog_scope">{{
                                perm.catalog_scope || 'All' }}</span>
                            <div class="flex items-center justify-end gap-3">
                                <button @click="openEditModal(perm)"
                                    class="text-gray-400 hover:text-gray-700 transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M12 20h9"></path>
                                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                    </svg>
                                </button>
                                <button @click="handleRevokePermission(perm)"
                                    class="text-red-400 hover:text-red-600 transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="8.5" cy="7" r="4"></circle>
                                        <line x1="18" y1="8" x2="23" y2="13"></line>
                                        <line x1="23" y1="8" x2="18" y2="13"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Pagination -->
                    <Pagnetion :current-page="currentPage" :total-pages="totalPages"
                        :total-items="filteredPermissions.length" :per-page="perPage"
                        @page-change="currentPage = $event" />
                </div>
            </main>
        </div>

        <!-- Add Permission Modal -->
        <div v-if="isAddModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="isAddModalOpen = false"></div>
            <div @click.stop
                class="bg-white rounded-[20px] w-full max-w-[440px] z-10 shadow-xl flex flex-col max-h-[90vh] overflow-y-auto relative">

                <!-- Title -->
                <div class="p-6 pb-4">
                    <h2 class="text-[20px] font-bold text-gray-900 mb-1">Customer Permission</h2>
                    <p class="text-[13px] text-gray-400">Add new customer access with specific permissions</p>
                </div>
                <div class="px-6">
                    <div class="w-full h-[1px] bg-gray-100"></div>
                </div>

                <div class="p-6 flex flex-col gap-5">

                    <!-- Customer Information -->
                    <div>
                        <p class="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Customer
                            Information</p>
                        <div class="flex flex-col gap-3">
                            <div>
                                <label class="block text-[13px] font-medium text-gray-800 mb-1.5">Email*</label>
                                <input type="email" v-model="newPerm.email" placeholder="e.g. customer@gmail.com"
                                    class="w-full px-4 py-2.5 rounded-[10px] border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#847365]/20 focus:border-[#847365] transition-colors text-[14px]">
                            </div>
                            <div>
                                <label class="block text-[13px] font-medium text-gray-800 mb-1.5">Customer Name</label>
                                <input type="text" v-model="newPerm.name" placeholder="e.g. Ahmed"
                                    class="w-full px-4 py-2.5 rounded-[10px] border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#847365]/20 focus:border-[#847365] transition-colors text-[14px]">
                            </div>
                        </div>
                    </div>

                    <!-- Access Permission -->
                    <div>
                        <p class="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Access
                            Permission*</p>
                        <div class="flex flex-col gap-2">
                            <!-- Full Access -->
                            <div @click="newPerm.permission = 'Full Access'" :class="[
                                'flex items-start gap-3 p-4 rounded-[12px] border cursor-pointer transition-all',
                                newPerm.permission === 'Full Access' ? 'border-[#847365]/40 bg-[#faf8f6]' : 'border-gray-100 hover:bg-gray-50'
                            ]">
                                <div
                                    :class="['w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors', newPerm.permission === 'Full Access' ? 'border-[#847365] bg-[#847365]' : 'border-gray-300']">
                                    <svg v-if="newPerm.permission === 'Full Access'" width="10" height="10"
                                        viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <div class="flex items-start gap-2 flex-1">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#847365"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="mt-0.5 flex-shrink-0">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[14px] font-semibold text-gray-900">Full Access</p>
                                        <p class="text-[12px] text-gray-400 mt-0.5">Complete access to catalog and all
                                            pricing information</p>
                                    </div>
                                </div>
                            </div>
                            <!-- View Catalog -->
                            <div @click="newPerm.permission = 'View Catalog'" :class="[
                                'flex items-start gap-3 p-4 rounded-[12px] border cursor-pointer transition-all',
                                newPerm.permission === 'View Catalog' ? 'border-[#847365]/40 bg-[#faf8f6]' : 'border-gray-100 hover:bg-gray-50'
                            ]">
                                <div
                                    :class="['w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors', newPerm.permission === 'View Catalog' ? 'border-[#847365] bg-[#847365]' : 'border-gray-300']">
                                    <svg v-if="newPerm.permission === 'View Catalog'" width="10" height="10"
                                        viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <div class="flex items-start gap-2 flex-1">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="mt-0.5 flex-shrink-0">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                    <div>
                                        <p class="text-[14px] font-semibold text-gray-900">View Catalog</p>
                                        <p class="text-[12px] text-gray-400 mt-0.5">Access to browse products without
                                            pricing</p>
                                    </div>
                                </div>
                            </div>
                            <!-- View Prices -->
                            <div @click="newPerm.permission = 'View Prices'" :class="[
                                'flex items-start gap-3 p-4 rounded-[12px] border cursor-pointer transition-all',
                                newPerm.permission === 'View Prices' ? 'border-[#847365]/40 bg-[#faf8f6]' : 'border-gray-100 hover:bg-gray-50'
                            ]">
                                <div
                                    :class="['w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors', newPerm.permission === 'View Prices' ? 'border-[#847365] bg-[#847365]' : 'border-gray-300']">
                                    <svg v-if="newPerm.permission === 'View Prices'" width="10" height="10"
                                        viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <div class="flex items-start gap-2 flex-1">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="mt-0.5 flex-shrink-0">
                                        <line x1="12" y1="1" x2="12" y2="23"></line>
                                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[14px] font-semibold text-gray-900">View Prices</p>
                                        <p class="text-[12px] text-gray-400 mt-0.5">Access to view product pricing
                                            information</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Access Duration -->
                    <div>
                        <p class="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Access Duration
                        </p>
                        <label class="block text-[13px] font-medium text-gray-800 mb-1.5">Valid for (days)</label>
                        <input type="number" v-model="newPerm.days" min="1"
                            class="w-full px-4 py-2.5 rounded-[10px] border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#847365]/20 focus:border-[#847365] transition-colors text-[14px]">
                        <p class="flex items-center gap-1.5 mt-2 text-[12px] text-orange-500">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            Expires in {{ expiryDate }}
                        </p>
                    </div>

                    <!-- Notes -->
                    <div>
                        <label class="block text-[13px] font-medium text-gray-800 mb-1.5">Notes</label>
                        <textarea v-model="newPerm.notes" placeholder="Add any note about this permission" rows="3"
                            class="w-full px-4 py-2.5 rounded-[10px] border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#847365]/20 focus:border-[#847365] transition-colors text-[14px] resize-none"></textarea>
                    </div>

                    <!-- Access Catalog -->
                    <div>
                        <p class="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Access
                            Products*
                        </p>

                        <!-- Selected Catalogs Cards -->
                        <div v-if="selectedCatalogs.length > 0" class="mb-3">
                            <div class="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                                <div v-for="catalog in selectedCatalogs" :key="catalog.id"
                                    class="flex-shrink-0 w-[165px] flex flex-col p-4 rounded-[14px] border border-[#847365]/40 bg-[#faf8f6] cursor-pointer transition-all">
                                    <!-- Checkbox row -->
                                    <div class="flex items-center justify-between mb-2.5">
                                        <div @click="toggleCatalogId(catalog.id)"
                                            class="w-5 h-5 rounded-[5px] border-2 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer border-[#847365] bg-[#847365]">
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white"
                                                stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                    </div>
                                    <!-- Name & count -->
                                    <p class="text-[14px] font-bold text-gray-900 mb-0.5">{{ catalog.name }}</p>
                                    <p class="text-[12px] text-gray-400 mb-2.5">{{ catalog.productCount }} Products</p>
                                    <!-- View Products button -->
                                    <button @click.stop="openProductsModal(catalog)"
                                        class="flex items-center justify-center gap-1.5 w-full py-1.5 border border-gray-200 rounded-[7px] text-[11px] font-medium text-gray-600 hover:bg-gray-100 transition-colors bg-white">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <path
                                                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z">
                                            </path>
                                        </svg>
                                        Products
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button @click="showCatalogModal = true"
                            class="w-full py-3 border border-dashed border-gray-300 rounded-[10px] text-[14px] font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center justify-center gap-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            {{ catalogSelectedIds.length > 0 ? 'Add More Catalogs' : 'Select Catalog' }}
                        </button>
                    </div>
                </div>



                <div class="px-6">
                    <div class="w-full h-[1px] bg-gray-100"></div>
                </div>
                <div class="p-6 pt-5 flex gap-3">
                    <button @click="isAddModalOpen = false; isEditing = false"
                        class="flex-1 py-3 border border-gray-200 text-gray-900 rounded-[12px] text-[15px] font-medium hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                    <button @click="handleAddPermission"
                        class="flex-1 py-3 bg-[#847365] text-white rounded-[12px] text-[15px] font-medium hover:bg-[#736458] transition-colors shadow-sm">
                        {{ isEditing ? 'Update Permission' : 'Add Permission' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- ===== Modal 2: Select Catalogs ===== -->
        <div v-if="showCatalogModal" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="showCatalogModal = false"></div>
            <div class="bg-white rounded-[20px] w-full max-w-[440px] z-10 shadow-xl flex flex-col max-h-[90vh]">

                <!-- Header -->
                <div class="p-6 pb-4 flex items-start gap-3">
                    <button @click="showCatalogModal = false"
                        class="mt-0.5 text-gray-500 hover:text-gray-900 transition-colors flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                    </button>
                    <div>
                        <h3 class="text-[18px] font-bold text-gray-900 mb-0.5">Select Catalogs</h3>
                        <p class="text-[13px] text-gray-400">Add new customer access with specific permissions</p>
                    </div>
                </div>
                <div class="px-6">
                    <div class="w-full h-[1px] bg-gray-100"></div>
                </div>

                <div class="flex flex-col gap-4 p-6 overflow-y-auto flex-1">
                    <!-- Allow All Catalogs Toggle -->
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-[12px]">
                        <div>
                            <p class="text-[14px] font-semibold text-gray-900">Allow All Catalogs</p>
                            <p class="text-[12px] text-gray-400 mt-0.5">Only approved buyers can view the price</p>
                        </div>
                        <button @click="allowAllCatalogs = !allowAllCatalogs"
                            :class="['relative w-11 h-6 rounded-full transition-colors flex-shrink-0', allowAllCatalogs ? 'bg-[#847365]' : 'bg-gray-200']">
                            <span
                                :class="['absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform', allowAllCatalogs ? 'translate-x-5' : 'translate-x-0']"></span>
                        </button>
                    </div>

                    <!-- Search -->
                    <div class="relative">
                        <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="15" height="15"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input type="text" v-model="catalogSearch" placeholder="Search catalog..."
                            class="w-full pl-10 pr-4 py-2.5 rounded-[12px] border border-gray-200 bg-gray-50 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#847365]/20 focus:border-[#847365] transition-colors">
                    </div>

                    <!-- Catalogs Grid -->
                    <div class="grid grid-cols-2 gap-3">
                        <div v-for="catalog in filteredCatalogs" :key="catalog.id" :class="[
                            'flex flex-col p-4 rounded-[14px] border cursor-pointer transition-all',
                            catalogSelectedIds.includes(catalog.id) ? 'border-[#847365]/40 bg-[#faf8f6]' : 'border-gray-200 bg-white hover:bg-gray-50'
                        ]">
                            <!-- Checkbox row -->
                            <div class="flex items-center justify-between mb-3">
                                <div @click="toggleCatalogId(catalog.id)" :class="[
                                    'w-5 h-5 rounded-[5px] border-2 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer',
                                    catalogSelectedIds.includes(catalog.id) ? 'border-[#847365] bg-[#847365]' : 'border-gray-300'
                                ]">
                                    <svg v-if="catalogSelectedIds.includes(catalog.id)" width="11" height="11"
                                        viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                            </div>
                            <!-- Name & count -->
                            <p class="text-[16px] font-bold text-gray-900">{{ catalog.name }}</p>
                            <p class="text-[13px] text-gray-400 mb-3">{{ catalog.productCount }} Products</p>
                            <!-- View Products button -->
                            <button @click.stop="openProductsModal(catalog)"
                                class="flex items-center justify-center gap-2 w-full py-2 border border-gray-200 rounded-[8px] text-[13px] font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path
                                        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z">
                                    </path>
                                </svg>
                                View Products
                            </button>
                        </div>
                    </div>
                </div>

                <div class="px-6">
                    <div class="w-full h-[1px] bg-gray-100"></div>
                </div>
                <div class="p-6 pt-4">
                    <button @click="showCatalogModal = false"
                        class="w-full py-3.5 bg-[#847365] hover:bg-[#736458] text-white rounded-[14px] text-[15px] font-semibold transition-colors shadow-sm">
                        Add Catalog{{ catalogSelectedIds.length > 0 ? ` (${catalogSelectedIds.length})` : '' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- ===== Modal 3: View Products of a Catalog ===== -->
        <div v-if="showProductsModal" class="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="showProductsModal = false"></div>
            <div class="bg-white rounded-[20px] w-full max-w-[440px] z-10 shadow-xl flex flex-col max-h-[90vh]">

                <!-- Header -->
                <div class="p-6 pb-4 flex items-start gap-3">
                    <button @click="showProductsModal = false"
                        class="mt-0.5 text-gray-500 hover:text-gray-900 transition-colors flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                    </button>
                    <div>
                        <h3 class="text-[18px] font-bold text-gray-900 mb-0.5">Select Products</h3>
                        <p class="text-[13px] text-gray-400">Add new customer access with specific permissions</p>
                    </div>
                </div>
                <div class="px-6">
                    <div class="w-full h-[1px] bg-gray-100"></div>
                </div>

                <div class="flex flex-col gap-4 p-6 overflow-y-auto flex-1">
                    <!-- Allow All Products Toggle -->
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-[12px]">
                        <div>
                            <p class="text-[14px] font-semibold text-gray-900">Allow All Products</p>
                            <p class="text-[12px] text-gray-400 mt-0.5">Only approved buyers can view the price</p>
                        </div>
                        <button @click="allowAllProducts = !allowAllProducts"
                            :class="['relative w-11 h-6 rounded-full transition-colors flex-shrink-0', allowAllProducts ? 'bg-[#847365]' : 'bg-gray-200']">
                            <span
                                :class="['absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform', allowAllProducts ? 'translate-x-5' : 'translate-x-0']"></span>
                        </button>
                    </div>

                    <!-- Search -->
                    <div class="relative">
                        <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="15" height="15"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input type="text" v-model="productSearch" placeholder="Search products..."
                            class="w-full pl-10 pr-4 py-2.5 rounded-[12px] border border-gray-200 bg-gray-50 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#847365]/20 focus:border-[#847365] transition-colors">
                    </div>

                    <!-- Products List -->
                    <div class="flex flex-col gap-2">
                        <div v-for="product in filteredActiveProducts" :key="product.id"
                            @click="toggleSelectedProduct(product.id)" :class="[
                                'flex items-center gap-4 p-3 rounded-[14px] border cursor-pointer transition-all',
                                selectedProductIds.includes(product.id) ? 'border-[#847365]/40 bg-[#faf8f6]' : 'border-gray-100 bg-white hover:bg-gray-50'
                            ]">
                            <!-- Checkbox -->
                            <div :class="[
                                'w-5 h-5 rounded-[5px] border-2 flex items-center justify-center flex-shrink-0 transition-colors',
                                selectedProductIds.includes(product.id) ? 'border-[#847365] bg-[#847365]' : 'border-gray-300'
                            ]">
                                <svg v-if="selectedProductIds.includes(product.id)" width="11" height="11"
                                    viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <!-- Image -->
                            <div class="w-[64px] h-[64px] rounded-[10px] overflow-hidden flex-shrink-0 bg-gray-100">
                                <img :src="product.image" :alt="product.name" class="w-full h-full object-cover">
                            </div>
                            <!-- Info -->
                            <div class="flex-1 min-w-0">
                                <h4 class="text-[14px] font-semibold text-gray-900 truncate">{{ product.name }}</h4>
                                <p class="text-[12px] text-gray-400">{{ product.type }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="px-6">
                    <div class="w-full h-[1px] bg-gray-100"></div>
                </div>
                <div class="p-6 pt-4">
                    <button @click="showProductsModal = false"
                        class="w-full py-3.5 bg-[#847365] hover:bg-[#736458] text-white rounded-[14px] text-[15px] font-semibold transition-colors shadow-sm">
                        Add products{{ selectedProductIds.length > 0 ? ` (${selectedProductIds.length})` : '' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import HeaderComponent from '../components/header.vue'
import Pagnetion from '../components/pagnetion.vue'
import { usePermissionStore } from '../store/permission'
import { useProductStore } from '../store/product'
import { useToast } from 'vue-toastification'

const toast = useToast()
const permissionStore = usePermissionStore()
const productStore = useProductStore()

const isSidebarOpen = ref(false)
const isAddModalOpen = ref(false)
const isEditing = ref(false)
const activeFilter = ref('All')
const searchQuery = ref('')
const currentPage = ref(1)
const perPage = 10

const newPerm = ref({
    id: null,
    email: '',
    name: '',
    permission: 'Full Access',
    days: 30,
    notes: '',
    customer_id: null
})

// Modal 2 – Select Catalogs
const showCatalogModal = ref(false)
const catalogSearch = ref('')
const catalogSelectedIds = ref([])
const allowAllCatalogs = ref(false)

// Modal 3 – Select Products
const showProductsModal = ref(false)
const activeCatalog = ref(null)
const allowAllProducts = ref(false)
const productSearch = ref('')
const selectedProductIds = ref([])

const catalogs = computed(() => {
    const apiUrl = import.meta.env.VITE_API_URL || ''
    const catMap = {}

    productStore.products.forEach(product => {
        const catName = product.metadata?.category || 'Uncategorized'
        if (!catMap[catName]) {
            let imageUrl = 'https://via.placeholder.com/400x400?text=No+Image'
            if (product.images?.[0]?.url) {
                imageUrl = product.images[0].url
                if (imageUrl.startsWith('/')) {
                    imageUrl = `${apiUrl}${imageUrl}`
                }
            }
            catMap[catName] = {
                id: catName,
                name: catName,
                productCount: 0,
                image: imageUrl,
                products: []
            }
        }
        catMap[catName].productCount++
        catMap[catName].products.push({
            id: product.id,
            name: product.name,
            type: product.metadata?.classification || 'General',
            image: product.images?.[0]?.url
                ? (product.images[0].url.startsWith('/') ? `${apiUrl}${product.images[0].url}` : product.images[0].url)
                : 'https://via.placeholder.com/80x80'
        })
    })

    return Object.values(catMap).sort((a, b) => a.name.localeCompare(b.name))
})

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
    allowAllProducts.value = false
    showProductsModal.value = true
}

const expiryDate = computed(() => {
    const d = new Date()
    d.setDate(d.getDate() + Number(newPerm.value.days || 0))
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
})

const filteredPermissions = computed(() => {
    let list = permissionStore.permissions
    if (activeFilter.value === 'Active') list = list.filter(p => p.status === 'active')
    else if (activeFilter.value === 'Expiring' || activeFilter.value === 'Soon Expired') {
        const soon = new Date()
        soon.setDate(soon.getDate() + 7)
        list = list.filter(p => new Date(p.expires_at) < soon && p.status === 'active')
    }

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        list = list.filter(p => {
            const email = (p.customer_email || '').toLowerCase()
            const cid = (p.customer_id || '').toLowerCase()
            return email.includes(query) || cid.includes(query)
        })
    }
    return list
})

const paginatedPermissions = computed(() => {
    const start = (currentPage.value - 1) * perPage
    return filteredPermissions.value.slice(start, start + perPage)
})

const totalPermissions = computed(() => permissionStore.permissions.length)
const activePermissions = computed(() => permissionStore.permissions.filter(p => p.status === 'active').length)
const expiringSoonCount = computed(() => {
    const soon = new Date()
    soon.setDate(soon.getDate() + 7)
    return permissionStore.permissions.filter(p => new Date(p.expires_at) < soon && p.status === 'active').length
})
const expiredCount = computed(() => permissionStore.permissions.filter(p => p.status === 'expired').length)

const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A'
    const d = new Date(dateStr)
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}

const totalPages = computed(() => Math.max(1, Math.ceil(filteredPermissions.value.length / perPage)))

const handleAddPermission = async () => {
    try {
        const can_view_catalog = newPerm.value.permission === 'Full Access' || newPerm.value.permission === 'View Catalog'
        const can_view_price = newPerm.value.permission === 'Full Access' || newPerm.value.permission === 'View Prices'
        const expires_at = new Date()
        expires_at.setDate(expires_at.getDate() + Number(newPerm.value.days || 0))

        const payload = {
            can_view_catalog,
            can_view_price,
            expires_at: expires_at.toISOString(),
            catalog_scope: allowAllCatalogs.value ? 'all' : (catalogSelectedIds.value.join(',') || 'none')
        }

        if (isEditing.value) {
            await permissionStore.updateCustomerPermission(newPerm.value.customer_id, {
                ...payload,
                status: 'active'
            })
            toast.success('Permission updated successfully!')
        } else {
            const invitePayload = {
                email: newPerm.value.email,
                can_view_catalog,
                can_view_price,
                expires_at: expires_at.toISOString()
            }
            await permissionStore.grantPermissionByEmail(invitePayload)
            toast.success('Permission granted successfully!')
        }

        isAddModalOpen.value = false
        isEditing.value = false
        await permissionStore.fetchAllPermissions()
    } catch (error) {
        toast.error(error.message || 'Failed to process permission')
    }
}

const openEditModal = (perm) => {
    isEditing.value = true
    newPerm.value = {
        id: perm.id,
        customer_id: perm.customer_id,
        email: perm.customer_email || '',
        name: '',
        permission: perm.can_view_catalog && perm.can_view_price ? 'Full Access' : (perm.can_view_price ? 'View Prices' : 'View Catalog'),
        days: 30,
        notes: '',
        catalog_scope: perm.catalog_scope
    }
    isAddModalOpen.value = true
}

const handleRevokePermission = async (perm) => {
    if (!confirm(`Are you sure you want to revoke permission for ${perm.customer_email || perm.customer_id}?`)) return
    try {
        await permissionStore.deleteCustomerPermission(perm.customer_id)
        toast.success('Permission revoked successfully')
        await permissionStore.fetchAllPermissions()
    } catch (error) {
        toast.error('Failed to revoke permission')
    }
}

const filters = ['All', 'Active', 'Expiring', 'Soon Expired']

onMounted(async () => {
    try {
        await Promise.all([
            permissionStore.fetchAllPermissions().catch(() => { }),
            productStore.fetchProducts({ skip: 0, limit: 1000 })
        ])
    } catch (error) {
        console.error('Failed to fetch initial data:', error)
    }
})

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
</style>