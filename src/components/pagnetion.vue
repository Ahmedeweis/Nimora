<template>
    <div class="px-4 lg:px-8 max-w-7xl mx-auto w-full mb-6 lg:mb-10">
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold text-gray-900">Recent Products</h2>
            <a href="#"
                class="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center transition-colors">
                View all
                <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </a>
        </div>

        <!-- Container -->
        <div
            class="bg-white border border-gray-200 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">

            <!-- List Items -->
            <div class="flex flex-col">

                <!-- Item 1 -->
                <div
                    class="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div class="flex items-center space-x-4">
                        <div
                            class="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0 relative">
                            <img src="https://placehold.co/48x48/png" alt="nano banana bro"
                                class="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 class="text-sm font-medium text-gray-900">Carrara Marble</h3>
                            <p class="text-xs text-gray-500">Marble</p>
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium border border-emerald-100/50">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                        Published
                    </div>
                </div>

                <!-- Item 2 -->
                <div
                    class="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div class="flex items-center space-x-4">
                        <div
                            class="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0 relative">
                            <img src="https://placehold.co/48x48/png" alt="nano banana bro"
                                class="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 class="text-sm font-medium text-gray-900">Geometric Ceramic Tile</h3>
                            <p class="text-xs text-gray-500">Ceramic</p>
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200/50">
                        <span class="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5"></span>
                        Draft
                    </div>
                </div>

                <!-- Item 3 -->
                <div
                    class="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div class="flex items-center space-x-4">
                        <div
                            class="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0 relative">
                            <img src="https://placehold.co/48x48/png" alt="nano banana bro"
                                class="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 class="text-sm font-medium text-gray-900">Carrara Marble</h3>
                            <p class="text-xs text-gray-500">Marble</p>
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium border border-emerald-100/50">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                        Published
                    </div>
                </div>

                <!-- Item 4 -->
                <div
                    class="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div class="flex items-center space-x-4">
                        <div
                            class="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0 relative">
                            <img src="https://placehold.co/48x48/png" alt="nano banana bro"
                                class="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 class="text-sm font-medium text-gray-900">Geometric Ceramic Tile</h3>
                            <p class="text-xs text-gray-500">Ceramic</p>
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200/50">
                        <span class="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5"></span>
                        Draft
                    </div>
                </div>

                <!-- Item 5 -->
                <div class="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div class="flex items-center space-x-4">
                        <div
                            class="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0 relative">
                            <img src="https://placehold.co/48x48/png" alt="nano banana bro"
                                class="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 class="text-sm font-medium text-gray-900">Herringbone Oak Parquet</h3>
                            <p class="text-xs text-gray-500">Parquet</p>
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-medium border border-orange-100/50">
                        <span class="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5"></span>
                        AI Preview
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
</script>
