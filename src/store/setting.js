import { defineStore } from 'pinia'
import api from '../services/axios'

export const useSettingStore = defineStore('setting', {
    state: () => ({
        catalogVisibility: null,
        loading: false,
        error: null,
        marketplaceVisibility: null
    }),

    actions: {
        async fetchCatalogVisibility() {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/api/v1/merchant/settings/catalog-visibility')
                this.catalogVisibility = response.data
                return response.data
            } catch (err) {
                this.error = err.response?.data?.detail || 'Failed to fetch catalog visibility'
                throw err
            } finally {
                this.loading = false
            }
        },

        async fetchMarketplaceVisibility() {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/api/v1/merchant/settings/marketplace-visibility')
                this.marketplaceVisibility = response.data
                return response.data
            } catch (err) {
                this.error = err.response?.data?.detail || 'Failed to fetch marketplace visibility'
                throw err
            } finally {
                this.loading = false
            }
        },

        async updateCatalogVisibility(visibility) {
            this.loading = true
            this.error = null
            try {
                const response = await api.put('/api/v1/merchant/settings/catalog-visibility', {
                    catalog_visibility: visibility
                })
                this.catalogVisibility = response.data
                return response.data
            } catch (err) {
                this.error = err.response?.data?.detail || 'Failed to update catalog visibility'
                throw err
            } finally {
                this.loading = false
            }
        }
    }
})
