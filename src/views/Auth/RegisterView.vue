<template>
    <div class="min-h-screen flex items-center justify-center p-4 bg-gray-50 md:p-8 lg:p-12 relative overflow-hidden">
        <!-- Background Elements -->
        <div
            class="absolute -top-40 -left-40 w-96 h-96 bg-brand-brown rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob">
        </div>
        <div
            class="absolute top-0 -right-40 w-96 h-96 bg-brand-dark-brown rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000">
        </div>
        <div
            class="absolute -bottom-40 left-20 w-96 h-96 bg-brand-brown rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000">
        </div>

        <div
            class="w-full max-w-6xl bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10 min-h-[600px]">

            <!-- Left Side: Register Form -->
            <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                <!-- <router-link to="/"
                    class="absolute top-8 left-8 text-gray-400 hover:text-gray-600 transition flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clip-rule="evenodd" />
                    </svg>
                    Back
                </router-link> -->

                <div class="max-w-md mx-auto w-full mt-8 md:mt-0">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Create an account</h2>
                    <p class="text-gray-500 mb-8">Join our shopping metaverse today for an unforgettable experience</p>

                    <form @submit.prevent="handleRegister" class="space-y-6">
                        <!-- Company Name -->
                        <div>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400"
                                        viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input type="text" placeholder="Company Name" v-model="form.company_name" :class="['w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent transition text-gray-900 placeholder-gray-400',
                                    errors.company_name ? 'border-red-500' : 'border-gray-100']" />
                            </div>
                            <p v-if="errors.company_name" class="mt-1 text-xs text-red-500 ml-1">{{ errors.company_name
                                }}</p>
                        </div>

                        <!-- Business Type -->
                        <div>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400"
                                        viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-1 1v9a1 1 0 001 1h10a1 1 0 001-1V8a1 1 0 00-1-1h-1V6a4 4 0 00-4-4zM8 6a2 2 0 114 0v1H8V6zm-1 3a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input type="text" placeholder="Business Type" v-model="form.business_type" :class="['w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent transition text-gray-900 placeholder-gray-400',
                                    errors.business_type ? 'border-red-500' : 'border-gray-100']" />
                            </div>
                            <p v-if="errors.business_type" class="mt-1 text-xs text-red-500 ml-1">{{
                                errors.business_type }}</p>
                        </div>

                        <!-- Phone -->
                        <div>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400"
                                        viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 004.546 4.546l.773-1.548a1 1 0 011.062-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                </div>
                                <input type="tel" placeholder="Phone Number" v-model="form.phone" :class="['w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent transition text-gray-900 placeholder-gray-400',
                                    errors.phone ? 'border-red-500' : 'border-gray-100']" />
                            </div>
                            <p v-if="errors.phone" class="mt-1 text-xs text-red-500 ml-1">{{ errors.phone }}</p>
                        </div>

                        <!-- Website -->
                        <div>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400"
                                        viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.151.004-.225.013a10.05 10.05 0 00-1.637 5.037h3.724c-.11-1.921-.617-3.704-1.455-5.014A.54.54 0 0010 4z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input type="url" placeholder="Website (Optional)" v-model="form.website" :class="['w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent transition text-gray-900 placeholder-gray-400',
                                    errors.website ? 'border-red-500' : 'border-gray-100']" />
                            </div>
                            <p v-if="errors.website" class="mt-1 text-xs text-red-500 ml-1">{{ errors.website }}</p>
                        </div>

                        <div>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400"
                                        viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                <input type="email" placeholder="Email" v-model="form.email" :class="['w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent transition text-gray-900 placeholder-gray-400',
                                    errors.email ? 'border-red-500' : 'border-gray-100']" />
                            </div>
                            <p v-if="errors.email" class="mt-1 text-xs text-red-500 ml-1">{{ errors.email }}</p>
                        </div>

                        <div>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400"
                                        viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input type="password" placeholder="Password" v-model="form.password" :class="['w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent transition text-gray-900 placeholder-gray-400',
                                    errors.password ? 'border-red-500' : 'border-gray-100']" />
                            </div>
                            <p v-if="errors.password" class="mt-1 text-xs text-red-500 ml-1">{{ errors.password }}</p>
                        </div>

                        <button type="submit" :disabled="isLoading"
                            class="w-full bg-gradient-to-r from-brand-brown to-brand-dark-brown text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 transition shadow-lg shadow-brand-brown/20 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50">
                            <span v-if="!isLoading">Create Account</span>
                            <span v-else class="flex items-center justify-center">
                                <svg class="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                Creating...
                            </span>
                        </button>
                    </form>

                    <p class="mt-8 text-center text-sm text-gray-500">
                        Already have an account?
                        <router-link to="/login" class="text-brand-brown font-bold hover:underline">Log in</router-link>
                    </p>
                </div>
            </div>

            <!-- Right Side: Visual -->
            <div
                class="hidden md:flex w-1/2 relative bg-gradient-to-br from-gray-50 to-white items-center justify-center p-12 overflow-hidden">
                <!-- Abstract Shape SVG -->
                <div class="relative z-10 transform hover:scale-105 transition duration-700">
                    <div class="w-80 h-80 relative">
                        <div
                            class="absolute inset-0 bg-gradient-to-tr from-brand-brown to-brand-dark-brown rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-pulse">
                        </div>
                        <img src="../../assets/imgs/login.webp" alt="Register Image">
                    </div>
                </div>

                <div class="absolute bottom-12 left-0 right-0 text-center">
                    <h1
                        class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 tracking-tight">
                        nimora</h1>
                </div>

                <!-- Decorative background circles -->
                <div
                    class="absolute top-1/4 right-1/4 w-24 h-24 bg-white rounded-full mix-blend-overlay opacity-50 blur-xl">
                </div>
                <div
                    class="absolute bottom-1/3 left-1/3 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply opacity-50 blur-2xl">
                </div>
            </div>
        </div>
    </div>
    <!-- <Footer /> -->
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '../../store/auth'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const form = ref({
    email: '',
    password: '',
    company_name: '',
    business_type: '',
    phone: '',
    website: ''
})

const isLoading = ref(false)
const errors = ref({
    email: '',
    password: '',
    company_name: '',
    business_type: '',
    phone: '',
    website: ''
})

const validateForm = () => {
    let isValid = true
    errors.value = {
        email: '',
        password: '',
        company_name: '',
        business_type: '',
        phone: '',
        website: ''
    }

    if (!form.value.company_name) {
        errors.value.company_name = 'Company name is required'
        isValid = false
    }

    if (!form.value.business_type) {
        errors.value.business_type = 'Business type is required'
        isValid = false
    }

    if (!form.value.phone) {
        errors.value.phone = 'Phone number is required'
        isValid = false
    } else if (!/^\+?[\d\s-]{8,}$/.test(form.value.phone)) {
        errors.value.phone = 'Please enter a valid phone number'
        isValid = false
    }

    if (form.value.website && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(form.value.website)) {
        errors.value.website = 'Please enter a valid URL'
        isValid = false
    }

    if (!form.value.email) {
        errors.value.email = 'Email is required'
        isValid = false
    } else if (!/^\S+@\S+\.\S+$/.test(form.value.email)) {
        errors.value.email = 'Please enter a valid email address'
        isValid = false
    }

    if (!form.value.password) {
        errors.value.password = 'Password is required'
        isValid = false
    } else if (form.value.password.length < 8) {
        errors.value.password = 'Password must be at least 8 characters'
        isValid = false
    }

    return isValid
}

const handleRegister = async () => {
    if (!validateForm()) return

    isLoading.value = true
    try {
        await authStore.signup(form.value)
        toast.success("Account created successfully!", {
            timeout: 2000
        });
        router.push('/dashboard')
    } catch (error) {
        if (error.response && error.response.status === 422) {
            const details = error.response.data.detail
            if (Array.isArray(details)) {
                details.forEach(err => {
                    toast.error(`${err.loc.join('.')}: ${err.msg}`)
                })
            } else {
                toast.error("Validation error. Please check your inputs.")
            }
        } else {
            toast.error("An error occurred during registration. Please try again.")
        }
        console.error('Registration error:', error)
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped>
.animate-blob {
    animation: blob 7s infinite;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.animation-delay-4000 {
    animation-delay: 4s;
}

@keyframes blob {
    0% {
        transform: translate(0px, 0px) scale(1);
    }

    33% {
        transform: translate(30px, -50px) scale(1.1);
    }

    66% {
        transform: translate(-20px, 20px) scale(0.9);
    }

    100% {
        transform: translate(0px, 0px) scale(1);
    }
}
</style>
