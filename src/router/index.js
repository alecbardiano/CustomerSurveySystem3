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

  Router.beforeEach(async (to, from, next) => {
    let user = localStorage.getItem("user")
    const userProfile = JSON.parse(user)
    if(user){
      console.log("pasok? may user")
      await store.dispatch('auth/setUserStore', JSON.parse(user))
    }
    let isLoggedIn =  localStorage.getItem("isLoggedIn")
    if(isLoggedIn){
      await store.dispatch('auth/setLoggedIn',1)
    }

    
    
    // await store.dispatch('auth/setUserStore', user)
    if (to.matched.some(record => record.meta.requiresAuth)){
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      // let isLoggedInLocalStorage = localStorage.getItem("isAuthenticated")
      let userProfile = store.getters["auth/getUserProfile"];
      console.log("userProfile",userProfile)
      if (isLoggedIn != "success") {
        next({ name: 'Login' })
      } else {
        userProfile = store.getters["auth/getUserProfile"];
        
        api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("jwt")
        
        if (userProfile.id && userProfile.confirmed) {
          // await store.dispatch("auth/userProfile");
          console.log("userprofile",userProfile)
          // localStorage.setItem("user",JSON.stringify(response.data.user)
          localStorage.setItem("user",JSON.stringify(userProfile))
          next() // go to wherever I'm going
        }
      }
      
      
    }
    else if(to.name == 'Login'){
      console.log("login")
      if(user && isLoggedIn){
        console.log("userser")
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
