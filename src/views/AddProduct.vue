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
                <div class="p-4 lg:p-8  mx-auto w-full pb-20" style="padding-top: 0;">

                    <!-- Header -->
                    <div class="mb-8">
                        <h1 class="text-[24px] font-bold text-gray-900 leading-tight">Add New Product</h1>
                        <p class="text-[14px] text-gray-500 mt-1">Upload and configure a new product for your catalog
                        </p>
                    </div>

                    <div class="flex flex-col lg:flex-row gap-8">
                        <!-- Left Column -->
                        <div class="flex-1 space-y-6 min-w-0">

                            <!-- 1. Basic Information -->
                            <div class="bg-white rounded-[20px] p-6 md:p-8 shadow-sm border border-gray-100 mb-6">
                                <div class="flex items-center gap-3 mb-6">
                                    <div
                                        class="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-[13px] font-bold">
                                        1</div>
                                    <h2 class="text-[17px] font-bold text-gray-800">Basic Information</h2>
                                </div>

                                <div class="space-y-5">
                                    <!-- Product Name -->
                                    <div>
                                        <label class="block text-[14px] font-medium text-gray-700 mb-2">Product
                                            Name</label>
                                        <input v-model="form.name" type="text" placeholder="e.g., Carrara White Marble"
                                            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                    </div>

                                    <!-- Category -->
                                    <div>
                                        <label class="block text-[14px] font-medium text-gray-700 mb-2">Category</label>
                                        <div class="flex gap-2">
                                            <div class="relative flex-1">
                                                <template v-if="!isAddingCategory">
                                                    <select v-model="form.category"
                                                        class="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe] appearance-none">
                                                        <option value="" disabled>Select category</option>
                                                        <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name
                                                            }}</option>
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
                                                    <input type="text" v-model="categoryInput"
                                                        id="custom-category-input" @keyup.enter="addCustomCategory"
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
                                                    <select v-model="form.classification"
                                                        class="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe] appearance-none">
                                                        <option value="" disabled>Select Classification</option>
                                                        <option v-for="cls in classifications" :key="cls" :value="cls">
                                                            {{ cls }}</option>
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
                                                    <input type="text" v-model="classificationInput"
                                                        id="custom-classification-input"
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
                                    <!-- Right Column (Sidebar) -->
                                    <div class="w-full space-y-6 flex-shrink-0">
                                        <!-- Status -->
                                        <div class="">
                                            <div>
                                                <label class="block text-[14px] font-medium text-gray-700 mb-2">Product
                                                    status</label>
                                                <div class="relative">
                                                    <select v-model="form.status"
                                                        class="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe] appearance-none">
                                                        <option selected>Published</option>
                                                        <option>Draft</option>
                                                        <option>AI Preview</option>
                                                    </select>
                                                    <div
                                                        class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" stroke-width="2"
                                                            stroke-linecap="round" stroke-linejoin="round">
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 2. Product Details -->
                            <div class="bg-white rounded-[20px] p-6 md:p-8 shadow-sm border border-gray-100 mb-6">
                                <div class="flex items-center gap-3 mb-6">
                                    <div
                                        class="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-[13px] font-bold">
                                        2</div>
                                    <h2 class="text-[17px] font-bold text-gray-800">Product Details</h2>
                                </div>

                                <div class="grid grid-cols-1 gap-5">
                                    <!-- Available Colors -->
                                    <div>
                                        <label class="block text-[14px] font-medium text-gray-700 mb-2">Available
                                            Colors</label>
                                        <input v-model="form.colors" type="text" placeholder="e.g., White, Beige, Gray"
                                            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                    </div>

                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <!-- Available Sizes -->
                                        <div>
                                            <label class="block text-[14px] font-medium text-gray-700 mb-2">Available
                                                Sizes</label>
                                            <input v-model="form.sizes" type="text"
                                                placeholder="e.g., 60x60cm, 120x60cm"
                                                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                        </div>

                                        <!-- Price -->
                                        <div>
                                            <label
                                                class="block text-[14px] font-medium text-gray-700 mb-2">Price</label>
                                            <input v-model="form.price" type="text" placeholder="0.00"
                                                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                        </div>
                                    </div>

                                    <!-- Product Description -->
                                    <div>
                                        <label class="block text-[14px] font-medium text-gray-700 mb-2">Product
                                            Description
                                            <span class="font-normal text-gray-400 ml-1">(Optional)</span></label>
                                        <textarea v-model="form.description"
                                            placeholder="Describe the product features, materials, and benefits..."
                                            rows="4"
                                            class="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe] resize-none pb-12"></textarea>
                                    </div>
                                </div>
                            </div>

                            <!-- 3. Applications -->
                            <div class="bg-white rounded-[20px] p-6 md:p-8 shadow-sm border border-gray-100 mb-6">
                                <div class="flex items-center gap-3 mb-2">
                                    <div
                                        class="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-[13px] font-bold">
                                        3</div>
                                    <h2 class="text-[17px] font-bold text-gray-800">Applications</h2>
                                </div>
                                <p class="text-[13px] text-gray-500 mb-6 pl-9">Applications will be used during AI
                                    generation to
                                    ensure realistic placement.</p>

                                <div class="pl-0 lg:pl-9">
                                    <label class="block text-[14px] font-medium text-gray-700 mb-3">Product Applications
                                        <span class="font-normal text-gray-400 ml-1">(Optional)</span></label>
                                    <div class="flex flex-wrap gap-2.5 mb-4">
                                        <button v-for="app in applications" :key="app" @click="toggleApplication(app)"
                                            :class="[
                                                'px-4 py-2 rounded-xl text-[13px] font-medium border cursor-pointer transition-colors',
                                                form.selectedApplications.includes(app)
                                                    ? 'bg-gray-800 text-white border-gray-800'
                                                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                            ]">{{ app }}</button>
                                    </div>
                                    <div class="flex gap-2">
                                        <input v-model="form.customApplication" type="text" placeholder="Custom..."
                                            @keyup.enter="addCustomApplication"
                                            class="w-[120px] border border-gray-200 rounded-xl px-4 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                        <button @click="addCustomApplication"
                                            class="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round">
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- 4. Usage & Design Context -->
                            <div class="bg-white rounded-[20px] p-6 md:p-8 shadow-sm border border-gray-100 mb-6">
                                <div class="flex items-center gap-3 mb-2">
                                    <div
                                        class="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-[13px] font-bold">
                                        4</div>
                                    <h2 class="text-[17px] font-bold text-gray-800">Usage & Design Context</h2>
                                </div>
                                <p class="text-[13px] text-gray-500 mb-6 pl-9">Used to improve catalog browsing &
                                    filtering</p>

                                <div class="pl-0 lg:pl-9 space-y-5">
                                    <div>
                                        <label class="block text-[14px] font-medium text-gray-700 mb-2">Suitable
                                            For</label>
                                        <input v-model="form.suitableFor" type="text"
                                            placeholder="e.g., Living rooms, Kitchens, Bathrooms"
                                            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                    </div>

                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label class="block text-[14px] font-medium text-gray-700 mb-2">Usage
                                                Level</label>
                                            <div class="relative w-full">
                                                <select v-model="form.usageLevel"
                                                    class="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe] appearance-none">
                                                    <option>Low</option>
                                                    <option>Medium</option>
                                                    <option>High</option>
                                                </select>
                                                <div
                                                    class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round">
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label class="block text-[14px] font-medium text-gray-700 mb-2">Design
                                                Style</label>
                                            <div class="relative w-full">
                                                <select v-model="form.designStyle"
                                                    class="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe] appearance-none">
                                                    <option>Contemporary</option>
                                                    <option>Modern</option>
                                                    <option>Classic</option>
                                                </select>
                                                <div
                                                    class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round">
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 5. Product Identification -->
                            <div class="bg-white rounded-[20px] p-6 md:p-8 shadow-sm border border-gray-100 mb-6">
                                <div class="flex items-center gap-3 mb-6">
                                    <div
                                        class="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-[13px] font-bold">
                                        5</div>
                                    <h2 class="text-[17px] font-bold text-gray-800">Product Identification</h2>
                                </div>

                                <div class="pl-0 lg:pl-9">
                                    <div
                                        class="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6 flex items-start gap-3">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="text-orange-400 mt-0.5 flex-shrink-0">
                                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                                        </svg>
                                        <p class="text-[13px] text-orange-800 leading-snug font-medium">Product codes
                                            and
                                            availability will later enable WhatsApp sales agents, allowing customers to
                                            request
                                            prices and stock by sending the product code.</p>
                                    </div>

                                    <div class="mb-5">
                                        <label class="block text-[14px] font-medium text-gray-700 mb-2">Product
                                            Code</label>
                                        <div class="flex flex-col sm:flex-row gap-3">
                                            <input v-model="form.productCode" type="text"
                                                placeholder="NIM-123456-789012"
                                                class="flex-1 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                            <button @click="generateProductCode"
                                                class="px-5 py-2.5 bg-[#847365] text-white rounded-xl text-[14px] font-medium hover:bg-[#736458] transition-colors shadow-sm whitespace-nowrap cursor-pointer">Generate
                                                Code</button>
                                        </div>
                                        <p class="text-[11px] text-gray-400 mt-2">Unique numeric product reference used
                                            for
                                            catalog sharing and future sales agent inquiries.</p>
                                    </div>

                                    <div>
                                        <label class="block text-[14px] font-medium text-gray-700 mb-2">Available
                                            Quantity</label>
                                        <input v-model="form.quantity" type="text" placeholder="0"
                                            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#fefefe]">
                                        <p class="text-[11px] text-gray-400 mt-2">Indicates overall availability. For
                                            more
                                            advanced stock tracking, add individual variant quantities below.</p>
                                    </div>
                                </div>
                            </div>
                            <!-- 7. Product Variants -->
                            <div
                                class="bg-white rounded-[20px] p-6 md:p-8 shadow-sm border border-gray-100 mb-8 overflow-hidden">
                                <div class="flex justify-between items-center mb-5">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-[13px] font-bold">
                                            7</div>
                                        <h2 class="text-[17px] font-bold text-gray-800">Product Variants ({{
                                            form.variants.length }})</h2>
                                    </div>
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
                                            <tr v-for="(variant, index) in form.variants" :key="index"
                                                class="align-top">
                                                <td class="pr-2 pb-3 pt-1">
                                                    <input type="text" v-model="variant.name"
                                                        placeholder="e.g. Polished"
                                                        class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                </td>
                                                <td class="pr-2 pb-3 pt-1">
                                                    <input type="text" v-model="variant.sku" placeholder="SKU"
                                                        class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                </td>
                                                <td class="pr-2 pb-3 pt-1">
                                                    <input type="text" v-model="variant.color" placeholder="Color"
                                                        class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                </td>
                                                <td class="pr-2 pb-3 pt-1">
                                                    <input type="text" v-model="variant.size" placeholder="60x60"
                                                        class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                </td>
                                                <td class="pr-2 pb-3 pt-1">
                                                    <input type="text" v-model="variant.price" placeholder="0.00"
                                                        class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                </td>
                                                <td class="pr-2 pb-3 pt-1">
                                                    <input type="text" v-model="variant.stock" placeholder="0"
                                                        class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
                                                </td>
                                                <td class="pb-3 pt-1">
                                                    <button @click="removeVariant(index)"
                                                        class="w-9 h-9 flex items-center justify-center text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" stroke-width="2"
                                                            stroke-linecap="round" stroke-linejoin="round">
                                                            <polyline points="3 6 5 6 21 6"></polyline>
                                                            <path
                                                                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                                            </path>
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr v-if="!form.variants.length">
                                                <td colspan="7"
                                                    class="py-8 text-center text-gray-400 italic text-[13px]">
                                                    No variants added. Click "Add Variant" to start.
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!-- Product Image -->
                            <div class="mb-6">
                                <h2 class="text-[17px] font-bold text-gray-800 mb-4">Product Image</h2>
                                <input type="file" ref="fileInput" class="hidden" @change="handleFileChange"
                                    accept="image/*">
                                <div @click="triggerFileUpload"
                                    class="border-2 border-dashed border-gray-200 rounded-2xl bg-white p-12 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden h-[200px]">
                                    <img v-if="form.imagePreview" :src="form.imagePreview"
                                        class="absolute inset-0 w-full h-full object-contain">
                                    <template v-else>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="text-gray-400 mb-3">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                            <polyline points="17 8 12 3 7 8"></polyline>
                                            <line x1="12" y1="3" x2="12" y2="15"></line>
                                        </svg>
                                        <span class="text-[13px] font-medium text-gray-600 mb-1">Upload Image</span>
                                        <span class="text-[11px] text-gray-400">PNG, JPG up to 10MB</span>
                                    </template>
                                </div>
                            </div>

                            <!-- 6. Visualization -->
                            <div
                                class="bg-white rounded-[20px] p-6 md:p-8 shadow-sm border border-orange-100 mb-8 relative">
                                <!-- Top pill -->
                                <div
                                    class="absolute top-6 right-6 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[11px] font-medium">
                                    40 remaining this month
                                </div>

                                <div class="flex items-center gap-3 mb-5">
                                    <div
                                        class="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-[13px] font-bold">
                                        6</div>
                                    <h2 class="text-[17px] font-bold text-gray-800">Visualization</h2>
                                </div>

                                <div class="pl-0 lg:pl-9">
                                    <div class="flex items-center gap-2 mb-3">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="text-gray-700">
                                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                        </svg>
                                        <h3 class="text-[15px] font-bold text-gray-800">AI Image Generation</h3>
                                    </div>

                                    <p class="text-[13px] text-gray-600 mb-5 leading-relaxed">
                                        AI-generated previews and final renders are a core part of Nimora. Once AI
                                        generation is
                                        enabled, you will be able to visualize this product inside realistic spaces with
                                        accurate materials and real-world scale.
                                    </p>

                                    <div
                                        class="bg-orange-50/50 border border-orange-100 rounded-xl p-3.5 mb-6 flex items-start gap-3">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="text-orange-900 mt-0.5 flex-shrink-0 opacity-70">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="8" x2="12" y2="12"></line>
                                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                        </svg>
                                        <p class="text-[12px] text-orange-900 leading-snug">AI visualization is a
                                            foundational
                                            feature of Nimora. These controls represent where AI will be applied in your
                                            product
                                            workflow.</p>
                                    </div>

                                    <div class="mb-5">
                                        <label class="block text-[14px] font-medium text-gray-700 mb-2">AI Visualization
                                            Description</label>
                                        <textarea v-model="form.aiDescription"
                                            placeholder="Describe the desired scene for AI visualization (e.g., &quot;Modern living room with natural lighting&quot;) also size or any additional details"
                                            rows="6"
                                            class="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-[#FBFAF9] min-h-[120px] resize-none"></textarea>
                                        <p class="text-[11px] text-orange-500 mt-2 flex items-start gap-1">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" class="mt-0.5 flex-shrink-0">
                                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                                            </svg>
                                            Accurate descriptions improve the quality of previews and final renders.
                                        </p>
                                    </div>

                                    <!-- Preview map area -->
                                    <div
                                        class="relative w-full h-[200px] sm:h-[240px] rounded-2xl overflow-hidden mb-5 bg-gray-100 border border-gray-200">
                                        <img src="@/assets/imgs/product/1.webp" alt="Preview Image"
                                            class="w-full h-full object-cover">
                                        <div class="absolute inset-0 bg-black/10 flex items-center justify-center">
                                            <button
                                                class="px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-full text-[13px] font-medium text-gray-800 shadow-sm flex items-center gap-2 hover:bg-white transition-colors cursor-pointer">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                </svg>
                                                Preview
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Action Buttons -->
                                    <div class="flex flex-col sm:flex-row gap-3">
                                        <div class="flex-1 flex flex-col gap-2">
                                            <button
                                                style="display: flex; justify-content: center;border: 2px solid #847365;"
                                                class="w-full py-2 sm:py-3 px-3 sm:px-5 bg-white border border-gray-200 text-gray-800 rounded-xl text-[13px] font-medium hover:bg-gray-50 flex items-center justify-center gap-1 sm:gap-4 transition-colors cursor-pointer text-center h-auto min-h-[52px]">
                                                <div class="flex items-center gap-2">
                                                    <img src="../assets/imgs/generate.svg" alt="">
                                                    <span class="whitespace-nowrap text-[#847365]">Create AI
                                                        Preview</span>
                                                </div>
                                            </button>
                                            <ul class="list-none px-1">
                                                <li
                                                    class="flex items-start gap-2 text-[11px] text-gray-500 font-normal leading-snug">
                                                    <span
                                                        class="mt-1.5 w-1 h-1 rounded-full bg-[#847365] flex-shrink-0"></span>
                                                    The preview will be based on the image and description.
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="flex-1 flex flex-col gap-2">
                                            <button style="display: flex; justify-content: center;"
                                                class="w-full py-2 sm:py-3 px-3 sm:px-5 bg-[#847365] text-white rounded-xl text-[13px] font-medium hover:bg-[#736458] flex items-center justify-center gap-1 sm:gap-4 transition-colors shadow-sm cursor-pointer text-center h-auto min-h-[52px]">
                                                <div class="flex items-center gap-2">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round">
                                                        <path
                                                            d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z">
                                                        </path>
                                                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                                        <polyline points="7 3 7 8 15 8"></polyline>
                                                    </svg>
                                                    <span class="whitespace-nowrap">Generate Final Render</span>
                                                </div>
                                            </button>
                                            <ul class="list-none px-1">
                                                <li
                                                    class="flex items-start gap-2 text-[11px] text-gray-500 font-normal leading-snug">
                                                    <span
                                                        class="mt-1.5 w-1 h-1 rounded-full bg-[#847365] flex-shrink-0"></span>
                                                    Final generation produces high-quality, production-ready visuals.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <!-- Save Button -->
                            <button @click="handleSubmit" :disabled="productStore.loading"
                                class="w-full py-3.5 bg-[#847365] text-white rounded-xl text-[15px] font-medium hover:bg-[#736458] transition-colors shadow-lg shadow-[#847365]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                <template v-if="productStore.loading">
                                    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                    Saving...
                                </template>
                                <template v-else>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z">
                                        </path>
                                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                        <polyline points="7 3 7 8 15 8"></polyline>
                                    </svg>
                                    Save Product
                                </template>
                            </button>
                        </div>


                    </div>

                </div>
            </main>
        </div>

        <!-- Success Modal -->
        <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                @click="showSuccessModal = false"></div>

            <!-- Modal Content -->
            <div
                class="bg-white rounded-[20px] w-full max-w-[500px] pt-12 pb-10 px-8 relative z-10 flex flex-col items-center text-center shadow-xl">
                <!-- Icon -->
                <div
                    class="w-[72px] h-[72px] rounded-full border-[4px] border-[#847365] flex items-center justify-center mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
                        stroke-linecap="round" stroke-linejoin="round" class="text-[#847365] ml-1 mt-1">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>

                <h3 class="text-[20px] font-bold text-[#64615F] mb-3 tracking-tight">Product created successfully.</h3>
                <p class="text-[15px] text-gray-500 mb-8 tracking-tight">The product has been created and added to your
                    catalog.</p>

                <button @click="showSuccessModal = false"
                    class="w-[200px] py-[12px] bg-[#847365] text-white rounded-xl text-[14px] font-medium hover:bg-[#736458] transition-colors cursor-pointer tracking-wide">
                    Done
                </button>
            </div>
        </div>

        <!-- Error Modal -->
        <div v-if="showErrorModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" @click="showErrorModal = false">
            </div>

            <!-- Modal Content -->
            <div
                class="bg-white rounded-[20px] w-full max-w-[500px] pt-12 pb-10 px-8 relative z-10 flex flex-col items-center text-center shadow-xl">
                <!-- Icon -->
                <div
                    class="w-[72px] h-[72px] rounded-full border-[4px] border-[#ef4444] flex items-center justify-center mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
                        stroke-linecap="round" stroke-linejoin="round" class="text-[#ef4444]">
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                </div>

                <h3 class="text-[20px] font-bold text-[#64615F] mb-3 tracking-tight">Failed to Add Product</h3>
                <p class="text-[15px] text-gray-500 mb-8 tracking-tight">Something went wrong while creating the
                    product. Please try again.</p>

                <div class="flex gap-4 w-full">
                    <button @click="showErrorModal = false"
                        class="flex-1 py-[12px] bg-white border border-gray-200 text-gray-800 rounded-xl text-[14px] font-medium hover:bg-gray-50 transition-colors cursor-pointer tracking-wide">
                        Try Again
                    </button>
                    <button @click="showErrorModal = false"
                        class="flex-1 py-[12px] bg-[#847365] text-white rounded-xl text-[14px] font-medium hover:bg-[#736458] transition-colors cursor-pointer tracking-wide shadow-sm">
                        Discard Changes
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useProductStore } from '../store/product'
import { useCatalogStore } from '../store/catalog'
import Navbar from '../components/Navbar.vue'
import HeaderComponent from '../components/header.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const productStore = useProductStore()
const catalogStore = useCatalogStore()
const isSidebarOpen = ref(false)
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const fileInput = ref(null)

const form = reactive({
    name: '',
    category: '',
    classification: '',
    colors: '',
    sizes: '',
    price: '',
    description: '',
    selectedApplications: [],
    suitableFor: '',
    usageLevel: 'Low',
    designStyle: 'Contemporary',
    productCode: '',
    quantity: '',
    aiDescription: '',
    customApplication: '',
    imageFile: null,
    imagePreview: null,
    variants: []
})

onMounted(async () => {
    try {
        await Promise.all([
            productStore.products.length === 0 ? productStore.fetchProducts({ skip: 0, limit: 1000 }) : Promise.resolve(),
            catalogStore.fetchCategories()
        ])
    } catch (error) {
        console.error("Failed to fetch data:", error)
    }
})

const categories = computed(() => catalogStore.categories)
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

const toggleApplication = (app) => {
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
    }
}

const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        form.imageFile = file
        form.imagePreview = URL.createObjectURL(file)
    }
}

const triggerFileUpload = () => {
    fileInput.value.click()
}

const generateProductCode = () => {
    let newCode;
    let isDuplicate = true;
    let attempts = 0;

    while (isDuplicate && attempts < 10) {
        const part1 = Math.floor(100000 + Math.random() * 900000).toString();
        const part2 = Math.floor(100000 + Math.random() * 900000).toString();
        newCode = `NIM-${part1}-${part2}`;

        isDuplicate = productStore.products.some(p => p.nimora_product_code === newCode);
        attempts++;
    }

    form.productCode = newCode;
    toast.info('New product code generated')
}

const handleSubmit = async () => {
    // Basic uniqueness check
    const isDuplicate = productStore.products.some(p => p.nimora_product_code === form.productCode);
    if (isDuplicate) {
        toast.warning("This product code already exists. Please generate or enter a unique code.")
        return;
    }

    try {
        const productPayload = {
            merchant_sku: "SKU-" + Date.now(),
            nimora_product_code: form.productCode,
            name: form.name,
            description: form.description,
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
            marketplace_visible: false,
            marketplace_countries: [],
            customer_visible: true,
            status: form.status
        }

        const product = await productStore.createProduct(productPayload)
        const productId = product.id

        if (productId && form.imageFile) {
            await productStore.uploadProductImage(productId, form.imageFile)
        }

        toast.success('Product created successfully')
        showSuccessModal.value = true
    } catch (error) {
        console.error("Submission failed:", error)
        toast.error(error.message || 'Failed to create product')
        showErrorModal.value = true
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
}

const removeVariant = (index) => {
    form.variants.splice(index, 1)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
</style>
