<template>
    <nav :class="[
        'w-64 h-screen bg-white border-r border-gray-100 flex flex-col flex-shrink-0 fixed lg:sticky top-0 z-50 overflow-y-auto overflow-x-hidden transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]">
        <!-- Logo area -->
        <div style="margin-left: 20px;" class="p-3 flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <img src="/logo.webp" alt="nano banana bro" class="w-8 h-8 rounded-lg" />
                <div>
                    <h1 class="text-gray-900 font-semibold  leading-tight"
                        style="margin: 10px 0 0 0 ; font-size: 24px;">Nimora
                    </h1>
                    <p class="text-gray-500 text-xs">Merchant Portal</p>
                </div>
            </div>
            <!-- Close Button (Mobile Only) -->
            <button @click="$emit('close')" class="lg:hidden text-gray-400 hover:text-gray-600 p-1">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Navigation links -->
        <div class="flex-1 px-4 pb-6 space-y-6" style="padding-top: 10px; border-top: solid 3px #E9E9E8;">
            <!-- Main Dashboard -->
            <div>
                <router-link to="/dashboard" :class="[
                    'flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border-l-[3px]',
                    route.path === '/dashboard' || route.path === '/'
                        ? 'bg-[#F1F1F1] text-black border-black'
                        : 'text-[#64615F] hover:text-gray-900 hover:bg-gray-50 border-transparent'
                ]">
                    <svg :class="['w-5 h-5 flex-shrink-0', route.path === '/dashboard' || route.path === '/' ? 'text-black' : 'text-gray-400']"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <span>Dashboard</span>
                </router-link>
            </div>

            <!-- Products Section -->
            <div>
                <h2 class="px-4 text-[15px] font-bold text-black uppercase tracking-wider mb-2">Products</h2>
                <ul class="space-y-1">
                    <li>
                        <router-link to="/products" :class="[
                            'flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors border-l-[3px]',
                            route.path.startsWith('/products')
                                ? 'bg-[#F1F1F1] text-black border-black'
                                : 'text-[#64615F] hover:text-gray-900 hover:bg-gray-50 border-transparent'
                        ]">
                            <svg :class="['w-5 h-5 flex-shrink-0', route.path.startsWith('/products') ? 'text-black' : 'text-gray-400']"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <span>All Products</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/add-product" :class="[
                            'flex items-center space-x-3 px-4 py-2 rounded-xl text-sm font-medium transition-colors border-l-[3px]',
                            route.path.startsWith('/add-product')
                                ? 'bg-[#F1F1F1] text-black border-black'
                                : 'text-[#64615F] hover:text-gray-900 hover:bg-gray-50 border-transparent'
                        ]">
                            <svg :class="['w-5 h-5 flex-shrink-0', route.path.startsWith('/add-product') ? 'text-black' : 'text-gray-400']"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Add New</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/inventory" :class="[
                            'flex items-center space-x-3 px-4 py-2 rounded-xl text-sm font-medium transition-colors border-l-[3px]',
                            route.path.startsWith('/inventory')
                                ? 'bg-[#F1F1F1] text-black border-black'
                                : 'text-[#64615F] hover:text-gray-900 hover:bg-gray-50 border-transparent'
                        ]">
                            <img src="../assets/imgs/inventory.svg" alt="Inventory"
                                :class="['w-5 h-5 flex-shrink-0 transition-opacity', route.path.startsWith('/inventory') ? 'opacity-100' : 'opacity-60']">
                            <span>Inventory</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/categories" :class="[
                            'flex items-center space-x-3 px-4 py-2 rounded-xl text-sm font-medium transition-colors border-l-[3px]',
                            route.path.startsWith('/categories')
                                ? 'bg-[#F1F1F1] text-black border-black'
                                : 'text-[#64615F] hover:text-gray-900 hover:bg-gray-50 border-transparent'
                        ]">
                            <svg :class="['w-5 h-5 flex-shrink-0', route.path.startsWith('/categories') ? 'text-black' : 'text-gray-400']"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                            <span>Categories</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/catalogs" :class="[
                            'flex items-center space-x-3 px-4 py-2 rounded-xl text-sm font-medium transition-colors border-l-[3px]',
                            route.path.startsWith('/catalogs')
                                ? 'bg-[#F1F1F1] text-black border-black'
                                : 'text-[#64615F] hover:text-gray-900 hover:bg-gray-50 border-transparent'
                        ]">
                            <svg :class="['w-5 h-5 flex-shrink-0', route.path.startsWith('/catalogs') ? 'text-black' : 'text-gray-400']"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <span>Catalogs</span>
                        </router-link>
                    </li>
                </ul>
            </div>

            <!-- Customers Section -->
            <div>
                <h2 class="px-4 text-[15px] font-bold text-black uppercase tracking-wider mb-2">Customers</h2>
                <ul class="space-y-1">
                    <li>
                        <router-link to="/permissions" :class="[
                            'flex items-center space-x-3 px-4 py-2 rounded-xl text-sm font-medium transition-colors border-l-[3px]',
                            route.path.startsWith('/permissions')
                                ? 'bg-[#F1F1F1] text-black border-black'
                                : 'text-[#64615F] hover:text-gray-900 hover:bg-gray-50 border-transparent'
                        ]">
                            <svg :class="['w-5 h-5 flex-shrink-0', route.path.startsWith('/permissions') ? 'text-black' : 'text-gray-400']"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span>Permissions</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/interest-requests" :class="[
                            'flex items-center space-x-3 px-4 py-2 rounded-xl text-sm font-medium transition-colors border-l-[3px]',
                            route.path.startsWith('/interest-requests')
                                ? 'bg-[#F1F1F1] text-black border-black'
                                : 'text-[#64615F] hover:text-gray-900 hover:bg-gray-50 border-transparent'
                        ]">
                            <svg :class="['w-5 h-5 flex-shrink-0', route.path.startsWith('/interest-requests') ? 'text-black' : 'text-gray-400']"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>Interest Requests</span>
                        </router-link>
                    </li>
                </ul>
            </div>

            <!-- Store Section -->
            <div>
                <h2 class="px-4 text-[15px] font-bold text-black uppercase tracking-wider mb-2">Store</h2>
                <ul class="space-y-1">
                    <li>
                        <router-link to="/settings" :class="[
                            'flex items-center space-x-3 px-4 py-2 rounded-xl text-sm font-medium transition-colors border-l-[3px]',
                            route.path.startsWith('/settings')
                                ? 'bg-[#F1F1F1] text-black border-black'
                                : 'text-[#64615F] hover:text-gray-900 hover:bg-gray-50 border-transparent'
                        ]">
                            <svg :class="['w-5 h-5 flex-shrink-0', route.path.startsWith('/settings') ? 'text-black' : 'text-gray-400']"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Settings</span>
                        </router-link>
                    </li>
                    <!-- <li>
                        <router-link to="/branding" :class="[
                            'flex items-center space-x-3 px-4 py-2 rounded-xl text-sm font-medium transition-colors border-l-[3px]',
                            route.path.startsWith('/branding')
                                ? 'bg-[#F1F1F1] text-black border-black'
                                : 'text-[#64615F] hover:text-gray-900 hover:bg-gray-50 border-transparent'
                        ]">
                            <svg :class="['w-5 h-5 flex-shrink-0', route.path.startsWith('/branding') ? 'text-black' : 'text-gray-400']"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                            <span>Branding</span>
                        </router-link>
                    </li> -->
                    <li class="pt-2 border-t border-gray-100/50 mt-4">
                        <button @click.prevent="showLogoutModal = true"
                            class="w-full flex items-center space-x-3 px-4 py-2 text-red-500 font-bold rounded-xl text-sm transition-colors">
                            <svg class="w-5 h-5 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Bottom Action -->
        <div class="p-4 border-t border-gray-100">
            <button
                class="w-full flex items-center justify-center space-x-2 bg-[#8C7A6B] hover:bg-[#7a6b5d] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>View Catalog</span>
            </button>
        </div>

        <!-- Logout Modal -->
        <Teleport to="body">
            <div v-if="showLogoutModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="showLogoutModal = false"></div>
                <div @click.stop
                    class="bg-white rounded-[16px] w-full max-w-[480px] z-10 shadow-xl flex flex-col items-center p-10 relative">

                    <!-- Icon -->
                    <div class="mb-4 text-[#8C7A6B]">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M10 6H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4"></path>
                            <polyline points="15 8 19 12 15 16"></polyline>
                            <line x1="8" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </div>

                    <!-- Text -->
                    <h2 class="text-[24px] font-bold text-gray-700 mb-3">Log Out ?</h2>
                    <p class="text-[16px] text-gray-500 mb-8 text-center">Are you sure you want to log Out?</p>

                    <!-- Buttons -->
                    <div class="flex items-center gap-4 w-full">
                        <button @click="showLogoutModal = false"
                            class="flex-1 py-3 border border-gray-200 text-gray-900 rounded-[12px] text-[15px] font-semibold hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                        <button @click="handleLogout"
                            class="flex-1 py-3 bg-[#8C7A6B] text-white rounded-[12px] text-[15px] font-semibold hover:bg-[#7a6b5d] transition-colors shadow-sm">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>
    </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const showLogoutModal = ref(false)

const handleLogout = async () => {
    await authStore.logout()
    showLogoutModal.value = false
    router.push('/login')
}

defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
})

defineEmits(['close'])
</script>
