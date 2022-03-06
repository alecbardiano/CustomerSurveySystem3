<template>
<div class="q-pa-md bg-white text-justify" style="margin-top: -30px">
      <h2 class="q-display-2 text-weight-bold q-mr-xl text-center"><q-icon color="primary" name="question_answer" />
        Welcome to CSMS
      </h2>
      <hr class="q-hr q-my-lg">
      <div class="q-body-1 q-mb-xl">
        <dl>
          <dt><big> <b> I. Background </b></big></dt>
          <dd class="q-mt-md">
            &emsp; {{background}}
          </dd>

        
          
<!-- 
          <dd class="q-mt-md">
            &emsp; OneShop is administered by the Technical Solution Services Section (TSSS) and is used in and processing requests for the Center’s services.  Information on the status of requested services can be tracked through the  customer portal at the MIRDC website.
          </dd> -->
        </dl>
      <dl>
        <dt><big> <b> II. The CSMS </b></big></dt>
        <dd class="q-mt-md">
          &emsp; {{csms}}
        </dd>
      </dl>
      </div>
      <center>
        <q-btn no-caps @click="$router.push('/')" color="primary" icon="touch_app" class="q-py-sm q-px-xl q-mr-sm no-shadow" label="Get Started" />
        <q-btn no-caps color="primary" outline icon="import_contacts" class="q-py-sm q-mr-sm q-px-xl" @click="readFile()" label="User Manual" />
        <q-btn no-caps color="primary" outline icon="assignment_turned_in" class="q-py-sm q-px-xl" label="Policy Manual" />
      </center>
    </div>
    <!-- <div class="q-pa-md">
        <q-carousel
      v-model="slide"
      swipeable
      animated
      :padding="padding"
      :vertical="vertical"
      :arrows="arrows"
      :navigation="navigation"
      :navigation-position="navPos"
      height="500px"
      class="bg-primary text-white rounded-borders"
    >
      <q-carousel-slide name="style" class="column no-wrap flex-center">
        <q-icon name="account_circle" size="56px" />
        <div class="q-mt-md text-center">
          <div class="headerclass">
            Background
          </div>
          {{background}}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="tv" class="column no-wrap flex-center">
        <div class="fixed-top">
            {{title}}
        </div>
        <q-icon name="text_snippet" size="56px" />
        <div class="q-mt-md text-center">
          <div class="headerclass">
            CSM System
          </div>
          {{csms}}
        </div>
      </q-carousel-slide>
        <template v-slot:navigation-icon="{ active, btnProps, onClick }">
            <q-btn v-if="active" size="lg" icon="home" color="yellow" flat round dense @click="onClick" />
            <q-btn v-else size="sm" :icon="btnProps.icon" color="white" flat round dense @click="onClick" />
      </template>
    </q-carousel>
    </div> -->
</template>

<script>
import { defineComponent,ref } from 'vue'
import { openURL,exportFile } from 'quasar'

export default defineComponent({
  name: 'Home',
  setup () {
    const navPos = ref('bottom')
    const vertical = ref(false)
    const title = "CSM System"

    function readFile() {
      window.open('/CSMS_UserManual.pdf', '_blank') //to open in new tab
    }
  return {
    padding: ref(true),
    vertical,
    arrows: ref(true),
    navigation: ref(true),

    navPos,
    title,

    openURL,
    readFile,
    slide: ref('style'),
    background: `The Planning and Management Division thoroughly analyzes the feedback of customers for the services (Technical Consultancy, Research and Development, Resource and Facility Sharing, Technology Transfer and Commercialization and Facility Rental) rendered by the different divisions of the Center and manually creates the quarterly report based on the raw data compiled by PMD through the procedure called CCSS (Citizen/Client Satisfaction Survey).
        The objective is to provide guidelines for monitoring and measuring customers’ perception/satisfaction on MIRDC’s products/services delivered/rendered to determine if expectations are met and the performance criteria needing improvement and analyze the customer’s satisfaction with MIRDC services and to identify opportunities for improvement through a well-designed client satisfaction feedback mechanism.
        There are two types of records for this procedure:
        Accomplished Client/Customer Satisfaction Survey Forms - collects the customer’s feedback for the service rendered by the Center.
        Citizen/Client Satisfaction Measurement Report - A quarterly report of the feedbacks of all the customers for that quarter.`,
    csms: 'CSSM System is a web-based information system that aims to facilitate data collection, storage, analysis, and reporting of the evaluations given by the customers that availed the services offered by DOST-MIRDC. It has a dashboard that provides an overall summary of the evaluations and generates a year’s quarterly report. The system aims to automate the data gathering of feedbacks from customers and quarterly report generation making it easier for PMD to track and easily analyze the data.'
    }
  }
  
})
</script>
<style scoped>

.headerclass {
  font-size: 50px;
}
</style>