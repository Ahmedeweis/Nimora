<template>
    <div class="px-4 lg:px-8 py-4 lg:py-6 max-w-7xl mx-auto w-full">
        <!-- Top Bar -->
        <div
            class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0 mb-6 lg:mb-10 pb-4 border-b border-gray-100">
            <!-- Search -->
            <div class="relative w-full lg:w-[400px] order-last lg:order-first">
                <span class="absolute inset-y-0 left-0 flex items-center pl-4">
                    <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </span>
                <input type="text"
                    class="w-full bg-gray-50 text-gray-900 border-none rounded-2xl py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[#8C7A6B]/50 transition-shadow text-sm placeholder-gray-400"
                    placeholder="Search products, customers..." />
            </div>

            <!-- Right Actions & Mobile Logo/Menu -->
            <div
                class="flex items-center justify-between w-full lg:w-auto overflow-x-auto no-scrollbar order-first lg:order-last">
                <!-- Mobile Logo (hidden on lg) -->
                <div class="flex items-center space-x-2 lg:hidden">
                    <img src="../assets/logo-nano-banana-bro.svg" alt="nano banana bro" class="w-8 h-8 rounded-lg" />
                    <span class="font-semibold text-gray-900">Nimora</span>
                </div>

                <!-- Right Actions -->
                <div class="flex items-center space-x-4 lg:space-x-6 ml-auto">
                    <!-- Notification -->
                    <button class="relative text-gray-500 hover:text-gray-700 transition-colors">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span
                            class="absolute top-0.5 right-0.5 w-2 h-2 bg-red-400 border-2 border-white rounded-full"></span>
                    </button>

                    <!-- User Profile -->
                    <div class="flex items-center space-x-2">
                        <div
                            class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-sm">
                            M
                        </div>
                        <span class="text-sm text-gray-600 font-medium hidden sm:block">merchant@nimora.com</span>
                    </div>

                    <!-- Language indicator -->
                    <button
                        class="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="hidden sm:block">US</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Welcome Section -->
        <div class="mb-8">
            <h1 class="text-2xl font-bold text-gray-900 mb-1">Welcome back <span class="wave"></span></h1>
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

        <!-- Quick Actions -->
        <div>
            <h2 class="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div class="grid grid-cols-2 lg:flex lg:flex-wrap items-center gap-2 sm:gap-3">
                <button
                    class="flex items-center w-full lg:w-auto justify-center lg:justify-start space-x-2 bg-[#8C7A6B] hover:bg-[#7a6b5d] text-white px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span class="truncate">Add Product</span>
                </button>

                <button
                    class="flex items-center w-full lg:w-auto justify-center lg:justify-start space-x-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors">
                    <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span class="truncate">Update Inventory</span>
                </button>

                <button
                    class="flex items-center w-full lg:w-auto justify-center lg:justify-start space-x-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors">
                    <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span class="truncate">Permissions</span>
                </button>

                <button
                    class="flex items-center w-full lg:w-auto justify-center lg:justify-start space-x-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors">
                    <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span class="truncate">View Catalog</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.wave {
    display: inline-block;
    transform-origin: 70% 70%;
    animation: wave 2.5s infinite;
}

@keyframes wave {
    0% {
        transform: rotate(0deg);
    }

    10% {
        transform: rotate(14deg);
    }

    20% {
        transform: rotate(-8deg);
    }

    30% {
        transform: rotate(14deg);
    }

    40% {
        transform: rotate(-4deg);
    }

    50% {
        transform: rotate(10deg);
    }

    60% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(0deg);
    }
}
</style>
