const routes = [
  {
    path: '/',
    component: () => import('layouts/Basic.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/Basic.vue'),
    children: [
      {
        path: 'forgotPassword',
        name: 'ForgotPassword',
        component: () => import('pages/ForgotPassword.vue')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/Auth.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('pages/Auth.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/User.vue'),
    children: [
      {
        path: 'profile',
        name: 'UserProfile',
        component: () => import('pages/user/Profile.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
