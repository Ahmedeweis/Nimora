<template>
    <!-- Footer/Pagination -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pb-8 text-sm">
        <p class="text-gray-500">Showing {{ (currentPage - 1) * 5 + 1 }}-{{ Math.min(1060, currentPage * 5) }} of 1060
            products</p>

        <div class="flex items-center gap-1.5">
            <button @click="prevFive" :disabled="currentPage === 1"
                class="w-8 h-8 flex items-center justify-center rounded-full bg-white border-gray-500 border-[2px] text-gray-400 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="11 17 6 12 11 7"></polyline>
                    <polyline points="18 17 13 12 18 7"></polyline>
                </svg>
            </button>
            <button @click="prev" :disabled="currentPage === 1"
                class="w-8 h-8 flex items-center justify-center rounded-full bg-white border-gray-500 border-[2px] text-gray-400 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            <button v-for="page in visiblePages" :key="page" @click="setPage(page)"
                class="w-8 h-8 flex items-center justify-center rounded-full border-gray-500 border-[2px] font-medium transition-colors cursor-pointer"
                :class="page === currentPage ? 'bg-[#8c7a6b] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'">
                {{ page }}
            </button>

            <span v-if="totalPages > 4 && currentPage < totalPages - 3"
                class="w-8 h-8 flex items-center justify-center text-gray-400">...</span>

            <button v-if="totalPages > 3" @click="setPage(totalPages)"
                class="w-8 h-8 flex items-center justify-center bg-white border-gray-500 border-[2px] rounded-full font-medium transition-colors cursor-pointer"
                :class="totalPages === currentPage ? 'bg-[#8c7a6b] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'">
                {{ totalPages }}
            </button>

            <button @click="next" :disabled="currentPage === totalPages"
                class="w-8 h-8 flex items-center justify-center bg-white border-gray-500 border-[2px] rounded-full text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
            <button @click="nextFive" :disabled="currentPage === totalPages"
                class="w-8 h-8 flex items-center justify-center rounded-full bg-white border-gray-500 border-[2px] text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="13 17 18 12 13 7"></polyline>
                    <polyline points="6 17 11 12 6 7"></polyline>
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentPage = ref(1)
const totalPages = ref(10)

const setPage = (p) => {
    currentPage.value = p
}

const next = () => {
    if (currentPage.value < totalPages.value) currentPage.value++
}

const prev = () => {
    if (currentPage.value > 1) currentPage.value--
}

const nextFive = () => {
    currentPage.value = Math.min(totalPages.value, currentPage.value + 5)
}

const prevFive = () => {
    currentPage.value = Math.max(1, currentPage.value - 5)
}

const visiblePages = computed(() => {
    let start = Math.min(currentPage.value, totalPages.value - 3)
    start = Math.max(1, start)
    return [start, start + 1, start + 2]
})
</script>
