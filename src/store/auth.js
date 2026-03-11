import { defineStore } from 'pinia'
import api from '../services/axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('access_token') || null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        async login(credentials) {
            try {
                const response = await api.post('/api/v1/auth/login', credentials)
                this.setAuth(response.data)
                return response.data
            } catch (error) {
                throw error
            }
        },
        async signup(userData) {
            try {
                const response = await api.post('/api/v1/auth/signup', userData)
                this.setAuth(response.data)
                return response.data
            } catch (error) {
                throw error
            }
        },
        setAuth(data) {
            this.token = data.access_token
            this.user = data.user
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('user', JSON.stringify(data.user))
        },
        async logout() {
            try {
                await api.post('/api/v1/auth/logout')
            } catch (error) {
                console.error('Logout API error:', error)
            } finally {
                this.token = null
                this.user = null
                localStorage.removeItem('access_token')
                localStorage.removeItem('user')
            }
        },
        async getProfile() {
            try {
                const response = await api.get('/api/v1/auth/profile')
                return response.data
            } catch (error) {
                throw error
            }
        },
        async updateProfile(profileData) {
            try {
                const response = await api.put('/api/v1/auth/profile', profileData)
                return response.data
            } catch (error) {
                throw error
            }
        },
        async getMe() {
            try {
                const response = await api.get('/api/v1/auth/me')
                return response.data
            } catch (error) {
                throw error
            }
        }
    }
})
