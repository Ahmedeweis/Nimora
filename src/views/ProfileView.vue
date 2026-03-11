<template>
    <div class="flex h-screen bg-[#fafafa] overflow-hidden flex-col lg:flex-row relative w-full font-['Inter',sans-serif]">
        <Navbar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

        <!-- Backdrop for mobile -->
        <div v-if="isSidebarOpen" @click="isSidebarOpen = false"
            class="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm transition-opacity"></div>

        <div class="flex-1 overflow-y-auto w-full">
            <main class="min-h-full flex flex-col">
                <HeaderComponent @open-sidebar="isSidebarOpen = true" />

                <!-- Page Content -->
                <div class="px-4 lg:px-8 py-4 lg:py-6 max-w-[1200px] mx-auto w-full pb-20">
                    
                    <!-- Loading State -->
                    <div v-if="isInitialLoading" class="flex items-center justify-center h-[60vh]">
                        <div class="w-12 h-12 border-4 border-[#847365]/20 border-t-[#847365] rounded-full animate-spin"></div>
                    </div>

                    <template v-else>
                        <!-- Profile Header / Hero Section -->
                        <div class="relative mb-8">
                            <!-- Cover Image -->
                            <div class="h-48 w-full bg-gradient-to-r from-[#847365] to-[#4a3f35] rounded-[24px] overflow-hidden relative">
                                <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                            </div>

                            <!-- Profile Info Overlap -->
                            <div class="px-6 -mt-12 flex flex-col md:flex-row items-end gap-6 relative z-10">
                                <!-- Avatar -->
                                <div class="w-32 h-32 rounded-[32px] bg-white p-1.5 shadow-xl">
                                    <div class="w-full h-full rounded-[26px] bg-[#f4ece3] flex items-center justify-center text-[#847365] text-4xl font-bold border-4 border-white uppercase">
                                        {{ profileData.company_name?.charAt(0) || 'M' }}
                                    </div>
                                </div>

                                <!-- Name & Role -->
                                <div class="flex-1 pb-4">
                                    <h1 class="text-3xl font-bold text-gray-900 mb-1">{{ profileData.company_name || 'Loading...' }}</h1>
                                    <p class="text-gray-500 font-medium flex items-center gap-2">
                                        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        {{ profileData.business_type || 'Premium Merchant' }}
                                    </p>
                                </div>

                                <!-- Actions -->
                                <div class="pb-4 flex gap-3">
                                    <button @click="startEditing" class="px-6 py-2.5 bg-[#847365] hover:bg-[#736458] text-white rounded-xl text-[14px] font-semibold transition-all shadow-md shadow-[#847365]/20 hover:-translate-y-0.5">
                                        Edit Profile
                                    </button>
                                    <button class="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-[14px] font-semibold hover:bg-gray-50 transition-all flex items-center gap-2">
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                        </svg>
                                        Share
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <!-- Left Column: Details -->
                            <div class="lg:col-span-1 space-y-6">
                                <!-- Contact Info Card -->
                                <div class="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm">
                                    <h3 class="text-lg font-bold text-gray-900 mb-6 font-primary">Business Details</h3>
                                    <div class="space-y-4">
                                        <div class="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                                            <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <p class="text-xs text-gray-400 font-medium uppercase tracking-wider">Store ID</p>
                                                <p class="text-sm font-semibold text-gray-900 truncate">{{ profileData.id }}</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                                            <div class="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-xs text-gray-400 font-medium uppercase tracking-wider">Phone Number</p>
                                                <p class="text-sm font-semibold text-gray-900">{{ profileData.phone || 'Not provided' }}</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                                            <div class="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                                </svg>
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <p class="text-xs text-gray-400 font-medium uppercase tracking-wider">Website</p>
                                                <a v-if="profileData.website" :href="profileData.website" target="_blank" class="text-sm font-semibold text-[#847365] hover:underline truncate block">{{ profileData.website }}</a>
                                                <p v-else class="text-sm font-semibold text-gray-900">Not provided</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                                            <div class="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-xs text-gray-400 font-medium uppercase tracking-wider">Address</p>
                                                <p class="text-sm font-semibold text-gray-900">
                                                    {{ profileData.address || 'Not provided' }}
                                                </p>
                                                <p v-if="profileData.city" class="text-xs text-gray-500 font-medium">
                                                    {{ profileData.city }}, {{ profileData.state }} {{ profileData.postal_code }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mt-8 pt-6 border-t border-gray-100">
                                        <div class="flex items-center justify-between mb-4">
                                            <span class="text-sm font-medium text-gray-700">Tax ID</span>
                                            <span class="px-2.5 py-1 rounded-full bg-[#847365]/10 text-[#847365] text-xs font-bold uppercase tracking-wide">{{ profileData.tax_id || 'N/A' }}</span>
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <span class="text-sm font-medium text-gray-700">Country</span>
                                            <span class="text-sm text-gray-500 font-semibold">{{ profileData.country || 'Not set' }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Right Column: Stats & Security -->
                            <div class="lg:col-span-2 space-y-8">
                                <!-- Stats Grid -->
                                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div class="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm text-center transform transition hover:scale-105">
                                        <p class="text-2xl font-bold text-gray-900">124</p>
                                        <p class="text-xs text-gray-500 font-medium font-primary">Products</p>
                                    </div>
                                    <div class="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm text-center transform transition hover:scale-105">
                                        <p class="text-2xl font-bold text-gray-900">1.2k</p>
                                        <p class="text-xs text-gray-500 font-medium font-primary">Sales</p>
                                    </div>
                                    <div class="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm text-center transform transition hover:scale-105">
                                        <p class="text-2xl font-bold text-gray-900">4.9</p>
                                        <p class="text-xs text-gray-500 font-medium font-primary">Rating</p>
                                    </div>
                                </div>

                                <!-- Security Quick Access -->
                                <div class="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm">
                                    <h3 class="text-lg font-bold text-gray-900 mb-6 font-primary">Account Security</h3>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <button class="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all text-left">
                                            <div class="flex items-center gap-3">
                                                <div class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-700">
                                                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17.086V19a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 01.293-.707L8.643 15.341A6 6 0 1121 9z" />
                                                    </svg>
                                                </div>
                                                <span class="text-sm font-bold text-gray-700">Change Password</span>
                                            </div>
                                            <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>

                                        <button class="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all text-left">
                                            <div class="flex items-center gap-3">
                                                <div class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-700">
                                                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                    </svg>
                                                </div>
                                                <span class="text-sm font-bold text-gray-700">Two-Factor Auth</span>
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Off</span>
                                                <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </main>
        </div>

        <!-- Edit Profile Modal -->
        <div v-if="isEditModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-black/40 backdrop-blur-md" @click="isEditModalOpen = false"></div>
            
            <div class="card bg-white w-full max-w-2xl rounded-[32px] relative z-10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div class="p-8 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900">Edit Merchant Profile</h2>
                        <p class="text-sm text-gray-500 mt-1">Update your business information and appearance.</p>
                    </div>
                    <button @click="isEditModalOpen = false" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="p-8 max-h-[70vh] overflow-y-auto no-scrollbar">
                    <form @submit.prevent="saveProfile" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Company Name</label>
                            <input v-model="editForm.company_name" type="text" class="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#847365]/20 text-gray-900 transition-all font-medium" />
                        </div>

                        <div class="space-y-2">
                            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Business Type</label>
                            <input v-model="editForm.business_type" type="text" class="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#847365]/20 text-gray-900 transition-all font-medium" />
                        </div>

                        <div class="space-y-2">
                            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Phone</label>
                            <input v-model="editForm.phone" type="text" class="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#847365]/20 text-gray-900 transition-all font-medium" />
                        </div>

                        <div class="space-y-2">
                            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Website</label>
                            <input v-model="editForm.website" type="text" class="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#847365]/20 text-gray-900 transition-all font-medium" />
                        </div>

                        <div class="md:col-span-2 space-y-2">
                            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Address</label>
                            <input v-model="editForm.address" type="text" class="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#847365]/20 text-gray-900 transition-all font-medium" />
                        </div>

                        <div class="space-y-2">
                            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">City</label>
                            <input v-model="editForm.city" type="text" class="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#847365]/20 text-gray-900 transition-all font-medium" />
                        </div>

                        <div class="space-y-2">
                            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">State</label>
                            <input v-model="editForm.state" type="text" class="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#847365]/20 text-gray-900 transition-all font-medium" />
                        </div>

                        <div class="space-y-2">
                            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Country</label>
                            <input v-model="editForm.country" type="text" class="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#847365]/20 text-gray-900 transition-all font-medium" />
                        </div>

                        <div class="space-y-2">
                            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Postal Code</label>
                            <input v-model="editForm.postal_code" type="text" class="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#847365]/20 text-gray-900 transition-all font-medium" />
                        </div>

                        <div class="space-y-2">
                            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Tax ID</label>
                            <input v-model="editForm.tax_id" type="text" class="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#847365]/20 text-gray-900 transition-all font-medium" />
                        </div>
                    </form>
                </div>

                <div class="p-8 border-t border-gray-100 flex gap-4">
                    <button @click="isEditModalOpen = false" class="flex-1 py-4 px-6 border border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-all">Cancel</button>
                    <button @click="saveProfile" :disabled="isSaving" class="flex-1 py-4 px-6 bg-[#847365] text-white rounded-2xl font-bold shadow-lg shadow-[#847365]/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                        <span v-if="!isSaving">Save Changes</span>
                        <div v-else class="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useAuthStore } from '../store/auth'
import { useToast } from 'vue-toastification'
import Navbar from '../components/Navbar.vue'
import HeaderComponent from '../components/header.vue'

const authStore = useAuthStore()
const toast = useToast()

const isSidebarOpen = ref(false)
const isInitialLoading = ref(true)
const isSaving = ref(false)
const isEditModalOpen = ref(false)

const profileData = ref({})
const editForm = reactive({})

const fetchProfile = async () => {
    try {
        const data = await authStore.getProfile()
        profileData.value = data
    } catch (error) {
        toast.error('Failed to load profile data')
        console.error('Fetch profile error:', error)
    } finally {
        isInitialLoading.value = false
    }
}

const startEditing = () => {
    Object.assign(editForm, profileData.value)
    isEditModalOpen.value = true
}

const saveProfile = async () => {
    isSaving.value = true
    try {
        const updatedData = await authStore.updateProfile(editForm)
        profileData.value = updatedData
        isEditModalOpen.value = false
        toast.success('Profile updated successfully')
    } catch (error) {
        toast.error('Failed to update profile')
        console.error('Update profile error:', error)
    } finally {
        isSaving.value = false
    }
}

onMounted(fetchProfile)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;600;700&display=swap');

.font-primary { font-family: 'Outfit', sans-serif; }

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.card {
    box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08);
}
</style>
