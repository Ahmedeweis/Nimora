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
                <div class="px-4 lg:px-8 py-4 lg:py-6 max-w-[1200px] mx-auto w-full pb-20" style="padding-top: 0;">

                    <!-- Header Area -->
                    <div class="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 class="text-[24px] font-bold text-gray-900 leading-tight mb-1">Import</h1>
                            <p class="text-[14px] text-gray-500">Update prices and inventory quantities in bulk using
                                CSV files</p>
                        </div>
                        <button
                            class="flex items-center gap-2 px-5 py-2.5 bg-[#847365] hover:bg-[#736458] text-white rounded-xl text-[14px] font-medium transition-colors shadow-sm whitespace-nowrap">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            Download Template
                        </button>
                    </div>

                    <!-- Main Grid Content -->
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <!-- Left Column (Import Form) -->
                        <div
                            class="lg:col-span-2 bg-white rounded-[20px] p-6 sm:p-8 border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]">

                            <!-- Import Type -->
                            <div class="mb-8">
                                <h2 class="text-[16px] font-semibold text-gray-700 mb-4">Import Type</h2>
                                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <button @click="importType = 'prices'"
                                        :class="['text-left p-5 rounded-xl border transition-all', importType === 'prices' ? 'border-[#847365] bg-[#fafafa] shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white']">
                                        <div
                                            class="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center mb-3">
                                            <span class="text-gray-500 font-medium text-[15px]">$</span>
                                        </div>
                                        <div class="font-semibold text-[15px] text-gray-900 mb-1">Prices</div>
                                        <div class="text-[13px] text-gray-500">Update price data</div>
                                    </button>

                                    <button @click="importType = 'inventory'"
                                        :class="['text-left p-5 rounded-xl border transition-all', importType === 'inventory' ? 'border-[#847365] bg-[#fafafa] shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white']">
                                        <div
                                            class="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center mb-3 text-gray-500">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round">
                                                <path
                                                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z">
                                                </path>
                                                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                                <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                            </svg>
                                        </div>
                                        <div class="font-semibold text-[15px] text-gray-900 mb-1">Inventory</div>
                                        <div class="text-[13px] text-gray-500">Update stock levels</div>
                                    </button>

                                    <button @click="importType = 'both'"
                                        :class="['text-left p-5 rounded-xl border transition-all', importType === 'both' ? 'border-[#847365] bg-[#fafafa] shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white']">
                                        <div
                                            class="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center mb-3 text-gray-500">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round">
                                                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                                <polyline points="2 17 12 22 22 17"></polyline>
                                                <polyline points="2 12 12 17 22 12"></polyline>
                                            </svg>
                                        </div>
                                        <div class="font-semibold text-[15px] text-gray-900 mb-1">Both</div>
                                        <div class="text-[13px] text-gray-500">Prices and Inventory</div>
                                    </button>
                                </div>
                            </div>

                            <!-- Upload Area -->
                            <div class="mb-4">
                                <h2 class="text-[16px] font-semibold text-gray-700 mb-3">Upload csv file</h2>
                                <div
                                    class="border-2 border-dashed border-gray-200 rounded-[16px] bg-[#fafafa]/50 block p-12 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                                    <div
                                        class="w-12 h-12 mx-auto rounded-full bg-white border border-gray-100 flex items-center justify-center mb-3 shadow-sm group-hover:bg-gray-50 transition-colors">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="text-gray-400">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                            <polyline points="17 8 12 3 7 8"></polyline>
                                            <line x1="12" y1="3" x2="12" y2="15"></line>
                                        </svg>
                                    </div>
                                    <div class="text-[14px] text-gray-500 font-medium leading-relaxed">
                                        <span class="text-gray-600 font-medium block mb-1">Upload csv file</span>
                                        or drag and drop
                                    </div>
                                </div>
                            </div>

                            <!-- Mock Progress File -->
                            <div
                                class="border border-gray-200 rounded-[16px] p-4 flex items-center gap-4 mb-8 bg-white shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]">
                                <div
                                    class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 text-green-600">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                        <polyline points="14 2 14 8 20 8"></polyline>
                                        <line x1="8" y1="13" x2="16" y2="13"></line>
                                        <line x1="8" y1="17" x2="16" y2="17"></line>
                                        <polyline points="10 9 9 9 8 9"></polyline>
                                    </svg>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex justify-between items-center mb-1">
                                        <h4 class="text-[14px] font-semibold text-gray-900 truncate">document.excel</h4>
                                        <span class="text-[12px] font-medium text-gray-600">60%</span>
                                    </div>
                                    <div class="text-[12px] text-gray-500 mb-2">30 seconds remaining</div>
                                    <div class="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                        <div class="bg-[#2D4558] h-1.5 rounded-full" style="width: 60%"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Action -->
                            <button @click="showSuccessModal = true"
                                class="w-full py-4 bg-[#847365] hover:bg-[#736458] text-white rounded-[10px] text-[15px] font-medium transition-colors shadow-sm tracking-wide">
                                Process Import
                            </button>
                        </div>

                        <!-- Right Column (Info Cards) -->
                        <div class="lg:col-span-1 flex flex-col gap-6">

                            <!-- CSV Format Card -->
                            <div
                                class="bg-white rounded-[16px] p-6 border border-orange-200/60 shadow-[0_2px_8px_-4px_rgba(251,146,60,0.05)]">
                                <div class="flex items-center gap-2 mb-4">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="text-gray-500">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                        <polyline points="14 2 14 8 20 8"></polyline>
                                        <line x1="16" y1="13" x2="8" y2="13"></line>
                                        <line x1="16" y1="17" x2="8" y2="17"></line>
                                        <polyline points="10 9 9 9 8 9"></polyline>
                                    </svg>
                                    <h3 class="text-[16px] font-semibold text-gray-800">CSV Format</h3>
                                </div>

                                <div class="text-[14px] font-medium text-red-500 mb-3">Required columns:</div>
                                <ul class="space-y-2">
                                    <li class="flex items-start gap-2 text-[13px] text-gray-600">
                                        <span class="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0"></span>
                                        product Code or nimora Code
                                    </li>
                                    <li class="flex items-start gap-2 text-[13px] text-gray-600">
                                        <span class="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0"></span>
                                        price (for price updates)
                                    </li>
                                    <li class="flex items-start gap-2 text-[13px] text-gray-600">
                                        <span class="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0"></span>
                                        quantity (for inventory updates)
                                    </li>
                                </ul>
                            </div>

                            <!-- Important Notes Card -->
                            <div
                                class="bg-white rounded-[16px] p-6 border border-orange-200/60 shadow-[0_2px_8px_-4px_rgba(251,146,60,0.05)]">
                                <div class="flex items-center gap-2 mb-4">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="text-orange-400">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                    </svg>
                                    <h3 class="text-[16px] font-semibold text-gray-800">Important Notes</h3>
                                </div>

                                <ul class="space-y-2">
                                    <li class="flex items-start gap-2 text-[13px] text-gray-600">
                                        <span class="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0"></span>
                                        Products are matched by product Code or nimora Code
                                    </li>
                                    <li class="flex items-start gap-2 text-[13px] text-gray-600">
                                        <span class="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0"></span>
                                        Prices will be updated immediately
                                    </li>
                                    <li class="flex items-start gap-2 text-[13px] text-gray-600">
                                        <span class="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0"></span>
                                        Inventory changes are tracked with timestamps
                                    </li>
                                    <li class="flex items-start gap-2 text-[13px] text-gray-600">
                                        <span class="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0"></span>
                                        Invalid rows will be skipped with error messages
                                    </li>
                                </ul>
                            </div>

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
                class="bg-white rounded-[20px] w-full max-w-[600px] pt-12 pb-10 px-8 relative z-10 flex flex-col items-center text-center shadow-xl">
                <!-- Icon -->
                <div
                    class="w-[72px] h-[72px] rounded-full border-[4px] border-[#847365] flex items-center justify-center mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
                        stroke-linecap="round" stroke-linejoin="round" class="text-[#847365] ml-1 mt-1">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>

                <h3 class="text-[20px] font-bold text-[#64615F] mb-3 tracking-tight">Import completed successfully.
                    Products have been updated.</h3>
                <p class="text-[15px] text-gray-500 mb-8 tracking-tight">Import completed. 28 products updated, 2
                    skipped.</p>

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

                <h3 class="text-[20px] font-bold text-[#64615F] mb-3 tracking-tight">Some rows could not be processed.
                </h3>
                <p class="text-[15px] text-gray-500 mb-8 tracking-tight">Please review the error report and try again.
                </p>

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
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import HeaderComponent from '../components/header.vue'

const isSidebarOpen = ref(false)
const importType = ref('both')
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
</style>
