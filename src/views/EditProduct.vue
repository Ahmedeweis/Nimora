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
                                    <p class="text-sm text-gray-500 mt-1">Editing: {{ form.name || 'Product' }}</p>
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
                                <button @click="handleSave" :disabled="productStore.loading"
                                    class="px-5 py-2.5 bg-[#847365] text-white rounded-xl text-sm font-medium hover:bg-[#736458] flex items-center gap-2 transition-colors shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                    <template v-if="productStore.loading">
                                        <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </template>
                                    <template v-else>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z">
                                            </path>
                                            <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                            <polyline points="7 3 7 8 15 8"></polyline>
                                        </svg>
                                        Save
                                    </template>
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
                                                v-model="form.name" @input="hasUnsavedChanges = true"
                                                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                        </div>

                                        <!-- Category -->
                                        <div>
                                            <label
                                                class="block text-[14px] font-medium text-gray-700 mb-2">Category</label>
                                            <div class="flex gap-2">
                                                <div class="relative flex-1">
                                                    <template v-if="!isAddingCategory">
                                                        <select v-model="form.category" @change="hasUnsavedChanges = true"
                                                            class="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe] appearance-none">
                                                            <option value="">Select category</option>
                                                            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                                                        </select>
                                                        <div
                                                            class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round">
                                                                <polyline points="6 9 12 15 18 9"></polyline>
                                                            </svg>
                                                        </div>
                                                    </template>
                                                    <template v-else>
                                                        <input type="text" v-model="categoryInput" id="custom-category-input"
                                                            @keyup.enter="addCustomCategory"
                                                            placeholder="Enter custom category"
                                                            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                                    </template>
                                                </div>
                                                <button v-if="!isAddingCategory" @click="toggleAddingCategory"
                                                    class="w-11 h-11 flex-shrink-0 flex items-center justify-center border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round">
                                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    </svg>
                                                </button>
                                                <button v-else @click="addCustomCategory"
                                                    class="px-4 h-11 bg-[#847365] text-white rounded-xl text-[13px] font-medium hover:bg-[#736458] transition-colors cursor-pointer">
                                                    Add
                                                </button>
                                            </div>
                                        </div>

                                         <!-- Classification -->
                                        <div>
                                            <label
                                                class="block text-[14px] font-medium text-gray-700 mb-2">Classification</label>
                                            <div class="flex gap-2">
                                                <div class="relative flex-1">
                                                    <template v-if="!isAddingClassification">
                                                        <select v-model="form.classification" @change="hasUnsavedChanges = true"
                                                            class="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe] appearance-none">
                                                            <option value="">Select Classification</option>
                                                            <option v-for="cls in classifications" :key="cls" :value="cls">{{ cls }}</option>
                                                        </select>
                                                        <div
                                                            class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round">
                                                                <polyline points="6 9 12 15 18 9"></polyline>
                                                            </svg>
                                                        </div>
                                                    </template>
                                                    <template v-else>
                                                        <input type="text" v-model="classificationInput" id="custom-classification-input"
                                                            @keyup.enter="addCustomClassification"
                                                            placeholder="Enter custom classification"
                                                            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                                    </template>
                                                </div>
                                                <button v-if="!isAddingClassification" @click="toggleAddingClassification"
                                                    class="w-11 h-11 flex-shrink-0 flex items-center justify-center border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round">
                                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    </svg>
                                                </button>
                                                <button v-else @click="addCustomClassification"
                                                    class="px-4 h-11 bg-[#847365] text-white rounded-xl text-[13px] font-medium hover:bg-[#736458] transition-colors cursor-pointer">
                                                    Add
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
                                                v-model="form.colors" @input="hasUnsavedChanges = true"
                                                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                        </div>

                                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <!-- Available Sizes -->
                                            <div>
                                                <label
                                                    class="block text-[14px] font-medium text-gray-700 mb-2">Available
                                                    Sizes</label>
                                                <input type="text" placeholder="e.g., 60x60cm, 120x60cm"
                                                    v-model="form.sizes" @input="hasUnsavedChanges = true"
                                                    class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                            </div>

                                            <!-- Price -->
                                            <div>
                                                <label
                                                    class="block text-[14px] font-medium text-gray-700 mb-2">Price</label>
                                                <input type="text" placeholder="0.00" v-model="form.price" @input="hasUnsavedChanges = true"
                                                    class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                            </div>
                                        </div>

                                        <!-- Product Description -->
                                        <div>
                                            <label class="block text-[14px] font-medium text-gray-700 mb-2">Product
                                                Description <span
                                                    class="font-normal text-gray-400 ml-1">(Optional)</span></label>
                                            <textarea
                                                v-model="form.description" @input="hasUnsavedChanges = true"
                                                placeholder="Describe the product features, materials, and benefits..."
                                                rows="4"
                                                class="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe] resize-none pb-12"></textarea>
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
                                        <button v-for="app in applications" :key="app"
                                            @click="toggleApplication(app)"
                                            :class="[
                                                'px-4 py-2 rounded-xl text-[13px] font-medium border cursor-pointer transition-colors',
                                                form.selectedApplications.includes(app)
                                                    ? 'bg-[#847365] text-white border-[#847365]'
                                                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                            ]"
                                        >{{ app }}</button>
                                    </div>
                                     <div class="flex gap-2">
                                        <input type="text" placeholder="Custom....." v-model="form.customApplication"
                                            @keyup.enter="addCustomApplication"
                                            class="w-[120px] border border-gray-200 rounded-xl px-4 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                        <button @click="addCustomApplication"
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

                                <!-- Usage & Design Context Section -->
                                <div class="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
                                    <h2 class="text-[17px] font-bold text-gray-800 mb-2">Usage & Design Context</h2>
                                    <p class="text-[13px] text-gray-500 mb-5">Used to improve catalog browsing & filtering</p>

                                    <div class="space-y-5">
                                        <div>
                                            <label class="block text-[14px] font-medium text-gray-700 mb-2">Suitable For</label>
                                            <input v-model="form.suitableFor" type="text" placeholder="e.g., Living rooms, Kitchens"
                                                @input="hasUnsavedChanges = true"
                                                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                        </div>

                                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label class="block text-[14px] font-medium text-gray-700 mb-2">Usage Level</label>
                                                <div class="relative">
                                                    <select v-model="form.usageLevel" @change="hasUnsavedChanges = true"
                                                        class="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe] appearance-none">
                                                        <option>Low</option>
                                                        <option>Medium</option>
                                                        <option>High</option>
                                                    </select>
                                                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label class="block text-[14px] font-medium text-gray-700 mb-2">Design Style</label>
                                                <div class="relative">
                                                    <select v-model="form.designStyle" @change="hasUnsavedChanges = true"
                                                        class="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe] appearance-none">
                                                        <option>Contemporary</option>
                                                        <option>Modern</option>
                                                        <option>Classic</option>
                                                    </select>
                                                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Product Variants Section -->
                                <div
                                    class="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 overflow-hidden">
                                     <div class="flex justify-between items-center mb-5">
                                        <h2 class="text-[17px] font-bold text-gray-800">Product Variants ({{ form.variants.length }})</h2>
                                        <button @click="addVariant"
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
                                        <table class="w-full min-w-[850px] text-left border-collapse">
                                            <thead>
                                                <tr>
                                                    <th class="pb-3 text-[13px] font-medium text-gray-500 w-[150px]">
                                                        Variant Name
                                                    </th>
                                                    <th class="pb-3 text-[13px] font-medium text-gray-500 w-[110px]">SKU
                                                    </th>
                                                    <th class="pb-3 text-[13px] font-medium text-gray-500 w-[100px]">
                                                        Color
                                                    </th>
                                                    <th class="pb-3 text-[13px] font-medium text-gray-500 w-[100px]">
                                                        Size
                                                    </th>
                                                    <th class="pb-3 text-[13px] font-medium text-gray-500 w-[90px]">
                                                        Price
                                                    </th>
                                                    <th class="pb-3 text-[13px] font-medium text-gray-500 w-[80px]">
                                                        Stock
                                                    </th>
                                                    <th class="pb-3 text-[13px] font-medium text-gray-500 w-[50px]">
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody class="space-y-3">
                                                <tr v-for="(variant, index) in form.variants" :key="index" class="align-top">
                                                    <td class="pr-2 pb-3 pt-1">
                                                        <input type="text" v-model="variant.name" @input="hasUnsavedChanges = true"
                                                            placeholder="e.g. Polished"
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                    <td class="pr-2 pb-3 pt-1">
                                                        <input type="text" v-model="variant.sku" @input="hasUnsavedChanges = true"
                                                            placeholder="SKU"
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                    <td class="pr-2 pb-3 pt-1">
                                                        <input type="text" v-model="variant.color" @input="hasUnsavedChanges = true"
                                                            placeholder="Color"
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                    <td class="pr-2 pb-3 pt-1">
                                                        <input type="text" v-model="variant.size" @input="hasUnsavedChanges = true"
                                                            placeholder="60x60"
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                    <td class="pr-2 pb-3 pt-1">
                                                        <input type="text" v-model="variant.price" @input="hasUnsavedChanges = true"
                                                            placeholder="0.00"
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                    <td class="pr-2 pb-3 pt-1">
                                                        <input type="text" v-model="variant.stock" @input="hasUnsavedChanges = true"
                                                            placeholder="0"
                                                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                    </td>
                                                    <td class="pb-3 pt-1">
                                                        <button @click="removeVariant(index)"
                                                            class="w-9 h-9 flex items-center justify-center text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr v-if="!form.variants.length">
                                                    <td colspan="7" class="py-8 text-center text-gray-400 italic text-[13px]">
                                                        No variants added. Click "Add Variant" to start.
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
                                            <select v-model="form.status" @change="hasUnsavedChanges = true"
                                                class="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe] appearance-none">
                                                <option>Published</option>
                                                <option>Draft</option>
                                                <option>AI Preview</option>
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

                                <!-- Product Identification -->
                                <div class="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
                                    <h2 class="text-[16px] font-bold text-gray-800 mb-4">Product Identification</h2>

                                    <div class="space-y-5">
                                        <div>
                                            <label class="block text-[14px] font-medium text-gray-700 mb-2">Product Code</label>
                                            <div class="flex gap-2">
                                                <input v-model="form.productCode" type="text" placeholder="NIM-123456"
                                                    class="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                                <button @click="generateCode"
                                                    class="px-3 py-2.5 bg-[#847365] text-white rounded-xl text-[12px] font-medium hover:bg-[#736458] transition-colors shadow-sm whitespace-nowrap cursor-pointer">
                                                    Gen
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label class="block text-[14px] font-medium text-gray-700 mb-2">Quantity</label>
                                            <input v-model="form.quantity" type="text" placeholder="0"
                                                @input="hasUnsavedChanges = true"
                                                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                        </div>
                                    </div>
                                </div>

                                <!-- Product Images -->
                                <div class="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
                                    <div class="flex justify-between items-center mb-4">
                                        <h2 class="text-[16px] font-bold text-gray-800">Product Images</h2>
                                        <button @click="$refs.fileInput.click()" type="button" :disabled="isUploadingImage"
                                            class="flex items-center gap-1.5 px-3 py-1.5 bg-[#847365] text-white rounded-xl text-[13px] font-medium hover:bg-[#736458] transition-colors shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                            <svg v-if="isUploadingImage" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round">
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                            {{ isUploadingImage ? 'Uploading...' : 'Add Image' }}
                                        </button>
                                        <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleImageUpload" />
                                    </div>

                                    <div class="space-y-4">
                                        <div v-if="form.images.length === 0" class="text-center py-6 text-gray-400 text-[13px] italic border-2 border-dashed border-gray-100 rounded-[16px]">
                                            No images uploaded yet.
                                        </div>
                                        <div v-for="(img, idx) in form.images" :key="img.url || idx" class="relative w-full h-[140px] rounded-[16px] overflow-hidden group border border-gray-100">
                                            <!-- Background Image -->
                                            <img :src="getImageUrl(img.url)" :alt="'Product Image ' + (idx + 1)"
                                                class="absolute inset-0 w-full h-full object-cover" />
                                            <div
                                                class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent">
                                            </div>

                                            <div v-if="img.is_primary"
                                                class="absolute bottom-3 left-4 pr-4">
                                                <span class="px-2 py-1 bg-white/20 backdrop-blur-md rounded text-[11px] font-bold text-white uppercase tracking-wider">
                                                    Primary
                                                </span>
                                            </div>

                                            <!-- Delete Button -->
                                            <div class="absolute top-3 right-3">
                                                <button @click.prevent="handleDeleteImage(img.url)" :disabled="isDeletingImage === img.url"
                                                    class="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer disabled:opacity-50">
                                                    <svg v-if="isDeletingImage === img.url" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                        <polyline points="3 6 5 6 21 6"></polyline>
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                    </svg>
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
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import HeaderComponent from '../components/header.vue'
import { useToast } from 'vue-toastification'
import { useProductStore } from '../store/product'

const toast = useToast()
const router = useRouter()
const route = useRoute()
const productStore = useProductStore()

const isSidebarOpen = ref(false)
const showUnsavedModal = ref(false)
const hasUnsavedChanges = ref(false)
let pendingNavigation = null

const form = reactive({
    name: '',
    category: '',
    classification: '',
    colors: '',
    sizes: '',
    price: '',
    description: '',
    selectedApplications: [],
    customApplication: '',
    variants: [],
    images: [],
    status: 'Published',
    productCode: '',
    quantity: '',
    suitableFor: '',
    usageLevel: 'Low',
    designStyle: 'Contemporary',
    aiDescription: ''
})

const fileInput = ref(null)
const isUploadingImage = ref(false)
const isDeletingImage = ref(null)

const apiUrl = import.meta.env.VITE_API_URL || ''
const getImageUrl = (url) => {
    if (!url) return ''
    return url.startsWith('/') ? `${apiUrl}${url}` : url
}

const categories = ref(['Marble', 'Granite', 'Ceramic'])
const classifications = ref(['Natural Stone', 'Engineered Stone'])
const applications = ref(['Floor', 'Wall', 'Border', 'Outdoor', 'Stairs'])

const isAddingCategory = ref(false)
const categoryInput = ref('')
const isAddingClassification = ref(false)
const classificationInput = ref('')

const toggleAddingCategory = () => {
    isAddingCategory.value = !isAddingCategory.value
    if (isAddingCategory.value) {
        setTimeout(() => {
            const el = document.getElementById('custom-category-input')
            if (el) el.focus()
        }, 50)
    }
}

const addCustomCategory = () => {
    const val = categoryInput.value.trim()
    if (val) {
        if (!categories.value.includes(val)) {
            categories.value.push(val)
        }
        form.category = val
        categoryInput.value = ''
        isAddingCategory.value = false
        hasUnsavedChanges.value = true
    }
}

const toggleAddingClassification = () => {
    isAddingClassification.value = !isAddingClassification.value
    if (isAddingClassification.value) {
        setTimeout(() => {
            const el = document.getElementById('custom-classification-input')
            if (el) el.focus()
        }, 50)
    }
}

const addCustomClassification = () => {
    const val = classificationInput.value.trim()
    if (val) {
        if (!classifications.value.includes(val)) {
            classifications.value.push(val)
        }
        form.classification = val
        classificationInput.value = ''
        isAddingClassification.value = false
        hasUnsavedChanges.value = true
    }
}

onMounted(async () => {
    try {
        const id = route.params.id
        const product = await productStore.fetchProductById(id)
        
        // Populate form
        form.name = product.name || ''
        form.description = product.description || ''
        form.productCode = product.nimora_product_code || ''
        form.price = product.price?.amount || ''
        form.quantity = product.inventory?.total_quantity || ''
        form.status = product.status || product.metadata?.status || 'Published'
        
        if (product.metadata) {
            form.category = product.metadata.category || ''
            form.classification = product.metadata.classification || ''
            form.colors = product.metadata.available_colors || ''
            form.sizes = product.metadata.available_sizes || ''
            form.suitableFor = product.metadata.suitable_for || ''
            form.usageLevel = product.metadata.usage_level || 'Low'
            form.designStyle = product.metadata.design_style || 'Contemporary'
            form.aiDescription = product.metadata.ai_visualization_description || ''
        }

        if (product.applications) {
            form.selectedApplications = product.applications.map(app => app.name)
            // Add any custom apps to the available list
            product.applications.forEach(app => {
                if (!applications.value.includes(app.name)) {
                    applications.value.push(app.name)
                }
            })
        }

        if (product.variants) {
            form.variants = product.variants.map((v, index) => {
                const details = product.metadata?.variant_details?.[index] || {}
                return {
                    ...v,
                    color: details.color || '',
                    size: details.size || '',
                    price: details.price || '',
                    stock: details.stock || ''
                }
            })
        }

        form.images = product.images || []

        // Reset changes tracker after initial load
        setTimeout(() => {
            hasUnsavedChanges.value = false
        }, 100)

    } catch (error) {
        toast.error('Failed to load product data')
        router.push('/products')
    }
})

const toggleApplication = (app) => {
    hasUnsavedChanges.value = true
    const index = form.selectedApplications.indexOf(app)
    if (index === -1) {
        form.selectedApplications.push(app)
    } else {
        form.selectedApplications.splice(index, 1)
    }
}

const addCustomApplication = () => {
    const app = form.customApplication.trim()
    if (app && !applications.value.includes(app)) {
        applications.value.push(app)
        form.selectedApplications.push(app)
        form.customApplication = ''
        hasUnsavedChanges.value = true
    }
}

const addVariant = () => {
    form.variants.push({
        name: '',
        sku: '',
        color: '',
        size: '',
        price: '',
        stock: ''
    })
    hasUnsavedChanges.value = true
}

const removeVariant = (index) => {
    form.variants.splice(index, 1)
    hasUnsavedChanges.value = true
}

// Guard route changes
onBeforeRouteLeave((to, from, next) => {
    if (hasUnsavedChanges.value) {
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
        router.push(`/products/${route.params.id}`)
    }
}

const confirmDiscard = () => {
    showUnsavedModal.value = false
    hasUnsavedChanges.value = false
    if (pendingNavigation) {
        pendingNavigation()
        pendingNavigation = null
    } else {
        router.push(`/products/${route.params.id}`)
    }
}

const generateCode = () => {
    const random = Math.floor(100000 + Math.random() * 900000)
    form.productCode = `NIM-${random}`
    hasUnsavedChanges.value = true
}

const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    isUploadingImage.value = true
    try {
        const response = await productStore.uploadProductImage(route.params.id, file)
        form.images.push(response)
        toast.success('Image uploaded successfully')
    } catch (error) {
        toast.error(error.message || 'Failed to upload image')
    } finally {
        isUploadingImage.value = false
        // Reset file input
        if (fileInput.value) {
            fileInput.value.value = ''
        }
    }
}

const handleDeleteImage = async (imageUrl) => {
    if (!confirm('Are you sure you want to delete this image?')) return
    
    isDeletingImage.value = imageUrl
    try {
        await productStore.deleteProductImage(route.params.id, imageUrl)
        form.images = form.images.filter(img => img.url !== imageUrl)
        toast.success('Image deleted successfully')
    } catch (error) {
        toast.error(error.message || 'Failed to delete image')
    } finally {
        isDeletingImage.value = null
    }
}

const handleSave = async () => {
    try {
        const payload = {
            name: form.name,
            description: form.description,
            nimora_product_code: form.productCode,
            variants: form.variants.map(v => ({
                name: v.name,
                value: v.name,
                sku: v.sku
            })),
            applications: form.selectedApplications.map(app => ({ name: app })),
            price: {
                amount: parseFloat(form.price) || 0,
                currency: "EGP"
            },
            inventory: {
                total_quantity: parseInt(form.quantity) || 0
            },
            metadata: {
                category: form.category,
                classification: form.classification,
                available_colors: form.colors,
                available_sizes: form.sizes,
                suitable_for: form.suitableFor,
                usage_level: form.usageLevel,
                design_style: form.designStyle,
                ai_visualization_description: form.aiDescription,
                status: form.status,
                // Store detailed variant info here since API strips it from variants array
                variant_details: form.variants.map(v => ({
                    color: v.color,
                    size: v.size,
                    price: v.price,
                    stock: v.stock
                }))
            },
            status: form.status
        }

        await productStore.updateProduct(route.params.id, payload)
        hasUnsavedChanges.value = false
        toast.success('Product updated successfully!')
        router.push(`/products/${route.params.id}`)
    } catch (error) {
        toast.error(error.message || 'Failed to update product')
    }
}
</script>
