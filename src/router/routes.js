const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name:'Dashboard', path: '', component: () => import('src/pages/Dashboard.vue'), 
        meta: {
        requiresAuth: true
      } },
      // { path: '', component: () => import('pages/Index.vue') },
      { name: 'Admin', path: 'Admin', component: () => import('pages/Admin.vue'), meta: {
        requiresAuth: true
      }},
      { name: 'AdminDivision',  path: 'AdminDivision', component: () => import('pages/AdminDivision.vue'), meta: {
        requiresAuth: true
      } },
      { name: 'Survey', path: 'Survey', component: () => import('pages/Survey.vue') },
      { name: 'Question', path: 'Question', component: () => import('pages/QuestionsPage.vue'), meta: {
        requiresAuth: true
      }},
      { name: 'Home', path: 'Home', component: () => import('pages/Home.vue'),meta: {
        requiresAuth: true
      } },
      
    ]
  },

  { name: 'Login', path: '/Login', component: () => import('pages/Login.vue') },
  // Always leave this as last one,
  // but you can also remove it


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes