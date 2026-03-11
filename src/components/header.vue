<template>
    <div class="px-4 lg:px-8 py-4 lg:py-6 max-w-7xl mx-auto w-full" style="padding-bottom: 0; margin-bottom: 0;">
        <!-- Top Bar -->
        <div style="border-bottom: 3px solid #E9E9E8;"
            class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0 mb-6  pb-4 border-b border-gray-100">
            <!-- Search -->
            <div class="relative w-full lg:w-[400px] order-last lg:order-first">
                <span class="absolute inset-y-0 left-0 flex items-center pl-4">
                    <svg class="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </span>
                <input type="text"
                    class="w-full bg-[#f4ece3] text-[#000000] placeholder-[#d0c2b7] border-none rounded-2xl py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-black transition-shadow text-sm"
                    placeholder="Search products, customers..." />
            </div>

            <!-- Right Actions & Mobile Logo/Menu -->
            <div
                class="flex items-center justify-between w-full lg:w-auto overflow-x-auto no-scrollbar order-first lg:order-last">
                <!-- Mobile Logo & Menu Toggle (hidden on lg) -->
                <div class="flex items-center space-x-3 lg:hidden">
                    <button @click="$emit('open-sidebar')"
                        class="p-1 -ml-1 text-gray-500 hover:text-gray-900 transition-colors">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div class="flex items-center space-x-2">
                        <img src="/logo.webp" alt="nano banana bro" class="w-8 h-8 rounded-lg" />
                        <span class="font-semibold text-gray-900">Nimora</span>
                    </div>
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
                    <router-link to="/profile" class="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                        <div
                            class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-sm">
                            M
                        </div>
                        <span class="text-sm text-gray-600 font-medium hidden sm:block">merchant@nimora.com</span>
                    </router-link>

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


    </div>
</template>

<script setup>
defineEmits(['open-sidebar'])
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
