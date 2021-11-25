<template>
  <q-layout class="bg-grey-2">
    <q-footer bordered>
      <q-toolbar class="toolbar">
        <q-toolbar-title class="text-body1 text-center">
          © 2021 CSMS, MIRDC-PMD
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <q-page class="flex flex-center">
        <q-card bordered class="my-login no-shadow q-pa-lg">
        <q-form
            @submit="onSubmit"  
            class="q-gutter-md"
            ref="loginRefForm"
        >
          <q-item class="q-mt-md">
            <q-item-section avatar>
              <img style="height: 60px; width: 60px;" src="~assets/logo.png">
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h5">Sign in</q-item-label>
              <q-item-label class="text-body1">
                CSMS
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-card-section class="q-mt-sm">
              
                <q-input ref="username" class="q-mb-sm" v-model="usernameModel" label="Username" :rules="[val => !!val || 'Username is required']">
                <template v-slot:prepend>
                    <q-icon name="person" />
                </template>
                </q-input>
                <q-input ref="password" class="q-mb-sm" :type="isPwd ? 'password' : 'text'" v-model="passwordModel" label="Password" :rules="[val => !!val || 'Password is required']">
                <template v-slot:prepend>
                    <q-icon name="lock" />
                </template>
                <template v-slot:append v-if="passwordModel && passwordModel.length > 0">
                    <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                    />
                </template>
                </q-input>
             
          </q-card-section>

          <q-card-actions class="justify">
            <!-- <q-btn color="primary" @click="manageAccount" no-caps flat>Manage Account</q-btn> -->
            <q-btn @click="onSubmit" color="primary">Login</q-btn>
          </q-card-actions>
        </q-form>
        </q-card>
      </q-page>
    </q-page-container>

  </q-layout>
</template>


<script>
import { reactive, defineComponent, ref, onMounted, computed , watch} from 'vue'
import { useRouter } from 'vue-router';
import {  useStore } from "vuex";

import { useQuasar} from 'quasar'
export default defineComponent({
  name: 'Login',
  
  setup (){
    const dataValues = ref([30, 40, 60, 70, 5]);
    const usernameModel =  ref("")
    const passwordModel =  ref("")
    const isLoading = ref(true)
    const isPwd =  ref(true)
    const loginRefForm = ref(null)
    
    const store = useStore();
    const $q = useQuasar()
    const router = useRouter();

    const keymap = computed(() => {
      return {
        enter: {
          keydown: this.login
        }
      }
    })
    const getterAuth = computed(() => store.getters["auth/getLoginApiStatus"]);

    async function setterAuth (payload) {
        console.log(store)
        await store.dispatch('auth/loginApi', payload)
    }

    // const getterAuth = computed(() => {
    //     return mapGetters("auth", {
    //         getLoginApiStatus: "getLoginApiStatus"
    //     })
    // })

    // async function setterAuth (){
    //     mapActions("auth", {
    //         actionLoginApi: "loginApi"
    //     })
    // }
    

    function onSubmit(){
        loginRefForm.value.validate().then(success => {
            if(success){
                loginToSSOClient()
            }
        })
    }

    // function manageAccount () {
    //   window.open('http://10.10.120.32:3536/#/', '', 'width=1000,height=600')
    // }

    async function loginToSSOClient () {
      isLoading.value = true
      
    //   usernameModel.value.validate()
    //   passwordModel.value.validate()
    const payload = {
        identifier: usernameModel.value,
        password: passwordModel.value,
    };
    await setterAuth(payload);
    if(getterAuth.value == "success"){
        console.log("getterAuth",getterAuth.value)
        router.push({name: 'Dashboard'})
      }else{
        alert("failed")
      }
    }

    
    return{
        // manageAccount,
        usernameModel,
        passwordModel,
        isLoading,
        isPwd,
        keymap,
        loginToSSOClient,
        onSubmit,
        loginRefForm
    }
  }
 
})
// export default {
//   name: 'Login',
//   data () {
//     return {
//       username: null,
//       password: null,
//       isLoading: false,
//       isPwd: true
//     }
//   },
//   computed: {
//     keymap () {
//       return {
//         enter: {
//           keydown: this.login
//         }
//       }
//     }
//   },
//   methods: {
//     login () {
//       this.isLoading = true
//       this.$refs.username.validate()
//       this.$refs.password.validate()
//       this.$ssoAuthenticate(`${this.username}@mail.com`, this.password).then((user) => {
//         this.$q.notify({
//           position: 'top',
//           color: 'positive',
//           timeout: 2000,
//           icon: 'check',
//           message: 'You have successfully logged in.'
//         })
//         this.$router.push('/')
//         this.isLoading = false
//       }).catch(e => {
//         this.$q.notify({
//           position: 'top',
//           color: 'negative',
//           timeout: 2000,
//           icon: 'error',
//           message: 'Invalid credentials or Check your connection!'
//         })
//         this.isLoading = false
//       })
//     },
    
//   }
// }
</script>



<style lang="sass" scoped>
</style>
