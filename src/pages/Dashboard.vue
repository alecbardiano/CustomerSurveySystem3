<template>
  <div class="q-pa-md">
    <!-- @update:model-value="build()"  -->
    <q-select   outlined v-model="yearTsr" style="max-width: 200px" option-label="text" :options="yearOptions" width="30px" label="Year" />
  </div>

   

  <div class="q-pa-md">
    
    <div class="layout-padding ">
      <div class="flex wrap gutter">
        <div class="width-1of3 sm-auto">
          <card-dashboard-feedback-count
            title="Total TSRs YTD"
            backgroundColor="green"
            icon-name="local_post_office"
            :total="totalTsrs">
          </card-dashboard-feedback-count>
        </div>
        <div class="width-1of3 sm-auto">
          <card-dashboard-feedback-count  @click="callCardData(1)" title="Negative Feedback YTD" backgroundColor="red" :total="totalNegative" > </card-dashboard-feedback-count>
         
        </div>
        <div class="width-1of3 sm-auto">
          <card-dashboard-feedback-count
            @click="callCardData(2)" 
            title="Positive Feedback YTD"
            backgroundColor="blue"
            :total="totalPositive">
          </card-dashboard-feedback-count>
        </div>

        <!-- <div class="width-1of3 sm-auto">
          <card-dashboard-feedback-count
            @click="callCardData(2)" 
            title="No Feedback"
            backgroundColor="blue"
            :total="totalNoFeedback">
          </card-dashboard-feedback-count>
        </div> -->
      </div>
    </div>
  
  </div>
  <div class="q-pa-md">
    <div class="layout-padding ">
      <div class="flex wrap gutter">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card">
            <q-card-section>
              <doughnut-chart :labels="chartDataModelLabel" :label="'Overall Performance of the Center Based on CSS Responses'" :chartData="chartDataModelData" />
            </q-card-section>
          </q-card>
        </div>
         <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card">
              <q-card-section>
                <bar-chart :labels="chartDataModelCustomersLabel" :label="'Total Number of Customers and CSM Respondents Per Month'" :chartData="chartDataModelCustomersData" />
              </q-card-section>
          </q-card>
        </div>
        <!-- <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card">
            <q-card-section>
              <bar-chart :labels="chartDataModelCustomersLabel" :label="'Number of Customers and CSM Respondents Per Service Area'" :chartData="chartDataModelCustomersData" />
            </q-card-section>
          </q-card>
        </div> -->
        
        
      </div>
    </div>
  </div>
  <div class="q-pa-md">
    <q-card>
      <line-chart :labelkeys="lineChartLabel" :labels="chartDataModelCustomersLabel" :label="'Number of Customers and CSM Respondents Per Service Area'" :chartData="chartDataModelNumberPerServiceArea" />
    </q-card>
  </div> 


  <!-- <div class="q-pa-md">
    <q-table
      :rows="tableData"
      :columns="columns2"
      row-key="col1"
      separator="cell"
    >
      <template v-slot:header="props">
          <q-tr>
            <q-th colspan="2" class="bg-teal-9 text-white">col type1</q-th>
            <q-th colspan="1" class="bg-deep-orange-9 text-white">col type2</q-th>
            <q-th colspan="3" class="bg-light-blue-9 text-white">col type3</q-th>
          </q-tr>
          <q-tr>
            <q-th key="col1" :props="props" class="bg-teal-9 text-white">col1</q-th>
            <q-th key="col2" :props="props" class="bg-deep-orange-9 text-white">col2</q-th>
            <q-th key="col1" :props="props" class="bg-deep-orange-9 text-white">col3</q-th>
            <q-th key="col4" :props="props" class="bg-light-blue-9 text-white">col4</q-th>
            <q-th key="col5" :props="props" class="bg-light-blue-9 text-white">col5</q-th>
            <q-th key="col6" :props="props" class="bg-light-blue-9 text-white">col6</q-th>
          </q-tr>
      </template>
      <template v-slot:body="props">
         {{props}} 
        <q-td v-for="row in props.row" v-bind:key="row">
          {{ row }}
        </q-td>
      </template>
    </q-table>
  </div> -->

  <!-- <div class="q-pa-md">
    <div class="row">
      <q-form ref="dateform">
        <div class="row inline">
          <q-input outlined filled mask="date" v-model="beforeDate" lazy-rules :rules="[val => val <= afterDate || 'Field should be earlier than after date']" placeholder="mm/dd/yy" hint="Start Date" >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="beforeDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input> 
           :rules="[val => !!val || 'Field is required', val => !isNaN(val) || 'Field should be a number']"
          <q-input outlined filled mask="date" v-model="afterDate" lazy-rules :rules="[val => val >= beforeDate || 'Field should be later than before date']"   placeholder="mm/dd/yy" hint="End Date" style=" margin-left: 40px">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="afterDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-form>
    </div>
  </div> -->

  

    
    
  <div class="q-pa-md">
   <q-table
      :rows="rowsOverallPerformance"
      class="my-sticky-header-table"
      :columns="colsOverallPerformance"
      row-key="col1"
      separator="cell"
      title="Overall Performance of the Center Based on CSS Responses"
      :rows-per-page-options="[0]"
    >
    
     <template  v-slot:header>
       <!-- {{props}} -->
      <!-- <div  -->
          <q-tr>
            <q-th key="serviceArea" style="width: 250px" class="bg-light-blue-9 black-white"></q-th>
            <q-th key="percentage" style="width: 100px" class="bg-light-blue-9 black-white"></q-th>
            <q-th v-for="(col,key) in divisionsAndSections" v-bind:key="col.name" v-bind:colspan="col.length"> {{key}}</q-th>
          </q-tr>
          <q-tr>
            <q-th  v-for="col in colsOverallPerformance"  v-bind:key="col.name" class="bg-light-blue-9 black-white" > {{col.name}}</q-th>
          </q-tr>
          
          
      <!-- </div> -->
        
    </template>
    <template v-slot:bottom-row>
        <q-tr>
          <q-td>Total:</q-td>
          <q-td style="text-align: center" v-bind:key="column.key" v-for="column in totalPerField">
              <p v-if="column.value != 0  ">{{ column.value }}</p>
            </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>

  <div class="q-pa-md">

    <q-table
      :rows="rowsnumberOfCustomers"
      :columns="colsnumberOfCustomers"
      class="my-sticky-header-table"
      row-key="col1"
      title="Number of Customers and CSM Respondents Per Service Area"
      separator="cell"
      :rows-per-page-options="[0]"
    >
    <template  v-slot:header>
       <!-- {{props}} -->
      <!-- <div  -->
        <q-tr>
          <q-th key="Month" style="width: 250px" class="primary"></q-th>
          <q-th v-for="(col,key) in divisionsAndSections" v-bind:key="col.name" v-bind:colspan="col.length"> {{key}}</q-th>
          <q-th key="Total" style="width: 250px" class="primary"></q-th>
        </q-tr>
        <q-tr>
          <q-th  v-for="col in colsnumberOfCustomers"  v-bind:key="col.name" class="bg-light-blue-9 black-white" > {{col.name}}</q-th>
          
        </q-tr>
        
        
    <!-- </div> -->
      
  </template>

      <template v-slot:bottom-row>
        <q-tr>
          
          <q-td>
            Total Actual Respondents
          </q-td>
          <q-td style="text-align: center" v-bind:key="column.key" v-for="(column) in totalActualRespondents">
              {{column.value}}
              <!-- {{ column[key] }}  -->
               <!-- <p v-if="column.value != 0  "></p>  -->
          </q-td>
        </q-tr>
        <q-tr>
          <q-td >
            Total Actual No. of Customers Served
          </q-td>
          <q-td >
             {{}}
          </q-td>
        </q-tr>
        <q-tr>
          <q-td >
             Target No. of Respondents
          </q-td>
          <q-td >
             {{}}
          </q-td>
        </q-tr>
        <q-tr>
          <q-td >
             Percentage
          </q-td>
          <q-td>
             {{}}
          </q-td>
        </q-tr>

      </template>
        
    </q-table>

      <q-dialog v-model="cardModal" :maximized="maximizedToggle"
  transition-show="slide-up"
  transition-hide="slide-down">
    <q-card  >
            <q-card-section class="bg-primary text-white">
              <div class="text-h5 inline">
                <span></span>
                <div class="fixed-right">
                <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
                  <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
                </q-btn>
                <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
                  <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
                </q-btn>
                <q-btn dense flat icon="close" v-close-popup>
                  <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
                </div>
              </div>
            </q-card-section>

            <q-card-section class="row items-left">
               <q-table
                  v-if="cardData"
                  class="my-sticky-header-table"
                  :title="cardTitle"
                  :rows="rows"
                  :columns="cardDataCols"
                  v-model:pagination="pagination"
                  @request="onRequestCard"
                  binary-state-sort
                  separator="cell"
                >
                 <template v-slot:top-right>
                  <q-input class="placeholderClass" borderless dense debounce="300" v-model="filter" placeholder="Search">
                    <template v-slot:append>
                      <q-icon class="searchClass" name="search" />
                    </template>
                  </q-input>
                </template>

               </q-table>
                <!-- <q-icon name="check" color="primary" text-color="white" /> @row-click="onRowClick" -->
                <!-- modal view answer -->
            <!-- <viewsurveyanswer v-model="tsrData" :cols="cols"></viewsurveyanswer> -->
            </q-card-section>

            <!-- <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat label="Submit" @click="onSubmit" color="primary" v-close-popup />
            </q-card-actions> -->
          </q-card>
  </q-dialog>

  
  </div>

</template>


<script type="text/javascript">

  import { defineComponent, ref, reactive, computed, onMounted, watch, onBeforeUnmount } from 'vue'
  import { getDivList, countPositiveFeedback, countNegativeFeedback, totalTsrsCount , totalTsrsCountByYear,getTsrYear, allOverAllRatingsFromApi, getNegativeFeedbackData,getPositiveFeedbackData,countNoFeedback, getNoAnswerFeedbackData } from 'src/axioshelper.js'
  import CardDashboardFeedbackCount from '../components/CardDashboardFeedbackCount.vue'
  import { Chart, registerables } from 'chart.js'
  import groupBy from 'lodash'
  import moment from 'moment';
  import {  useStore } from "vuex";
  import { exportFile, useQuasar} from 'quasar'

  // import PieChart from '../components/PieChart.vue'
  import DoughnutChart from '../components/DoughnutChart.vue'
  import BarChart from '../components/BarChart.vue'
  import LineChart from '../components/LineChart.vue'



  // import { BarChart, useBarChart } from 'vue-chart-3'


  Chart.register(...registerables);
  
  export default {
    name: 'Dashboard',
    components: {
      CardDashboardFeedbackCount,
      // PieChart,
      DoughnutChart,
      BarChart,
      LineChart
    },
    
    setup() {
      const dataValues = ref([30, 40, 60, 70, 5]);
      const totalNegative = ref(0);
      const totalPositive = ref(0);
      const totalNoFeedback = ref(0);
      const totalTsrs =  ref(0);
      const tsrs = ref([])
      const totalAnswerOverall = ref([])
      const totalNoResponse = ref(0)

      const currentYear =  ref(new Date().getFullYear())

      const $q = useQuasar()

      const pagination = ref({
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 5
      })


      
      const chartDataModelLabel = ref([]) // overall
      const chartDataModelCustomersLabel = ref([])

      const chartDataModelData = ref([])
      const chartDataModelCustomersData = ref([])
      const chartDataModelNumberPerServiceArea = ref([])
      
      const lineChartLabel = ref([])

      // cardData
      const cardData = ref([])
      const cardDataCols = ref([])
      const cardTitle = ref('')


      let rows = ref([])




      // const chartOptions =  ref({
      //   hoverBorderWidth: 20
      // })
      
      const divisions = ref([])
      const divisionsAndSections = ref([])
      const services = ref([])

      const rowsOverallPerformance = ref([])
      const rowsnumberOfCustomers = ref([])  
      const colsOverallPerformance = ref([])
      const colsnumberOfCustomers = ref([])

      const yearTsr = ref()
      
      const columns = ref([])

      const store = useStore();

      const getterUser = computed(() => store.getters["auth/getUserProfile"]);



    //   fullName: function () {
    //   return this.firstName + ' ' + this.lastName
    // }

      // bottom row overall performance
      const totalPerField = ref([])

      // const yearOptions = ref([])

      // bottom row customer
      const totalActualRespondents = ref([])

      const showTextCard = ref(false)

      let timer

      // card modal

      const maximizedToggle = ref(true)
      const cardModal = ref(false)

      const  yearOptions = computed(() =>{
        let earliestYear = 2000;
        let yearArr = []
        let iterate = currentYear.value
        while (iterate >= earliestYear) {      
          yearArr.push(iterate)     
          iterate -= 1;    
        }
        return yearArr
      })

      watch(yearTsr, (newValue, oldValue) => {

        showLoading()

        updateTables()
        LoadFeedbackCounts(newValue)
        
        
      })

      onBeforeUnmount(() => {
        if (timer !== void 0) {
          clearTimeout(timer)
          $q.loading.hide()
        }
      })

      function showLoading () {
        $q.loading.show({
          message: 'Please wait for data to be loaded..',
          boxClass: 'bg-grey-2 text-grey-9',
          spinnerColor: 'primary'
        })
      }

      // function()

      async function loadCharts(){
        
        let dataArr = []
        let custArr = []
        let custArrServiceArea = []
        // if(chartDataModelData.value.length > 0){

        if(chartDataModelLabel.value.length > 0 || chartDataModelCustomersLabel.value.length > 0){
          chartDataModelLabel.value = []
          chartDataModelCustomersLabel.value = []
        }
          
        // }else{
        rowsOverallPerformance.value.forEach(element => {
        // console.log("11")
          chartDataModelLabel.value.push(element.servicearea)
          dataArr.push(element.countOverall)
          
        });
        let keys = []
        rowsnumberOfCustomers.value.forEach(element => {
          if(keys.length == 0){
            keys = Object.keys(element)
          }
          chartDataModelCustomersLabel.value.push(element.month)
          custArr.push(element.total)
          
        });
        keys.shift()
        keys.shift()
        keys.shift()
        console.log("mouthfu;", keys)
        keys.forEach(element => {
          let arr = rowsnumberOfCustomers.value.map(a =>
            a[element] 
          )
          custArrServiceArea.push(arr)
          lineChartLabel.value.push(element)
          console.log("custArrServiceArea",custArrServiceArea)
        });
        
        
        chartDataModelData.value = dataArr

        // rowsnumberOfCustomers.value.forEach(element => {
        //   console.log("rowsnumberOfCustomers", rowsnumberOfCustomers.value)
        //   chartDataModelCustomersLabel.value.push(element.month)
        //   custArr.push(element.total)
          
        // });
        chartDataModelCustomersData.value = custArr
        chartDataModelNumberPerServiceArea.value = custArrServiceArea
        


        


      }



      async function LoadFeedbackCounts(year){
        if (year){
          totalTsrs.value = await totalTsrsCountByYear(year)
        }else{
          totalTsrs.value = await totalTsrsCountByYear("")
        }
        

        totalNegative.value = await countNegativeFeedback(year)
        totalPositive.value = await countPositiveFeedback(year)
        totalNoFeedback.value = await countNoFeedback(year)
        

      }

    async function updateTables(){
      // reset arrays
      totalActualRespondents.value = []
      
      totalPerField.value = []

      const mainCounts = {
          5: 0, 
          4: 0,
          3: 0, 
          2: 0,
          1: 0,
          0: 0,
        };

      if (yearTsr.value){
        tsrs.value = await getTsrYear(yearTsr.value)
        totalAnswerOverall.value =  await allOverAllRatingsFromApi("","",yearTsr.value)
      }else{
        // tsrs.value = await getTsrYear(yearTsr.value)
        tsrs.value = await getTsrYear(currentYear.value)
        totalAnswerOverall.value = await allOverAllRatingsFromApi("","",currentYear.value)
        totalAnswerOverall.value = totalAnswerOverall.value.filter(function (el) {
          return el.tsr != null;
        });
      }
      // total overall 
      // key is the division
      // element is the service
         for (var key in divisionsAndSections.value) {
          for (const element of divisionsAndSections.value[key]) {
            let stringColField = element.toString().concat(key.toString())
            // initialize row customers table
            // let tot ={value: 0, total:0}
            // tot[stringColField] = 0
            // totalActualRespondents.value.push(tot)
            // filter all answer overall specific to tsr
            let sample = totalAnswerOverall.value.filter((elementTSR) => {
            if(elementTSR.tsr){
              // console.log("elementTSR", elementTSR)
              if(elementTSR.tsr.division == key && elementTSR.tsr.service == element){
                return elementTSR
              }
            }
          })
          
          // count per service 
          const counts = {
            5: 0, 
            4: 0,
            3: 0, 
            2: 0,
            1: 0,
            0: 0
          };
          for (const element of sample) {
            
            let num = element.value
            if (num == 1){
              counts[1] +=1
              mainCounts[1] +=1
            }else if ( num == 2){
              counts[2] +=1
              mainCounts[2] +=1
            }else if(num ==3 ){
              counts[3] +=1
              mainCounts[3] +=1
            }else if(num == 4){
              counts[4] +=1
              mainCounts[4] +=1
            }else if(num == 5){
              counts[5] +=1
              mainCounts[5] +=1
            }
            else{
              counts[0] += 1
              mainCounts[0] +=1
            }
          };
          

          // average per overallperformance value
          for(let [key2, value] of Object.entries(counts)){
            // total vertical per service
            rowsOverallPerformance.value.forEach(function (arrayItem) {
              if(key2 == arrayItem.id){
                value = (value/ sample.length) * 100
                if(isNaN(value)){
                  value = '0%'
                }else{
                  value = value.toFixed(2).toString() + '%'
                }
                
                arrayItem[stringColField] = value
              }
              
              });
            }
          }
        }

         // Number of customers Row generation
        
        // group by months
        var result = _(tsrs.value)
        .groupBy(v => moment(v.submittedAt).format('MMMM'))
        .value();
        let index = 0
        let resultLength = result.length
        console.log("results", result)

          for (var key in result) {
              let totalRespondentsPerMonth = 0
              if (result.hasOwnProperty(key)) {
                let row = {}
                let totalPerMonth = 0
                row['month'] = key
                console.log("keys 777", key)
                
                
                let temp = result[key]
                // console.log("temp", temp)
                for (var key2 in divisionsAndSections.value) {
                  
                  for (const element of divisionsAndSections.value[key2]) {
                    let stringColField = element.toString().concat(key2.toString())
                    // filter all data
                    let sample = temp.filter((elementTSR) => {
                    if(elementTSR.tsrNo){
                      if(elementTSR.division == key2 && elementTSR.service == element){
                        // console.log("pasok oh loko" )
                        return elementTSR
                      }
                    }
                    
                    })
                    let x = rowsnumberOfCustomers.value.find(x => x.month === key);
                    x[stringColField] = sample.length
                    totalPerMonth += sample.length
                  }
                }
                let rowMonth = rowsnumberOfCustomers.value.find(x => x.month === key);
                console.log("rowmonth error", rowMonth)
                rowMonth['total'] = totalPerMonth
                

                
              }
          }

        // total Respondents per month
          let totalRespondents = 0
          for (var key2 in divisionsAndSections.value) {
                  
            for (const element of divisionsAndSections.value[key2]) {
              let stringColField = element.toString().concat(key2.toString())
              let resultTotal = rowsnumberOfCustomers.value.map(a => {
                if(isNaN(a[stringColField])){
                    a[stringColField] = 0
                }
                return a[stringColField]
              })
              console.log("res", resultTotal)
              let atotal = resultTotal.reduce((a, b) => a + b, 0)
              
              // totalActualRespondents.value[stringColField] = atotal
              let tempObj = {}
              tempObj['value'] = atotal
              totalRespondents += atotal
              totalActualRespondents.value.push(tempObj)
            }
          }
          // total respondents push to last array
          let total = {}
          total['value'] = totalRespondents
          totalActualRespondents.value.push(total)
          
          
        


        // total row add percentage field
        let totalPercentRow = 0
        
        rowsOverallPerformance.value.forEach(row => {
          let res = (parseFloat(mainCounts[row.id])/ totalAnswerOverall.value.length * 100)
          totalPercentRow +=res
          // console.log("mainco", mainCounts[row.id])
          // console.log("rowid", row.id)
          // console.log("res", res)
          // chartDataModelData.push(mainCounts[row.id])
          row['countOverall'] = mainCounts[row.id]
          row['percentage'] = res.toFixed(2).toString() + '%'
          
          
        });
        //total
        let tempObj = {}
        tempObj['value'] = parseFloat(totalPercentRow).toFixed(2).toString() + '%'
        totalPerField.value.push(tempObj)
        console.log("totalPerField",totalPerField.value)

        for (var key in divisionsAndSections.value) {
            for (const element of divisionsAndSections.value[key]) {
            let tempSecDivObj = {}
            let service = element.toString().concat(key.toString()) //sectiondivision
            let a = rowsOverallPerformance.value.map(a => a[service]);
            let sum = a.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
            sum = Math.floor(sum)
            tempSecDivObj['value'] = sum.toFixed(2).toString() + '%'
            totalPerField.value.push(tempSecDivObj)
            
          }
        }

          timer = void 0
          $q.loading.hide()

          loadCharts()
          

          
      }

      function buildTable(){
        buildColumns()
        buildRowsCustomers()
        buildRowsOverallPerformance()
        
        totalNoResponse.value = totalTsrs.value - totalAnswerOverall.value.length

        // await updateTables()

     

        // [ { "dimension": [], "value": 0 }, { "scoreservice": [], "value": 3.18 }, { "ATD": [], "value": 3.16 }, { "PD": [], "value": 3.22 } ]
        
      }
      function buildRowsOverallPerformance (){

        // performance row generation
        rowsOverallPerformance.value.push({servicearea: "5 - Outstanding" , id: 5,})
        rowsOverallPerformance.value.push({servicearea: "4 - Very Satisfactory" ,  id: 4 })
        rowsOverallPerformance.value.push({servicearea: "3 - Satisfactory", id: 3})
        rowsOverallPerformance.value.push({servicearea: "2 - Fair & 1 - Poor", id: 2})
        rowsOverallPerformance.value.push({servicearea: "No Response", id: 0})
        
  
      
        }

        function buildRowsCustomers (){

        // performance row generation
          rowsnumberOfCustomers.value.push({month: "January" , id: 1, total: 0})
          rowsnumberOfCustomers.value.push({month: "February" ,  id: 2 ,total: 0})
          rowsnumberOfCustomers.value.push({month: "March", id: 3,total: 0})
          rowsnumberOfCustomers.value.push({month: "April", id: 4,total: 0})
          rowsnumberOfCustomers.value.push({month: "May", id: 5,total: 0})
          rowsnumberOfCustomers.value.push({month: "June" , id: 6,total: 0})
          rowsnumberOfCustomers.value.push({month: "July" ,  id: 7,total: 0 })
          rowsnumberOfCustomers.value.push({month: "August", id: 8,total: 0})
          rowsnumberOfCustomers.value.push({month: "September", id: 9,total: 0})
          rowsnumberOfCustomers.value.push({month: "October", id: 10,total: 0})
          rowsnumberOfCustomers.value.push({month: "November" , id: 11,total: 0})
          rowsnumberOfCustomers.value.push({month: "December" ,  id: 12,total: 0 })
          // rowsnumberOfCustomers.value.push({month: "Total Actual Respondents" ,  id: 13,total: 0 })
          
  
      
        }

        function filterMyArr (myArr, condition) {
          return myArr.map(element => element[condition])
        }

      // remove duplicate months

      function buildColumns(){

        // colsOverallPerformance tables
        colsOverallPerformance.value.push( {
            name: 'Service Area',
            align: 'left',
            label: 'Service Area/Rating',
            field: 'servicearea',
            sortable: true
          })
        colsOverallPerformance.value.push( {
          name: 'Percentage (Overall)',
          align: 'center',
          label: 'Percentage',
          field: 'percentage',
          sortable: true
        })
        colsnumberOfCustomers.value.push({
          name: 'Month',
          align: 'left',
          label: 'Month',
          field: 'month',
          sortable: true
        })
        for (var key in divisionsAndSections.value) {
            for (const element of divisionsAndSections.value[key]) {
          let stringColField = element.toString().concat(key.toString())
          let col = { name: element, align: 'center', label: element, field: stringColField, sortable: true }
          // columns for overallperformance
          colsOverallPerformance.value.push(col)
          // columns for number of customers
          colsnumberOfCustomers.value.push(col)
          }
        }

        colsnumberOfCustomers.value.push({
          name: 'Total',
          align: 'center',
          label: 'Total',
          field: 'total',
          sortable: true
        })

      }


      async function callCardData(mode){

        // build columns card data
      

        if(cardDataCols.value.length == 0){

          cardDataCols.value.push( {
              name: 'tsrNo',
              align: 'left',
              label: 'TSR Number',
              field: 'tsrNo'
            })
          cardDataCols.value.push( {
              name: 'division',
              align: 'left',
              label: 'Division',
              field: 'division'
            })
          cardDataCols.value.push( {
              name: 'service',
              align: 'left',
              label: 'Service',
              field: 'service'
            })
          cardDataCols.value.push( {
              name: 'question',
              align: 'left',
              label: 'Question',
              field: 'question'
            })
          cardDataCols.value.push( {
              name: 'value',
              align: 'left',
              label: 'Value',
              field: 'value'
          })
          cardDataCols.value.push( {
              name: 'date',
              align: 'left',
              label: 'Submitted Date',
              field: 'submittedAt'
            })
          }
        

        // if(mode == 1){
        //   cardData.value = await getNegativeFeedbackData(yearTsr.value)
        //   cardTitle.value = "Negative Feedback YTD"
          
        // } 
        // else if (mode == 2){
        //   cardData.value = await getPositiveFeedbackData(yearTsr.value)
        //   cardTitle.value = "Positive Feedback YTD"
        // }else{
        //   cardData.value = await getNoAnswerFeedbackData(yearTsr.value)
        //   cardTitle.value = "No Feedback YTD"
        // }

        await onRequestCard({
          pagination: pagination.value,
          filter: undefined
        }, mode)

        
        
        cardModal.value = true

        
      }

      async function fetchFromServer (startRow, count, filter, sortBy, descending, mode) {
       
        let rows = []
        if (mode == 1) {
          rows = await getNegativeFeedbackData(startRow,count,yearTsr.value)
          cardTitle.value = "Negative Feedback YTD"
        }else{
          rows = await getPositiveFeedbackData(startRow,count,yearTsr.value)
          cardTitle.value = "Positive Feedback YTD"
        }
        
        
      return rows
      
    }

      async function onRequestCard(props,mode){

      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter

      // loading.value = true
      // overallLoading.value = true

      // check whether there is a given date
      // if(beforeDate.value && afterDate.value){
      //   // beforeDate.value =  dateTime(beforeDate.value)
      //   // afterDate.value =  dateTime(afterDate.value)
      //   totalTsrsCount.value = await totalTsrsCount(beforeDate.value, afterDate.value,filter)
        
      // }else{
      //   let currYear = new Date().getFullYear()
      //   totalTsrsCount.value  = await totalTsrsCountByYear(currYear,filter)
      // }

      //
      // if(rowsOverall.value.length ==0){
      //   // rows overall generate data
      //   for (let i=0; i<orderByPositionQuestions.value.length ; i++){
      //   let row = {
      //     dimension: orderByPositionQuestions.value[i].description,
      //     id: orderByPositionQuestions.value[i].id
      //   }
      //     if(orderByPositionQuestions.value[i].question_type.id == 2){
      //       rowsOverall.value.push(row)
      //     }
        
      //  }
       
      // }
      let totalCount 
      if(mode == 1){
        totalCount = totalNegative.value
      }else{
        totalCount = totalPositive.value
      }
      


      // loading.value = true

      // emulate server
       

       // pagination count
        pagination.value.rowsNumber = totalCount
        // get all rows if "All" (0) is selected
        
        

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage

        const fetchCount = rowsPerPage === 0 ? totalCount : rowsPerPage
        
        
        const returnedData = await fetchFromServer(startRow, fetchCount, filter, sortBy, descending,mode) 
        console.log("returnedData",returnedData)
        // fetch data from "server"
        
        // clear out existing data and add new
        
        rows.value.splice(0, rows.value.length, ...returnedData)
        rows.value  = rows.value.map(card => (
          { 
            value: card.value, 
            tsrNo: card.tsr.tsrNo,
            division: card.tsr.division,
            service: card.tsr.service,
            submittedAt: moment(card.tsr.submittedAt).format('YYYY-MM-DD'),
            question: card.question.description
          }
          ));


        // don't forget to update local pagination object
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending

        // ...and turn of loading indicator
      }

      
      onMounted( async () => {
        // call functions upon start up here
        showLoading()
        divisionsAndSections.value = await getDivList()
        divisions.value = Object.keys(divisionsAndSections.value)

        // 
        
        LoadFeedbackCounts(currentYear.value)
        
        // build tables
        await buildTable()

        await updateTables()

        // yearTsr.value = currentYear.value

        

        

      })


      return {
        totalNegative, 
        totalPositive,
        totalNoFeedback,
        totalTsrs, 
        CardDashboardFeedbackCount, 
        columns,
        divisions,
        divisionsAndSections,
        services,
        rowsOverallPerformance,
        rowsnumberOfCustomers,
        colsOverallPerformance,
        colsnumberOfCustomers,
        totalActualRespondents,
        totalPerField,
        yearOptions,
        yearTsr,
        updateTables,

        // chart data
        chartDataModelData,
        chartDataModelLabel,

        // customerchart,
        chartDataModelCustomersLabel,
        chartDataModelCustomersData,
        chartDataModelNumberPerServiceArea,
        lineChartLabel,

        //card data
        showTextCard,
        cardDataCols,
        // card methods
        cardData,
        callCardData,
        maximizedToggle,
        cardModal
        ,cardTitle,

        //pagination
        pagination,
        onRequestCard,
        rows
      };
    },
  }
</script>
<style scoped>



    

</style>
