import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Auth/LoginView.vue')
  },
  {
    path: '/dashboard',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/marketplace',
    name: 'marketplace',
    component: () => import('../views/MarketplaceView.vue')
  },
  {
    path: '/login',
    name: 'login-alias',
    component: () => import('../views/Auth/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Auth/RegisterView.vue')
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
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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

// Authentication Guard
router.beforeEach((to, from, next) => {
  const isVercel = import.meta.env.PROD
  const publicPages = ['/', '/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('access_token')

  // If on Vercel (Production), bypass login check
  if (isVercel) {
    return next()
  }

  // Local environment logic
  if (authRequired && !loggedIn) {
    return next('/login')
  }

  // If logged in and trying to access login page, redirect to dashboard
  if (loggedIn && (to.path === '/login' || to.path === '/')) {
    return next('/dashboard')
  }

  next()
})

export default router
