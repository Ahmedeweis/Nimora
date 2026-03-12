import { defineStore } from 'pinia'
import api from '../services/axios'

export const usePermissionStore = defineStore('permission', {
    state: () => ({
        permissions: [],
        currentCustomerPermission: null,
        loading: false,
        error: null
    }),

    actions: {
        async fetchAllPermissions(params = { skip: 0, limit: 100 }) {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/api/v1/permissions/', { params })
                this.permissions = response.data
                return response.data
            } catch (err) {
                this.error = err.response?.data?.detail || 'Failed to fetch all permissions'
                throw err
            } finally {
                this.loading = false
            }
        },

        async fetchCustomerPermissions(customerId) {
            this.loading = true
            this.error = null
            try {
                const response = await api.get(`/api/v1/permissions/customers/${customerId}/permissions`)
                this.currentCustomerPermission = response.data
                return response.data
            } catch (err) {
                this.error = err.response?.data?.detail || 'Failed to fetch customer permissions'
                throw err
            } finally {
                this.loading = false
            }
        },

        async grantPermissionByEmail(data) {
            this.loading = true
            this.error = null
            try {
                const response = await api.post('/api/v1/permissions/grant-by-email', data)
                return response.data
            } catch (err) {
                this.error = err.response?.data?.detail || 'Failed to grant permission'
                throw err
            } finally {
                this.loading = false
            }
        },

        async createCustomerPermission(customerId, data) {
            this.loading = true
            this.error = null
            try {
                const response = await api.post(`/api/v1/permissions/customers/${customerId}/permissions`, data)
                return response.data
            } catch (err) {
                this.error = err.response?.data?.detail || 'Failed to create permission'
                throw err
            } finally {
                this.loading = false
            }
        },

        async updateCustomerPermission(customerId, data) {
            this.loading = true
            this.error = null
            try {
                const response = await api.put(`/api/v1/permissions/customers/${customerId}/permissions`, data)
                return response.data
            } catch (err) {
                this.error = err.response?.data?.detail || 'Failed to update permission'
                throw err
            } finally {
                this.loading = false
            }
        },

        async deleteCustomerPermission(customerId) {
            this.loading = true
            this.error = null
            try {
                await api.delete(`/api/v1/permissions/customers/${customerId}/permissions`)
                this.permissions = this.permissions.filter(p => p.customer_id !== customerId)
                return true
            } catch (err) {
                this.error = err.response?.data?.detail || 'Failed to delete permission'
                throw err
            } finally {
                this.loading = false
            }
        }
    }
})
