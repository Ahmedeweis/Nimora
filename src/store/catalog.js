import { defineStore } from 'pinia'
import api from '../services/axios'

export const useCatalogStore = defineStore('catalog', {
    state: () => ({
        categories: [],
        loading: false,
        error: null
    }),
    actions: {
        async fetchCategories() {
            this.loading = true
            this.error = null
            try {
                // Proposed endpoint: GET /api/v1/merchant/catalog/categories
                const response = await api.get('/api/v1/merchant/catalog/categories')
                this.categories = response.data
                return response.data
            } catch (error) {
                this.error = error.response?.data?.detail || 'Failed to fetch categories'
                // Fallback to deriving from products if endpoint fails
                return []
            } finally {
                this.loading = false
            }
        },
        async createCategory(categoryData) {
            this.loading = true
            this.error = null
            try {
                // Proposed endpoint: POST /api/v1/merchant/catalog/categories
                const response = await api.post('/api/v1/merchant/catalog/categories', categoryData)
                this.categories.push(response.data)
                return response.data
            } catch (error) {
                this.error = error.response?.data?.detail || 'Failed to create category'
                throw error
            } finally {
                this.loading = false
            }
        },
        async assignProductToCategory(categoryId, productId) {
            this.loading = true
            this.error = null
            try {
                // Proposed endpoint: POST /api/v1/merchant/catalog/categories/{category_id}/products/{product_id}
                const response = await api.post(`/api/v1/merchant/catalog/categories/${categoryId}/products/${productId}`)
                return response.data
            } catch (error) {
                this.error = error.response?.data?.detail || 'Failed to assign product to category'
                throw error
            } finally {
                this.loading = false
            }
        }
    }
})
