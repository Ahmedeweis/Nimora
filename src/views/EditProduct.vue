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
                <div class="p-4 lg:p-8 max-w-[1200px] mx-auto w-full" s>
                    <div class="relative w-full">

                        <!-- Header -->
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div class="flex items-center gap-4">
                                <router-link :to="`/products/${$route.params.id || 1}`"
                                    class="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="19" y1="12" x2="5" y2="12"></line>
                                        <polyline points="12 19 5 12 12 5"></polyline>
                                    </svg>
                                </router-link>
                                <div>
                                    <h1 class="text-[24px] font-bold text-gray-900 leading-tight">Edit Product</h1>
                                    <p class="text-sm text-gray-500 mt-1">Editing: Carrara Marble</p>
                                </div>
                            </div>

                            <!-- Actions -->
                            <div class="flex items-center gap-3">
                                <button @click="handleCancel"
                                    class="px-5 py-2.5 border border-gray-200 text-gray-700 bg-white rounded-xl text-sm font-medium hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="15" y1="9" x2="9" y2="15"></line>
                                        <line x1="9" y1="9" x2="15" y2="15"></line>
                                    </svg>
                                    Cancel
                                </button>
                                <button @click="handleSave"
                                    class="px-5 py-2.5 bg-[#847365] text-white rounded-xl text-sm font-medium hover:bg-[#736458] flex items-center gap-2 transition-colors shadow-sm cursor-pointer">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z">
                                        </path>
                                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                        <polyline points="7 3 7 8 15 8"></polyline>
                                    </svg>
                                    Save
                                </button>
                            </div>
                        </div>

                        <!-- Main Grid Content -->
                        <div class="flex flex-col lg:flex-row gap-6">

                            <!-- Left Column (Main Content) -->
                            <div class="flex-1 space-y-6 min-w-0">

                                <!-- Basic Information Section -->
                                <div class="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
                                    <h2 class="text-[17px] font-bold text-gray-800 mb-5">Basic Information</h2>

                                    <div class="space-y-5">
                                        <!-- Product Name -->
                                        <div>
                                            <label class="block text-[14px] font-medium text-gray-700 mb-2">Product
                                                Name</label>
                                            <input type="text" placeholder="e.g. Carrara White Marble"
                                                value="Carrara White Marble"
                                                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                        </div>

                                        <!-- Category -->
                                        <div>
                                            <label
                                                class="block text-[14px] font-medium text-gray-700 mb-2">Category</label>
                                            <div class="flex gap-2">
                                                <div class="relative flex-1">
                                                    <select
                                                        class="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe] appearance-none">
                                                        <option>Select category</option>
                                                        <option selected>Marble</option>
                                                        <option>Granite</option>
                                                    </select>
                                                    <div
                                                        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" stroke-width="2"
                                                            stroke-linecap="round" stroke-linejoin="round">
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <button
                                                    class="w-11 h-11 flex-shrink-0 flex items-center justify-center border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round">
                                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <!-- Classification -->
                                        <div>
                                            <label
                                                class="block text-[14px] font-medium text-gray-700 mb-2">Classification</label>
                                            <div class="flex gap-2">
                                                <div class="relative flex-1">
                                                    <select
                                                        class="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe] appearance-none">
                                                        <option>Select Classification</option>
                                                        <option selected>Natural Stone</option>
                                                        <option>Engineered Stone</option>
                                                    </select>
                                                    <div
                                                        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" stroke-width="2"
                                                            stroke-linecap="round" stroke-linejoin="round">
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <button
                                                    class="w-11 h-11 flex-shrink-0 flex items-center justify-center border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round">
                                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Product Details Section -->
                                <div class="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
                                    <h2 class="text-[17px] font-bold text-gray-800 mb-5">Product Details</h2>

                                    <div class="grid grid-cols-1 gap-5">
                                        <!-- Available Colors -->
                                        <div>
                                            <label class="block text-[14px] font-medium text-gray-700 mb-2">Available
                                                Colors</label>
                                            <input type="text" placeholder="e.g., White, Beige, Gray"
                                                value="White, Gray"
                                                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                        </div>

                                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <!-- Available Sizes -->
                                            <div>
                                                <label
                                                    class="block text-[14px] font-medium text-gray-700 mb-2">Available
                                                    Sizes</label>
                                                <input type="text" placeholder="e.g., 60x60cm, 120x60cm"
                                                    value="24x24, 36x36"
                                                    class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                            </div>

                                            <!-- Price -->
                                            <div>
                                                <label
                                                    class="block text-[14px] font-medium text-gray-700 mb-2">Price</label>
                                                <input type="text" placeholder="0.00" value="45.99"
                                                    class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                            </div>
                                        </div>

                                        <!-- Product Description -->
                                        <div>
                                            <label class="block text-[14px] font-medium text-gray-700 mb-2">Product
                                                Description <span
                                                    class="font-normal text-gray-400 ml-1">(Optional)</span></label>
                                            <textarea
                                                placeholder="Describe the product features, materials, and benefits..."
                                                rows="4"
                                                class="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe] resize-none pb-12">A classic white marble highlighting gray veining, ideal for creating elegant and timeless spaces. Works wonderfully for flooring, countertops, and backsplashes.</textarea>
                                        </div>
                                    </div>
                                </div>

                                <!-- Applications Section -->
                                <div class="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
                                    <h2 class="text-[17px] font-bold text-gray-800 mb-2">Applications</h2>
                                    <p class="text-[13px] text-gray-500 mb-5">Applications will be used during AI
                                        generation
                                        to ensure realistic placement.</p>

                                    <label class="block text-[14px] font-medium text-gray-700 mb-3">Product Applications
                                        <span class="font-normal text-gray-400 ml-1">(Optional)</span></label>
                                    <div class="flex flex-wrap gap-2.5 mb-4">
                                        <button
                                            class="px-4 py-2 rounded-xl text-[13px] font-medium bg-[#847365] text-white cursor-pointer transition-colors shadow-sm">Floor</button>
                                        <button
                                            class="px-4 py-2 rounded-xl text-[13px] font-medium bg-[#847365] text-white cursor-pointer transition-colors shadow-sm">Wall</button>
                                        <button
                                            class="px-4 py-2 rounded-xl text-[13px] font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">Border</button>
                                        <button
                                            class="px-4 py-2 rounded-xl text-[13px] font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">Outdoor</button>
                                        <button
                                            class="px-4 py-2 rounded-xl text-[13px] font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">Stairs</button>
                                    </div>
                                    <div class="flex gap-2">
                                        <input type="text" placeholder="Custom....."
                                            class="w-[120px] border border-gray-200 rounded-xl px-4 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                        <button
                                            class="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-gray-200 border-dashed rounded-xl text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round">
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <!-- Product Variants Section -->
                                <div
                                    class="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 overflow-hidden">
                                    <div class="flex justify-between items-center mb-5">
                                        <h2 class="text-[17px] font-bold text-gray-800">Product Variants (3)</h2>
                                        <button
                                            class="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 bg-white text-gray-700 rounded-xl text-[13px] font-medium hover:bg-gray-50 transition-colors cursor-pointer">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round">
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                            Add Variant
                                        </button>
                                    </div>

                                    <div class="overflow-x-auto no-scrollbar">
                                        <table class="w-full min-w-[650px] text-left border-collapse">
                                            <thead>
                                                <tr>
                                                    <th class="pb-3 text-[13px] font-medium text-gray-500 w-[180px]">
                                                        Variant
                                                    </th>
                                                    <th class="pb-3 text-[13px] font-medium text-gray-500 w-[110px]">SKU
                                                    </th>
                                                    <th class="pb-3 text-[13px] font-medium text-gray-500 w-[110px]">
                                                        Color
                                                    </th>
                                                    <th class="pb-3 text-[13px] font-medium text-gray-500 w-[110px]">
                                                        Size
                                                    </th>
                                                    <th class="pb-3 text-[13px] font-medium text-gray-500 w-[100px]">
                                                        Price
                                                    </th>
                                                    <th class="pb-3 text-[13px] font-medium text-gray-500 w-[80px]">
                                                        Stock
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody class="space-y-3">
                                                <!-- Variant 1 -->
                                                <tr class="align-top">
                                                    <td class="pr-2 pb-3 pt-1">
                                                        <input type="text" value="Polished 24x24"
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                    <td class="pr-2 pb-3 pt-1">
                                                        <input type="text" value="CM-P-24"
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                    <td class="pr-2 pb-3 pt-1">
                                                        <input type="text" value="White"
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                    <td class="pr-2 pb-3 pt-1">
                                                        <input type="text" value="24x24"
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                    <td class="pr-2 pb-3 pt-1">
                                                        <input type="text" value="$45.99"
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] font-medium text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                    <td class="pb-3 pt-1">
                                                        <input type="text" value="150"
                                                            class="w-full border border-green-200 text-green-600 rounded-lg px-3 py-2 text-[13px] font-medium focus:outline-none focus:ring-1 focus:ring-green-400 bg-white">
                                                    </td>
                                                </tr>
                                                <!-- Variant 2 -->
                                                <tr class="align-top">
                                                    <td class="pr-2 pb-3">
                                                        <input type="text" value="Polished 36x36"
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                    <td class="pr-2 pb-3">
                                                        <input type="text" value="CM-P-36"
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                    <td class="pr-2 pb-3">
                                                        <input type="text" value="White"
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                    <td class="pr-2 pb-3">
                                                        <input type="text" value="36x36"
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                    <td class="pr-2 pb-3">
                                                        <input type="text" value="$62.99"
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] font-medium text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                    <td class="pb-3">
                                                        <input type="text" value="80"
                                                            class="w-full border border-red-200 text-red-500 rounded-lg px-3 py-2 text-[13px] font-medium focus:outline-none focus:ring-1 focus:ring-red-400 bg-white">
                                                    </td>
                                                </tr>
                                                <!-- Empty Input Row -->
                                                <tr class="align-top">
                                                    <td class="pr-2">
                                                        <input type="text" placeholder="Enter...."
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                    <td class="pr-2">
                                                        <input type="text" placeholder="Enter...."
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                    <td class="pr-2">
                                                        <input type="text" placeholder="Enter...."
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                    <td class="pr-2">
                                                        <input type="text" placeholder="Enter...."
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                    <td class="pr-2">
                                                        <input type="text" placeholder="Enter...."
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                    <td>
                                                        <input type="text" placeholder="Enter.."
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>

                            <!-- Right Column (Sidebar) -->
                            <div class="w-full lg:w-[320px] xl:w-[350px] space-y-6 flex-shrink-0">

                                <!-- Status -->
                                <div class="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
                                    <h2 class="text-[16px] font-bold text-gray-800 mb-4">Status</h2>

                                    <div>
                                        <label class="block text-[14px] font-medium text-gray-700 mb-2">Product
                                            status</label>
                                        <div class="relative">
                                            <select
                                                class="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe] appearance-none">
                                                <option selected>Published</option>
                                                <option>Draft</option>
                                                <option>Hidden</option>
                                            </select>
                                            <div
                                                class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Product Images -->
                                <div class="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
                                    <h2 class="text-[16px] font-bold text-gray-800 mb-4">Product Images</h2>

                                    <div class="space-y-4">
                                        <!-- Image 1 -->
                                        <div class="relative w-full h-[140px] rounded-[16px] overflow-hidden group">
                                            <!-- Background Image -->
                                            <img src="@/assets/imgs/product/1.webp" alt="Product Image 1"
                                                class="absolute inset-0 w-full h-full object-cover" />
                                            <div
                                                class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent">
                                            </div>

                                            <!-- Overlay Text -->
                                            <div class="absolute bottom-3 left-4 pr-4">
                                                <p class="text-[13px] font-medium text-white leading-tight">Luxury
                                                    bathroom
                                                    with Carrara marble walls</p>
                                            </div>

                                            <!-- Checkmark -->
                                            <div
                                                class="absolute top-3 right-3 w-6 h-6 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                                    stroke-linejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </div>

                                            <!-- Change Button -->
                                            <div class="absolute top-3 left-3">
                                                <button
                                                    class="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg text-gray-700 text-[12px] font-medium shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round">
                                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                        <polyline points="17 8 12 3 7 8"></polyline>
                                                        <line x1="12" y1="3" x2="12" y2="15"></line>
                                                    </svg>
                                                    change
                                                </button>
                                            </div>
                                        </div>

                                        <!-- Image 2 -->
                                        <div class="relative w-full h-[140px] rounded-[16px] overflow-hidden group">
                                            <!-- Background Image -->
                                            <img src="@/assets/imgs/product/2.webp" alt="Product Image 2"
                                                class="absolute inset-0 w-full h-full object-cover" />
                                            <div
                                                class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent">
                                            </div>

                                            <!-- Overlay Text -->
                                            <div class="absolute bottom-3 left-4 pr-4">
                                                <p class="text-[13px] font-medium text-white leading-tight">Modern
                                                    kitchen
                                                    with marble backsplash</p>
                                            </div>

                                            <!-- Change Button -->
                                            <div class="absolute top-3 left-3">
                                                <button
                                                    class="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg text-gray-700 text-[12px] font-medium shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round">
                                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                        <polyline points="17 8 12 3 7 8"></polyline>
                                                        <line x1="12" y1="3" x2="12" y2="15"></line>
                                                    </svg>
                                                    change
                                                </button>
                                            </div>
                                        </div>

                                        <!-- Image 3 -->
                                        <div class="relative w-full h-[140px] rounded-[16px] overflow-hidden group">
                                            <!-- Background Image -->
                                            <img src="@/assets/imgs/product/3.webp" alt="Product Image 3"
                                                class="absolute inset-0 w-full h-full object-cover" />
                                            <div
                                                class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent">
                                            </div>

                                            <!-- Overlay Text -->
                                            <div class="absolute bottom-3 left-4 pr-4">
                                                <p class="text-[13px] font-medium text-white leading-tight">Living room
                                                    with
                                                    marble accent wall</p>
                                            </div>

                                            <!-- Change Button -->
                                            <div class="absolute top-3 left-3">
                                                <button
                                                    class="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg text-gray-700 text-[12px] font-medium shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round">
                                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                        <polyline points="17 8 12 3 7 8"></polyline>
                                                        <line x1="12" y1="3" x2="12" y2="15"></line>
                                                    </svg>
                                                    change
                                                </button>
                                            </div>
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

    <!-- Success Modal -->
    <Teleport to="body">
        <div v-if="showSuccessModal" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
                @click="showSuccessModal = false"></div>

            <!-- Modal Content -->
            <div
                class="bg-white rounded-[20px] p-10 max-w-[440px] w-full relative z-10 flex flex-col items-center text-center shadow-2xl">
                <!-- Icon -->
                <div class="w-20 h-20 rounded-full border-[4px] border-[#847365] flex items-center justify-center mb-6">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" class="text-[#847365]"
                        stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>

                <h3 class="text-[22px] font-bold text-gray-800 mb-2">Product updated successfully.</h3>
                <p class="text-[15px] text-gray-500 mb-8">Carrara Marble has been updated successfully.</p>

                <button @click="closeSuccessModal"
                    class="w-[200px] py-3 bg-[#847365] text-white rounded-xl text-[15px] font-medium hover:bg-[#736458] transition-colors shadow-sm cursor-pointer">
                    Done
                </button>
            </div>
        </div>
    </Teleport>

    <!-- Unsaved Changes Modal -->
    <Teleport to="body">
        <div v-if="showUnsavedModal" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
                @click="showUnsavedModal = false"></div>

            <!-- Modal Content -->
            <div
                class="bg-white rounded-[20px] p-8 max-w-[440px] w-full relative z-10 flex flex-col items-center text-center shadow-2xl">
                <!-- Warning Icon -->
                <div class="w-16 h-16 rounded-full border-[3px] border-red-500 flex items-center justify-center mb-5">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="text-red-500"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                </div>

                <h3 class="text-[20px] font-bold text-gray-800 mb-2">Unsaved Changes</h3>
                <p class="text-[15px] text-gray-500 mb-8 px-4">You have unsaved changes. Do you want to leave without
                    saving?</p>

                <div class="flex gap-4 w-full">
                    <button @click="showUnsavedModal = false"
                        class="flex-1 py-3 bg-white border border-gray-200 text-gray-800 rounded-xl text-[15px] font-medium hover:bg-gray-50 transition-colors cursor-pointer">
                        Stay on Page
                    </button>
                    <button @click="confirmDiscard"
                        class="flex-1 py-3 bg-[#847365] text-white rounded-xl text-[15px] font-medium hover:bg-[#736458] transition-colors shadow-sm cursor-pointer">
                        Discard Changes
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import HeaderComponent from '../components/header.vue'

const router = useRouter()
const route = useRoute()

const isSidebarOpen = ref(false)
const showSuccessModal = ref(false)
const showUnsavedModal = ref(false)

// We'll mock "hasUnsavedChanges" to true to demonstrate the feature for the user immediately.
// In a real app, this watches form fields or a pinia store.
const hasUnsavedChanges = ref(true)
let pendingNavigation = null

// Guard route changes
onBeforeRouteLeave((to, from, next) => {
    if (hasUnsavedChanges.value && !showSuccessModal.value) {
        pendingNavigation = next
        showUnsavedModal.value = true
    } else {
        next()
    }
})

const handleCancel = () => {
    if (hasUnsavedChanges.value) {
        showUnsavedModal.value = true
    } else {
        router.push(`/products/${route.params.id || 1}`)
    }
}

const confirmDiscard = () => {
    showUnsavedModal.value = false
    hasUnsavedChanges.value = false // allow navigation
    if (pendingNavigation) {
        pendingNavigation()
        pendingNavigation = null
    } else {
        router.push(`/products/${route.params.id || 1}`)
    }
}

const handleSave = () => {
    hasUnsavedChanges.value = false
    showSuccessModal.value = true
}

const closeSuccessModal = () => {
    showSuccessModal.value = false
    router.push(`/products/${route.params.id || 1}`)
}
</script>
