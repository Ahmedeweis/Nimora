import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/products',
    name: 'all-products',
    component: () => import('../views/AllProducts.vue')
  },
  {
    path: '/products/:id',
    name: 'product-details',
    component: () => import('../views/ProductDetails.vue')
  },
  {
    path: '/edit-product/:id',
    name: 'edit-product',
    component: () => import('../views/EditProduct.vue')
  },
  {
    path: '/add-product',
    name: 'add-product',
    component: () => import('../views/AddProduct.vue')
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: () => import('../views/Inventory.vue')
  },
  {
    path: '/import',
    name: 'import',
    component: () => import('../views/Import.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/catalogs',
    name: 'catalogs',
    component: () => import('../views/Catalog.vue')
  },
  {
    path: '/catalogs/:id',
    name: 'catalog-details',
    component: () => import('../views/CatalogDetails.vue')
  },
  {
    path: '/permissions',
    name: 'permissions',
    component: () => import('../views/Permissions.vue')
  },
  {
    path: '/interest-requests',
    name: 'interest-requests',
    component: () => import('../views/InterestRequests.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/Settings.vue')
  },
  {
    path: '/branding',
    name: 'branding',
    component: () => import('../views/Branding.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  }
})
export default router
