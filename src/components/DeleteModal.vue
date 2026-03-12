<template>
    <Teleport to="body">
        <div v-if="isOpen"
            class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div class="bg-white rounded-[20px] p-6 sm:p-8 w-full max-w-[450px] shadow-2xl text-center transform transition-all scale-100 opacity-100">
                <!-- Icon -->
                <div class="mb-5 flex justify-center">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </div>

                <h3 class="text-xl font-bold text-gray-700 mb-3">{{ title }}</h3>
                <p class="text-[14px] text-gray-500 mb-8 leading-relaxed font-medium">
                    {{ description }}
                </p>

                <div class="flex gap-3">
                    <button @click="$emit('close')"
                        class="flex-1 py-3 cursor-pointer border border-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                    <button @click="$emit('confirm')" :disabled="loading"
                        class="flex-1 cursor-pointer py-3 bg-[#f24141] text-white rounded-xl font-medium hover:bg-red-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                        <svg v-if="loading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {{ loading ? 'Deleting...' : 'Delete' }}
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        default: 'Delete Item?'
    },
    description: {
        type: String,
        default: 'Are you sure you want to delete this item? This action cannot be undone.'
    },
    loading: {
        type: Boolean,
        default: false
    }
})

defineEmits(['close', 'confirm'])
</script>
