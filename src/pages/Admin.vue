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
              <div class=".col-md-4 .offset-md-4" style = "margin-left: 500px" >
                <div class="row inline">
                  <q-file v-model="importFile" label="Import Data " style="width: 200px"
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
          </div>
    
    <div class=row>
      <div class="col-md-4" >
      </div>
        <div class=".col-md-4 .offset-md-4" style = "margin-left: 480px">
            <q-btn
              type="submit"
              label="Generate Raw Data"
              class="q-mt-md"
              color="primary"
              @click="exportTable(rowsTable)"
              style="margin-left: 15px"
          />
          <!-- <div class=col-1></div> -->
          <q-btn
              type="submit"
              label="Generate PDF Report"
              class="q-mt-md"
              color="primary"
              style="margin-left: 15px"
          />
          </div>
        </div>
    </div>
    
  <div class="q-pa-md">

    <q-table
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
      binary-state-sort
    >
    <template v-slot:top-right>
      <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

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
        row-key="name"
        
        binary-state-sort
        style="height: 500px"
        :rows-per-page-options="[0]"
      >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
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
import { getQuestions, getTSRs, tsrViaDivision, getOverall } from 'src/axioshelper.js'
import { exportFile, useQuasar} from 'quasar'
import { xlsx } from 'boot/axios'
import moment from 'moment';
import orderBy from 'lodash.orderby'

// import orderByPositionQuestions from '../pages/QuestionsPage.vue' 


// import function get question from Questions Page


//components
import viewsurveyanswer from '../components/modals/ViewSurveyAnswer.vue'
import CardDashboardFeedbackCountVue from 'src/components/CardDashboardFeedbackCount.vue';






export default defineComponent({
  name: 'Admin',
  components: { viewsurveyanswer },
  
  setup () {

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
  
  const loading = ref(false)
  const pagination = ref({
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 5,
    rowsNumber: 5
  })
  const startDataFromApi = ref(1)
  const endDataFromApi = ref(100)

  watch(beforeDate, (newValue, oldValue) => {

    dateform.value.validate().then(success => {
        // filterTable(newValue,0)
    })
  })

  watch(afterDate, (newValue, oldValue) => {

    dateform.value.validate().then(success => {
      // filterTable(newValue,1)
      onRequest({
        pagination: pagination.value,
        filter: undefined
      })
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

  
  


  const getTSRsFromApi = async () => {
    // update `props.user` to `user.value` to access the Reference value

      try {
        // upon startup we can initialize data to 1 - rows per page which is 50
        
        // lengthOfAnswers.value = answers.value.length
        console.log("hello",answers.value)
        console.log("hellolengthOfAnswers",lengthOfAnswers.value)
        return await getTSRs()
      }
      catch(err) {
        throw(err)
        error.value = err
      }
  }

  // function tsrExist(tsrNo,arrayAnswer) {

    
  // }
  function buildTable(){
    let rowData = []
    if(cols.value.length == 0){
      cols.value.push({ name: 'tsrNo', align: 'left', label: 'TSR', field: 'tsrNo', sortable: true })
      cols.value.push({ name: 'Division', align: 'left', label: 'Division', field: 'division', sortable: true })
      cols.value.push({ name: 'Service', align: 'left ', label: 'Service', field: 'service', sortable: true })
      cols.value.push({ name: 'Industry', align: 'left', label: 'Industry', field: 'industry', sortable: true })
      
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
      
      const id = 'id';
      // const uniqueQuestions = [...new Map(idAndQuestion.map(item =>[item['id'], item])).values()];
      console.log("hellooo2323232",orderByPositionQuestions.value)
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
    
    console.log("completed cols", cols.value)
    // push columns for q table data
    //map this to columns and rows for visualization
    tsrList.value.map(function(item){
      let row = {
        tsrNo: item.tsrNo,
        publishedDate:dateTime(item.published_at),
        division: item.division,
        industry: item.industry,
        service: item.service
      }
      let result = item.answers.map(a => a.question);
      for (let i=0 ; i < result.length; i++){
        row[item.answers[i].question] = item.answers[i].value;
      }
      // console.log("rororororw", row)
      rowData.push(row)
    })
    // let keysObject = Object.keys(averageColumns.value)

      // load overall
    divisionList.value = [...new Set(tsrList.value.map(item => item.division))].filter(function(val) { return val !== null; });
    loadDivisionDataOverall(divisionList.value)
    console.log("divdiv", divisionList)
    
    return rowData

  }
  async function loadDivisionDataOverall(divlist){
    if(colsOverall.value.length > 0){
      colsOverall.value = []
    }
    colsOverall.value.push({ name: 'Dimension' ,align: 'left', label: 'Dimension', field: 'dimension' , sortable: true })
  
    let dataDivision = []
    let temp = []
    console.log("hellodivlistload divisin data", divlist.length)
    for(let i =0; i<divlist.length; i++){
      colsOverall.value.push({name: divlist[i] ,align: 'left', label: divlist[i], field: 'divName' , sortable: true })
      for (let j=0; j<rowsOverall.value.length; j++){
        dataDivision = await getOverall(divlist[i],rowsOverall.value[j].id,beforeDate.value,afterDate.value)
        dataDivision = dataDivision.map(a => a.value)
        const sum = dataDivision.reduce((a, b) => a + b, 0);
        const avg = (sum / dataDivision.length) || 0;
        // set divName for mapping of column to row
        rowsOverall.value[j].divName = avg
        // rowsOverall.value[j].divlist[i] = avg
        temp.push(dataDivision)
      }
    }
    console.log("temp",temp)
    
    colsOverall.value.push({ name: 'Score' ,align: 'left', label: 'Score All in Service', field: 'scoreservice' , sortable: true })

    console.log("roworworworow")
    console.log(rowsOverall.value)

    overAllAverage.value = averageLastTable(colsOverall.value,rowsOverall.value)
    
    // api call from axioshelper

  }

  function dateTime(value) {
    return moment(value).format('YYYY/MM/DD');
  }



   function fileUpload(file) {
     console.log("pasok")
  //   if(file){
  //     const formData = new FormData()

  //     if (importFile.value && importFile.value.length > 0) {
  //       for (let i = 0; i < importFile.value.length; i++) {
  //         formData.append('files[' + i + ']', importFile.value[i])
  //       }
  //     }
  //     // for (const [key, value] of Object.entries(this.form)) {
  //     //   formData.append(key, value)
  //     // }
      
  //     console.log("formdata", formData)
  //   }else{
  //     console.log("q", $q)
  //     $q.notify({
  //       color: 'red-5',
  //         textColor: 'white',
  //         icon: 'warning',
  //         message: 'Please upload a file above'
  //       })
  //   }
    
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
    
    try {
        questions.value = await getQuestions()
    }catch{
      
    }
    await onRequest({
        pagination: pagination.value,
        filter: undefined
      })

    
  })

  function onRowClick (evt, row) {
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

  function getRowsNumberCount (filter) {
      if (!filter) {
        return rowsTable.value.length
      }
      let count = 0
      rowsTable.value.forEach(row => {
        // question.description.toLowerCase()
        console.log("HOYOYOYOYOYOYO")
        console.log("getrowscount", row)
        if (row.tsrNo.includes(filter)) {
          ++count
        }
      })
      return count
    }

  function fetchFromServer (startRow, count, filter, sortBy, descending) {

      
      let data = filter
        ? rowsTable.value.filter(row => 
        row.tsrNo.includes(filter))
        : rowsTable.value.slice()
      if(beforeDate.value && afterDate.value){
        console.log("pasok ba?")
        data = data.filter(row => filterDateBet(row,beforeDate.value,afterDate.value))
        pagination.value.rowsNumber = data.length
      }

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
        data.sort(sortFn)
      }

      return data.slice(startRow, startRow + count)
    }
    function averageLastTable (cols,rows){
      let x = cols.map(a => a.field);
      console.log("xxxxx", x)
      let avgArrayWithKeys = []
      // console.log("keysObject",keysObject)
      for(let i =0; i< x.length; i++){
        let avgObv = {}
        // build last row data object with key being the questionID
        avgObv[x[i]] = []
        //  push array of answers per question
        avgArrayWithKeys.push(avgObv)
        // map all keys with value and return in to the array
        let xy = rows.map(function(item){ 
          return item[x[i]]; 
          });

          // remove undefined
        var filtered = xy.filter(function(x) {
            return x !== undefined;
        });
        let sum = 0
        for(let j=0 ; j<filtered.length ; j++){
          if (!isNaN(filtered[j])){
            sum = sum+parseInt(filtered[j])
          }
        }
        avgObv['value'] = sum/filtered.length
        
      }
      return avgArrayWithKeys

    }

  async function onRequest(props) {
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
        // update rowsCount with appropriate value
        tsrList.value = await getTSRsFromApi()
        // get unique divisions that removes null
        
        
        
        // console.log("answersfromfetch", answers.value)
        // listOfTsr.value =  buildTsrList(tsrList.value)
        // console.log("hellotsrlist",listOfTsr.value)
        // assignValues(tsrList.value)
         
        if(rowsTable.value.length == 0 || afterDate || beforedate){
          rowsTable.value =  buildTable() 
        }
        console.log("rowsrows", rowsTable.value)
        

        pagination.value.rowsNumber = getRowsNumberCount(filter)

        // get all rows if "All" (0) is selected
        const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage
        // fetch data from "server"
        const returnedData = fetchFromServer(startRow, fetchCount, filter, sortBy, descending)

        
        // console.log("rettt", returnedData)
        // returnedData.push(startRow)

        // clear out existing data and add new
        rows.value.splice(0, rows.value.length, ...returnedData)
        finalAverageDataRow.value  = averageLastTable(cols.value,rows.value)

        console.log("rows", rows)

        // don't forget to update local pagination object
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending

        // ...and turn of loading indicator
        loading.value = false
      }, 500)
  }

  async function uploadMigrationData () {
      // this.$refs.uploadMigrationButton.click()
      let file = this.$refs.uploadMigrationButton.files[0]
      console.log('File', file)
      var reader = new FileReader()
      this.loading = true
      reader.onload = async (e) => {
        const data = e.target.result
        const rows = xlsx.utils.sheet_to_json(xlsx.read(data, { type: 'binary', cellDates: true }).Sheets['Sheet1'])
        // console.log('data', rows)
        console.log("file upload", rows)
        // const validData = rows.map(r => {
        //   const obj = {
        //     formID: this.node._id,
        //     userID: this.$root.user._id,
        //     dateSubmitted: Date.now()
        //   }
        //   for (const q of this.node.format) {
        //     if (r[q.field]) {
        //       if (typeof r[q.field].getMonth === 'function') {
        //         obj[q.field] = r[q.field].getTime()
        //       } else {
        //         obj[q.field] = r[q.field]
        //       }
        //     }
        //   }
        //   return obj
        // }).filter(r => Object.entries(r).length)

        console.log('validData', validData)

        for (const data of validData) {
          await this.responsesSrvc.create(data)
        }

        this.loading = false

        $q.notify({
          message: 'Responses Migrated',
          position: 'bottom-right',
          color: 'positive'
        })
      }
      reader.readAsBinaryString(file)
    }



    return {
      rowsTable,
      rowsFilter,
      answers,
      listOfTsr,
      cols,
      exportTable,
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
      rowsOverall,
      colsOverall,
      overAllAverage,
      //file upload
      importFile,
      fileUpload
    }
  }
  
})


</script>
