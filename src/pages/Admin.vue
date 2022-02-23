<template>
      <div class="q-pa-lg" >
        <div class="q-pa-md">
          <q-toggle v-model="showFilter" label="Show Filters" />
        </div>
                <q-form ref="dateform" @submit="dataUpdateWithDate()" v-if="showFilter">
                    <div class="row" style="padding-bottom: 20px">
                      <q-select v-model="division" @update:model-value="fillSectionList()" :options="divisionsWithServ" label="Division" style="width: 200px; " />
                      <q-select v-model="service" :options="services" label="Service" style="width: 200px;  margin-left: 40px" />
                    </div>
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
                  <q-input outlined filled mask="date" style="padding-left: 25px" v-model="afterDate" lazy-rules :rules="[val => val >= beforeDate || 'Field should be later than before date']"   placeholder="mm/dd/yy" hint="End Date" >
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

                  <q-btn
                    type="submit"
                    label="Go"
                    color="primary"
                    style="margin-left: 25px; width: 70px; height: 25px;"
                 />
                </div>
    
                </q-form>

        <div class="q-pa-md" v-show="userLoggedin.role.name == 'PMD' || userLoggedin.role.name == 'Management' ">
          <q-toggle v-model="showFunctions" label="Show Functions" />
        </div>
  
        <div class="row" v-if="showFunctions">
          <div class="col-md-4">
            <div class="row inline">
            <q-file  v-model="importFile" ref="uploadRefButton" label="Import Data "
                  accept=".csv,.xls,.xlsx"
                      color="primary"
                      
                  >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                  </q-file>
            <q-btn
                      type="submit"
                      label="Import Data"
                      class="q-mt-md"
                      color="primary"
                      @click="fileUpload(importFile)"
                      style="margin-left: 25px"
                  
                  />
            </div>
          </div>
          <!-- generate excel button -->
          <div class="col-md-4 offset-md-4">
            <div class="row inline">
            <q-btn
              type="submit"
              label="Generate Raw Data"
              class="q-mt-md"
              color="primary"
              @click="generateExcel()"
          />
          <!-- generate pdf button -->
           <q-btn
              type="submit"
              label="Generate PDF Report"
              class="q-mt-md"
              color="primary"
              @click="generatePDF()"
              style="margin-left: 15px"
          />
          <!-- <q-btn
              type="submit"
              label="DELETE"
              class="q-mt-md"
              color="primary"
              @click="deleteAnswers()"
              style="margin-left: 15px"
          /> -->
            </div>
          </div>
        </div>
    </div>
    
  <div class="q-pa-md">

    <!-- all survey table -->

    <q-table
      class="overallAverage"
      v-if="rows"
      :rows="rows"
      :columns="cols"
      row-key="name"
      @row-click="onRowClick"
      :loading="loading"
      :filter="filter"
      v-model:pagination="pagination"
      :visible-columns="visibleColumns"
      @request="onRequest"
      binary-state-sort
      separator="cell"
    >

    <template v-slot:top="props">
        <div class="col-4 q-table__title">Customer Satisfaction Measurement
          
          
        </div>
        <div class="col absolute-right">
          <q-btn
            flat round dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-md"
          />
        </div>

          <q-space />

          <div v-if="$q.screen.gt.xs" class="row">
            <div v-bind:key="tog.val" v-for="tog in toggles">
            <q-toggle v-model="visibleColumns" :val="tog.val" color="yellow" :label="tog.label" />
            </div>
          </div>
          <q-select
            v-else
            v-model="visibleColumns"
            multiple
            borderless
            dense
            options-dense
            :display-value="$q.lang.table.columns"
            emit-value
            map-options
            :options="cols"
            option-value="name"
            style="min-width: 150px"
          />

          
      </template>
   
    <template v-slot:top-right>
      <q-input class="placeholderClass" borderless dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon class="searchClass" name="search" />
        </template>
      </q-input>
    </template>

    <!-- <template v-slot:body="props">
        <q-tr :props="props" :key="`m_${props.row.index}`">
         
         <q-tr :props="props" :key="`e_${props.row.index}`" class="q-virtual-scroll--with-prev">
          <q-td colspan="100%">
            <div class="text-left">This is the second row generated from the same data: {{ props.row.name }} (Index: {{ props.row.index }}).</div>
          </q-td>
        </q-tr>

          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
        
      </template> -->


    <!-- to follow code for red green orange color of answers -->
    <!-- <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="calories" :props="props">
            <q-badge color="green">
              {{ props.row.calories }}
            </q-badge>
          </q-td>
          <q-td key="calories" :props="props">
            <q-badge color="green">
              {{ props.row.calories }}
            </q-badge>
          </q-td>
          <q-td key="calories" :props="props">
            <q-badge color="green">
              {{ props.row.calories }}
            </q-badge>
          </q-td>
        </q-tr>
    </template> -->
      
      <template v-slot:bottom-row>
        <q-tr>
          
          <q-td v-bind:key="column.id" v-for="column in visibleColumnsAverage">  
              <!-- {{column}} -->
              <p v-if="column.tsrNo">Average: </p>
              <!-- nan values remove -->
              
              <p v-else-if="column.value != 0 && !(isNaN(column.value)) && column.visible">{{column.value}}</p>
            </q-td>
        </q-tr>
      </template>
    </q-table>
      
  </div>
  <div class="q-pa-md">

    <!-- Overall Agency Citizen/ Client Satisfaction Score -->
    <q-table
        
        :title="titleOverall"
        :rows="rowsOverall"
        :columns="colsOverall"
        :loading="overallLoading"
        row-key="name"
        separator="cell"
        class="overallAverage"
        binary-state-sort
        style="height: 500px"
        :rows-per-page-options="[0]"
      >
      <template v-slot:bottom-row>
        <q-tr>
          <q-td v-bind:key="column.key" v-for="column in overAllAverage">
              <p v-if="column.dimension">Average: </p>
              <p v-else>{{ column.value }}</p>
            </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>

  <!-- modal view answer -->

  <q-dialog v-model="prompt" >
    <viewsurveyanswer v-model="tsrData" :cols="cols"></viewsurveyanswer>
  </q-dialog>


  <!-- upload dialog -->
  <q-dialog v-model="uploadDialog" >
      <q-card>
        <q-card-section class="bg-primary text-white" >
          <div class="text-h6">File Error</div>
        </q-card-section>

        <q-card-section>
          Please double check excel file uploaded
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>


</template>
<script>
// import packages
import { reactive, defineComponent, ref, onMounted, computed , watch,onBeforeUnmount} from 'vue'
import { getQuestions,getQuestionsWithoutAns, getTSRs,postAnswers , getOverall,deleteAll,totalTsrsCount, getDivList, totalTsrsCountByYear,getTSRYearAndMonth,getCountServicePerDivision,totalTsrsCountWithDivisions,totalTsrsCountWithDivisionsByYear} from 'src/axioshelper.js'
import { overAllColumns, overAllRows,numberOfCustomersColumnsData,numberOfCustomersRowsData, summaryPerDivisionRows, summaryPerDivisionColumns  } from 'src/utils/dataRetrieveTables.js'
import { exportFile, useQuasar} from 'quasar'
import { xlsx, pdfMake } from 'boot/axios'
import moment from 'moment';
import orderBy from 'lodash.orderby'
import {  useStore } from "vuex";


//components
import viewsurveyanswer from '../components/modals/ViewSurveyAnswer.vue'


export default defineComponent({
  name: 'Admin',
  components: { viewsurveyanswer },
  
  setup () {
  let timer
  const store = useStore();

  const visibleColumns = ref([ "tsrNo", "division", "service", "industry", "Overall Rating","publishedDate"])
  const divisioAndSectionList = ref([])
  const divisions = ref([])

  const $q = useQuasar()

  const importFile = ref(null)
  
  const rowsTable = ref([])
  const rowsFilter = ref([])
  const listOfTsr = ref([])
  const answers = ref([])
  const lengthOfAnswers = ref(0)
  const beforeDate = ref('')
  const afterDate = ref('')
  const dateform = ref(null)

  const prompt = ref(false)
  const uploadDialog = ref(false)

  let today = Date.now();
  today = moment().year()

  const orderKey = ref('position')

  // according to order by position  of the survey
  const orderByPositionQuestions = computed(() => {
      return orderBy(questions.value, orderKey.value)
    });
  
  // used for columns of all survey table
  const questions = ref([])
    
  const tsrList = ref ([])

  // survey row data tables 
  const rows = ref([])
  const cols = ref([])
  
  // search function
  const filter = ref('')
  
  const loading = ref(true)
  const pagination = ref({
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 5
  })

  const toggles = ref([])
  // pdf

  const division = ref(null)
  const divisionsWithServ = ref([])
  const services = ref([])
  const service = ref(null)
  

  watch(afterDate, (newValue, oldValue) => {

    let val = newValue.toString()
    return dateTimeToApi(val)
    
  })
  watch(beforeDate, (newValue, oldValue) => {

    
    let val = newValue.toString()
    return dateTimeToApi(val)
     
    
  })

  // watch(division, (newValue, oldValue) => {

    
  //   pagination.value.page = 1
  // })

  // watch(service, (newValue, oldValue) => {

    
  //   pagination.value.page = 1
     
    
  // })

  
  
  

  const tsrData = reactive({})
  const finalAverageDataRow = ref([])
  
  // overall
  const divisionList = ref([])
  const rowDataDivision = ref([])
  const overAllAverage = ref(null)
  const colsOverall = ref([])
  const rowsOverall = ref([])
  const overallLoading = ref(true)
  const titleOverall = ref("Overall Agency Citizen/ Client Satisfaction Score YTD " + new Date().getFullYear())

  // overall Perf for PDF
  const rowsOverallPerformance = ref([])
  const colsOverallPerformance = ref([])

  // numbers of customers PDF
  const numberOfCustomersRows = ref([])
  const numberOfCustomersColumns = ref([])

   // Summary of Citizen/Client Satisfaction Survey CCSS Rating PDF
  const summaryQuestionPerDivisionRows = ref([])
  const summaryQuestionPerDivisionCols = ref([])
  

  const showFilter = ref(false)
  const showFunctions = ref(false)

  const userLoggedin = computed(() => store.getters["auth/getUserProfile"]);

  

  function fillSectionList(){
    services.value = divisioAndSectionList.value.filter(div => div.division == division.value).map(div => div.service)
  }


  // const getAllTSRs = function (start,limit,division,service,beforeDate,afterDate,mode,filter) {
  async function getTSRsFromApi (start,limit,division,service,beforeDate,afterDate,mode,filter)  {

      try {
        // upon startup we can initialize data to 1 - rows per page which is 50
        
        // lengthOfAnswers.value = answers.value.length]
        if(beforeDate && afterDate){
          
          if(filter){
            return await getTSRs(start,limit,division,service,beforeDate,afterDate,mode,filter)
          }else{
            return await getTSRs(start,limit,division,service,beforeDate,afterDate,mode,"")
          }
          
        }else{
          if(filter){
            return await getTSRs(start,limit,division,service,"","",mode,filter)
          }else{
            return await getTSRs(start,limit,division,service,"","",mode,"")
            
          }
          
        }
        
      }
      catch(err) {
        throw(err)
      }
  }

  
  // function deleteAnswers (){
  //   deleteAll()
  // }

  function buildRow(rowdatafromapi){
    // build row data for pdf
    let rowData = []

    rowdatafromapi.map(function(item){
      let row = {
        tsrNo: item.tsrNo,
        submittedAt:dateTime(item.submittedAt),
        division: item.division,
        industry: item.industry,
        service: item.service,
        section: item.section
      }
      let result = item.answers.map(a => a.question);
      result = result.filter(function (el) {
        return el != null;
      });

        for (let i=0 ; i < result.length; i++){
          if(item.answers[i].question != ""){
            // key as question
            // sample data: { Responsiveness: 5 }
            row[item.answers[i].question] = item.answers[i].value;
          }
        }
        rowData.push(row)
      
    })
    
    return rowData
  }
  function buildTable(){
    let rowData = []
    if(cols.value.length == 0){
      cols.value.push({ name: 'tsrNo', align: 'left', label: 'TSR Number', field: 'tsrNo', sortable: true })
      cols.value.push({ name: 'division', align: 'left', label: 'Division', field: 'division' })
      cols.value.push({ name: 'service', align: 'left ', label: 'Service', field: 'service'})
      cols.value.push({ name: 'industry', align: 'left', label: 'Industry', field: 'industry' })
      
      for (let j =0; j < orderByPositionQuestions.value.length ; j++){
        // remove subheaders in columns filter
        if(orderByPositionQuestions.value[j].question_type != 5){
        let column = {
          name: '',
          align: 'left',
          label: '',
          field: '',
        }
        // dynamic here for the question
        // console.log("helloooo", listOfTsr.value[0].questionsWithAnswer[j])

        // change this code
        column.name = orderByPositionQuestions.value[j].description
        column.label = orderByPositionQuestions.value[j].description
        column.field = orderByPositionQuestions.value[j].id
        let tog = {
          val: orderByPositionQuestions.value[j].description,
          label: column.label
        }
        toggles.value.push(tog)
        
        cols.value.push(column)
        
        }
        // console.log("cooooolss", cols.value)
      }
        
      cols.value.push({ name: 'publishedDate',align: 'left', label: 'Submitted Date', field: 'submittedAt'
      // , sortable: true 
      })
    }
    
    // console.log("completed cols", cols.value)
    // push columns for q table data
    //map this to columns and rows for visualization
    // console.log("tsrList.value.",tsrList.value)
    tsrList.value.map(function(item){
      // console.log("itemssss", item)
      let row = {
        tsrNo: item.tsrNo,
        submittedAt:dateTimeMonth(item.submittedAt),
        division: item.division,
        industry: item.industry,
        service: item.service,
        section: item.section
      }
      let result = item.answers.map(a => a.question);
      // result = result.filter(function (el) {
      //   return el != null;
      // });

      // console.log("Result", result)
        for (let i=0 ; i < result.length; i++){
          if(item.answers[i].question != ""){
            
            row[item.answers[i].question] = item.answers[i].value;
          }
        }
        rowData.push(row)
      
    })
    // let keysObject = Object.keys(averageColumns.value)

      // load overall
    //  console.log("rowdata",rowData)
    
    return rowData

  }
  async function loadDivisionDataOverall(divlist){
    // console.log("divlist", divlist)
    overallLoading.value = true
    
    if(colsOverall.value.length > 0){
      colsOverall.value = []
    }

    if(beforeDate.value && afterDate.value){
      titleOverall.value = "Overall Agency Citizen/ Client Satisfaction Score-" + moment(beforeDate.value).format('MMMM-YYYY') + " to " + moment(afterDate.value).format('MMMM-YYYY')
    }

    colsOverall.value.push({ name: 'Dimension' ,align: 'left', label: 'Dimension', field: 'dimension' , style:"width: 300px" })
  
    let dataDivision = []
    // console.log("hellodivlistload divisin data", rowsOverall.value)
    // console.log("hellodivlistload divisin data", divlist)
    colsOverall.value.push({ name: 'Score' ,align: 'left', label: 'Score All in Service', field: 'scoreservice' , style:"width: 300px"})
    for(let i =0; i<divlist.length; i++){
      colsOverall.value.push({name: divlist[i].division ,align: 'left', label: divlist[i].division, field: divlist[i].division , sortable: true })
      for (let j=0; j<rowsOverall.value.length; j++){
        
        dataDivision = await getOverall(divlist[i].division,"",rowsOverall.value[j].id,beforeDate.value,afterDate.value)
        if(dataDivision.length != 0){
          dataDivision = dataDivision.map(a => a.value)
          dataDivision = dataDivision.map(function (x) { 
            return parseInt(x, 10); 
          });
          dataDivision = dataDivision.filter(function(x) {
            if ( x != undefined || x == '' || !isNaN(x)){
              return x
            }
          });
          // console.log("Datadiv", dataDivision)
          const sum = dataDivision.reduce((a, b) => a + b, 0);
          // console.log("sum", sum)
          // console.log("sum", dataDivision)
          let avg = parseFloat((Math.round((sum/dataDivision.length) * 100) / 100).toFixed(2));
          if(isNaN(avg)){
            avg = 0
          }
          // console.log("avg",avg)
          // set divName for mapping of column to row
          //rows of average
          rowsOverall.value[j][divlist[i].division] = avg
          // rowsOverall.value[j].divlist[i] = avg
        }else{
          rowsOverall.value[j][divlist[i].division] = 0
          rowsOverall.value[j]["scoreservice"] = 0
        }
      }
    }
    // score in all service
    for (let i = 0; i<rowsOverall.value.length; i++){
      const {dimension, id, scoreservice, ...partialObject} = rowsOverall.value[i];
      
      let total = 0
      let length = 0
      for (var div in partialObject){
        // console.log("partial", div)
        if((partialObject[div]) == 0){
          continue;
        }
        if(isNaN(partialObject[div])){
          total += 0;
        }else{
          total += partialObject[div];
        }
        length++
        
        
      }
      // console.log("total",total)
      // console.log("length",length)
      let avg = parseFloat((Math.round((total/length) * 100) / 100).toFixed(2));
      // console.log("NANana",avg)
      if(isNaN(avg)){
        avg = 0
      }
      rowsOverall.value[i]["scoreservice"] = avg
    }
    

    // console.log("roworworworow")
    // console.log(rowsOverall.value)

    overAllAverage.value = await averageLastTable(colsOverall.value,rowsOverall.value)
    // api call from axioshelper

  }

  function dateTime(value) {
    return moment(value).format('YYYY/MM/DD');
  }

  function dateTimeToApi(value) {
    return moment(value).format('YYYY-MM-DD');
  }

  function dateTimeMonth(value) {
    return moment(value).format('MMMM');
  }

  onBeforeUnmount(() => {
    if (timer !== void 0) {
      clearTimeout(timer)
      $q.loading.hide()
    }
  })

  async function fileUpload(file) {
    if(importFile.value){
      showLoading()
      
      // console.log("Filelele", file.name)
      // filename should be csms-year.xlsx any format as long as the space will be '-' and the last word will be the year in numbers 'example xxx-xx-xxx-x-2021.xlsx or any' 
      let x = file.name.split('-')
      if(x){
        // .xlsx
        let dot = x[x.length-1].split('.')
        // console.log("dot", dot)
        if(dot){
          // test same tsr number and tsr number on database and import
          let migraData = await returnMigrationData(file)
          const rowData = xlsx.utils.sheet_to_json(xlsx.read(migraData, { type: 'binary', cellDates: true }).Sheets['Details of CSF forms'])
          
          let success = await uploadMigrationData(rowData,dot[0])
          console.log("success,",success)
          if (success == 0){
            $q.notify({
                message: 'Responses Migrated',
                color: 'positive',
                icon: 'success'
              })
          }
          else if (success == 1){
              $q.notify({
                message: 'Responses Not Migrated, Error found: ',
                color: 'negative',
                icon: 'failed'
              })
          }
          else if (success == 2){
           
            $q.notify({
            color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'Duplicate TSR found in file'
            })
          }
          timer = void 0
          $q.loading.hide()
        }
      }
    }else{
      $q.notify({
        color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'File field Empty'
        })
    }
    
    
      
    //  console.log("pasok")
    
   }
   function showLoading () {
      $q.loading.show({
        message: 'Please wait for data to be imported..',
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
      })
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
    

    function buildTableBody(data, columns, mode,divisionsAndSections) {
        // survey results ALL with extra header
        // key as label 
        var body = [];
      
        
        if(mode == 2){

          // copydata from row

          //
          let copyColumns = columns.map(a => a);

          //map based on label

          let mainArrayColumn = columns.map((a => a.label));
          // the column names taken from label 
          body.push(mainArrayColumn);
          let copyData = data.map((rest ) => rest)
          // console.log("copy", copyData)
            
            
          copyData.forEach(function(row) {
              var dataRow = [];
              copyColumns.forEach(function(column) {
                  if(row[column.field]){
                    
                    if([column.label]){
                      dataRow.push(row[column.field]);
                    }
                  }else{
                    dataRow.push("");
                  }
              })
              body.push(dataRow);
          });
        
        // Overall Performance of the Center Based on CSS Responses table  
        }else if (mode == 3){
          let copyColumns = columns.map(a => a);
        
          let arrFirstHeader = []
          // first header according to layout provided in the report
          arrFirstHeader.push({})
          arrFirstHeader.push({})
          // divisions 
          divisions.value.forEach(element => {
            
        
            // push row data
            arrFirstHeader.push({text: element.division, colSpan: element.count})
            for(let i =0; i< element.count-1; i++){
              // push 
              arrFirstHeader.push({})
            }
          });
          body.push(arrFirstHeader)
          
          let mainArrayColumn = columns.map((a => a.label));
          // 2nd header
          body.push(mainArrayColumn);
          let copyData = data.map((rest ) => rest)

          // data
          copyData.forEach(function(row) {
            var dataRow = [];
            copyColumns.forEach(function(column) {
                if(row[column.field]){
                  if([column.label]){
                    dataRow.push(row[column.field]);
                  }
                }else{
                  dataRow.push({text: ""});
                }
            })
            body.push(dataRow);
          });
        }
      // number of customers table
      else if(mode == 4){
        let copyColumns = columns.map(a => a);
        let arrFirstHeader = []
        // first header
        arrFirstHeader.push({})
        // divisions with count
        divisions.value.forEach(element => {
            
        
            // push row data
            arrFirstHeader.push({text: element.division, colSpan: element.count})
            for(let i =0; i< element.count-1; i++){
              // push 
              arrFirstHeader.push({})
            }
          });
        arrFirstHeader.push({})
        body.push(arrFirstHeader)
        
        let mainArrayColumn = columns.map((a => a.label));
        // 2nd header
        body.push(mainArrayColumn);
        // console.log("body after push mainarray cols",mainArrayColumn)
        let copyData = data.map((rest ) => rest)
        // console.log("copyData",copyData)

        // data
        copyData.forEach(function(row) {
            var dataRow = [];
            copyColumns.forEach(function(column) {
                if(row[column.field]){
                  if([column.label]){
                    dataRow.push(row[column.field]);
                  }
                }else{
                  dataRow.push({text: '0'});
                }
            })
            body.push(dataRow);
        });
      }
      else if(mode == 5){
        let copyColumns = columns.map(a => a);
        let mainArrayColumn = columns.map((a => a.label));
        body.push(mainArrayColumn);
        
        let copyData = data.map((rest ) => rest)
        
        let index = 0
        let prevRespond = 0
        let totalPrevRespond = 0
        let totalprevVerySatis = 0
        let totalprevSatis = 0
        let totalprevPoor = 0
        let prevVerySatis = 0
        let prevSatis = 0
        let prevPoor = 0
        let numberPrevVerySatis = 0
        let numberPrevSatis = 0
        let numberPrevPoor = 0
        copyData.forEach(function(row) {
            // 11 rows before new division
            if(index % 12 == 0 ){
              body.push(
                	["Division: ",row.division,"","","","","","","",""]
                )
              body.push(["Service: ",row.service,"","","","","","","",""])
              index+=2
            }
            var dataRow = [];
            copyColumns.forEach(function(column) {
                
                if(row[column.field]){
                  
                  // overall rating
                  if(column.field == 12){
                    if(row[column.field]){
                      // add to very satisfactory data increment
                      if(row.id == 5 || row.id == 4){
                        let res = parseFloat(row[column.field]) 
                        prevVerySatis += res
                        // console.log('res parse', res)
                        res = (res/100)  * row.countsDivision
                        numberPrevVerySatis += res
                        
                      }else if (row.id == 3){
                        // add to satisfactory data increment
                        let res = parseFloat(row[column.field]) 
                        // console.log('res parse', res)
                        // res = res * row.countsDivision
                        prevSatis += res
                        res = (res/100)  * row.countsDivision
                        numberPrevSatis += res
                      }else if (row.id <= 2){
                        // add to poor overall data increment
                        let res = parseFloat(row[column.field]) 
                        prevPoor += res
                        // console.log('res parse', res)
                        res = (res/100) * row.countsDivision
                        numberPrevPoor += res
                        // res = res * row.countsDivision
                      }
                    }
                  }
                  if([column.label]){
                    dataRow.push(row[column.field]);
                  }
                }else{
                  dataRow.push("");
                  
                }
            })
            body.push(dataRow);
            
            index +=1
            if (((index +4) % 12 == 0 ) || index == 8){
              // off set rows for other fields in the rows (no of respondents, etc)
              // every reset of every new division and service
              prevRespond = row.countsDivision
              body.push(["No of Respondents: ",prevRespond,"","","","","","","",""])
              body.push(["No. and % of customers who rated the service as very satisfactory or better: ",Math.round(numberPrevVerySatis),prevVerySatis.toFixed(2).toString() + '%',"","","","","","",""])
              body.push(["No. and % of customers who rated the service as satisfactory or better: ",Math.round(numberPrevSatis),prevSatis.toFixed(2).toString() + '%',"","","","","","",""])
              body.push(["No. and % of customers who rated the service as Fair or Poor: ",Math.round(numberPrevPoor),prevPoor.toFixed(2).toString() + '%',"","","","","","",""])
              index +=4
              // add to total
              totalPrevRespond += prevRespond
              totalprevVerySatis += numberPrevVerySatis
              totalprevSatis += numberPrevSatis
              totalprevPoor += numberPrevPoor
              // reset
              prevVerySatis = 0
              prevSatis = 0
              prevPoor = 0
              numberPrevSatis = 0
              numberPrevVerySatis = 0
              numberPrevPoor = 0

            } 
        });
      body.push(["Total Summary of Citizen/Client Satisfaction Survey CCSS Rating ","","","","","","","","",""])
      body.push(["No. and % of customers who rated the Center's service as very satisfactory or better",Math.round(totalprevVerySatis),((totalprevVerySatis/totalPrevRespond)* 100).toFixed(2).toString() + '%',"","","","","","",""])
      body.push(["No. and % of customers who rated the Center's service as satisfactory or better",Math.round(totalprevSatis),((totalprevSatis/totalPrevRespond)* 100).toFixed(2).toString() + '%',"","","","","","",""])
      body.push(["No. and % of customers who rated the service as Fair or Poor",Math.round(totalprevPoor),((totalprevPoor/totalPrevRespond)* 100).toFixed(2).toString() + '%',"","","","","","",""])
      body.push(["Total No. of Respondents : ",totalPrevRespond,"","","","","","","",""])
        
      }
      else if(mode == 6){
          let copyColumns = columns.map(data => data);
          let mainArrayColumn = columns.map((data => data.label));
          body.push(mainArrayColumn);

          let copyData = data.map((rest ) => rest)
          // console.log("copys", copyData)
            
            let prevDivision = ''
            let prevService = ''
            let index = 0
            copyData.forEach(function(row) {
              if (row.service && row.division){
                 if(prevDivision != row.division || index == 0){
                  // push division and service row only if previous division not equal to current division
                  body.push(
                      [
                      {
                        text : "Division: ",
                        border: [true, true, false, false]
                      },
                      {
                        text : row.division,
                        colSpan: 3,
                        border: [false, true, false, false]
                      },
                      {
                        text : "",
                        border: [false, true, false, false]
                      },
                      {
                        text : "",
                        border: [false, true, false, false]
                      },
                      {
                        text : "",
                        border: [false, true, false, false]
                      },
                      {
                        text : "",
                        border: [false, true, false, false]
                      },
                      {
                        text : "",
                        border: [false, true, false, false]
                      },
                      {
                        text : "",
                        border: [false, true, false, false]
                      },
                      {
                        text : "",
                        border: [false, true, false, false]
                      },
                      {
                        text : "",
                        border: [false, true, false, false]
                      },
                      {
                        text : "",
                        border: [false, true, false, false]
                      },
                      {
                        text : "",
                        border: [false, true, false, false]
                      },
                      {
                        text : "",
                        border: [false, true, false, false]
                      },
                      {
                        text : "",
                        border: [false, true, true, false]
                      }
                    ])
                    body.push(
                    [
                    {
                      text : "Service: ",
                      border: [true, true, false, false]
                    },
                    {
                      text : row.service,
                      colSpan: 3,
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, true, false]
                    }
                  ])
                    index +=2
                  // set previous to present row 
                }
                 else if(prevService != row.service){
                   body.push(
                    [
                    {
                      text : "Service: ",
                      border: [true, true, false, false]
                    },
                    {
                      text : row.service,
                      colSpan: 3,
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, false, false]
                    },
                    {
                      text : "",
                      border: [false, true, true, false]
                    }
                  ])
                }
              }
              // assign current row data to prevdivision before check
              prevDivision = row.division
              prevService = row.service
              index ++
             
              var dataRow = [];
              copyColumns.forEach(function(column) {
                  if(row[column.field]){
                    if([column.label]){
                      dataRow.push(
                        {
                          text : row[column.field]
                        }
                        );
                    }
                  }else{
                    dataRow.push("");
                  }
              })
              body.push(dataRow);
              
          });
      }

        return body;
    }

 
  function buildOverall(alltsrs){
    // build tables inside PDF
    // Overall Performance of the Center Based on CSS Responses
    colsOverallPerformance.value = overAllColumns(divisioAndSectionList.value)
    rowsOverallPerformance.value = overAllRows(divisioAndSectionList.value,alltsrs)

    // Number of Customers and CSM Respondents Per Service Area
    numberOfCustomersColumns.value = numberOfCustomersColumnsData(divisioAndSectionList.value)
    numberOfCustomersRows.value = numberOfCustomersRowsData(divisioAndSectionList.value,alltsrs)
    
    // Summary of Citizen/Client Satisfaction Survey CCSS Rating
    summaryQuestionPerDivisionCols.value = summaryPerDivisionColumns(orderByPositionQuestions.value)
    summaryQuestionPerDivisionRows.value =  summaryPerDivisionRows(orderByPositionQuestions.value,divisioAndSectionList.value,alltsrs)
    
  }

  function compare( a, b ) {
      if ( a.division < b.division ){
        return -1;
      }
      if ( a.division > b.division ){
        return 1;
      }
      return 0;
    }

  function compare2( a, b ) {
      if ( a.service < b.service ){
        return -1;
      }
      if ( a.service > b.service ){
        return 1;
      }
      return 0;
    }

    
  async function generatePDF(){
    let alltsrs = []
    // get all tsrs
    
    if (beforeDate.value && afterDate.value){
      alltsrs = await getAllTsrsByYearMonth(beforeDate.value,afterDate.value)
    }else{
      // first day of year
      let yearToday = new Date().getFullYear()
      let startDate = new Date(yearToday, 0, 1);
      // current Date
      let afterDate = new Date()
      alltsrs = await getAllTsrsByYearMonth(startDate,afterDate)
    }
    // console.log("all tsrs", alltsrs)
    buildOverall(alltsrs)
    if (alltsrs.length == 0  ){
      $q.notify({
        message: 'No data found, PDF Creation Failed',
        color: 'negative',
        position: 'top'
      })
    }else{
      // sort by Division
    alltsrs = alltsrs.sort( compare );
    // sort by Service
    alltsrs = alltsrs.sort( compare2 );
    
    
    let rowalltsrs = buildRow(alltsrs)
    // for overall column table Overall Agency Citizen/ Client Satisfaction Score' deconstruct to get only field and label
    let overallCol = colsOverall.value.map(({ field, label }) => ({field, label}));
    // all survey columns  Customer Satisfaction Measurement
    let allSurveyCol = cols.value.map(({ field, label }) => ({field, label}));
    // column for overall performance Overall Performance of the Center Based on CSS Responses
    let overallPerformanceCols = colsOverallPerformance.value.map(({ field, label }) => ({field, label}));

     let rateColsTableValue = allSurveyCol.filter(function(x) {
       return x.field != 4
     })
    
     // set before month and after month
     let beforeMonth = (beforeDate.value) ? dateTimeMonth(beforeDate.value ) : "January"
     let afterMonth =  (afterDate.value) ? dateTimeMonth(afterDate.value ) : dateTimeMonth(Date.now())
     // pdf generated
     var dd = {
        pageSize: 'LEGAL',
        pageOrientation: 'landscape',
        pageMargins: [40, 60, 40, 40],
        header: {
          
          stack: [
            {
              text: 'METALS INDUSTRY RESEARCH AND DEVELOPMENT CENTER',
              style: 'header',
              fontSize: 11
            },
            {
              text: 'CUSTOMER SURVEY MANAGEMENT REPORT',
              style: 'header',
              fontSize: 13
            },
            {
              text: 'TECHNICAL AND SCIENTIFIC EQUIPMENT',
              style: 'header',
              fontSize: 13,
            },
            {
              text: 'As of 31 December 2020',
              style: 'header',
              fontSize: 11,
            },
            {
              text:
                'FOR WHICH ROBERT O DIZON, EXECUTIVE DIRECTOR, IS ACCOUNTABLE, HAVING ASSUMED SUCH ACCOUNTABILITY ON JANUARY 2016',
              style: 'header',
              bold: false,
              fontSize: 11
            }
          ],
          margin: [34, 28.91, 34, 21.54]
        },
        footer: function (currentPage, pageCount) {
          return {
            table: {
              widths: [100],
              body: [
                [
                  // {text: 'Confidential', alignment: 'center'},
                  {text: 'Page ' + currentPage + ' of ' + pageCount, alignment: 'center'}
                ]
              ]
            },
            layout: 'noBorders'
          };
        },
       content: [
          {text: 'Overall Agency Citizen/ Client Satisfaction Score', style: 'tableHeader'},
          {text: beforeMonth + ' - ' + afterMonth , style: 'tableHeader'},
          {
            table:{
              headerRows:1,
              body: buildTableBody(rowsOverall.value, overallCol,2,divisioAndSectionList.value)
              },
              style:"tableOverallAgency"
          },
          { 
             text: 'Customer Satisfaction Measurement', 
             style: 'tableHeader', 
             pageBreak: 'before', 
             pageOrientation: 'landscape' 
          },
          {
            table:{
              headerRows:1,
              // widths:[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
              // widths: [50, 40, 40,40, 35,35, 35,35, 35,35, 35,35, 35,35, 35],
              body: buildTableBody(rowalltsrs, rateColsTableValue,6,divisioAndSectionList.value)
              },
            style:"table"
          },
          { 
             text: 'Overall Performance of the Center Based on CSS Responses', 
             style: 'tableHeader', 
             pageBreak: 'before', 
             pageOrientation: 'landscape' 
          },
          {
            table:{
              headerRows:2,
              // widths:[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
              // widths: [50, 40, 40, 40,40, 35,35, 35,35, 35,35, 35,35, 35,35, 35],
              
              body: buildTableBody(rowsOverallPerformance.value, overallPerformanceCols,3,divisioAndSectionList.value)
              },
            style:"table"
          },
          { 
             text: 'Number of Customers and CSM Respondents Per Service Area', 
             style: 'tableHeader', 
             pageBreak: 'before', 
             pageOrientation: 'landscape' 
          },
          {
            table:{
              headerRows:2,
              // widths:[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
              // widths: 
              body: buildTableBody(numberOfCustomersRows.value, numberOfCustomersColumns.value,4,divisioAndSectionList.value)
              },
            style:"table"
          },
          { 
             text: 'Summary of Citizen/Client Satisfaction Survey CCSS Rating', 
             style: 'tableHeader', 
             pageBreak: 'before', 
             pageOrientation: 'landscape' 
          },
          {
            table:{
              headerRows:1,
              body: buildTableBody(summaryQuestionPerDivisionRows.value, summaryQuestionPerDivisionCols.value,5,divisioAndSectionList.value)
              },
            style:"table"
          },
        ],
        // page break
        pageBreakBefore: function(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
          return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
        },
        styles:{
          header:{
            "fontSize":14,
            "bold":true,
            "alignment": "center"
            },
          tableHeader:{
            "bold":true,
            "fontSize":16,
            "alignment": "center"
          },
          table:{
            "fontSize":10,
            "alignment": "center"
          },
          tableOverallAgency:{
            "fontSize":16,
            "alignment": "center"
          }
        },
       }
      var pdf = pdfMake.createPdf(dd);
      // pdf.download('Customer Survey Management System Report.pdf');
      pdf.open();
    }

    
   }

  async function getAllTsrsByYearMonth (before,after){
    let tsrMonth
    let alltsrs = []
    let beforeMom = moment(before).month()
    let currYear = moment(before).year()
    let diffMonths = Math.floor(moment(after).diff(moment(before), 'months', true))
    // console.log("diffmonths", diffMonths)
    
    for(let i=0 ; i<=diffMonths; i++){
      tsrMonth = await getTSRYearAndMonth(beforeMom,currYear)
      // console.log("curryear", currYear)
      // console.log("beforeMom", beforeMom)
      tsrMonth.forEach(element => {
        alltsrs.push(element)
      });
      if(beforeMom == 11){
        beforeMom = 0
        currYear += 1
      }else{
        beforeMom+= 1
      }
      
      
    }
    // console.log("give all the love" , alltsrs)
    return alltsrs
  }
  
  async function generateExcel () {
        let alltsrs = []
        let dateFirstRow
        // get all tsrs needed for generate data
        if (beforeDate.value && afterDate.value){
           alltsrs = await getAllTsrsByYearMonth(beforeDate.value,afterDate.value)
           dateFirstRow = moment(beforeDate.value).format('MMMM-YYYY') + ' - '   + moment(afterDate.value).format('MMMM-YYYY')
        }else{
           // first day of year
           let currYear = new Date().getFullYear()
           let startDate = new Date(currYear, 0, 1);
           // current Date
           let afterDate = new Date()
           alltsrs = await getAllTsrsByYearMonth(startDate,afterDate)
           dateFirstRow = 'January ' + currYear + ' - ' + moment(Date.now()).format('MMMM-YYYY')
        }

        if(alltsrs.length == 0){
          $q.notify({
            message: 'No data found,  Excel Creation Failed',
            color: 'negative',
            position: 'top'
          })
        }else{
          buildOverall(alltsrs)
          alltsrs = alltsrs.sort( compare );
    // sort by Service
          alltsrs = alltsrs.sort( compare2 );
          
          []
          let rowalltsrs = buildRow(alltsrs)
    // for overall column table Overall Agency Citizen/ Client Satisfaction Score' deconstruct to get only field and label
        let overallCol = colsOverall.value.map(({ field, label }) => ({field, label}));
        // all survey  Customer Satisfaction Measurement
        let allSurveyCol = cols.value.map(({ field, label }) => ({field, label}));
        // column for overall performance Overall Performance of the Center Based on CSS Responses
        let overallPerformanceCols = colsOverallPerformance.value.map(({ field, label }) => ({field, label}));

        let rateColsTableValue = allSurveyCol.filter(function(x) {
          return x.field != 4
        })

        
        
        /* make the worksheet */
        // Worksheets
        var rowsOverallWS = xlsx.utils.json_to_sheet(buildTableBody(rowsOverall.value, overallCol,2,divisioAndSectionList.value));
        
        let bodyArr = buildTableBody(rowalltsrs, rateColsTableValue,6,divisioAndSectionList.value)
        // format to be able to export to xlsx all survey results
        let bodyRowData = bodyArr.map(function(obj) {
          if(Array.isArray(obj)) {
            if(obj[0] && !(obj[0].hasOwnProperty('text'))){
              return obj
            }else{
              return obj.map(o => o.text)
            }
          }
          return obj
        })
        var rowalltsrsWS = xlsx.utils.json_to_sheet(bodyRowData)

        // need formatting on tables with colspan ( number of customers and overall performance)
        let a1 = buildTableBody(rowsOverallPerformance.value, overallPerformanceCols,3,divisioAndSectionList.value)
        let d1 = a1.map(function(obj) {
          if(Array.isArray(obj)) {
            for(let i =0 ; i < obj.length ; i++){
              if(obj[i] && (obj[i].hasOwnProperty('colSpan'))){
                let colspan = parseInt(obj[i]['colSpan'])
                let text = obj[i]['text']
                for (let j = 0; j < colspan ; j++){
                  obj[i+j] =  text
                }
              }
            }
          }
          return obj
        })
        // work sheet
        var rowsOverallPerformanceWS = xlsx.utils.json_to_sheet(d1);
        
        let a2 = buildTableBody(numberOfCustomersRows.value, numberOfCustomersColumns.value,4,divisioAndSectionList.value)
        let d2 = a2.map(function(obj) {
          if(Array.isArray(obj)) {
            for(let i =0 ; i < obj.length ; i++){
              if(obj[i] && (obj[i].hasOwnProperty('colSpan'))){
                let colspan = parseInt(obj[i]['colSpan'])
                let text = obj[i]['text']
                for (let j = 0; j < colspan ; j++){
                  obj[i+j] =  text
                }
              }
            }
          }
          return obj
        })
        // work sheet
        var numberOfCustomersRowsWS = xlsx.utils.json_to_sheet(d2);
        var summaryQuestionPerDivisionRowsWS = xlsx.utils.json_to_sheet(buildTableBody(summaryQuestionPerDivisionRows.value, summaryQuestionPerDivisionCols.value,5,divisioAndSectionList.value));

        // create workbook
        var Workbook = xlsx.utils.book_new();
        
 
        /* add to workbook */
        xlsx.utils.book_append_sheet(Workbook, rowsOverallWS, "Overall Agency Citizen Score");
        xlsx.utils.book_append_sheet(Workbook, rowalltsrsWS, "Customer Satisfaction Measure");
        xlsx.utils.book_append_sheet(Workbook, rowsOverallPerformanceWS, "Overall Performance CSS");
        xlsx.utils.book_append_sheet(Workbook, numberOfCustomersRowsWS, "Number of Customers Per Service");
        xlsx.utils.book_append_sheet(Workbook, summaryQuestionPerDivisionRowsWS, "Summary of Citizen CCSS Rating");


        /* generate an XLSX file */
        xlsx.writeFile(Workbook, dateFirstRow.toString() +" CSMS Raw Data .xlsx");
        }

        
        
      }
    

   onMounted( async () => {
    console.log("mounted")
    showLoadingData()
    // first to be called
    try {
        
        questions.value = await  getQuestionsWithoutAns() // check
        // questions.value = await  getQuestions() // check
        
    }catch (err){
      console.log("error", error)
    }
    
    // filters
    divisioAndSectionList.value = await getDivList()
    divisionsWithServ.value = [...new Set(divisioAndSectionList.value.map(a => a.division))]

    // count of services per division
    divisions.value = await getCountServicePerDivision()
    let a = await getQuestionsWithoutAns()

    // console.log("A",a )
    // console.log("questions.value",questions.value)
    // divisions.value = divisions.value.map( item => item.division)

   
    
    await onRequest({
        pagination: pagination.value,
        filter: undefined
      })

    await loadDivisionDataOverall(divisions.value)

    hideLoading()

    
    
    
  })

  async function dataUpdateWithDate(){
    showLoadingData()
    pagination.value.page = 1
    let suc = await dateform.value.validate()
    if(suc){
      await onRequest({
        pagination: pagination.value,
        filter: undefined
        })
        await loadDivisionDataOverall(divisions.value)
    }
    hideLoading()
  }

  function onRowClick (evt, row) {
    prompt.value = true
    tsrData.value = row
  }


  async function returnMigrationData (file) {
      let duplicatesFound = 0;
      // 0 == NO ERROR SUCCESSFUL MIGRATION
      // 1 == ERROR FOUND IN FILE
      // 2 == DUPLICATE FOUND
      let success = 0;

      var reader = new FileReader()
      

      return new Promise((resolve, reject) => {
        reader.onerror = () => {
          reader.abort();
          reject(new DOMException("Problem parsing input file."));
        };

        reader.onload = () => {
          resolve(reader.result);
        };
         reader.readAsArrayBuffer(file)
      });
     
      
    }

  async function uploadMigrationData(migrationData,year){


      let finalArrObj = []
          
      migrationData.forEach(r => {
      
          // Object { foo: "bar", x: 42 }
        // console.log("r", r, " year", year)
        // console.log("rmonth", r.Month, " year", year)
        let dateyear = r.Month.toString() + ' ' + year.toString()
        
        let datesubmit = new Date(dateyear)
        const obj = {
            division: r.Division,
            service: r.Service,
            industry: r.Sector,
            tsrNo: r.TSRNo,
            submittedAt: datesubmit
          }
        let answers = []
        for (var key in r) {
            if (r.hasOwnProperty(key)) {
                // console.log(key + " -> " + r[key]);
                key = key.split(",");
                // console.log(key[0])
                let tsr = r.TSRNo
                if(key[1]){
                  const answer = {
                    answerid: "",
                    value: r[key].toString(),
                    question: key[1].toString(),
                    tsrNo: tsr
                  }
                  answers.push(answer)
                }
            }
        }
        obj["answers"] = answers
        finalArrObj.push(obj)
      })

      const uniqueValues = new Set(finalArrObj.map(v => v.tsrNo));
      const nounique = (finalArrObj.map(v => v.tsrNo));
      const uniqarr = Array.from(uniqueValues);
      // console.log("finalArrObj.length",finalArrObj.length)
      // console.log("uniqueValues.length",uniqueValues.length)
      // console.log("finalArrObj.length",finalArrObj)
      // console.log("uniqueValues.length",uniqueValues)
      let difference = uniqarr
                 .filter(x => !nounique.includes(x))
                 .concat(nounique.filter(x => !uniqarr.includes(x)));
      // console.log("intersection", difference)

      if (uniqueValues.size < finalArrObj.length) {
        // duplicates found true if 1; 0 if none
        return 2
      }else{
        for (const arrayItem of finalArrObj) {
          let answers = []
          // console.log("arrayitem", arrayItem)
          let resCode = await postAnswers(answers,arrayItem.answers,arrayItem.tsrNo,arrayItem.industry,arrayItem.service,arrayItem.division,arrayItem.submittedAt)
          if (resCode != '200'){
            
            return 1
          }
            
          // await this.responsesSrvc.create(data2)
        }
      }
      
      
      await onRequest({
          pagination: pagination.value,
          filter: undefined
        })
      return 0
  }



  async function fetchFromServer (startRow, count, filter, sortBy, descending) {
        // console.log("startrow fetch", startRow,count)
        // console.log("beforeDate.value && afterDate.value fetch",beforeDate.value ,afterDate.value)
        let mode
        if(division.value || service.value ){
          mode = 4
        }else{
          mode = 1
        }
        if (beforeDate.value && afterDate.value){
          // console.log("if")
          // console.log("division.value",division.value)
          // console.log("service.value",service.value)
          if(filter){
            tsrList.value= await getTSRsFromApi(startRow,count,division.value,service.value,beforeDate.value,afterDate.value,mode,filter)
          }else{
            tsrList.value= await getTSRsFromApi(startRow,count,division.value,service.value,beforeDate.value,afterDate.value,mode,"")
          }
          
          // console.log("tsrList.value before true and after true ", tsrList.value )
        }
        else{
          // console.log("else")
          // console.log("division.value",division.value)
          // console.log("service.value",service.value)
          if(filter){
            tsrList.value = await getTSRsFromApi(startRow,count,division.value,service.value,today+'-01-01',today+'-12-31',mode,filter)
          }else{
            tsrList.value = await getTSRsFromApi(startRow,count,division.value,service.value,today+'-01-01',today+'-12-31',mode,"")
          }
          
          // console.log("tsrList.value after ", tsrList.value )
        }
        
      rowsTable.value =  buildTable()

      // if (filter){
      //   filter = filter.toUpperCase()
      // }
      // let data = filter ? rowsTable.value.filter(row => row.tsrNo.includes(filter)) : rowsTable.value.slice()
      // { "sortBy": "desc", "descending": false, "page": 1, "rowsPerPage": 10, "rowsNumber": 876 }
      // { "sortBy": "desc", "descending": false, "page": 1, "rowsPerPage": 10, "rowsNumber": 873 }
      // handle sortBy
      if (sortBy) {
        const sortFn = sortBy === 'desc'
          ? (descending
              ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
              : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
            )
          : (descending
              ? (a, b) => (parseFloat(b[ sortBy ]) - parseFloat(a[ sortBy ]))
              : (a, b) => (parseFloat(a[ sortBy ]) - parseFloat(b[ sortBy ]))
            )
        rowsTable.value.sort(sortFn)
      }
      // last page not equal to rows per page 
      // if(data.length < pagination.value.rowsPerPage){
      //   return data
      // }else{  
        
      // }
      return rowsTable.value
      
    }
    function averageLastTable (cols,rows){
      let x = cols.map(a => {
        return {
          field: a.field,
          label: a.name
        }
        });
      
      // const unique = [...new Set(cols.map(item => item.group))]; // [ 'A', 'B']
      // name of all columns
      let avgArrayWithKeys = []
      // console.log("keysObject",keysObject)
      for(let i =0; i< x.length; i++){
        let avgObv = {}
        // build last row data object with key being the questionID
        avgObv[x[i].field] = []
        avgObv['id'] = x[i].label
        //  push array of answers per question
        
        // map all keys with value and return in to the array
        let xy = rows.map(function(item){ 
          return item[x[i].field]; 
          });
        // console.log("xy", xy)

          // remove undefined
        var filtered = xy.filter(function(x) {
            if ( x != undefined || x == '' || !isNaN(x)){
              return x
            }
        });
        let sum = 0
        for(let j=0 ; j<filtered.length ; j++){
          if (!isNaN(filtered[j])){
            sum = sum+parseFloat(filtered[j])
          }
        }
        let val = parseFloat((Math.round((sum/filtered.length) * 100) / 100).toFixed(2))
        if (isNaN(val)){
          avgObv['value'] = 0
        }else{
          avgObv['value'] = val
        }
        avgObv['visible'] = false
        avgArrayWithKeys.push(avgObv)
        
      }
      // console.log("avgArrayWithKeys",avgArrayWithKeys)
      return avgArrayWithKeys

    }

  async function onRequest(props) {

      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter

      loading.value = true
      overallLoading.value = true

      // check whether there is a given date
      if(beforeDate.value && afterDate.value){
        beforeDate.value =  dateTime(beforeDate.value)
        afterDate.value =  dateTime(afterDate.value)
        if(division.value || service.value){
          totalTsrsCount.value = await totalTsrsCountWithDivisions(division.value,service.value,beforeDate.value, afterDate.value,filter)
        }else{
          totalTsrsCount.value = await totalTsrsCount(beforeDate.value, afterDate.value,filter)
        }
        // console.log("totalTsrsCount.value ",totalTsrsCount.value )
        
      }else{
        let currYear = new Date().getFullYear()
        if(division.value || service.value){
          totalTsrsCount.value = await totalTsrsCountWithDivisionsByYear(division.value,service.value,currYear,filter)
        }else{
          totalTsrsCount.value  = await totalTsrsCountByYear(currYear,filter)
        }
        
      }

      //
      if(rowsOverall.value.length ==0){
        // rows overall generate data
        for (let i=0; i<orderByPositionQuestions.value.length ; i++){
        let row = {
          dimension: orderByPositionQuestions.value[i].description,
          id: orderByPositionQuestions.value[i].id
        }
          if(orderByPositionQuestions.value[i].question_type == 2){
            rowsOverall.value.push(row)
          }
        
       }
       
      }

      
      
      

      loading.value = true

      // emulate server

       

      // pagination count
      pagination.value.rowsNumber = totalTsrsCount.value
      // get all rows if "All" (0) is selected
      
      

      // calculate starting row of data
      const startRow = (page - 1) * rowsPerPage

      const fetchCount = rowsPerPage === 0 ? totalTsrsCount.value : rowsPerPage
      
      
      const returnedData = await fetchFromServer(startRow, fetchCount, filter, sortBy, descending) 
      // console.log("returnedData",returnedData)
      // fetch data from "server"
      
      divisionList.value = [...new Set(tsrList.value.map(item => item.division))].filter(function(val) { return val !== null; });
      

      // clear out existing data and add new
      rows.value.splice(0, rows.value.length, ...returnedData)

      // dynamic average per column
      finalAverageDataRow.value  = averageLastTable(cols.value,rows.value)

      // don't forget to update local pagination object
      pagination.value.page = page
      pagination.value.rowsPerPage = rowsPerPage
      pagination.value.sortBy = sortBy
      pagination.value.descending = descending

      // ...and turn of loading indicator
      loading.value = false
      overallLoading.value = false

      
  }
    return {
      rowsTable,
      rowsFilter,
      answers,
      listOfTsr,
      cols,
      // file related functions
      generateExcel,
      generatePDF,
      beforeDate,
      afterDate,
      // dialogs
      prompt,
      uploadDialog,
      //
      onRowClick,
      viewsurveyanswer,
      tsrData,
      dateform,
      dateTime,
      filter,
      // pagination
      onRequest,
      pagination,
      // row data
      rows,
      loading,
      finalAverageDataRow,
      //overall
      rowsOverall,
      colsOverall,
      overallLoading,
      overAllAverage,
      titleOverall,
      //file upload
      importFile,
      fileUpload,
      //delete
      // deleteAnswers,
      showLoading,
      dataUpdateWithDate,
      // filter divisions
      division,
      service,
      services,
      divisions,
      fillSectionList,
      divisionsWithServ,
      showFilter,
      showFunctions,
      visibleColumns,
      visibleColumnsAverage:  computed(() => {
        finalAverageDataRow.value.forEach(element => {
          let arr = Object.values(visibleColumns.value)
          if (arr.includes(element.id) ){
            element.visible = true
          }else{
            element.visible = false
          }
          
        });
        return finalAverageDataRow.value.filter(a => a.visible)
      }),
      toggles,
      userLoggedin
    }
  }
  
})


</script>
