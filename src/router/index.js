import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { api} from 'boot/axios'
import JWT from 'jwt-client'
import { LocalStorage } from 'quasar'
// import storeVuex from '../store/index.js';;
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store }/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })


  // call before load every page
  Router.beforeEach(async (to, from, next) => {
    let user = localStorage.getItem("user")
    let userProfile
    let isLoggedIn
    
    if(user == '[object Object]'){
      await store.dispatch('auth/logout')
    }else{
      userProfile = JSON.parse(user) ? JSON.parse(user) : ""
      if(userProfile){
        // call vuex function setuserStore auth
        await store.dispatch('auth/setUserStore', JSON.parse(user))
      }
      isLoggedIn =  localStorage.getItem("isLoggedIn")
      if(isLoggedIn){
        await store.dispatch('auth/setLoggedIn',1)
      }
      
    }
    

    // check if page requires authentication
    if (to.matched.some(record => record.meta.requiresAuth)){
      // this route requires auth, check if logged in
      // if not, redirect to login page.

      // vuex checker user
      let getUser = store.getters["auth/getUserProfile"];
      if (isLoggedIn != "success" || !getUser || userProfile == "") {
        await store.dispatch('auth/logout')
        next({ name: 'Login' })
      } else {
        userProfile = store.getters["auth/getUserProfile"];
        
        // for api calls
        api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("jwt")

        
        
        if (userProfile.id) {
          // localStorage.setItem("user",JSON.stringify(response.data.user)
          localStorage.setItem("user",JSON.stringify(userProfile))
          next() // go to wherever I'm going
        }
      }
      
      
    }
    // if login and user does not exist in session, localstorage redirect to login page
    else if(to.name == 'Login'){
      if(user && isLoggedIn){
        next({from})
      }else{
        next()
      }
    }
    else {
      next() // does not require auth, make sure to always call next()!
    }
    
  });

  

  return Router
})
