<template>
  <q-layout view="hHh lpR fFf" >

    <q-header elevated class="text-white" height-hint="98">
      <q-toolbar>
         <q-btn  flat round icon="menu" @click="toggleLeftDrawer" /> 
        <q-avatar>
          <img src="../assets/logo.png" inline>
        </q-avatar>
        <!-- <q-icon name="img: " inline /> -->
        <q-toolbar-title>
          Customer Survey Management System
        </q-toolbar-title>
        <q-space />
        <q-btn-dropdown
            flat
            color="white"
            icon="person_outline"
            :label="userLoggedin.displayName"
          >
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label><div class="row text-h6 q-mb-md">Settings</div></q-item-label>
                  <q-item-label caption>Emloyee ID:  {{userLoggedin.username}}
                    <!-- <pre>
                      {{user}}
                    </pre> -->
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-icon name="launch" color="secondary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Manage Account</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup v-ripple to="/" @click="logout">
                <q-item-section avatar>
                  <q-icon name="logout" color="secondary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
           <!-- <div v-if="loginStatus != 'failed' && userLoggedin.email != ''  " class="fontSize">
            Logged in: {{userLoggedin.displayName}}
           </div> -->
      </q-toolbar>
    </q-header>
   

  
    <q-drawer  class="bg-whitetext-black" show-if-above v-model="leftDrawerOpen" side="left" :width="200" :breakpoint="500" bordered v-if="loginStatus != 'failed' && userLoggedin.email != ''  ">
       
        <q-list padding>
          <q-item clickable exact to="/Home" class="text-black" label="Home">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>
              Home
              <!-- {{loginStatus}} loginyo -->
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/" class="text-black" label="Dashboard">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>

            <q-item-section>
              Dashboard
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/Survey" class="text-black" label="Dashboard">
            <q-item-section avatar>
              <q-icon name="add_task" />
            </q-item-section>

            <q-item-section>
              Survey
            </q-item-section>
          </q-item>

          <q-expansion-item
            expand-separator
            icon="admin_panel_settings"
            label="Admin"
          >
          <q-item :content-inset-level="1" clickable class="text-black"  align="center" to="/Admin" label="Admin" >
            <q-item-section>
                 Admin
              </q-item-section>
          </q-item>
          <q-item :content-inset-level="2" clickable  class="text-black" align="center" to="/AdminDivision" label="Per Division"  >
              <q-item-section>
                Summary Per Division
            </q-item-section>
            </q-item>
             <q-item :content-inset-level="1" clickable class="text-black"  align="center" to="/Resolutions" label="Resolutions" >
            <q-item-section>
                 Action Plans to Negative Feedbacks
              </q-item-section>
          </q-item>
          </q-expansion-item>
          <q-expansion-item
            v-show="userLoggedin.role.name == 'PMD'"
            expand-separator
            icon="library_books"
            label="Libraries"
          >
          <q-item  :content-inset-level="1" clickable class="text-black"  align="center" to="/Question" label="Questions" >
            <q-item-section avatar>
              <q-icon name="question_answer" />
              </q-item-section>
            <q-item-section>
              Questions
            </q-item-section>
          </q-item>
          <q-item :content-inset-level="2" clickable  class="text-black" align="center" to="/Divisions" label="Division"  >
          <q-item-section avatar>
              <q-icon name="group" />
              </q-item-section>
              <q-item-section>
                Divisions
            </q-item-section>
          </q-item>
          </q-expansion-item>

          
            

          <!-- <q-item clickable v-ripple to="/" @click="logout" class="text-black" label="Logout">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section>
              Logout
            </q-item-section>
          </q-item> -->

          
        </q-list>
    </q-drawer>
    <q-drawer class="bg-whitetext-black" show-if-above v-model="leftDrawerOpen" side="left" :width="200" :breakpoint="500" bordered v-else>
    
        <q-list padding>
          <q-item clickable v-ripple to="/Survey" class="text-black" label="Dashboard">
            <q-item-section avatar>
              <q-icon name="add_task" />
            </q-item-section>

            <q-item-section>
              Survey
            </q-item-section>
          </q-item>
        </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref, onMounted, computed} from 'vue'
import { useRouter } from 'vue-router';
import {  useStore } from "vuex";

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const router = useRouter();

    const store = useStore();
    // change this
    const userLoggedin = computed(() => store.getters["auth/getUserProfile"]);
    
    const loginStatus = computed(() => store.getters["auth/getLoginApiStatus"]);



    async function logout(){
      await store.dispatch('auth/logout')
      router.push({name: 'Login'})
      
    }

    onMounted( async () => {
      // console.log("mounted")
      // console.log("userLoggedin",userLoggedin)
    })

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      logout,
      userLoggedin,
      loginStatus
    }
  }
}
</script>

<style lang="scss" scoped>
// .q-expansion-item--expanded {
//     border:1px solid #000000;
//     border-color: cyan;
//     background-color: cyan;
// }
.fontSize{
  font-size: 18px;
}
</style>