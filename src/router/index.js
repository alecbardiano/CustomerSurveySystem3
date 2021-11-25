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

    if (to.matched.some(record => record.meta.requiresAuth)){
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      let isLoggedIn = store.getters["auth/getLoginApiStatus"];
      // let isLoggedInLocalStorage = localStorage.getItem("isAuthenticated")
      let userProfile = store.getters["auth/getUserProfile"];
      if (isLoggedIn != "success") {
        next({ name: 'Login' })
      } else {
        userProfile = store.getters["auth/getUserProfile"];
        api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("jwt")
        
        if (userProfile.id != 0) {
          await store.dispatch("auth/userProfile");
          console.log("userprofile",userProfile)
          localStorage.setItem("user",userProfile )
        }
        next() // go to wherever I'm going
      }
    } else {
      next() // does not require auth, make sure to always call next()!
    }
    
  });

  // Router.beforeEach(async (to, from, next) => {
  //   let allowedToEnter = true
  //   to.matched.some((record) => {
  //     // check if there is meta data
  //     const isLoggedIn = isValidLoggedIn(store)
  //     if (!isLoggedIn && record.name === 'home') {
  //       next({
  //         path: '/sign-in',
  //         replace: true
  //       })
  //       return
  //     }
  //   })

  //   if ('meta' in record) {
  //     // ------------------------------------------------------------
  //     // check if user needs to be logged in to access this page
  //     if ('requiresAuth' in record.meta) {
  //       if (record.meta.requiresAuth) {
  //         // console.log('Page requires auth:', to, from)
  //         // this route requires auth, check if user is logged in
  //         // if not, redirect to login page.
  //         if (!isLoggedIn) {
  //           // User is not logged in, redirect to signin page
  //           allowedToEnter = false
  //           next({
  //             path: '/sign-in',
  //             replace: true,
  //             // redirect back to original path when done signing in
  //             query: { redirect: to.fullPath }
  //           })
  //         }
  //       }
  //     }
  //     // ------------------------------------------------------------
  //     // check if user has correct permissions to access this page
  //     if (allowedToEnter && 'permissions' in record.meta) {
  //       let canProceed = false
  //       const permissions = record.meta.permissions
  //       // get currently logged in user permissions
  //       const token = store.getters['auth/token']
  //       // decipher the token
  //       const session = JWT.read(token)
  //       // check if they are not an admin (administrator)
  //       if (session.claim.permissions.administrator) {
  //         canProceed = true
  //       }b
  //       else {
  //         for (let index = 0; index < permissions.length; ++index) {
  //           const permission = permissions[index]
  //           // console.log('Permission needed:', permission)
  //           if (permission === 'administrator') {
  //             if (session.claim.permissions.administrator) {
  //               canProceed = true
  //             }
  //           }
  //           else if (permission === 'liveview') {
  //             if (session.claim.permissions.liveview) {
  //               canProceed = true
  //             }
  //             if (!canProceed) {
  //               allowedToEnter = false
  //               // redirect to not-authorized page
  //               next({
  //                 path: '/not-authorized',
  //                 replace: true
  //               })
  //             }
  //           }
  //        }
  //      }
  //   }

  // if (allowedToEnter) {
  //   // go to the requested page
  //   next()
  // }
    
  //   // console.log("before here first")
  //   // console.log("store", store)
  //   // var userProfile = store.getters["auth/getUserProfile"];
  //   // console.log("here before")
  //   // if (userProfile.id === 0) {
  //   //   await store.dispatch("auth/userProfile");
  //   //   userProfile = store.getters["auth/getUserProfile"];
  //   //   if (userProfile.id === 0) {
  //   //     return next({ path: "/login" });
  //   //   } else {
  //   //     return next();
  //   //   }
  //   // }
  //   // return next();

  //   }

  // });

  return Router
})
