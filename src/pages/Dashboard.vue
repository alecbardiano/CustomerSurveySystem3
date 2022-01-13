<template>
  <div class="q-pa-md">
    <!-- @update:model-value="build()"  -->
    <q-select   outlined v-model="yearTsr" style="max-width: 200px" option-label="text" :options="yearOptions" width="30px" label="Year" />
  </div>

  <div class="q-pa-md">
  <div class="layout-padding ">
    <div class="flex wrap gutter">
      <div class="width-1of3 sm-auto">
        <CardDashboardFeedbackCount
          title="Total TSRS YTD"
          backgroundColor="green"
          icon-name="local_post_office"
          :total="totalTsrs">
        </CardDashboardFeedbackCount>
      </div>
      <div class="width-1of3 sm-auto">
        <CardDashboardFeedbackCount title="Negative Feedback YTD" backgroundColor="red" :total="totalNegative"> </CardDashboardFeedbackCount>
      </div>
      <div class="width-1of3 sm-auto">
        <CardDashboardFeedbackCount
          title="Positive Feedback YTD"
          backgroundColor="blue"
          :total="totalPositive">
        </CardDashboardFeedbackCount>
      </div>
    </div>
    
  </div>
  <!-- <div style="width: 400px">
    <BarChart v-bind="barChartProps" />

  </div> -->

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
          <!-- {{totalActualRespondents}} -->
          <q-td style="text-align: center" v-bind:key="column.key" v-for="(column) in totalActualRespondents">
              {{column.value}}
              <!-- {{ column[key] }} -->
              <!-- <p v-if="column.value != 0  "></p> -->
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
  </div>

</template>


<script type="text/javascript">

  import { defineComponent, ref, computed, onMounted, watch } from 'vue'
  import { getDivList, countPositiveFeedback, countNegativeFeedback, totalTsrsCount , totalTsrsCountByYear,getTsrYear, allOverAllRatingsFromApi} from 'src/axioshelper.js'
  import CardDashboardFeedbackCount from '../components/CardDashboardFeedbackCount.vue'
  import { Chart, registerables } from 'chart.js'
  import groupBy from 'lodash'
  import moment from 'moment';
  import {  useStore } from "vuex";



  // import { BarChart, useBarChart } from 'vue-chart-3'


  Chart.register(...registerables);
  
  export default {
    name: 'Dashboard',
    components: {
      CardDashboardFeedbackCount
    },
    
    setup() {
      const dataValues = ref([30, 40, 60, 70, 5]);
      const totalNegative = ref(0);
      const totalPositive = ref(0);
      const totalTsrs =  ref(0);
      const tsrs = ref([])
      const totalAnswerOverall = ref([])
      const totalNoResponse = ref(0)

      const currentYear =  ref(new Date().getFullYear())
      
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

      // bottom row overall performance
      const totalPerField = ref([])

      // const yearOptions = ref([])

      // bottom row customer
      const totalActualRespondents = ref([])

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

        updateTables()
        LoadFeedbackCounts(newValue)
        
      })



      async function LoadFeedbackCounts(year){
        if (year){
          totalTsrs.value = await totalTsrsCountByYear(year)
        }else{
          totalTsrs.value = await totalTsrsCountByYear("")
        }
        

        totalNegative.value = await countNegativeFeedback(year)
        totalPositive.value = await countPositiveFeedback(year)
        

      }

    async function updateTables(){
      // reset arrays
      totalActualRespondents.value = []
      rowsnumberOfCustomers.value = []
      
      totalPerField.value = []

      const mainCounts = {
          5: 0, 
          4: 0,
          3: 0, 
          2: 0,
          1: 0,
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
            // filter all answer overall specific to tsr
            let sample = totalAnswerOverall.value.filter((elementTSR) => {
            if(elementTSR.tsr){
              console.log("elementTSR", elementTSR)
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
            1: 0
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
        let totalRespondentsPerMonth = 0
        // group by months
        var result = _(tsrs.value)
        .groupBy(v => moment(v.submittedAt).format('MMMM'))
        .value();

          for (var key in result) {
              if (result.hasOwnProperty(key)) {
                let row = {}
                let totalPerMonth = 0
                row['month'] = key
                
                let temp = result[key]
                console.log("temp", temp)
                for (var key2 in divisionsAndSections.value) {
                  for (const element of divisionsAndSections.value[key2]) {
                    let stringColField = element.toString().concat(key2.toString())
                    // filter all data
                    let sample = temp.filter((elementTSR) => {
                    if(elementTSR.tsrNo){
                      if(elementTSR.division == key2 && elementTSR.service == element){
                        console.log("pasok oh loko" )
                        return elementTSR
                      }
                    }
                    
                    })
                    row[stringColField] = sample.length
                    totalPerMonth += sample.length
                  }
                }
                // total horizontal
                row['total'] = totalPerMonth
                totalRespondentsPerMonth += totalPerMonth
                
                rowsnumberOfCustomers.value.push(row)
              }
          }
          
          // number of customers total per service
          for (var key2 in divisionsAndSections.value) {
            for (const element of divisionsAndSections.value[key2]) {
            let stringColField = element.toString().concat(key2.toString())
            let sample = filterMyArr(rowsnumberOfCustomers.value, stringColField)
            //  console.log("Samp", sample)
            let sum = sample.reduce((a, b) => a + b, 0)
            let arrTotal = {}
            // total vertical per service
            arrTotal["value"] = sum
            totalActualRespondents.value.push(arrTotal)
            }
          }



        // row add percentage field
        let totalPercentRow = 0
        rowsOverallPerformance.value.forEach(row => {
          let res = (parseFloat(mainCounts[row.id])/ totalAnswerOverall.value.length * 100)
          row['percentage'] = res.toFixed(2).toString() + '%'
          totalPercentRow +=res
        });
        let tempObj = {}
        tempObj['value'] = parseFloat(totalPercentRow).toFixed(2).toString() + '%'
        totalPerField.value.push(tempObj)

        for (var key in divisionsAndSections.value) {
            for (const element of divisionsAndSections.value[key]) {
            let service = element.toString().concat(key.toString())
            let a = rowsOverallPerformance.value.map(a => a[service]);
            let sum = a.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
            tempObj['value'] = sum.toFixed(2).toString() + '%'
            totalPerField.value.push(tempObj)
          }
        }

          // total actual respondents
          let tot = {}
          tot["value"] = totalRespondentsPerMonth
          totalActualRespondents.value.push(tot)

          // order according to first month January
          // api call is order descending
          rowsnumberOfCustomers.value.reverse()
      }

      async function buildTable(){
        buildColumns()
        buildRowsOverallPerformance()
        totalNoResponse.value = totalTsrs.value - totalAnswerOverall.value.length

        updateTables()

     

        // [ { "dimension": [], "value": 0 }, { "scoreservice": [], "value": 3.18 }, { "ATD": [], "value": 3.16 }, { "PD": [], "value": 3.22 } ]
        
      }
      function buildRowsOverallPerformance (){

        // performance row generation
        rowsOverallPerformance.value.push({servicearea: "5 - Outstanding" , id: 5})
        rowsOverallPerformance.value.push({servicearea: "4 - Very Satisfactory" ,  id: 4 })
        rowsOverallPerformance.value.push({servicearea: "3 - Satisfactory", id: 3})
        rowsOverallPerformance.value.push({servicearea: "2 - Fair & 1 - Poor", id: 2})
        
  
      
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
      
      onMounted( async () => {
        // call functions upon start up here
        console.log("mounted")
        yearTsr.value = currentYear.value
        LoadFeedbackCounts(yearTsr.value)
        divisionsAndSections.value = await getDivList()
        divisions.value = Object.keys(divisionsAndSections.value)
        // build tables
        buildTable()

      })


      return {
        totalNegative, 
        totalPositive, 
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
        updateTables
      };
    },
  }
</script>
<style>

    

</style>
