<template>
<div>
     <!-- {{props.tsrModelValue}} -->
      {{props}}
      <q-card style="min-width: 500px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6 inline">
            TSR No. {{modelValue.value.tsrNo}}
            <div class="justify-end"> {{modelValue.value.publishedDate}} </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <!-- <div v-for="answer in forArraySurveyDetails" v-bind:key="answer.name">
            {{answer.name}} - {{answer.value}}
          </div> -->
          <!-- <ul id="v-for-surveyDetail" class="demo">
            <li v-for="value, key in surveyDetail" v-bind:key="key">
                {{key }} --  {{ value }}
            </li>
          </ul> -->

          <table>
            <tr>
              
              <th>Questions</th>
              <th>Answers</th>
            </tr>
            <tr v-for="answer in headerArray" v-bind:key="answer.field">
              <td style="text-align: left;">{{ answer.name}}  </td>
              <td style="text-align: right;"> {{ answer.value }} </td>
            </tr>
          </table>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Close" v-close-popup />
        </q-card-actions>
      </q-card>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent } from "vue";

export default defineComponent({
    props: {
        modelValue: Object,
        cols: Array
    },
    setup(props) {
    // get subset of javascript object
    // (({ a, c }) => ({ a, c }))(object);
    // const {id, title} = show;
    // episodes.map(selectFewerProps);
    let headerArray = props.cols.map(({align, sortable,label, ...item}) => item)
    // let questionIDArray = props.cols.map(function (el) { return el.field ? el.field: el.id; });


    let forArraySurveyDetails = ref([]) //modelvalue to name of question via id
    
    let surveyDetail = ref({})
    let answerObject = JSON.parse(JSON.stringify(props.modelValue.value));
    
    for (var key in answerObject) {
      for (let i=0; i < headerArray.length ; i++ ){
         if (key ==  headerArray[i].field){
           let tempObject ={}
           headerArray[i].value = answerObject[key]
          //  tempObject.name = headerArray[i]
          //  tempObject.value = answerObject[key]
          //  forArraySurveyDetails.value.push(tempObject)
          //  console.log(forArraySurveyDetails)
          //  surveyDetail.value[headerArray[i]] = answerObject[key]
         }
      }
       
    }
  
    onMounted( () => {
      console.log("onmounted")
    })

    //  const modelObject = computed({
    //   get: () => {
    //     if (props.tsrModelValue) {
    //       return props.tsrModelValue.value;
    //     } else {
    //       return {};
    //     }
    //   }
    // });
    return{
      headerArray,
      forArraySurveyDetails,
      surveyDetail
    }

        
    },
})
</script>

<style lang="scss" scoped>
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
</style>
