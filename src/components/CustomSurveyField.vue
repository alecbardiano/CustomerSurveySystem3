<template>

    <div v-if="question_type == 1">
        <q-input outlined  v-model="inputViewModel" :label="labelval" style="width: 500px" stack-label />
    </div>
    <!-- required overall question rating -->
    <div v-else-if="props.questionId == 12">
      <q-rating
            v-model="inputViewModel"
            size="3.0em"
            icon="star_border"
            color="primary"
            :max="5"
             lazy-rules :rules="[val => val == '' || 'Field is required']"
            inline /> 
    </div>

    <div v-else-if="question_type == 2">
      
        <q-rating
            v-model="inputViewModel"
            size="3.0em"
            icon="star_border"
            color="primary"
            :max="5"
            inline /> 
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

    
    return {
      inputViewModel,
      props
    };
  },
};
</script>
<style scoped>
</style>