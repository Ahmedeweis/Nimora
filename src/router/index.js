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
