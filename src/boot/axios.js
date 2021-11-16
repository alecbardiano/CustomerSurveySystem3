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
const api = axios.create({ baseURL: 'http://10.10.120.19:1337' })
const oneshopapi = axios.create({ baseURL: 'http://10.10.120.32:3030/' })
const ulimsTSRapi = axios.create({baseURL: 'http://10.10.120.5/ulims/lab/request'})

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  // pdf
  app.config.globalProperties.$pdfMake = pdfMake
  app.config.globalProperties.$pdfFonts = pdfFonts


  app.config.globalProperties.$axios = axios

  // app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api

  app.config.globalProperties.$xlsx = xlsx
  
  app.config.globalProperties.$oneshopapi = oneshopapi

  app.config.globalProperties.$ulimsTSRapi = ulimsTSRapi

  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api,oneshopapi, ulimsTSRapi, xlsx, pdfMake,pdfFonts }
