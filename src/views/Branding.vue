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

                <div class="px-4 lg:px-8 py-4 lg:py-6 mx-auto w-full pb-24" style="padding-top: 0;">

                    <div class="flex flex-col lg:flex-row gap-8 mt-6">
                        <!-- Settings Side -->
                        <div class="flex-1 space-y-6">
                            <div class="mb-8">
                                <h1 class="text-[28px] font-bold text-gray-900 leading-tight mb-1">Branding</h1>
                                <p class="text-[14px] text-gray-500">Customize your catalog appearance and brand
                                    identity.</p>
                            </div>

                            <div class="flex bg-white p-1 rounded-[14px] border border-gray-100 w-fit mb-8">
                                <button @click="activeTab = 'colors'"
                                    :class="['flex items-center gap-2 px-6 py-2.5 text-[14px] font-bold rounded-[11px] transition-all',
                                        activeTab === 'colors' ? 'bg-[#8C7A6B] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700']">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z"></path>
                                        <circle cx="12" cy="9" r="3"></circle>
                                    </svg>
                                    Colors
                                </button>
                                <button @click="activeTab = 'typography'"
                                    :class="['flex items-center gap-2 px-6 py-2.5 text-[14px] font-bold rounded-[11px] transition-all',
                                        activeTab === 'typography' ? 'bg-[#8C7A6B] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700']">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="4" />
                                        <path d="M9 7h6" />
                                        <path d="M12 7v10" />
                                        <path d="M10 17h4" />
                                    </svg>
                                    Typography
                                </button>
                            </div>

                            <div v-if="activeTab === 'colors'" class="space-y-10">
                                <!-- Presets -->
                                <div>
                                    <h3 class="text-[16px] font-bold text-gray-800 mb-5">Presets</h3>
                                    <div class="grid grid-cols-2 md:grid-cols-3 gap-5">
                                        <div v-for="preset in colorPresets" :key="preset.name"
                                            @click="applyPreset(preset)"
                                            :class="['p-5 rounded-[20px] border-2 cursor-pointer transition-all text-center',
                                                selectedPreset === preset.name ? 'border-[#E66B1A] bg-white' : 'border-gray-50 bg-white hover:border-gray-100']">
                                            <div class="flex items-center justify-center gap-3 mb-4">
                                                <div class="w-5 h-5 rounded-full shadow-sm"
                                                    :style="{ backgroundColor: preset.primary1 }"></div>
                                                <div class="w-5 h-5 rounded-full shadow-sm"
                                                    :style="{ backgroundColor: preset.dark }"></div>
                                                <div class="w-5 h-5 rounded-full shadow-sm"
                                                    :style="{ backgroundColor: preset.primary2 }"></div>
                                            </div>
                                            <span class="text-[14px] font-bold text-gray-700">{{
                                                preset.name }}</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Custom Colors -->
                                <div>
                                    <h3 class="text-[16px] font-bold text-gray-800 mb-5">Custom</h3>
                                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                        <div class="p-4 rounded-[16px] border border-gray-100 bg-white shadow-sm">
                                            <p
                                                class="text-[11px] font-bold text-gray-400 mb-3 uppercase tracking-widest">
                                                Primary 1</p>
                                            <div class="flex items-center gap-3">
                                                <div class="relative w-10 h-10 shrink-0">
                                                    <input type="color" v-model="branding.primary1"
                                                        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                                                    <div class="w-full h-full rounded-[10px] shadow-sm border border-gray-100"
                                                        :style="{ backgroundColor: branding.primary1 }"></div>
                                                </div>
                                                <span
                                                    class="text-[14px] font-mono font-bold text-gray-600 tracking-tight">{{
                                                        branding.primary1.toUpperCase() }}</span>
                                            </div>
                                        </div>
                                        <div class="p-4 rounded-[16px] border border-gray-100 bg-white shadow-sm">
                                            <p
                                                class="text-[11px] font-bold text-gray-400 mb-3 uppercase tracking-widest">
                                                Primary 2</p>
                                            <div class="flex items-center gap-3">
                                                <div class="relative w-10 h-10 shrink-0">
                                                    <input type="color" v-model="branding.primary2"
                                                        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                                                    <div class="w-full h-full rounded-[11px] shadow-sm border border-gray-50"
                                                        :style="{ backgroundColor: branding.primary2 }"></div>
                                                </div>
                                                <span
                                                    class="text-[14px] font-mono font-bold text-gray-600 tracking-tight">{{
                                                        branding.primary2.toUpperCase() }}</span>
                                            </div>
                                        </div>
                                        <div class="p-4 rounded-[16px] border border-gray-100 bg-white shadow-sm">
                                            <p
                                                class="text-[11px] font-bold text-gray-400 mb-3 uppercase tracking-widest">
                                                Dark</p>
                                            <div class="flex items-center gap-3">
                                                <div class="relative w-10 h-10 shrink-0">
                                                    <input type="color" v-model="branding.dark"
                                                        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                                                    <div class="w-full h-full rounded-[10px] shadow-sm border border-gray-100"
                                                        :style="{ backgroundColor: branding.dark }"></div>
                                                </div>
                                                <span
                                                    class="text-[14px] font-mono font-bold text-gray-600 tracking-tight">{{
                                                        branding.dark.toUpperCase() }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex items-start gap-3 text-[13px] text-gray-500 bg-transparent py-2">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E66B1A"
                                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                                        class="shrink-0 mt-0.5">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                    </svg>
                                    <span>This will change the font across your entire catalog</span>
                                </div>

                                <button @click="handleSave"
                                    class="w-full flex items-center justify-center gap-3 py-4 bg-[#8C7A6B] hover:bg-[#7a6b5d] text-white rounded-[14px] text-[16px] font-bold transition-all shadow-sm transform active:scale-[0.98]">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z">
                                        </path>
                                        <rect x="7" y="13" width="10" height="8"></rect>
                                        <path d="M7 3v5h8"></path>
                                    </svg>
                                    Save
                                </button>
                            </div>
                            <div v-else
                                class="py-20 text-center flex flex-col items-center gap-4 bg-white rounded-[20px] border border-gray-100">
                                <div
                                    class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2">
                                        <polyline points="4 7 4 4 20 4 20 7"></polyline>
                                        <line x1="9" y1="20" x2="15" y2="20"></line>
                                        <line x1="12" y1="4" x2="12" y2="20"></line>
                                    </svg>
                                </div>
                                <span class="text-gray-400 font-medium">Typography settings coming soon...</span>
                            </div>
                        </div>

                        <!-- Preview Side -->
                        <div class="w-full lg:w-[440px] flex flex-col gap-6">
                            <div
                                class="bg-white rounded-[32px] border border-gray-100 p-8 flex flex-col gap-8 sticky top-6 shadow-sm">

                                <!-- Catalog Preview Card -->
                                <div
                                    class="rounded-[24px] overflow-hidden border border-gray-100 shadow-sm bg-white group">
                                    <div class="relative h-[180px] overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1600585154340-be6199f7a096?w=800&q=80"
                                            class="w-full h-full object-cover">
                                        <div
                                            class="absolute top-4 right-4 px-3 py-1 bg-white/95 rounded-full flex items-center gap-2 shadow-sm border border-gray-100/50">
                                            <div class="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div>
                                            <span class="text-[10px] font-bold text-gray-700">Public catalog</span>
                                        </div>
                                        <div
                                            class="absolute -bottom-6 left-5 w-14 h-14 bg-white rounded-[16px] shadow-lg flex items-center justify-center border border-gray-100/50 z-10">
                                            <span class="text-[20px] font-black"
                                                :style="{ color: branding.primary1 }">M</span>
                                        </div>
                                    </div>
                                    <div class="pt-8 px-5 pb-5">
                                        <div class="flex items-center gap-1.5 text-gray-400 mb-2">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2.5">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                <circle cx="12" cy="10" r="3"></circle>
                                            </svg>
                                            <span class="text-[11px] font-medium">Cairo, Egypt</span>
                                        </div>
                                        <h4 class="text-[16px] font-bold text-gray-900 mb-1.5">Merchant Name</h4>
                                        <p class="text-[11px] text-gray-400 leading-relaxed mb-4">Premium marble and
                                            natural stone surfaces for luxury interiors. Curated collections for
                                            architects and designers.</p>
                                        <div class="flex items-center gap-2 text-[#2563EB]">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2.5">
                                                <path
                                                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z">
                                                </path>
                                            </svg>
                                            <span class="text-[11px] font-bold">150 Products</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Product Card Preview -->
                                <div
                                    class="rounded-[24px] overflow-hidden bg-white border border-gray-100 shadow-sm relative group">
                                    <div class="relative aspect-square overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80"
                                            class="w-full h-full object-cover">
                                        <div
                                            class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                                        </div>

                                        <div class="absolute top-5 left-5">
                                            <h5 class="text-white text-[15px] font-bold block mb-0">Carrara Marble</h5>
                                            <span class="text-white/80 text-[10px] font-medium">Marble</span>
                                        </div>

                                        <div class="absolute top-5 right-5 text-white/60 text-[10px] font-medium">
                                            Merchant name</div>

                                        <div class="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                                            <button
                                                class="bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 flex items-center gap-2 border border-white/20">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                    stroke="white" stroke-width="2.5">
                                                    <path
                                                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                                                    </path>
                                                </svg>
                                                <span class="text-white text-[10px] font-bold">Interested</span>
                                            </button>

                                            <!-- Indicator dots -->
                                            <div class="flex gap-1.5">
                                                <div class="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                                                <div class="w-1.5 h-1.5 rounded-full shadow-sm"
                                                    :style="{ backgroundColor: branding.primary2 }"></div>
                                                <div class="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                                            </div>

                                            <button
                                                class="bg-white rounded-full px-4 py-1.5 flex items-center gap-1.5 text-[10px] font-bold shadow-sm"
                                                :style="{ color: branding.dark }">
                                                View Details
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" stroke-width="3">
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                            </button>
                                        </div>

                                        <div class="absolute left-5 top-[20%]">
                                            <span
                                                class="text-white text-[11px] font-bold px-2 py-0.5 bg-black/30 backdrop-blur-sm rounded-md">24x24
                                                · Floor</span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="flex items-start gap-3 text-[13px] text-gray-500 bg-[#FAFAFA] p-5 rounded-[22px] border border-gray-100">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E66B1A"
                                        stroke-width="2.5" class="shrink-0 mt-0.5">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                    </svg>
                                    <span class="leading-relaxed">Changes apply only to your customer-facing <br /><b>(
                                            catalog – product details )</b></span>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </main>
        </div>

        <!-- Success Modal -->
        <Teleport to="body">
            <div v-if="showSuccessModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="showSuccessModal = false"></div>
                <div @click.stop
                    class="bg-white rounded-[24px] w-full max-w-[400px] z-10 shadow-2xl flex flex-col items-center p-10 relative animate-in fade-in zoom-in duration-300">
                    <div class="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="3"
                            stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <h2 class="text-[24px] font-black text-gray-900 mb-3 text-center">Branding Updated!</h2>
                    <p class="text-[16px] text-gray-500 text-center mb-8 font-medium">Your store's brand identity has
                        been successfully updated.</p>
                    <button @click="showSuccessModal = false"
                        class="w-full py-4 bg-[#8C7A6B] text-white rounded-[14px] text-[16px] font-bold hover:bg-[#7a6b5d] transition-all shadow-md active:scale-[0.98]">
                        Awesome!
                    </button>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import HeaderComponent from '../components/header.vue'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '../store/auth'

const toast = useToast()
const authStore = useAuthStore()

const isSidebarOpen = ref(false)
const showSuccessModal = ref(false)
const activeTab = ref('colors')

// Branding State
const selectedPreset = ref('Main')
const branding = ref({
    primary1: '#7D6C5C',
    primary2: '#E66B1A',
    dark: '#221F1C'
})

const colorPresets = [
    { name: 'Main', primary1: '#7D6C5C', primary2: '#E66B1A', dark: '#221F1C' },
    { name: 'Blue Tech', primary1: '#2563EB', primary2: '#F97316', dark: '#1E293B' },
    { name: 'Green', primary1: '#166534', primary2: '#F97316', dark: '#1C1C1C' },
    { name: 'Purple', primary1: '#7C3AED', primary2: '#FB7185', dark: '#1F2937' },
    { name: 'Red Energy', primary1: '#DC2626', primary2: '#F59E0B', dark: '#0F172A' },
    { name: 'Neutral', primary1: '#4B5563', primary2: '#F97316', dark: '#111827' }
]

const applyPreset = (preset) => {
    selectedPreset.value = preset.name
    branding.value.primary1 = preset.primary1
    branding.value.primary2 = preset.primary2
    branding.value.dark = preset.dark
}

const handleSave = async () => {
    try {
        // Save branding to profile metadata
        const updatedProfile = {
            ...authStore.user,
            metadata: {
                ...authStore.user?.metadata,
                branding: branding.value
            }
        }
        await authStore.updateProfile(updatedProfile)
        toast.success('Branding updated successfully!')
        showSuccessModal.value = true
    } catch (error) {
        toast.error('Failed to update branding')
        console.error('Save branding error:', error)
    }
}

onMounted(async () => {
    try {
        const profile = await authStore.getProfile()
        if (profile?.metadata?.branding) {
            branding.value = { ...profile.metadata.branding }
            // Try to find matching preset
            const preset = colorPresets.find(p => 
                p.primary1 === branding.value.primary1 && 
                p.primary2 === branding.value.primary2 && 
                p.dark === branding.value.dark
            )
            if (preset) selectedPreset.value = preset.name
            else selectedPreset.value = 'Custom'
        }
    } catch (error) {
        console.error('Failed to fetch profile for branding:', error)
    }
})

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
