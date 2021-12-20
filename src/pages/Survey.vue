<template>
  <q-page>
      <div class="q-pa-md">
      <q-form
        @submit="onSubmit"  
        class="q-gutter-md"
        ref="surveyRefForm"
      >
      
      <div class="row">
         
        <q-input 
        ref="inputRef"
        filled
        lazy-rules
        :rules="[val => !!val || 'Field is required', val => /^[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}$/.test(val) || 'Field should be a valid tsr number ex. XXX-XXX-XXX-XXX']"
        outlined  v-model="TsrNo" label="TSR Number" style="width: 250px" stack-label 
        
        />
        <!-- <q-input 
        ref="inputRef"
        filled
        outlined  v-model="TsrNo" label="TSR Number" style="width: 150px" stack-label 
        
        /> -->
      </div>
        <!-- v-model na kumukuha nung array, array of answers instantiate -->
        
        <!-- <div>
        <p> For checking purposes </p>
        Industry: {{industryData}} 
        <br>
        Service: {{serviceData}}
        <br>
        Div: {{divData}}
        <br>
        Section: {{sectionData}}
        </div> -->
      <div v-for="(question,parent_node_index) in orderByPositionQuestions" v-bind:key="question.question">
        <!-- {{orderByPositionQuestions}} -->
        <!-- {{question}} -->
         <!-- {{ updateCnt(parent_node_index) }} -->

          <div v-if="question.children.length == 0 ">
            <div class="row" >
              <p class="questions"> {{question.description}}</p>
              <!-- add 1 because index is 0 -->
            </div>
              <div class="row inline">
                <div class="inputs">
                  <CustomSurveyField v-if="question.id == 3" v-model="surveyAnswer.answers[parent_node_index]" :questionId="question.id" :question_type="question.question_type.id" :optionval="serviceOptions" :labelval="question.label" />
                  <CustomSurveyField v-else v-model="surveyAnswer.answers[parent_node_index]" :questionId="question.id" :question_type="question.question_type.id" :optionval="industryOptions" :labelval="question.label" />
                </div>
              </div>
          </div>
          <div v-else-if="question.children.length > 0">
            <p class="questions"> {{question.description}}</p>
            <div class="surveyquestions">
              <h5>Survey Questions</h5>
                  <div v-for="(questionSubhead,index) in  (orderByNestedSurveyQuestions(question.children))" v-bind:key="questionSubhead.id">
                    <!-- {{ updateCnt(parent_node_index) }} -->
                    <!-- {{questionSubhead}} -->
                    <!-- {{ orderByPositionQuestions.slice(0, parent_node_index).reduce((total, qs)=>total+=qs.subheader.length, 0)+ index }} -->
                    <div class="row">
                      <div class="col-4 col-md-4">
                        <p class="questions"> {{index+1 }}. {{questionSubhead.description}}</p>
                      </div>
                    <div class="row inline">
                      <div class="inputs">
                        <div v-if="question.id == 12">
                          {{question}}
                          <CustomSurveyField v-model="subHeaderSurveyAnswer.answers[orderByPositionQuestions.slice(0, parent_node_index).reduce((total, qs)=>total+=qs.children.length, 0)+ index]" :questionId="questionSubhead.id" lazy-rules :rules="[val => val == '' || 'Field is required']"  :question_type="questionSubhead.question_type.id" :optionval="industryOptions" :labelval="questionSubhead.label" />
                        </div>
                        <!-- indexing in nested v-model of surveyanswer -->
                        <!-- {{orderByPositionQuestions.slice(0, parent_node_index).reduce((total, qs)=>total+=qs.children.length, 0)+ index}} -->
                        <CustomSurveyField v-model="subHeaderSurveyAnswer.answers[orderByPositionQuestions.slice(0, parent_node_index).reduce((total, qs)=>total+=qs.children.length, 0)+ index]" :questionId="questionSubhead.id"  :question_type="questionSubhead.question_type.id" :optionval="industryOptions" :labelval="questionSubhead.label" />
                      </div>
                      <div>
                        <!-- {{subHeaderSurveyAnswer.answers[orderByPositionQuestions.slice(0, parent_node_index).reduce((total, qs)=>total+=qs.children.length, 0)+ index]}} -->
                        <q-input v-if="subHeaderSurveyAnswer.answers[orderByPositionQuestions.slice(0, parent_node_index).reduce((total, qs)=>total+=qs.children.length, 0)+ index].value < 3 && subHeaderSurveyAnswer.answers[orderByPositionQuestions.slice(0, parent_node_index).reduce((total, qs)=>total+=qs.children.length, 0)+ index].value != ''" v-model="subHeaderSurveyAnswer.answers[orderByPositionQuestions.slice(0, parent_node_index).reduce((total, qs)=>total+=qs.children.length, 0)+ index].remarks" outlined label="Remarks:" 
                        style="width: 300px" stack-label lazy-rules :rules="[val => !!val || 'Field is required']" />
                        <!-- <q-input v-if="subHeaderSurveyAnswer.answers[orderByPositionQuestions.slice(0, parent_node_index).reduce((total, qs)=>total+=qs.children.length, 0)+ index].value < 3 && subHeaderSurveyAnswer.answers[orderByPositionQuestions.slice(0, parent_node_index).reduce((total, qs)=>total+=qs.children.length, 0)+ index].value != ''" v-model="subHeaderSurveyAnswer.answers[orderByPositionQuestions.slice(0, parent_node_index).reduce((total, qs)=>total+=qs.children.length, 0)+ index].remarks" outlined label="Remarks:" 
                        /> -->
                      </div>
                    </div>
                </div>
              </div>
            </div>
           </div>
          </div>
      <div class="row justify-end">
         <q-dialog v-model="prompt" >
          <!-- <confirmmodal  :confirmFlag="confirmFlag"></confirmmodal> -->
          <q-card style="min-width: 500px;" >
            <q-card-section class="bg-primary text-white">
              <div class="text-h5 inline">
                <span>Please Confirm Answers for TSR Number:  {{TsrNo}} </span>
              </div>
            </q-card-section>

            <q-card-section class="row items-left">
               <table>
                  <tr>
                    
                    <th>Questions</th>
                    <th>Answers</th>
                  </tr>
                  <!-- for visualization cols; can refactor -->
                  <tr v-for="answers in cols" v-bind:key="answers.id">
                    <td style="text-align: left;" v-if="answer.value != undefined">{{answers.description }}  </td>
                    <td style="text-align: right;" v-if="answer.value != undefined"> {{ answers.value }} </td>
                  </tr>
                </table>
                <!-- <q-icon name="check" color="primary" text-color="white" /> -->
                <!-- modal view answer -->
            <!-- <viewsurveyanswer v-model="tsrData" :cols="cols"></viewsurveyanswer> -->
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat label="Submit" @click="onSubmit" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

              <q-btn
                class="q-mt-md"
                color="primary"
                label="Submit"
                @click="confirmModalShow"
              >
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
            </div>
      </q-form>
      </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, computed, ref, reactive, onMounted, onBeforeMount,watch } from 'vue';
import CustomSurveyField from '../components/CustomSurveyField.vue'
import { getQuestions, postAnswers, checkTSRsOtherAPI, checkTSRsUlimsAPI, checkTSRIfExists } from 'src/axioshelper.js'

import viewsurveyanswer from '../components/modals/ViewSurveyAnswer.vue'

import orderBy from 'lodash.orderby'

export default defineComponent({
  name: 'Survey',
  components: { CustomSurveyField },
  setup () {
    const $q = useQuasar()
    const surveyRefForm = ref(null)
    const questions = ref([])
    const subheadersQuestion = ref([])
    const loading = ref(null)
    const lengthQuestions = ref(0);

    // TSR data for post Add TSR
    const TsrNo = ref(null)
    const serviceData = ref(null)
    const industryData = ref(null)
    const divData = ref(null)
     const sectionData = ref(null)


    const tsrDataFromApi = ref(null)

    watch(TsrNo, (newValue, oldValue) => {
      // checkTSRsOtherAPI(newValue)
      const pattern = /^[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}$/
      if(pattern.test(newValue)){
        console.log("watch Here")
        assignTSRData(newValue)

        
        // call api
      }
      
    })

    const prompt = ref(false)
    const confirmFlag= ref(false)
    const displayQuestions = ref([])

    const surveyDetail = ref({

    })
    let totalSubHeaderLength = 0;
    // review
    const cols = ref([])
    const answer = reactive(

      {
        answerid: "",
        value: "",
        question: "",
        tsrNo: "",
        remarks: ""
      })
    const surveyAnswer = reactive({
      answers: []
    })
    const subHeaderSurveyAnswer = reactive({
      answers: []
    })
  
    const orderKey = ref('position')

    const assignTSRData = async (newValue) => {
        tsrDataFromApi.value = await checkTSRsOtherAPI(newValue)
        tsrDataFromApi.value = tsrDataFromApi.value[0]
        // { "name": "Machining (Precision)", "div": "PD", "sectionCode": "PDS", "serviceCode": "MAPR", "costCenter": "28" }
        if(tsrDataFromApi.value){
          console.log("Watchwatchtsr", tsrDataFromApi.value )        
          industryData.value = tsrDataFromApi.value.sector[0]
          serviceData.value = tsrDataFromApi.value.service.name
          sectionData.value = tsrDataFromApi.value.service.sectionCode
          divData.value = tsrDataFromApi.value.service.div
        }else{
          tsrDataFromApi.value = await checkTSRsUlimsAPI(newValue)
          console.log(tsrDataFromApi.value)
          industryData.value = tsrDataFromApi.value.industry
          if(tsrDataFromApi.value.service == 'MTR' || tsrDataFromApi.value.service == 'INS'){
            serviceData.value = "Calibration and Dimensional Measurement"
          }else{
            serviceData.value = "Metals and Material Testing"
          }
          
          divData.value = "ATD"
        }

        
        
    }

    const getAllQuestionsFromApi = async () => {
    // update `props.user` to `user.value` to access the Reference value

      try {
        // questionsNotManipulated.value = await getData(url)
        let sample = []
        questions.value = await getQuestions()
        displayQuestions.value = questions.value.filter(Question =>
        {
          Question.children = questions.value.filter(child => child.parent?.id === Question.id )
          return Question.parent === null
        })
        console.log("sampsampsamp", displayQuestions.value)
        console.log("helloooo434343", questions.value)

        // column
        cols.value = [...new Set(questions.value.map(({ id, description, value }) => ({id, description, value})))];
        console.log("coclolol", cols.value)
        
        // subheadersQuestion.value = questions.value.filter( row => row.subheader.length >0 )
        displayQuestions.value.forEach( val =>{
          
          val.children.forEach( sub =>{
            totalSubHeaderLength ++;
            questions.value.forEach((que, index) =>{
              if(sub.id == que.id){
                questions.value.splice(index,1)
              }
            })
          })
        })

        lengthQuestions.value = questions.value.length
        buildArrayOfAnswers()
        // console.log("sd", subheadersQuestion.value )
        // questions.value.forEach(question, index =>{
        //   subheadersQuestion.value.forEach(sub => {
        //     sub.subheader.forEach(val => {
        //       if(questions.value.id = val.id){
        //         object.splic

        //       }
        //     })
        //   })
        // })
        //   console.log(row)
        //   if (row.subheader.length>0){
        //     console.log("pasok")
        //     questions.value.forEach(element => {
        //       row.subheader.forEach(subheader =>{
        //         if (element.id == subheader.id) {
        //           console.log("pasok2")
        //         }
        //       })
        //     });
        //   }
        console.log("cocococol", cols.value)
        
        loading.value = false
      }
      catch(err) {
        throw(err)
        error.value = err
      }
  }

    const orderByPositionQuestions = computed( () => { // pass a array of questions and sort by position
      return orderBy(displayQuestions.value, orderKey.value)
    });

    function orderByNestedSurveyQuestions (q){
      return orderBy(q, orderKey.value )
    }


    function confirmModalShow(){
      prompt.value = true
      for (let i = 0; i < surveyAnswer.answers.length; i++) {
        surveyAnswer.answers[i].tsrNo = TsrNo.value // answer.tsrno is to vmodel
        for (let j=0; j< cols.value.length ; j++){
          if(cols.value[j].id == surveyAnswer.answers[i].question){
            cols.value[j].value = surveyAnswer.answers[i].value
          }
        }
      }
      for (let i = 0; i < totalSubHeaderLength; i++) {
        subHeaderSurveyAnswer.answers[i].tsrNo = TsrNo.value // answer.tsrno is to vmodel
        console.log("COLSLDLSDLSDLSAMPLE", cols.value)
        for (let j=0; j< cols.value.length ; j++){
          if(cols.value[j].id == subHeaderSurveyAnswer.answers[i].question){
            cols.value[j].value = subHeaderSurveyAnswer.answers[i].value
          }
        }
        console.log("hello surve",subHeaderSurveyAnswer.answers[i].question)
        // if subHeaderSurveyAnswer.answeers[i]. que
      }
    }

    async function submitSurvey(){
      console.log("submitted")
      

      // remove answers without associated question (mainly subheader type question)
      // surveyAnswer.answers = surveyAnswer.answers.filter(item => item.question !== "")
      // subHeaderSurveyAnswer.answers = surveyAnswer.answers.filter(item => item.question !== "")
      // if allow true, there is exist in system
      
      
      console.log("hello post submit")
      console.log("COLSLDLSDLSDL", cols.value)
      console.log(surveyAnswer.answers)
      console.log(subHeaderSurveyAnswer.answers)
      if(!(industryData.value)){
        industryData.value = ""
      }
      if(!(sectionData.value)){
        sectionData.value = ""
      }
      console.log(subHeaderSurveyAnswer.answers)
      // post answers and children/subheader answers
      let a = await postAnswers(surveyAnswer.answers,subHeaderSurveyAnswer.answers,TsrNo.value,industryData.value,serviceData.value,divData.value)
      if (a == '403'){
        $q.notify({
          color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'TSR already answered'
          })
      }
      // postAnswers(,TsrNo.value)
      

      console.log("surveyanswer", surveyAnswer.answers)
      console.log("subheader", subHeaderSurveyAnswer.answers)
    }

    

    
    function buildArrayOfAnswers ()  {
      for (let i = 0; i < lengthQuestions.value; i++) { // question please rate does not need an answer
         console.log("length")
         surveyAnswer.answers.push(answer)
      }
      console.log("totalSubHeaderLength",totalSubHeaderLength)
      for (let i = 0; i < totalSubHeaderLength; i++) { // question please rate does not need an answer
         console.log("subheader")
         subHeaderSurveyAnswer.answers.push(answer)
      }
      console.log("subHeaderSurveyAnswerelow",subHeaderSurveyAnswer.answers)


      
    }

    onMounted( () => {
      getAllQuestionsFromApi()
      console.log("mounted")
      console.log("questionsvalue", questions)
      console.log(surveyAnswer.answers )
      console.log(subHeaderSurveyAnswer.answers )
      console.log("hello",questions.value.slice(0, 1))
      
    })


    // validation
    
    async function onSubmit () {
      surveyRefForm.value.validate().then(success => {
        // check null values from api
        if ( divData.value != "" && serviceData.value != ""){
 
          if (success){
            submitSurvey()
            $q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Submitted'
            })
          }
          else{
            $q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'Please check all the fields'
            })
          }
      }else{
        $q.notify({
          color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'TSR not Found'
          })
      }

        
    })
    
      
    }
    
    return {
      surveyRefForm,
      service: ref(null),
      industry: ref(null),
      comments: ref(null),
      TsrNo,
      CustomSurveyField,
      getAllQuestionsFromApi,
      submitSurvey,
      orderByPositionQuestions,
      orderByNestedSurveyQuestions,
      surveyAnswer,
      subHeaderSurveyAnswer,
      answer,
      questions,
      onSubmit,
      prompt,
      displayQuestions,
      // confirm
      confirmFlag,
      viewsurveyanswer,
      confirmModalShow,
      cols,
      serviceOptions: ['Metals and Materials Testing, Calibration & Dimensional Measurement', '3D Printing' ],
      industryOptions: ['Appliance', 'Automotive'],
      serviceData,
      industryData,
      divData,
      sectionData
      
    }
      
  }
})
</script>
<style lang="scss" scoped>
p {
  font-family: arial, sans-serif;
  font-size: 18px;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
span {
  font-size: 16px;
}
</style>

