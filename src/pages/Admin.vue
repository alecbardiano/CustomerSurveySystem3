<template>
      <div class="q-pa-lg" >
        <div class="row">
              <div class="col-md-4" >
                <q-form ref="dateform">
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
                  <q-input outlined filled mask="date" v-model="afterDate" lazy-rules :rules="[val => val >= beforeDate || 'Field should be later than before date']"   placeholder="mm/dd/yy" hint="End Date" >
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
                </q-form>
              </div>
              <div class=".col-md-4 .offset-md-4"  >
                <div class="row inline">
                  
                  
                </div>
              </div>
          </div>
    
        <div class="row">
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
          <div class="col-md-4 offset-md-4">
            <div class="row inline">
            <q-btn
              type="submit"
              label="Generate Raw Data"
              class="q-mt-md"
              color="primary"
              @click="exportTable(rows)"
          />
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

    <q-table
      class="overallAverage"
      v-if="rows"
      title="Survey Results"
      :rows="rows"
      :columns="cols"
      row-key="name"
      @row-click="onRowClick"
      :loading="loading"
      :filter="filter"
      v-model:pagination="pagination"
      @request="onRequest"
      separator="cell"
    >
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
          <q-td v-bind:key="column.key" v-for="column in finalAverageDataRow">  
              <p v-if="column.tsrNo">Average: </p>
              <!-- nan values remove -->
              
              <p v-else-if="column.value != 0 && !(isNaN(column.value))">{{ column.value }}</p>
            </q-td>
        </q-tr>
      </template>
    </q-table>
      
  </div>
  <div class="q-pa-md">
    <!-- :loading="loading" -->
    <q-table
        
        title="Overall Agency Citizen/ Client Satisfaction Score"
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
      <!-- <template v-slot:top-right>
        <q-input class ="placeholderClass" borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon class="searchClass" name="search" />
          </template>
        </q-input>
      </template> -->
      <template v-slot:bottom-row>
        <q-tr>
          <q-td v-bind:key="column.key" v-for="column in overAllAverage">
              <p v-if="column.dimension">Average: </p>
              <p v-else-if="column.value != 0  ">{{ column.value }}</p>
            </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>

  <!-- modal view answer -->

  <q-dialog v-model="prompt" >
    <viewsurveyanswer v-model="tsrData" :cols="cols"></viewsurveyanswer>
  </q-dialog>



</template>
<script>
import { reactive, defineComponent, ref, onMounted, computed , watch} from 'vue'
import { getQuestions, getTSRs,postAnswers, tsrViaDivision, getOverall,deleteAll,totalTsrsCount, getDivList, getAnswers} from 'src/axioshelper.js'
import { overAllColumns, overAllRows,numberOfCustomersColumnsData,numberOfCustomersRowsData, summaryPerDivisionRows, summaryPerDivisionColumns  } from 'src/utils/dataRetrieveTables.js'
import { exportFile, useQuasar} from 'quasar'
import { xlsx, pdfMake } from 'boot/axios'
// import {pdfFonts} from "pdfmake/build/vfs_fonts";
// import { createPdf } from 'pdfmake'
import moment from 'moment';
import orderBy from 'lodash.orderby'

import parDocDefinition from '../utils/pdflayout'


//components
import viewsurveyanswer from '../components/modals/ViewSurveyAnswer.vue'
import CardDashboardFeedbackCountVue from 'src/components/CardDashboardFeedbackCount.vue';



// let pdfMake = require('pdfmake/build/pdfmake.js')
// if (pdfMake.vfs == undefined){
//   let pdfFonts = require('pdfmake/build/vfs_fonts.js')
//   pdfMake.vfs = pdfFonts.pdfMake.vfs;
// }



export default defineComponent({
  name: 'Admin',
  components: { viewsurveyanswer },
  
  setup () {

  const divisioAndSectionList = ref([])

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
  let today = new Date();
  today = moment().year()

  const orderKey = ref('position')

  const orderByPositionQuestions = computed(() => {
      return orderBy(questions.value, orderKey.value)
    });
  const questions = ref([])
    
  const tsrList = ref ([])
  // tables
  const rows = ref([])
  const cols = ref([])
  

  const filter = ref('')
  
  const loading = ref(true)
  const pagination = ref({
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 5
  })
  const startDataFromApi = ref(1)
  const endDataFromApi = ref(100)

  // pdf
  

  watch(afterDate, (newValue, oldValue) => {

    dateform.value.validate().then(success => {
      // filterTable(newValue,1)
      if (success) { 
          onRequest({
          pagination: pagination.value,
          filter: undefined
        })
      }
    })
    
  })
  
  

  const tsrData = reactive({})
  const finalAverageDataRow = ref([])
  
  // overall
  const divisionList = ref([])
  const rowDataDivision = ref([])
  const overAllAverage = ref(null)
  const colsOverall = ref([])
  const rowsOverall = ref([])
  const overallLoading = ref(true)

  // overall Perf for PDF
  const rowsOverallPerformance = ref([])
  const colsOverallPerformance = ref([])

  // numbers of customers PDF
  const numberOfCustomersRows = ref([])
  const numberOfCustomersColumns = ref([])

   // Summary of Citizen/Client Satisfaction Survey CCSS Rating PDF
  const summaryQuestionPerDivisionRows = ref([])
  const summaryQuestionPerDivisionCols = ref([])

  // for pdf
  const allTsrList = ref ([]) // all data


  // upload/import data
  const uploadRefButton = ref(null)
  

  
  


  const getTSRsFromApi = async (start,limit) => {
    // update `props.user` to `user.value` to access the Reference value

      try {
        // upon startup we can initialize data to 1 - rows per page which is 50
        
        // lengthOfAnswers.value = answers.value.length
        if(beforeDate.value && afterDate.value){
          console.log("Wehweh?")
          return await getTSRs(start,limit,"","",beforeDate.value,afterDate.value,1)
        }else{
          console.log("dito naman pala")
          return await getTSRs(start,limit,"","","","",1)
        }
        
      }
      catch(err) {
        throw(err)
        error.value = err
      }
  }

  // function tsrExist(tsrNo,arrayAnswer) {

    
  // }
  
  // function deleteAnswers (){
  //   deleteAll()
  // }
  function buildTable(){
    let rowData = []
    if(cols.value.length == 0){
      cols.value.push({ name: 'tsrNo', align: 'left', label: 'TSR Number', field: 'tsrNo', sortable: true })
      cols.value.push({ name: 'division', align: 'left', label: 'Division', field: 'division', sortable: true })
      cols.value.push({ name: 'service', align: 'left ', label: 'Service', field: 'service', sortable: true })
      cols.value.push({ name: 'industry', align: 'left', label: 'Industry', field: 'industry', sortable: true })
      
      // var uniqueKeys = Object.keys(answers.value.reduce(function(result, obj) {
      //   return Object.assign(result, obj);
      // }, {}))
      // console.log("builduniquekeys", uniqueKeys)
      // unique question

      // const picked = (({ id, description }) => ({ id, description }))(result);
      // console.log("pick", picked)
      // filtered object of answers
      // get questions
      // map answers

      // const idAndQuestion = [...new Set(result.map(({ id, description }) => ({id, description})))]; // [ 'A', 'B']
      // console.log("idididid", idAndQuestion)
      
      // const uniqueQuestions = [...new Map(idAndQuestion.map(item =>[item['id'], item])).values()];
      // console.log("hellooo2323232",orderByPositionQuestions.value)
      for (let j =0; j < orderByPositionQuestions.value.length ; j++){
        // remove subheaders in columns filter
        if(orderByPositionQuestions.value[j].question_type.id != 5){
        let column = {
          name: '',
          align: 'left',
          label: '',
          field: '',
          sortable: true
        }
        // dynamic here for the question
        // console.log("helloooo", listOfTsr.value[0].questionsWithAnswer[j])

        // change this code
        column.name = orderByPositionQuestions.value[j].description
        column.label = orderByPositionQuestions.value[j].description
        column.field = orderByPositionQuestions.value[j].id
        cols.value.push(column)
        
        }
        // console.log("cooooolss", cols.value)
      }
        
      cols.value.push({ name: 'publishedDate',align: 'left', label: 'Date', field: 'publishedDate', sortable: true })
    }
    
    // console.log("completed cols", cols.value)
    // push columns for q table data
    //map this to columns and rows for visualization
    console.log("tsrList.value.",tsrList.value)
    tsrList.value.map(function(item){
      // console.log("itemssss", item)
      let row = {
        tsrNo: item.tsrNo,
        publishedDate:dateTime(item.published_at),
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
        // console.log("rororororw", row)'
        // console.log("rororo", row)
        // delete person.age;
        rowData.push(row)
      
    })
    // let keysObject = Object.keys(averageColumns.value)

      // load overall
     console.log("rowdata",rowData)
    
    return rowData

  }
  async function loadDivisionDataOverall(divlist){
    console.log("divlist", divlist)
    overallLoading.value = true
    if(colsOverall.value.length > 0){
      colsOverall.value = []
    }
    colsOverall.value.push({ name: 'Dimension' ,align: 'left', label: 'Dimension', field: 'dimension' , sortable: true, style:"width: 300px" })
  
    let dataDivision = []
    // console.log("hellodivlistload divisin data", rowsOverall.value)
    // console.log("hellodivlistload divisin data", divlist)
    colsOverall.value.push({ name: 'Score' ,align: 'left', label: 'Score All in Service', field: 'scoreservice' , sortable: true ,  style:"width: 300px"})
    for(let i =0; i<divlist.length; i++){
      colsOverall.value.push({name: divlist[i] ,align: 'left', label: divlist[i], field: divlist[i] , sortable: true })
      for (let j=0; j<rowsOverall.value.length; j++){
        
        dataDivision = await getOverall(divlist[i],"",rowsOverall.value[j].id,beforeDate.value,afterDate.value)
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
          rowsOverall.value[j][divlist[i]] = avg
          // rowsOverall.value[j].divlist[i] = avg
        }else{
          rowsOverall.value[j][divlist[i]] = 0
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
        if((partialObject[div]) == 0){
          break;
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
      if(isNaN(avg)){
        avg = 0
      }
      rowsOverall.value[i]["scoreservice"] = avg
    }
    

    // console.log("roworworworow")
    // console.log(rowsOverall.value)

    overAllAverage.value = await averageLastTable(colsOverall.value,rowsOverall.value)
    overallLoading.value = false
    // api call from axioshelper

  }

  function dateTime(value) {
    return moment(value).format('YYYY/MM/DD');
  }



   function fileUpload(file) {
     uploadMigrationData(file)
     onRequest({
        pagination: pagination.value,
        filter: undefined
      })
     console.log("pasok")
    
   }

    function buildTableBody(data, columns, mode,divisionsAndSections) {

      console.log("colssss",columns)
      console.log("data", data)
        // survey results ALL with extra header
        var body = [];
      
        
        // let divisions = Object.keys(divisionsAndSections)
        console.log("columns,", columns)
        if(mode == 2){
          let copyColumns = columns.map(a => a);
          let mainArrayColumn = columns.map((a => a.label));
          body.push(mainArrayColumn);
          // console.log("copyColumns",copyColumns)
          // console.log("mainArrayColumn",mainArrayColumn)
          // console.log("divisionList",divisionList.value)
          // console.log("data" ,data )
          // console.log("columns")
          // body.push(["hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy",])
          let copyData = data.map((rest ) => rest)
            
            
            copyData.forEach(function(row) {
                // if(row.null){
                //   delete row.null
                // }
                var dataRow = [];
                // let merged = {...row, ...columns};
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
        // first header
        arrFirstHeader.push({})
        arrFirstHeader.push({})
        for(let div in divisionsAndSections){
          console.log("div he", div)
          console.log("div she", divisionsAndSections[div].length)
          arrFirstHeader.push({text: div, colSpan: divisionsAndSections[div].length})
          for(let i =0; i< divisionsAndSections[div].length-1; i++){
            arrFirstHeader.push({})
          }
        }
        body.push(arrFirstHeader)
        
        let mainArrayColumn = columns.map((a => a.label));
        // 2nd header
        body.push(mainArrayColumn);
        console.log("body after push mainarray cols",mainArrayColumn)
        let copyData = data.map((rest ) => rest)
        console.log("copyData",copyData)

        // data
        copyData.forEach(function(row) {
            // if(row.null){
            //   delete row.null
            // }
            var dataRow = [];
            // let merged = {...row, ...columns};
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
        for(let div in divisionsAndSections){
          console.log("div he", div)
          console.log("div she", divisionsAndSections[div].length)
          arrFirstHeader.push({text: div, colSpan: divisionsAndSections[div].length})
          for(let i =0; i< divisionsAndSections[div].length-1; i++){
            arrFirstHeader.push({})
          }
        }
        arrFirstHeader.push({})
        body.push(arrFirstHeader)
        
        let mainArrayColumn = columns.map((a => a.label));
        // 2nd header
        body.push(mainArrayColumn);
        console.log("body after push mainarray cols",mainArrayColumn)
        let copyData = data.map((rest ) => rest)
        console.log("copyData",copyData)

        // data
        copyData.forEach(function(row) {
            // if(row.null){
            //   delete row.null
            // }
            var dataRow = [];
            // let merged = {...row, ...columns};
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
      else if(mode == 5){
        let copyColumns = columns.map(a => a);
        let mainArrayColumn = columns.map((a => a.label));
        body.push(mainArrayColumn);
        const mainCounts = {
          5: 0, 
          4: 0,
          3: 0, 
          2: 0,
          1: 0,
        };
        // console.log("copyColumns",copyColumns)
        // console.log("mainArrayColumn",mainArrayColumn)
        // console.log("divisionList",divisionList.value)
        // console.log("data" ,data )
        // console.log("columns")
        // body.push(["hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy",])
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
            if(index % 11 == 0 ){
              body.push(
                	["Division: ",row.division,"","","","","","","",""]
                )
              body.push(["Service: ",row.service,"","","","","","","",""])
              index+=2
            }
            var dataRow = [];
            // let merged = {...row, ...columns};
            copyColumns.forEach(function(column) {
                
                if(row[column.field]){
                  
                  // overall rating
                  if(column.field == 12){
                    if(row[column.field]){
                    console.log("overall?12", column)
                    console.log("overall?12row", row)
                    
                    if(row.id == 5 || row.id == 4){
                      console.log("row[column.field] inside",row[column.field])
                     
                      let res = parseFloat(row[column.field]) 
                      prevVerySatis += res
                      console.log('res parse', res)
                      res = (res/100)  * row.countsDivision
                      numberPrevVerySatis += res
                      
                     }else if (row.id == 3){
                      let res = parseFloat(row[column.field]) 
                      console.log('res parse', res)
                      // res = res * row.countsDivision
                      prevSatis += res
                      res = (res/100)  * row.countsDivision
                      numberPrevSatis += res
                     }else if (row.id <= 2){
                      let res = parseFloat(row[column.field]) 
                      prevPoor += res
                      console.log('res parse', res)
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
                // prevVerySatis = withinPrevVery
            })
            body.push(dataRow);
            
            index +=1
            if (((index +4) % 11 == 0 ) || index == 7){
              // off set rows for other fields in the rows (no of respondents, etc)
              // every reset of every new division and service
              prevRespond = row.countsDivision
              body.push(["No of Respondents: ",prevRespond,"","","","","","","",""])
              body.push(["No. and % of customers who rated the service as very satisfactory or better: ",Math.round(numberPrevVerySatis),prevVerySatis.toString() + '%',"","","","","","",""])
              body.push(["No. and % of customers who rated the service as satisfactory or better: ",Math.round(numberPrevSatis),prevSatis.toString() + '%',"","","","","","",""])
              body.push(["No. and % of customers who rated the service as Fair or Poor: ",Math.round(numberPrevPoor),prevPoor.toString() + '%',"","","","","","",""])
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
      // body.push(["Total Summary of Citizen/Client Satisfaction Survey CCSS Rating ","","","","","","","","",""])
      body.push(["No. and % of customers who rated the Center's service as very satisfactory or better",Math.round(totalprevVerySatis),((totalprevVerySatis/totalPrevRespond)* 100).toString() + '%',"","","","","","",""])
      body.push(["No. and % of customers who rated the Center's service as satisfactory or better",Math.round(totalprevSatis),((totalprevSatis/totalPrevRespond)* 100).toString() + '%',"","","","","","",""])
      body.push(["No. and % of customers who rated the service as Fair or Poor",Math.round(totalprevPoor),((totalprevPoor/totalPrevRespond)* 100).toString() + '%',"","","","","","",""])
      // body.push(["No. and % of customers who didn't have an Overall Answer: ",totalprevPoor,"","","","","","","",""])
      body.push(["Total No. of Respondents : ",totalPrevRespond,"","","","","","","",""])
        
      }
      else if(mode == 6){
         let copyColumns = columns.map(a => a);
          let mainArrayColumn = columns.map((a => a.label));
          body.push(mainArrayColumn);
          // console.log("copyColumns",copyColumns)
          // console.log("mainArrayColumn",mainArrayColumn)
          // console.log("divisionList",divisionList.value)
          // console.log("data" ,data )
          // console.log("columns")
          // body.push(["hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy","hoy",])
          
          let copyData = data.map((rest ) => rest)
            
            let prevDivision = ''
            let prevService = ''
            let index = 0
            copyData.forEach(function(row) {
              // if(row.null){
              //   delete row.null
              // }
              if (row.service && row.division){
                 if((prevDivision != row.division) || index == 0){
                  
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
                  // set previous to present row 
                  
                }
                if(prevService != row.service){
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
              prevDivision = row.division
              prevService = row.service
              index ++
             
              var dataRow = [];
              // let merged = {...row, ...columns};
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
              // compare for next row
              
          });
      }
     
      
      console.log("bodysdsdf", body)

        return body;
    }

 
  async function buildOverall(){
    // build tables inside PDF
    colsOverallPerformance.value = overAllColumns(divisioAndSectionList.value)
    rowsOverallPerformance.value = await overAllRows(divisioAndSectionList.value)

    // Number of Customers and CSM Respondents Per Service Area
    numberOfCustomersColumns.value = numberOfCustomersColumnsData(divisioAndSectionList.value)
    numberOfCustomersRows.value = numberOfCustomersRowsData(divisioAndSectionList.value,tsrList.value)
    
    summaryQuestionPerDivisionCols.value = summaryPerDivisionColumns(orderByPositionQuestions.value)
    summaryQuestionPerDivisionRows.value = await summaryPerDivisionRows(orderByPositionQuestions.value,divisioAndSectionList.value,tsrList.value)
    

    console.log("summaryQuestionPerDivisionRows,",summaryQuestionPerDivisionRows.value)
    console.log("summaryQuestionPerDivisionCols,",summaryQuestionPerDivisionCols.value)
  }
    
  async function generatePDF(){

    buildOverall()
    
    if (beforeDate.value && afterDate.value){
      let alltsrs = await getTSRsFromApi(0,totalTsrsCount.value,"","",beforeDate.value,afterDate.value,1)
    }else{
      let alltsrs = await getTSRsFromApi(0,totalTsrsCount.value,"","",today+'01-01',today+'12-31',1)
    }
  
    // for overall column table Overall Agency Citizen/ Client Satisfaction Score' deconstruct to get only field and label
    let overallCol = colsOverall.value.map(({ field, label }) => ({field, label}));
    // all survey  Customer Satisfaction Measurement
    let allSurveyCol = cols.value.map(({ field, label }) => ({field, label}));
    // column for overall performance Overall Performance of the Center Based on CSS Responses
    let overallPerformanceCols = colsOverallPerformance.value.map(({ field, label }) => ({field, label}));

     let rateColsTableValue = allSurveyCol.filter(function(x) {
       return x.field != 4
     })
     // pdf generated
     var dd = {
        pageSize: 'LEGAL',
        pageOrientation: 'landscape',
        pageMargins: [40, 60, 40, 40],
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
          {
            table:{
              headerRows:1,
              body: buildTableBody(rowsOverall.value, overallCol,6,divisioAndSectionList.value)
              },
              style:"table"
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
              body: buildTableBody(rowsTable.value, rateColsTableValue,6,divisioAndSectionList.value)
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
              // widths:[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
              // widths: 
              body: buildTableBody(summaryQuestionPerDivisionRows.value, summaryQuestionPerDivisionCols.value,5,divisioAndSectionList.value)
              },
            style:"table"
          },
        ],
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
          }
        },
       }
      var pdf = pdfMake.createPdf(dd);
      // pdf.download('Customer Survey Management System Report.pdf');
      pdf.open();
   }
  
  function wrapCsvValue (val, formatFn) {
    let formatted = formatFn !== void 0
      ? formatFn(val)
      : val

    formatted = formatted === void 0 || formatted === null
      ? ''
      : String(formatted)

    formatted = formatted.split('"').join('""')
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')

    return `"${formatted}"`
  }
  function exportTable (data) {
        // naive encoding to csv format
        const content = [cols.value.map(col => wrapCsvValue(col.label))].concat(
          data.map(row => cols.value.map(col => wrapCsvValue(
            typeof col.field === 'function'
              ? col.field(row)
              : row[ col.field === void 0 ? col.name : col.field ],
            col.format
          )).join(','))
        ).join('\r\n')

        // change this name to quarterly
        const status = exportFile(
          'table-export.csv',
          content,
          'text/csv'
        )

        if (status !== true) {
          $q.notify({
            message: 'Browser denied file download...',
            color: 'negative',
            icon: 'warning'
          })
        }
      }
    

   onMounted( async () => {
    console.log("mounted")
    // first to be called
    try {
        questions.value = await getQuestions() // check
    }catch{
      
    }
    
    divisioAndSectionList.value = await getDivList()
    let divisions = Object.keys(divisioAndSectionList.value)
    console.log("ddsdds", divisions)

    
    await onRequest({
        pagination: pagination.value,
        filter: undefined
      })
    await loadDivisionDataOverall(divisions)
    
  })

  function onRowClick (evt, row) {
      console.log("clicked")
      prompt.value = true
      tsrData.value = row
      console.log("tssrrr", tsrData.value)
    }

  function filterDateBet(row,beforeDate,afterDate){
    row.publishedDate = dateTime(row.publishedDate) // convert to readable date time mm/dd/yyyy
    if ( beforeDate <= row.publishedDate && row.publishedDate <= afterDate ){
      return row
    }
  }

  async function uploadMigrationData (file) {
      // this.$refs.uploadMigrationButton.click()
      // console.log("fefefe2", uploadRefButton.value)
      // console.log("fefefe", file)
      // let file = uploadRefButton.value.files[0]
      // console.log('File', file)

      var reader = new FileReader()
      loading.value = true
      reader.onload = async (e) => {
        const data = e.target.result
        /* skip the first 4 rows */
        // var range = XLSX.utils.decode_range(data['!ref']);
        // range.s.r = 3; // <-- zero-indexed, so setting to 1 will skip row 0
        // data['!ref'] = XLSX.utils.encode_range(range); 
        const rowsMigrate = xlsx.utils.sheet_to_json(xlsx.read(data, { type: 'binary', cellDates: true }).Sheets['Details of CSF forms'])
        // console.log('rowsMigrate', rowsMigrate)
        let finalArrObj = []
         rowsMigrate.forEach(r => {
         
            // Object { foo: "bar", x: 42 }
          const obj = {
              division: r.Division,
              service: r.Service,
              industry: r.Sector,
              tsrNo: r.TSRNo,
              Month: r.Month
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
          // let division = rowMig.Division
          // let service = rowMig.Service
          // let industry = rowMig.Sector
          // let TsrNo = rowMig.TSRNo
        })
        
        

        console.log('validData', finalArrObj)

        for (const arrayItem of finalArrObj) {
          let answers = []
          await postAnswers(answers,arrayItem.answers,arrayItem.tsrNo,arrayItem.industry,arrayItem.service,arrayItem.division)
          // await this.responsesSrvc.create(data2)
        }

        // finalArrObj.forEach(async function (arrayItem) {
        //   // let answers = []
        //   console.log("deta1wewew", arrayItem)
          
        //   let answers = []
        //   await postAnswers(answers,arrayItem.answers,arrayItem.tsrNo,arrayItem.industry,arrayItem.service,arrayItem.division)
        //   // await this.responsesSrvc.create(data2)
        // })

        loading.value = false

        $q.notify({
          message: 'Responses Migrated',
          position: 'bottom-right',
          color: 'positive'
        })
      }
      reader.readAsBinaryString(file)
    }

  async function getRowsNumberCount () {
    let tsrCount
      
      // if (!filter) {
      //   return rowsTable.value.length
      // }
      // let count = 0
      // rowsTable.value.forEach(row => {
      //   // question.description.toLowerCase()
      //   // console.log("HOYOYOYOYOYOYO")
      //   // console.log("getrowscount", row)
      //   if (row.tsrNo.includes(filter)) {
      //     ++count
      //   }
      // })
      return tsrCount
    }

  async function fetchFromServer (startRow, count, filter, sortBy, descending) {
      if (beforeDate.value && afterDate.value){
        tsrList.value= await getTSRsFromApi(startRow,count,"","",beforeDate.value,afterDate.value,1)
      }else{
        tsrList.value = await getTSRsFromApi(startRow,count,"","",today+'01-01',today+'12-31',1)
      }
        
      rowsTable.value =  buildTable()
      console.log("sortBy,sortBy",sortBy)
      
      let data = filter
        ? rowsTable.value.filter(row => 
        row.tsrNo.includes(filter))
        : rowsTable.value.slice()
      if(beforeDate.value && afterDate.value){
        // console.log("pasok ba?")
        data = data.filter(row => filterDateBet(row,beforeDate.value,afterDate.value))
        pagination.value.rowsNumber = data.length
      }

      // handle sortBy
      if (sortBy) {
        // const sortFn = sortBy === 'desc'
        //   ? (descending
        //       ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
        //       : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
        //     )
        //   : (descending
        //       ? (a, b) => (parseFloat(b[ sortBy ]) - parseFloat(a[ sortBy ]))
        //       : (a, b) => (parseFloat(a[ sortBy ]) - parseFloat(b[ sortBy ]))
        //     )
        // data.sort(sortFn)
      }
      console.log("data hoy hoy",)

      return data.slice(startRow, startRow + count)
    }
    async function averageLastTable (cols,rows){
      let x = cols.map(a => a.field);
      
      // const unique = [...new Set(cols.map(item => item.group))]; // [ 'A', 'B']
      // name of all columns
      let avgArrayWithKeys = []
      // console.log("keysObject",keysObject)
      for(let i =0; i< x.length; i++){
        let avgObv = {}
        // build last row data object with key being the questionID
        avgObv[x[i]] = []
        //  push array of answers per question
        
        // map all keys with value and return in to the array
        let xy = rows.map(function(item){ 
          return item[x[i]]; 
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
        avgObv['value'] = parseFloat((Math.round((sum/filtered.length) * 100) / 100).toFixed(2));
        avgArrayWithKeys.push(avgObv)
        
      }
      return avgArrayWithKeys

    }

  async function onRequest(props) {
    
      
      if(beforeDate.value && afterDate.value){
        beforeDate.value =  dateTime(beforeDate.value)
        afterDate.value =  dateTime(afterDate.value)
        console.log("dito?")
        totalTsrsCount.value = await totalTsrsCount(beforeDate.value, afterDate.value)
        
      }else{
        totalTsrsCount.value  = await totalTsrsCount("","")
      }
      if(rowsOverall.value.length ==0){
        for (let i=0; i<orderByPositionQuestions.value.length ; i++){
        let row = {
          dimension: orderByPositionQuestions.value[i].description,
          id: orderByPositionQuestions.value[i].id
        }
          if(orderByPositionQuestions.value[i].question_type.id == 2){
            rowsOverall.value.push(row)
          }
        
       }
      }
      
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter

      loading.value = true

      // emulate server
      setTimeout(async () => {
       
        // console.log("rowsrows", rowsTable.value)
        
        // pagination.value.rowsNumber =  getRowsNumberCount(filter)
        pagination.value.rowsNumber = totalTsrsCount.value
        // console.log("pagination.value.rowsNumber ",pagination.value.rowsNumber )

        let fetchCount

        // get all rows if "All" (0) is selected
        
        

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage
        if (page == 0){
          fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage
        }else{
          fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage + startRow
        }

        

        console.log("rowsTable.valuerowsTable.value,",rowsTable.value)
        // fetch data from "server"
        const returnedData = await fetchFromServer(startRow, fetchCount, filter, sortBy, descending)
        // should there any filter
        if (filter){
          pagination.value.rowsNumber = returnedData.length
        }
        
        divisionList.value = [...new Set(tsrList.value.map(item => item.division))].filter(function(val) { return val !== null; });
       
        // console.log("rettt", returnedData)
        // returnedData.push(startRow)

        // clear out existing data and add new
        rows.value.splice(0, rows.value.length, ...returnedData)
        finalAverageDataRow.value  = await averageLastTable(cols.value,rows.value)

        // don't forget to update local pagination object
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending

        // ...and turn of loading indicator
        loading.value = false
      }, 500)
  }




    return {
      rowsTable,
      rowsFilter,
      answers,
      listOfTsr,
      cols,
      // file related functions
      exportTable,
      generatePDF,
      beforeDate,
      afterDate,
      prompt,
      onRowClick,
      viewsurveyanswer,
      tsrData,
      dateform,
      dateTime,
      filter,
      onRequest,
      pagination,
      rows,
      loading,
      finalAverageDataRow,
      //overall
      rowsOverall,
      colsOverall,
      overallLoading,
      overAllAverage,
      //file upload
      importFile,
      fileUpload
    }
  }
  
})


</script>
