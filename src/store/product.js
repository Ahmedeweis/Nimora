import { defineStore } from 'pinia'
import api from '../services/axios'

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [],
        currentProduct: null,
        marketplaceProducts: [],
        marketplaceCountries: [],
        loading: false,
        error: null
    }),
    actions: {
        async fetchProducts(params = { skip: 0, limit: 100 }) {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/api/v1/merchant/catalog/products', { params })
                this.products = response.data
                return response.data
            } catch (error) {
                this.error = error.response?.data?.detail || 'Failed to fetch products'
                throw error
            } finally {
                this.loading = false
            }
        },

        async fetchProductById(productId) {
            this.loading = true
            this.error = null
            this.currentProduct = null
            try {
                const response = await api.get(`/api/v1/merchant/catalog/products/${productId}`)
                this.currentProduct = response.data
                return response.data
            } catch (error) {
                this.error = error.response?.data?.detail || 'Failed to fetch product details'
                throw error
            } finally {
                this.loading = false
            }
        },

        async createProduct(productData) {
            this.loading = true
            this.error = null
            try {
                const response = await api.post('/api/v1/merchant/catalog/products', productData)
                return response.data
            } catch (err) {
                this.error = err.response?.data?.detail || 'Failed to create product'
                throw err
            } finally {
                this.loading = false
            }
        },

        async updateProduct(productId, productData) {
            this.loading = true
            this.error = null
            try {
                const response = await api.put(`/api/v1/merchant/catalog/products/${productId}`, productData)
                if (this.currentProduct && this.currentProduct.id === productId) {
                    this.currentProduct = response.data
                }
                return response.data
            } catch (err) {
                this.error = err.response?.data?.detail || 'Failed to update product'
                throw err
            } finally {
                this.loading = false
            }
        },

        async deleteProduct(productId) {
            this.loading = true
            this.error = null
            try {
                await api.delete(`/api/v1/merchant/catalog/products/${productId}`)
                this.products = this.products.filter(p => p.id !== productId)
            } catch (err) {
                this.error = err.response?.data?.detail || 'Failed to delete product'
                throw err
            } finally {
                this.loading = false
            }
        },

        async uploadProductImage(productId, file) {
            this.loading = true
            this.error = null
            const formData = new FormData()
            formData.append('file', file)
            try {
                const response = await api.post(`/api/v1/merchant/catalog/products/${productId}/images`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                return response.data
            } catch (err) {
                this.error = err.response?.data?.detail || 'Failed to upload image'
                throw err
            } finally {
                this.loading = false
            }
        },

        async deleteProductImage(productId, imageUrl) {
            this.loading = true
            this.error = null
            try {
                await api.delete(`/api/v1/merchant/catalog/products/${productId}/images/${encodeURIComponent(imageUrl)}`)
            } catch (err) {
                this.error = err.response?.data?.detail || 'Failed to delete image'
                throw err
            } finally {
                this.loading = false
            }
        },

        async generateDirectLink(productId) {
            this.loading = true
            this.error = null
            try {
                const response = await api.post(`/api/v1/merchant/catalog/products/${productId}/direct-link`)
                return response.data
            } catch (err) {
                this.error = err.response?.data?.detail || 'Failed to generate direct link'
                throw err
            } finally {
                this.loading = false
            }
        },

        async fetchMarketplaceProducts(params = { skip: 0, limit: 100 }) {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/api/v1/marketplace/products', { params })
                this.marketplaceProducts = response.data
                return response.data
            } catch (error) {
                this.error = error.response?.data?.detail || 'Failed to fetch marketplace products'
                throw error
            } finally {
                this.loading = false
            }
        },

        async fetchMarketplaceCountries() {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/api/v1/marketplace/countries')
                this.marketplaceCountries = response.data
                return response.data
            } catch (error) {
                this.error = error.response?.data?.detail || 'Failed to fetch countries'
                throw error
            } finally {
                this.loading = false
            }
        },
    },
})
