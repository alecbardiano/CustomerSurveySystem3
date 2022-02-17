<template>
  <div class="q-pa-md">
    <h6> Please accomplish all of the fields </h6>
  </div>
  <div class="q-pa-md" style="margin-left: 40px">
    <div class="row inline">
      <q-select v-model="division" @update:model-value="fillSectionList()" :options="divisions" label="Division" style="width: 200px; " />
      <q-select v-model="service" :options="services" label="Service" style="width: 200px;  margin-left: 40px" />
    </div>
  </div>

  <div class="q-pa-md" style="margin-left: 40px" >
    <div class="row">
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
          <q-btn
                    type="submit"
                    label="Go"
                    color="primary"
                    style="margin-left: 25px; width: 70px; height: 25px;"
                 />
        </div>
      </q-form>
    </div>

  </div>
  <div class="q-pa-md">
    <p></p>
  </div>
  <div class="q-pa-md">
    <!-- :filter="filter"
      v-model:pagination="pagination"
      @request="onRequest" -->
    <q-table
      class="my-sticky-header-table"
      v-if="rowsOverall"
      title="Summary of Citizen/Client Satisfaction Survey CCSS Rating" 
      :rows="rowsOverall"
      :columns="colsOverall"
      row-key="name"
      :loading="loading"
      binary-state-sort
      separator="cell"
      style="height: 700px"
      :rows-per-page-options="[0]"
    >

    <template v-slot:top-row>
       <q-tr>
        <q-td colspan="100%">
          {{division}}
        </q-td>
      </q-tr>
      <q-tr>
        <q-td colspan="100%">
          {{service}}
        </q-td>
      </q-tr>
    </template>

    



      <template v-slot:bottom-row>
        <q-tr>
          <q-td>
            No. of Respondents
          </q-td>
          <q-td >
            {{noRespondents}}
          </q-td>
        </q-tr>
        <q-tr>
          <q-td >
            No. and % of customers who rated the service as very satisfactory or better
          </q-td>
          <q-td >
             {{noVerySatisfactory}}
          </q-td>
        </q-tr>
        <q-tr>
          <q-td >
             No. and % of customers who rated the service as satisfactory or better
          </q-td>
          <q-td >
             {{noSatisfactory}}
          </q-td>
        </q-tr>
        <q-tr>
          <q-td >
             No. and % of customers who rated the service as Fair or Poor
          </q-td>
          <q-td>
             {{noPoor}}
          </q-td>
        </q-tr>
        <!-- <q-tr>
          <q-td >
             No. and % of customers who didn't have an Overall Answer
          </q-td>
          <q-td>
             {{noNoOverall}}
          </q-td>
        </q-tr> -->

      </template>
    </q-table>
  </div>
  <div class="q-pa-md">
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
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed, watch } from 'vue'
import { allOverAllRatingsFromApi, getOverall, getTSRs, getQuestions, getDivList,getSecList,positiveFeedbackPerDivision, satisfactoryFeedbackPerDivision, poorFeedbackPerDivision,getCountServicePerDivision, getQuestionsWithoutAns } from 'src/axioshelper.js'
import orderBy from 'lodash.orderby'
import moment from 'moment';
import { useQuasar} from 'quasar'


export default defineComponent({
  name: 'AdminDivision',
  setup() {
    const divisionsAndSections = ref(null)
    const division = ref(null)
    const services = ref([])
    const service = ref(null)
    const questions = ref([])
    const orderKey = ref('position')
    const tsrs = ref([])
    const dateform = ref(null)

    const $q = useQuasar()
    let timer

    const rowsTotal = ref([])
    const colsTotal = ref([
      { 
        name: 'Area',
        align: 'left',
        label: 'Area',
        field: 'area',
        sortable: true
      },
      { 
        name: 'Number',
        align: 'left',
        label: 'Number',
        field: 'number',
        sortable: true
      },
      { 
        name: 'Percentage',
        align: 'left',
        label: 'Percentage',
        field: 'percentage',
        sortable: true
      },

    ])

    


    
    const orderByPositionQuestions = computed(() => {
      return orderBy(questions.value, orderKey.value)
    });


    const divisions = ref([])
    const colsOverall = ref([

    //  { name: 'tsrNo', align: 'left', label: 'TSR', field: 'tsrNo', sortable: true }
    ])
    const rowsOverall = ref([])
    const loading = ref(false)
    const beforeDate = ref(null)
    const afterDate = ref(null)

    const noPoor = ref(0)
    const noVerySatisfactory = ref(0)
    const noSatisfactory = ref(0)
    const noRespondents = ref(0)
    const noNoOverall = ref(0)


    const noPoorTotal = ref(0)
    const noVerySatisfactoryTotal = ref(0)
    const noSatisfactoryTotal = ref(0)
    const noRespondentsTotal = ref(0)



  




    async function loadNumbers(){
      noPoor.value = 0
      noVerySatisfactory.value = 0
      noSatisfactory.value = 0
      noRespondents.value = 0
      noNoOverall.value = 0

      console.log("hey", division.value)
      // tsrs.value = await getTSRs("","",division.value,service.value,beforeDate.value,afterDate.value,3,'')
      // console.log("pasok ba", tsrs.value)
      
     
    for (let j=0; j<orderByPositionQuestions.value.length; j++){
      console.log("orderByPositionQuestions.value[j].id",orderByPositionQuestions.value[j].id,orderByPositionQuestions.value[j].label)
      // overall rating
      // if(orderByPositionQuestions.value[j].id == 12){
      //   if(orderByPositionQuestions.value[j])
      // }
      let dataDivision = await getOverall(division.value,service.value,orderByPositionQuestions.value[j].id,beforeDate.value,afterDate.value)
      console.log("dataDivisiondataDivision",dataDivision)
      if(dataDivision.length != 0){
        dataDivision = dataDivision.map(a => a.value)
        dataDivision = dataDivision.map(function (x) { 
          return parseInt(x, 10); 
        });
        console.log("noRespondents", dataDivision.length)
       
        // dataDivision = dataDivision.filter(function(x) {
        //     if ( x != undefined || x == '' || !isNaN(x)){
        //       return x
        //     }
        // });
        const counts = {
          5: 0, 
          4: 0, 
          3:0, 
          2:0,
          1:0,
          0:0
        };
        console.log("datads", dataDivision)
        for (const num of dataDivision) {
          if(orderByPositionQuestions.value[j].id == 12){
             noRespondents.value  +=  1
            if (num == 5|| num == 4){
              console.log("pasok dito")
              noVerySatisfactory.value+=1
            }else if(num == 3){
              noSatisfactory.value +=1
            }else if(num <= 2){
              noPoor.value+=1
            }else{
              noNoOverall.value += 1
            }
          }
          if (num == 1){
            counts[1] +=1
          }
          else if( num == 2){
            console.log("wew")
            
            counts[2] +=1
          }
          else if (isNaN(num)){
            counts[0] += 1
          }else{
            counts[num] = (counts[num] ? counts[num] + 1 : 1) 
          }
          
        }

        console.log("counts", counts)

        for(let [key, value] of Object.entries(counts)){
          rowsOverall.value.forEach(function (arrayItem) {
            if(key == arrayItem.id){
              console.log("value", value)
              value = ((value/ dataDivision.length) * 100).toFixed(2)
              if(isNaN(value)){
                value = '0%'
              }else{
                value = value.toString() + '%'
              }
              
              arrayItem[orderByPositionQuestions.value[j].id] = value
            }
         });

        }
        console.log("rowsoverall", rowsOverall.value)
      }
     }
    }

    function showLoading () {
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
        showLoading()
        let suc = await dateform.value.validate()
        if(suc){
          await loadNumbers()
          await loadTotalOverall(afterDate.value)
        }
        hideLoading()
      }

    function fillSectionList(){
      console.log("hey", division.value)
      console.log("hey", divisionsAndSections.value)
      services.value = divisionsAndSections.value.filter(div => div.division == division.value).map(div => div.service)
    }

    function buildColumns (){
      colsOverall.value.push( {
          name: 'serviceArea',
          align: 'left',
          label: 'Service Area/Rating',
          field: 'servicearea',
          sortable: true
        })
      for (let j =0; j < orderByPositionQuestions.value.length ; j++){
        // remove subheaders in columns filter
        if(orderByPositionQuestions.value[j].question_type != 5){
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
        if(orderByPositionQuestions.value[j].question_type == 2){
            colsOverall.value.push(column)
          }
        
        
        }
      }
      console.log(colsOverall.value)
      buildRows()
    }

    function buildRows (){
      rowsOverall.value.push({servicearea: "5 - Outstanding" , id: 5})
      rowsOverall.value.push({servicearea: "4 - Very Satisfactory" , id: 4 })
      rowsOverall.value.push({servicearea: "3 - Satisfactory", id: 3 })
      rowsOverall.value.push({servicearea: "2 - Fair", id: 2})
      rowsOverall.value.push({servicearea: "1 - Poor", id: 1})
      rowsOverall.value.push({servicearea: "No Response", id: 0})
      colsOverall.value.forEach(function(column) {
        console.log("column", column)
      });

      
      

    }
    
    async function loadTotalOverall(currentdate) {
      let year
      if (currentdate){
        year = moment(new Date(currentdate)).year()
      }else{
        year = moment(new Date()).year() 
      }
      
      console.log("year",year)
      let data = []
      for(let i=0 ; i<12; i++){
          let dataMonth = await allOverAllRatingsFromApi(i,year)
          dataMonth.forEach(element => {
            data.push(element)  
          });
          
        }

      // reset 
      noVerySatisfactoryTotal.value = 0
      noSatisfactoryTotal.value = 0
      noPoorTotal.value = 0
      noRespondentsTotal.value = 0
      console.log("data", data)
      data = data.map(a => a.value)
      data.forEach(val => {
        if(val >= 4){
          noVerySatisfactoryTotal.value += 1
          console.log("nocount",noVerySatisfactoryTotal )
        }else if (val == 3){
          noSatisfactoryTotal.value +=1
        }else if (val == ''){
          noRespondentsTotal.value +=1
        }else{
          noPoorTotal.value +=1
        }
      });
      if(rowsTotal.value.length == 0){
        rowsTotal.value.push({
        area: "No. and % of customers who rated the Center's service as very satisfactory or better",
        number: noVerySatisfactoryTotal,
        percentage: (Math.round((noVerySatisfactoryTotal.value/data.length) * 100)).toString() + '%'
        })
        rowsTotal.value.push({
          area: "No. and % of customers who rated the Center's service as satisfactory or better",
          number: noSatisfactoryTotal,
          percentage: (Math.round((noSatisfactoryTotal.value/data.length) * 100)).toString() + '%'
        })
        rowsTotal.value.push({
          area: "No. and % of customers who rated the service as Fair or Poor",
          number: noPoorTotal,
          percentage: (Math.round((noPoorTotal.value/data.length) * 100)).toString() + '%'
        })
        // rowsTotal.value.push({
        //   area: "No. and % of customers who didn't have an Overall Answer",
        //   number: noRespondentsTotal,
        //   percentage: (Math.round((noRespondentsTotal.value/data.length) * 100)).toString() + '%'
        // })
      }else{
        rowsTotal.value[0].percentage =  (Math.round((noVerySatisfactoryTotal.value/data.length) * 100)).toString() + '%'
        rowsTotal.value[1].percentage = (Math.round((noSatisfactoryTotal.value/data.length) * 100)).toString() + '%'
        rowsTotal.value[2].percentage = (Math.round((noPoorTotal.value/data.length) * 100)).toString() + '%'
        // rowsTotal.value[3].percentage = (Math.round((noRespondentsTotal.value/data.length) * 100)).toString() + '%'
      }
      
    }

    onMounted( async () => {
      questions.value = await getQuestionsWithoutAns()
      divisionsAndSections.value = await getDivList()
      divisions.value = [...new Set(divisionsAndSections.value.map(a => a.division))]
      buildColumns()
      loadTotalOverall("","")
    // await onRequest({
    //     pagination: pagination.value,
    //     filter: undefined
    //   })
   })
    return {
      divisions,
      division,
      services,
      service,
      rowsOverall,
      colsOverall,
      loading,
      beforeDate,
      afterDate,
      noPoor,
      noVerySatisfactory,
      noSatisfactory,
      noRespondents,
      fillSectionList,
      tsrs,
      dateform,
      rowsTotal,
      colsTotal,
      noNoOverall,
      dataUpdateWithDate
    }
  }
})
</script>
