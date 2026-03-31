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
                // Endpoint: GET /api/v1/merchant/catalog/categories
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
                // Endpoint: POST /api/v1/merchant/catalog/categories
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
        async deleteCategory(categoryId) {
            this.loading = true
            this.error = null
            try {
                // Endpoint: DELETE /api/v1/merchant/catalog/categories/{category_id}
                await api.delete(`/api/v1/merchant/catalog/categories/${categoryId}`)
                this.categories = this.categories.filter(c => c.id !== categoryId)
            } catch (error) {
                this.error = error.response?.data?.detail || 'Failed to delete category'
                throw error
            } finally {
                this.loading = false
            }
        },
        async assignProductToCategory(categoryId, productId) {
            this.loading = true
            this.error = null
            try {
                // Endpoint: POST /api/v1/merchant/catalog/categories/{category_id}/products/{product_id}
                const response = await api.post(`/api/v1/merchant/catalog/categories/${categoryId}/products/${productId}`)
                return response.data
            } catch (error) {
                this.error = error.response?.data?.detail || 'Failed to assign product to category'
                throw error
            } finally {
                this.loading = false
            }
        },
        async removeProductFromCategory(categoryId, productId) {
            this.loading = true
            this.error = null
            try {
                // Endpoint: DELETE /api/v1/merchant/catalog/categories/{category_id}/products/{product_id}
                await api.delete(`/api/v1/merchant/catalog/categories/${categoryId}/products/${productId}`)
            } catch (error) {
                this.error = error.response?.data?.detail || 'Failed to remove product from category'
                throw error
            } finally {
                this.loading = false
            }
        }
    }
})
