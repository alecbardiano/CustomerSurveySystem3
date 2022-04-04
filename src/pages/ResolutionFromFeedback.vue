<template>
    <q-layout view="hHh lpR fFf" class="shadow-2 rounded-borders">
      <q-header reveal class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>Action Plan for {{tsrNumberView}} </q-toolbar-title>
        </q-toolbar>
      </q-header>


     
        
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="row justify-center items-left">
              
                <q-form
                    @submit="onSubmit"  
                    class="q-gutter-md"
                    ref="feedbackRefForm">
                    <h5>Please provide a action plan for the negative feedback given by the Client</h5>
                        
                            <div style="max-height: 500px; overflow: auto" class="col">
                                <div :visible="false" class="fit column">
                                <!-- stuff you put here will be scrollable. You can adjust the max-height depending on your components -->
                                    <!-- <div v-for=" n in 1000" :key="n"> -->
                                    <div v-for="(question,index) in questionList" v-bind:key="question.id">
                                        <div class="row">
                                            <p class="questions"> {{index+1 }}. {{question.description}}:</p>
                                        </div>
                                          <div class="row">
                                              <p class="input"> 
                                                Feedback Rating: <span class="q-ml-sm" v-if="resolutionAns[index].value == 2" style="color:#ffae42"> Fair </span>
                                                <span class="q-ml-sm" v-else style="color: red"> Poor </span>
                                              </p>
                                            </div>
                                             <div class="row">
                                              <p class="input"> Comment/Remarks: {{resolutionAns[index].remarks}}</p>
                                            </div>
                                          <div class="row">
                                            
                                            <div class="input" >
                                                    <q-input outlined stack-label v-model="resolutionAns[index].resolution" lazy-rules :rules="[val => !!val || 'Field is required']"  label="Resolution"/>
                                                </div>
                                        </div>
                                        
                                    </div>
                                    <!-- <div v-for="(answer) in resolutionAns" v-bind:key="answer.ansID">
                                    <div class="row">
                                            <div class="input" >
                                                    <q-input outlined stack-label v-model="answer.resolution" lazy-rules :rules="[val => !!val || 'Field is required']"  label="Resolution"/>
                                                </div>
                                        </div>
                                    </div> -->
                                    
                                    <!-- <p> a</p>
                                </div> -->
                                
                             </div>
                            
                            </div>
                         <div class="row justify-end">
                                <q-btn  label="Submit"  @click="confirm = true"  class="btn-sucess justify-right" color="primary" v-close-popup />
                            </div>
                             <q-dialog v-model="confirm" persistent>
                              <q-card>
                                <q-card-section class="bg-primary text-white">
                                  <div class="text-h6">Confirm Action Plan</div>
                                </q-card-section>
                                <q-card-section class="row items-center">
                                  <q-avatar icon="check_circle" color="primary" text-color="white" />
                                  <span class="q-ml-sm">Are you sure you want to continue with the action plan/s you provided?</span>
                                </q-card-section>

                                <q-card-actions align="right">
                                  <q-btn flat label="Cancel" color="primary" v-close-popup />
                                  <q-btn flat @click="onSubmit"
                                   label="Confrim" color="primary" v-close-popup />
                                </q-card-actions>
                              </q-card>
                            </q-dialog>
                </q-form>
            </div>
        </q-page>
      </q-page-container>
    </q-layout>
   
   
</template>

<script>
import { defineComponent, onMounted,onBeforeUnmount, ref,watch ,computed} from 'vue'
import { getTsrByID,getQuestions,updateAnswerResolution} from 'src/axioshelper.js'
import { exportFile, useQuasar} from 'quasar'


import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ResolutionFromFeedback',
  

  setup(){

    const feedbackRefForm = ref(null)
    
    const questionList = ref([])
    const $q = useQuasar()
    
    const textVal = ref(null)
    const answer = ref({
        tsr: {
          tsrNo: ''
        },
        id: '',
        value: [],
        questions: {}
    })
    const answers = ref([])
    const tsrNumberView = computed(() => {
      return answer.value.tsr.tsrNo
    })

    const confirm = ref(false)

    let timer

    const resolutionAns = ref([])

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer)
        $q.loading.hide()
      }
    })


    const route = useRoute();
    
    const tsrID = ref(route.params.id)
    console.debug(`current route name on component setup init: ${route}`);

    // You could use computed property which re-evaluates on route name updates
    // const routeName = computed(() => route.name);

    // You can watch the property for triggering some other action on change
  
    function showLoading () {
      $q.loading.show({
        message: 'Please wait for data to be imported..',
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
      })
    }

    function buildResolutionAnswers (arr) {
      let ansArr = arr.map(x => ({
          ansID: x.id,
          resolution: '',
          value: x.value,
          remarks: x.remarks
           

        })
      )
      return ansArr


    }

    async function getSingleTsr(id){
        return await getTsrByID(id)
    }

    async function onSubmit(){

        let suc = await feedbackRefForm.value.validate()
        if (suc){
            let a = await postResolution()
        }else{
            $q.notify({
            message: 'Please check required fields ',
            color: 'negative',
            icon: 'failed'
            })
        }
    }

    async function postResolution(){
        let suc = await updateAnswerResolution(resolutionAns.value)
        if(suc = 200){
            $q.notify({
            message: 'Resolution Submitted for this TSR',
            color: 'positive',
            icon: 'success'
            })
        }else{
            $q.notify({
            message: 'Error upon submitting resolution',
            color: 'negative',
            icon: 'failed'
            })
        }
    }

    function buildQuestions(){
        // let ansArr = answers.value.map(a => a.question)
      resolutionAns.value = buildResolutionAnswers(answers.value)
      // questionList.value = questions.filter(item => ansArr.includes(item.id));

    }

    onMounted( async () => {
    // call functions upon start up here
        answers.value = await getSingleTsr(tsrID.value)
        answer.value = answers.value[0]
        questionList.value = answers.value.map(a => a.question)
        buildQuestions()
       
    // yearTsr.value = currentYear.value

    

    

    })

    return {
        onSubmit,
        feedbackRefForm,
        tsrNumberView,
        textVal,
        answer,
        route,
        tsrID,
        answers,
        questionList,
        resolutionAns,
        confirm
    }

  }
})
</script>
<style scoped>

.cardClass {
  width: 300vh;
}
.input {
    width: 100%;
    max-width: 1000px;
    display: inline-block;
    padding-left: 30px;
  }

.surveyquestionsfeedback{
    padding-left: 100px;
}
</style>