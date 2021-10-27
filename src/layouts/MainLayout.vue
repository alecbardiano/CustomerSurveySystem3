<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
         <q-btn  flat round icon="menu" /> 
        <!-- <q-icon name="img: public/icons/mirdc_logo.png" inline /> -->
        <q-toolbar-title>
          Customer Survey Management System
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/Home" label="Home" />
        <q-route-tab to="/" label="Dashboard" />
        <q-route-tab to="/Survey" label="Survey" />
        <q-route-tab to="/Question" label="Questions" />
       
        <q-btn-dropdown auto-close stretch flat label="Admin">
          <q-list>
               <q-route-tab align="right" to="/Admin" label="Admin" />
               <q-route-tab align="right" to="/AdminDivision" label="Per Division" />
          </q-list>
        </q-btn-dropdown>
      </q-tabs>
    </q-header>

    <!-- <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>

    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    // const leftDrawerOpen = ref(false)

    return {
      // leftDrawerOpen,
      // toggleLeftDrawer () {
      //   leftDrawerOpen.value = !leftDrawerOpen.value
      // }
    }
  }
}
</script>