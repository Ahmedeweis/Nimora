<template>
    <!-- Footer/Pagination -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pb-8 text-sm">
        <p class="text-gray-500">Showing {{ (currentPage - 1) * perPage + 1 }}-{{ Math.min(totalItems, currentPage *
            perPage) }} of {{ totalItems }}
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
import { computed } from 'vue'

const props = defineProps({
    currentPage: { type: Number, default: 1 },
    totalPages: { type: Number, default: 1 },
    totalItems: { type: Number, default: 0 },
    perPage: { type: Number, default: 5 }
})

const emit = defineEmits(['page-change'])

const setPage = (p) => {
    if (p >= 1 && p <= props.totalPages) emit('page-change', p)
}

const next = () => setPage(props.currentPage + 1)
const prev = () => setPage(props.currentPage - 1)
const nextFive = () => setPage(Math.min(props.totalPages, props.currentPage + 5))
const prevFive = () => setPage(Math.max(1, props.currentPage - 5))

const visiblePages = computed(() => {
    let start = Math.min(props.currentPage, props.totalPages - 3)
    start = Math.max(1, start)
    return [start, start + 1, start + 2].filter(p => p <= props.totalPages)
})
</script>
