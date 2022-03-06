import { boot } from 'quasar/wrappers'
import axios from 'axios'
import xlsx from 'xlsx'


// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const pdfMake = require('pdfmake/build/pdfmake.js')
let pdfFonts
  if (pdfMake.vfs == undefined){
    const pdfFonts = require('pdfmake/build/vfs_fonts.js')
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }



const csmsURL = 'http://10.10.120.19:1337/'
      // headers: {
      //   Authorization: `Bearer ${Auth.state.token}`
      // }
const api = axios.create(
  { 
    baseURL: 'http://10.10.120.19:1337/'
    // headers: {
    //   Authorization: `Bearer ${Auth.state.token}`
    // }
  })
const oneshopapi = axios.create({ baseURL: 'http://10.10.120.32:3030/' })
const ulimsTSRapi = axios.create({baseURL: 'http://10.10.120.5/ulims/lab/request'})
const mailapi = axios.create({baseURL: 'http://10.10.120.15:3232/'}) // send notifications
 
 

// export default ({  Vue }) => {
//   const baseURL = getbaseURL()
//   const instance = axios.create({
//     baseURL: baseURL
//   })
//   store.commit('http/axios', instance)
//   store.commit('http/baseUrl', baseURL)
//   Vue.prototype.$axios = instance

  
// }

export default boot(({ app, router, store, }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  // pdf
  
  app.config.globalProperties.$pdfMake = pdfMake
  app.config.globalProperties.$pdfFonts = pdfFonts


  app.config.globalProperties.$axios = axios

  // app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$xlsx = xlsx
  
  app.config.globalProperties.$oneshopapi = oneshopapi

  app.config.globalProperties.$ulimsTSRapi = ulimsTSRapi

  app.config.globalProperties.$api = api
  app.config.globalProperties.$mailapi = mailapi
  app.config.globalProperties.$csmsURL = csmsURL

  // api.interceptors.response.use( (response) => {
  //   // Return a successful response back to the calling service
  //   return response;
  // }, (error) => {
  //   // Return any error which is not due to authentication back to the calling service
  //   if (error.response.status !== 401) {
  //     return new Promise((resolve, reject) => {
  //       reject(error);
  //     });
  //   }

  //   // Logout user if token refresh didn't work or user is disabled
  //   if (error.config.url == '/api/token/refresh' || error.response.message == 'Account is disabled.') {
      
  //     // TokenStorage.clear();
  //     localStorage.removeItem("jwt")
  //     router.push({ name: 'root' });

  //     return new Promise((resolve, reject) => {
  //       reject(error);
  //     });
  //   }

  //   // Try request again with new token
  //   // return TokenStorage.getNewToken()
  //   //   .then((token) => {

  //   //     // New request with new token
  //   //     const config = error.config;
  //   //     config.headers['Authorization'] = `Bearer ${token}`;

  //   //     return new Promise((resolve, reject) => {
  //   //       api.request(config).then(response => {
  //   //         resolve(response);
  //   //       }).catch((error) => {
  //   //         reject(error);
  //   //       })
  //   //     });

  //   //   })
  //   //   .catch((error) => {
  //   //   	Promise.reject(error);
  //   //   });
  // });
  // api.interceptors.response.use((response) => { // intercept the global error
  //   return response
  // }, function (error) {
  //   let originalRequest = error.config
  //   if (error.response.status === 401 && !originalRequest._retry) { // if the error is 401 and hasent already been retried
  //     originalRequest._retry = true // now it can be retried 
  //     return api.post('/users/token', null).then((data) => {
  //       return api(originalRequest) // retry the request that errored out
  //     }).catch((error) => {
  //       for (let i = 0; i < error.response.data.errors.length; i++) {
  //         if (error.response.data.errors[i] === 'TOKEN-EXPIRED') {
  //           // refesh the token and try again
  //           refresh()
  //           return
  //         }
  //       }
  //     })
  //   }
  //   if (error.response.status === 404 && !originalRequest._retry) {
  //     originalRequest._retry = true
  //     window.location.href = '/'
  //     return
  //   }
  //   // Do something with response error
  //   return Promise.reject(error)
  // })

  

  


  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api,oneshopapi,mailapi, ulimsTSRapi, xlsx, pdfMake,pdfFonts,csmsURL }
