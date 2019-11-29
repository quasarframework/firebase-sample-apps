const routes = [{
  path: '/',
  component: () => import('layouts/MyLayout.vue'),
  children: [{
    path: '',
    component: () => import('pages/Index.vue')
  },
  {
    path: 'user/profile',
    name: 'UserProfile',
    component: () => import('pages/user/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  }
  ]
},
{
  path: '/auth',
  component: () => import('layouts/MyLayout.vue'),
  children: [{
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
