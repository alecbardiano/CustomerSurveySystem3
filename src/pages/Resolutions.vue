<template>
  <div class="q-pa-md">
  <q-toggle v-model="showFilter" label="Show Filters" />
  </div>

  <div class="q-pa-md" style="margin-left: 40px" v-if="showFilter" >
    <div class="row inline">
      <q-select v-model="division" @update:model-value="fillSectionList()" :options="divisions" label="Division" style="width: 200px; " />
      <q-select v-model="service" :options="services" label="Service" style="width: 200px;  margin-left: 50px" />
    </div>
    <div class="row" style="padding-top: 20px">
      <q-form ref="dateform" @submit="dataUpdateWithDate()">
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
          <!-- :rules="[val => !!val || 'Field is required', val => !isNaN(val) || 'Field should be a number']" -->
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
        <q-btn
                    type="submit"
                    label="Go"
                    color="primary"
                    style="margin-left: 25px; width: 70px; height: 25px;"
                 />
      </q-form>
    </div>

  </div>
  <div class="q-pa-md">
    <q-option-group
            v-model="mode"
            inline
            class="q-mb-md"
            :options="[
              { label: 'All Negative Feedbacks (default)', value: 0 },
              { label: 'With Resolutions', value: 1 },
              { label: 'Without Resolutions', value: 2 },
            ]"
          /> 
    
    <!-- :filter="filter"
      v-model:pagination="pagination"
      @request="onRequest" -->
    <q-table
    class="my-sticky-header-table"
    style="height: 450px"
    title="All Negative Feedbacks"
    :rows="modeRows"
    :columns="cols"
    v-model:pagination="pagination"
    @request="onRequest"
    binary-state-sort
    separator="cell"
    >
     <!-- <template v-slot:bottom-row>
        <q-tr>
          <q-td colspan="100%">
          
              
          </q-td>
        </q-tr>
      
    </template> -->
    <template v-slot:top-right>
      <!-- <q-input class="placeholderClass" borderless dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon class="searchClass" name="search" />
        </template>
      </q-input> -->
    </template>

  </q-table>


  </div>
  <!-- <div class="q-pa-md">
    <q-table
      class="my-sticky-header-table"
      title="Total Summary of Citizen/Client Satisfaction Survey CCSS Rating" 
      :rows="rowsTotal"
      :columns="colsTotal"
      row-key="name"
      binary-state-sort
      separator="cell"
      style="height: 350px"
      :rows-per-page-options="[0]"
    >
    </q-table>
  </div> -->
</template>

<script>
import { defineComponent, ref, onMounted, computed, watch } from 'vue'
import { getDivList,getNegativeFeedbackDataResolution, countPositiveFeedback, countNegativeFeedback, getQuestionsWithoutAns , totalTsrsCountByYear,getTsrYear, allOverAllRatingsFromApi, getNegativeFeedbackData,getPositiveFeedbackData,countNoFeedback, getNoAnswerFeedbackData,getTSRYearAndMonth,getAnswerBySearch,countAnswerBySearch,getCountServicePerDivision } from 'src/axioshelper.js'
import orderBy from 'lodash.orderby'
import { exportFile, useQuasar} from 'quasar'
import moment from 'moment';

export default defineComponent({
  name: 'Resolutions',
  setup() {
    let timer

    const allAnswers = ref([])
    const divisionsAndSections = ref(null)
    const division = ref(null)
    const services = ref([])
    const service = ref(null)
    const questions = ref([])
    const orderKey = ref('position')
    const tsrs = ref([])
    const dateform = ref(null)
    const showFilter = ref(false)
     const $q = useQuasar()

    watch(showFilter, (newValue, oldValue) => {
      onRequest({
          pagination: pagination.value,
          filter: undefined
        })

    })

    const mode = ref(0)
    // { label: 'All Negative Feedbacks (default)', value: 0 },
    //               { label: 'With Resolutions', value: 1 },
    //               { label: 'Without Resolutions', value: 2 },
    // watch(mode, (newValue, oldValue) => {
    //   switch (mode.value) {
    //     case 0:
    //       rows.value = rows.value
    //       break;
    //     case 1:
    //       rows.value = rows.value.filter( row => row.resolution != '')
    //       break;
    //     case 2:
    //       rows.value = rows.value.filter( row => row.resolution == '')
    //       break;
      
    //     default:
    //       break;
    //   }
    
    // })

    const yearTsr = ref(null)
    const tableTitle = ref(null)

    const pagination = ref({
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 20,
        rowsNumber: 5
      })

    const beforeDate = ref(null)
    const afterDate = ref(null)

    const rows = ref([])
    const rowsWithoutRes = ref([]) 
    const cols = ref([])

    


    
    const orderByPositionQuestions = computed(() => {
      return orderBy(questions.value, orderKey.value)
    });

    const modeRows = computed(()=> {
      let a = rows.value.map((rest ) => rest)
      console.log("a",a)

      switch (mode.value) {
        case 0:
          
          break;
        case 1:
          a =  a.filter(row => row.resolution != '' && row.resolution != null)
          break;
        case 2:
          a = a.filter(row => row.resolution == '' || row.resolution == null)
      
        default:
          break;
      }
      console.log("a",a)
      console.log("rows.lalsd",rows.value)
      return a
    })


    const divisions = ref([])

    function buildNegativeFeedbackCols (){
      if(cols.value.length == 0){

          cols.value.push( {
              name: 'tsrNo',
              align: 'left',
              label: 'TSR Number',
              field: 'tsrNo'
            })
          cols.value.push( {
              name: 'division',
              align: 'left',
              label: 'Division',
              field: 'division'
            })
          cols.value.push( {
              name: 'service',
              align: 'left',
              label: 'Service',
              field: 'service'
            })
          cols.value.push( {
              name: 'question',
              align: 'left',
              label: 'Question',
              field: 'question'
            })
          cols.value.push( {
              name: 'value',
              align: 'left',
              label: 'Value',
              field: 'value'
          })
          cols.value.push( {
              name: 'date',
              align: 'left',
              label: 'Submitted Date',
              field: 'submittedAt'
            })
          cols.value.push( {
            name: 'remarks',
            align: 'left',
            label: 'Remarks by Customer',
            field: 'remarks'
            })
          cols.value.push( {
            name: 'resolution',
            align: 'left',
            label: 'Resolution',
            field: 'resolution'
            })
          }
    }

    function fillSectionList(){
      services.value = divisionsAndSections.value.filter(div => div.division == division.value).map(div => div.service)
    }
    
    function loadTotalOverall(){

    }

    onMounted( async () => {
      questions.value = await getQuestionsWithoutAns()
      divisionsAndSections.value = await getDivList()
      divisions.value = [...new Set(divisionsAndSections.value.map(a => a.division))]
      buildNegativeFeedbackCols()
      loadTotalOverall("","")
      await onRequest({
        pagination: pagination.value,
        filter: undefined
      })
   })

   async function fetchFromServer(startRow, count, filter, sortBy, descending) {
       
        let rows = []
        let currYear = new Date().getFullYear()
        currYear = '2022'
        let div = division.value
        let serv = service.value
        if(showFilter.value){
          if (filter){
            rows = await getAnswerBySearch(filter,startRow,count)
          }else{
            if(yearTsr.value){
              rows = await getNegativeFeedbackDataResolution(startRow,count,div,serv,yearTsr.value).toString()
              
            }else{
              rows = await getNegativeFeedbackDataResolution(startRow,count,div,serv,currYear)
              
            }
          }
        }else{
          if(yearTsr.value){
            rows = await getNegativeFeedbackData(startRow,count,yearTsr.value).toString()
          }else{
            rows = await getNegativeFeedbackData(startRow,count,currYear)
          }
          
        }
        // }
        
        
        
      return rows
      
    }

  

   async function onRequest(props){

      console.log("props", props)
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter

      let year
      if (yearTsr.value){
        year = yearTsr.value
      }else{
        year = new Date().getFullYear()
      }
      // totalNegative.value = await countNegativeFeedback(year)
      // totalPositive.value = await countPositiveFeedback(year)
      let totalCount 
      // if(mode == 1){
      //   totalCount = totalNegative.value
      // }else{
      //   totalCount = totalPositive.value
      // }
      

       // pagination count
        
        // get all rows if "All" (0) is selected
        
        

        // calculate starting row of data
        if(filter){
          let x = await countAnswerBySearch(filter)
          pagination.value.rowsNumber = x
          const fetchCount = rowsPerPage === 0 ? x : rowsPerPage
          const startRow = (page - 1) * rowsPerPage
          console.log("eyfilter", startRow,fetchCount)
          const returnedData = await fetchFromServer(startRow, fetchCount, filter, sortBy, descending) 
          console.log("returnedData",returnedData)
          // fetch data from "server"
          
          // clear out existing data and add new
          
          rows.value.splice(0, rows.value.length, ...returnedData)
          
          rows.value  = rows.value.map(card =>  ({
            // console.log("cardlog", card)
            // may papalitan pa dito ibalik yung q
            // let obj = { 
              value: card.value, 
              tsrNo: card.tsrNo,
              division: card.division,
              service: card.service,
              submittedAt: moment(card.submittedAt).format('YYYY-MM-DD'),
              question: card.question,
              remarks: card.remarks,
              resolution: card.resolution
            // }
            // return obj
            })
          )
        }else{
          const startRow = (page - 1) * rowsPerPage
          pagination.value.rowsNumber = totalCount
          const fetchCount = rowsPerPage === 0 ? totalCount : rowsPerPage
          console.log("eytotal", startRow,fetchCount)
          const returnedData = await fetchFromServer(startRow, fetchCount, filter, sortBy, descending) 
          console.log("returnedData",returnedData)
          // fetch data from "server"
          
          // clear out existing data and add new
          
          rows.value.splice(0, rows.value.length, ...returnedData)
          rows.value  = rows.value.map(card =>  ({
            // console.log("cardlog", card)
            // may papalitan pa dito ibalik yung q
            // let obj = { 
              value: card.value, 
              tsrNo: card.tsr.tsrNo,
              division: card.tsr.division,
              service: card.tsr.service,
              submittedAt: moment(card.tsr.submittedAt).format('YYYY-MM-DD'),
              question: card.question.description,
              remarks: card.remarks,
              resolution: card.resolution
            // }
            // return obj
            })
          )
        }
        
        


        // don't forget to update local pagination object
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending

        // ...and turn of loading indicator
      }

      function showLoadingData () {
        $q.loading.show({
          message: 'Please wait for data to be loaded',
          boxClass: 'bg-grey-2 text-grey-9',
          spinnerColor: 'primary'
        })
      }

      function hideLoading(){
        timer = void 0
        $q.loading.hide()
      }
      
      async function dataUpdateWithDate(){
        showLoadingData()
        let suc = await dateform.value.validate()
        if(suc){
          await onRequest({
            pagination: pagination.value,
            filter: undefined
            })
        }
        hideLoading()
      }

   return {
      divisions,
      allAnswers,
      division,
      services,
      service,
      beforeDate,
      afterDate,
      fillSectionList,
      tsrs,
      dateform,

      // table
      rowsWithoutRes,
      rows,
      cols,
      onRequest,
      pagination,
      mode,
      modeRows,
      showFilter,
      dataUpdateWithDate
    }
  }
})
</script>
