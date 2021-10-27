const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Dashboard.vue') },
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'Admin', component: () => import('pages/Admin.vue') },
      { path: 'AdminDivision', component: () => import('pages/AdminDivision.vue') },
      { path: 'Survey', component: () => import('pages/Survey.vue') },
      { path: 'Question', component: () => import('pages/QuestionsPage.vue') },
      { path: 'Home', component: () => import('pages/Home.vue') }
      
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes