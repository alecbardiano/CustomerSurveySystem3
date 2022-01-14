<template>
<!-- 
  1 -- add
  2 -- display
 -->
  <div>
      <q-card style="min-width: 500px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Add Question</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md" >
            <q-input outlined v-model="questionDescription" label="Description" hint="ex: What industry do you belong in? " />
            <q-select outlined v-model="questionType" :options="questionTypeOptions" label="Question Type" hint="ex: Text, select-drop for dropdown, etc" />
            <q-input outlined v-model="position" label="Position" type="number" hint="Position/Order in the survey form"/>
          <!-- <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" /> -->
          <!-- <q-input dense :v-model="address" autofocus v-bind="{{prompt}} = false" /> -->
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add Question" v-close-popup />
        </q-card-actions>
      </q-card>
  </div>
</template>
<script>
import { ref, computed, onMounted } from "vue";

export default {

   props: {
        questionTypesOptions: Array
    },
  setup(props, { emit }) {
    const questionDescription = ref('')
    const position = ref('')
    const questionType = ref('')

    const questionTypeOptions = computed({
      get: () => {
        if (props.questionTypesOptions) {
          return props.questionTypesOptions;
        } else {
          return [];
        }
      },
      // set: (value) => {
      //     if (value){
      //       emit("update:modelValue", {
      //       ...props.questionTypesOptions,
      //       value: props.qu,
      //       });
      //     }else{
      //       return null
      //     }
          
      // },
    });

    onMounted( () => {
      console.log("mounted?")
      // questionTypeOptions2.value = props.questionTypesOptions.value
    })


    
    return {
      questionDescription,
      questionType,
      questionTypeOptions,
      position,
      props
    };
  },
};
</script>
<style scoped>
</style>