<template>
      <div v-if="question_type == 1">
          <q-input outlined  v-model="inputViewModel" :label="labelval" style="width: 500px" stack-label />
      </div>
      <!-- required overall question rating -->
      <div v-else-if="props.questionId == 12">
        <q-rating
              v-model="inputViewModel"
              name="answerRating"
              :max="5"
              size="3.0em"
              color="grey"
              lazy-rules :rules="[val => val == '' || 'Field is required']"
              :color-selected="[
                [colorRate(inputViewModel), 'grey', 'grey', 'grey', 'grey'],
                ['grey', colorRate(inputViewModel), 'grey', 'grey', 'grey'],
                ['grey', 'grey', colorRate(inputViewModel), 'grey', 'grey'],
                ['grey', 'grey', 'grey', colorRate(inputViewModel), 'grey'],
                ['grey', 'grey', 'grey', 'grey', colorRate(inputViewModel)]
              ][inputViewModel ? inputViewModel -1 : 0]"
              :icon="[
                'sentiment_very_dissatisfied',
                'sentiment_dissatisfied',
                'sentiment_satisfied',
                'sentiment_satisfied_alt',
                'sentiment_very_satisfied'
              ]"
            >
              <template v-for="(def, i) in rateDefinitions" :key="`tip-${i+1}`" v-slot:[`tip-${i+1}`]>
                <q-tooltip>{{ def }}</q-tooltip>
              </template>
            </q-rating>
      </div>

      <div v-else-if="question_type == 2">
        
          <q-rating
              v-model="inputViewModel"
              :max="5"
              size="3.0em"
              color="grey"
              :color-selected="[
                [colorRate(inputViewModel), 'grey', 'grey', 'grey', 'grey'],
                ['grey', colorRate(inputViewModel), 'grey', 'grey', 'grey'],
                ['grey', 'grey', colorRate(inputViewModel), 'grey', 'grey'],
                ['grey', 'grey', 'grey', colorRate(inputViewModel), 'grey'],
                ['grey', 'grey', 'grey', 'grey', colorRate(inputViewModel)]
              ][inputViewModel ? inputViewModel -1 : 0]"
              :icon="[
                'sentiment_very_dissatisfied',
                'sentiment_dissatisfied',
                'sentiment_satisfied',
                'sentiment_satisfied_alt',
                'sentiment_very_satisfied'
              ]"
            >
              <template v-for="(def, i) in rateDefinitions" :key="`tip-${i+1}`" v-slot:[`tip-${i+1}`]>
                <q-tooltip>{{ def }}</q-tooltip>
              </template>
            </q-rating>
      </div>
    <!-- <div v-else-if="question_type == 4">
        <q-select clearable v-model="inputViewModel" :options="optionval" :label="labelval" lazy-rules :rules="[val => !!val || 'Field is required']" />
    </div> -->
  
</template>
<script type="text/javascript">
import { computed, onMounted } from "vue";

export default {
   props: {
    modelValue: Object,
    question_type: Number,
    optionval: Array,
    labelval: String,
    questionId: Number,
  },
 
  // props: ['question_type','modelval','optionval','labelval'],
  setup(props, { emit }) {
    onMounted( () => {
       setQuestionID()
    })

    function setQuestionID (){
      emit("update:modelValue", {
            ...props.modelValue,
            question: props.questionId
        });
    }
    


    const inputViewModel = computed({
      get: () => {
        if (props.modelValue) {
          return props.modelValue.value;
        } else {
          return "";
        }
      },
      set: (value) => {
          if (value){
            emit("update:modelValue", {
            ...props.modelValue,
            value: value.toString(),
            });
          }else{
            return null
          }
          
      },
    });

    function colorRate (rate) {
      return ['negative', 'deep-orange', 'positive', 'secondary', 'orange'][+rate-1]
    }

    const rateDefinitions = ['Poor', 'Fair', 'Satisfactory', 'Very Satisfactory', 'Outstanding']
    function rateDefinition (rate) {
      return $global.rateDefinitions[+rate-1]
    }

    
    return {
      inputViewModel,
      props,
      colorRate,
      rateDefinitions
      
    };
  },
};
</script>
<style scoped>
</style>