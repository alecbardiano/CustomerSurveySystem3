<template>

  <div>
  <!-- <ul>
    <li v-for="question in orderByPositionQuestions" v-bind:key="question.question">
      <p><strong>{{question.description}}</strong></p>
      <p></p>
    </li>
  </ul> -->

    <div class="row justify-end">
        
        <div class="q-pa-md row items-start q-gutter-md">
            <q-btn
                type="submit"
                label="Add Question"
                class="q-mt-md"
                color="primary"
                @click="addQuestionClick()"
            />
        </div>
    </div>

  <div class="q-pa-md">
    <q-table
      title="Questions"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :filter="filter"
      v-model:pagination="pagination"
      @request="onRequest"
      binary-state-sort
      class="my-sticky-header-table"
      separator="cell">
      <template v-slot:top-right>
        <q-input class="placeholderClass" borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon class="searchClass" name="search" />
          </template>
        </q-input>
      </template>

     <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn dense round flat color="grey" @click="editQuestion(props)" icon="edit"></q-btn>
          <!-- questions are added dynamically therefore can be deleted, questions that are stable 14 -->
          <q-btn dense round flat color="grey" v-if="props.key > 14" @click="deleteQuestion(props)" icon="delete"></q-btn>
        </q-td>          
      </template>
    </q-table>
  </div>

  <!-- add modal -->
  <q-dialog v-model="addQuestionModal">
      <div v-if="addQuestionModal">
        <q-form ref="questionForm" @submit="onSubmit">
        <q-card style="min-width: 500px">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Add Question</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="q-pa-md" >
              <q-toggle v-model="isPartOfSubheader" label="Is part of another question?" />
              <q-input outlined v-model="questionDescription" label="Description" hint="ex: What industry do you belong in? " />
              <q-input outlined v-model="questionLabel" label="Label" hint="What will be the hint for this question" />
              <q-select outlined v-model="questionType" :options="questionTypes" option-label="description" label="Question Type" hint="ex: Text, select-drop for dropdown, etc" emit-value map-options/>
              <!-- subheader -->
              <div v-if="isPartOfSubheader">
                <q-select  outlined  v-model="partOfSubheader" :options="subHeadersQuestions" option-value="id" option-label="description" label="Which question to be included to" hint="ex: Please rate the following questions - Timeliness" />
              </div>
             
              
              <q-input 
        lazy-rules
        :rules="[val => !!val || 'Field is required', val => !isNaN(val) || 'Field should be a number', val => val > 0 || 'Field should be a positive number']"
        outlined v-model="position" label="Position" type="number" hint="Position/Order in the survey form" />
            <!-- <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" /> -->
            <!-- <q-input dense :v-model="address" autofocus v-bind="{{prompt}} = false" /> -->
            </div>
        
          </q-card-section>
          
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat type="submit" label="Add Question" />
          </q-card-actions>
        </q-card>

        </q-form>
      </div>

  </q-dialog>

   <!-- update modal -->
  <q-dialog v-model="updateQuestionModal">
      <div>
        <q-form ref="updateQuestionForm" @submit="onSubmitUpdateQuestion">
        <q-card style="min-width: 500px">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Update Question</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="q-pa-md" >
              <!-- <q-toggle v-model="isPartOfSubheader" label="Is part of another question?" /> -->
              <q-input outlined v-model="updateDescription" label="Description" hint="ex: What industry do you belong in? " />
              <q-input outlined v-model="updateLabel" label="Label" hint="What will be the hint for this question" />
              <!-- <q-input outlined readonly v-model="updateParent" label="Parent"/> -->
              <q-select  outlined  v-model="updateParent" :options="subHeadersQuestions"  option-label="description" label="Parent" hint="ex: Please rate the following questions - Timeliness" emit-value map-options />
              <q-select required outlined v-model="updateQuestionType" :options="questionTypes" option-label="description" label="Question Type" hint="ex: Text, select-drop for dropdown, etc" emit-value map-options/>
              <!-- subheader -->
              <!-- <div v-if="isPartOfSubheader">
                <q-select  outlined  v-model="partOfSubheader" :options="subHeadersQuestions" option-value="id" option-label="description" label="Which question to be included to" hint="ex: Please rate the following questions - Timeliness" />
              </div> -->
              <q-input 
        lazy-rules
        :rules="[val => !!val || 'Field is required', val => !isNaN(val) || 'Field should be a number', val => val > 0 || 'Field should be a positive number']"
        outlined v-model="updatePosition" label="Position" type="number" hint="Position/Order in the survey form" />
            <!-- <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" /> -->
            <!-- <q-input dense :v-model="address" autofocus v-bind="{{prompt}} = false" /> -->
            </div>
        
          </q-card-section>
          
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat type="submit" label="Update Question" />
          </q-card-actions>
        </q-card>

        </q-form>
      </div>
  </q-dialog>

  

<!-- confirm modal to delete
 -->
      <q-dialog v-model="confirm">
        <div v-if="confirm">
          <q-card style="min-width: 350px">
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">Please confirm</div>
            </q-card-section>
            <q-card-section class="row items-center">
              <span>Are you sure you want to delete this question?</span>
            </q-card-section>
            <q-card-section class="row items-center">
              <p style="font-size: 18px; color: red">Question: {{deleteQuestionDescription}} with the ID {{toDelete}}</p>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn flat label="Delete" @click="confirmDelete" color="red" v-close-popup />
            </q-card-actions>
          </q-card>
        </div>
    </q-dialog>
  

  
  <!-- <p v-if="loading">
   Still loading..
  </p> -->
  <p v-if="error">

  </p>
  </div>
</template>

<script>
import {useQuasar} from 'quasar'
import { watch,created,onMounted, ref,defineComponent,computed } from 'vue'
import { getQuestions, postQuestion,postQuestionSubheader, getQuestionTypes, updateQuestion, delQuestion } from 'src/axioshelper.js'
import orderBy from 'lodash.orderby'
// import addquestion from '../components/modals/AddQuestionModal.vue'

const columns = [
  { name: 'id',  label: 'Id', field: row => row.id, sortable: true,align: 'left' },
  { name: 'description', label: 'Description',align: 'left', field: row => row.description, sortable: true, },
  { name: 'question_type', label: 'Question_type', align: 'left',field: row => row.question_type.description },
  { name: 'position', label: 'Position', align: 'left',field: row => row.position, sortable: true, },
  { name: 'action', label: 'Action', align: 'left',field: ''}
]

export default defineComponent({
  name: 'QuestionsPage',
  // mounted () {
  //   setTimeout ( () => {
  //     console.log('POGi', this.questions)
  //   } , 2000)
  // },
  // components: { addquestion },
  setup() {
    const $q = useQuasar()
    const questionForm = ref(null)
    const questions = ref([]);
    const questionTypes = ref([]);
    const error = ref(null);

    const questionsurl = "http://10.10.120.19:1337/questions";
    const questionTypesUrl = "http://10.10.120.19:1337/question-types";
    // modal
    const addQuestionModal =  ref(false);
    const confirm = ref(false)
    const updateQuestionModal = ref(false)
    const address =  ref('')
    const orderKey = ref('position')
    // add question modal
    const questionDescription = ref('')
    const position = ref('')
    const questionType = ref(null)
    const questionSubheader = ref([])
    const questionLabel = ref('')
    const subHeadersQuestions = ref([])
    const includedQuestions = ref([])
    
    //delete
    const toDelete = ref(null)
    const deleteQuestionDescription = ref(null)
    
    //update
    const isPartOfSubheader = ref(false)
    const partOfSubheader = ref(null)
    const updateDescription = ref('')
    const updateLabel = ref('')
    const updatePosition = ref('')
    const updateParent = ref(null)
    const updateQuestionType = ref(null)
    const updateQuestionForm = ref(null)
    const updateQuestionID = ref(null)

    // q table
    const rows = ref([])
    const filter = ref('')
    const loading = ref(true)
    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10
    })


    watch(isPartOfSubheader, (newValue, oldValue) => {

      partOfSubheader.value = ""
    })

    watch(confirm, (newValue, oldValue) => {

      if (!confirm.value){
        toDelete.value = ""
      }
    })

    function addQuestionClick () {
      addQuestionModal.value = true
      getQuestionTypesFromApi()
    }

    function editQuestion(params) {
      updateQuestionModal.value = true
      updateDescription.value = params.row.description
      updateQuestionType.value = params.row.question_type
      updateLabel.value = params.row.label
      updatePosition.value = params.row.position
      updateParent.value = params.row.parent
      updateQuestionID.value = params.row.id
      console.log("edit", params.row)
      getQuestionTypesFromApi()
    }

    function onSubmitUpdateQuestion(){
      const question =  {
        description: "",
        question_type: {},
        position: 0,
        label: "",
        parent: {}
      }
      updateQuestionForm.value.validate().then(success => {
        if (success){
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
          question.description = updateDescription.value
          question.position = updatePosition.value
          question.question_type = updateQuestionType.value
          question.label = updateLabel.value
          question.parent = updateParent.value
          updateQuestion(updateQuestionID.value,question)
          updateQuestionModal.value = false
          onRequest({
            pagination: pagination.value,
            filter: undefined
          })
            // call for post to a question push array   
        }else{
          $q.notify({
          color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Please check the fields and change appropriy'
          })
        }
      })
      
    }

    function deleteQuestion(params){
      // console.log(params.row.id)
      // confirmDelete(params.row.id)
      confirm.value = true
      toDelete.value = params.row.id
      deleteQuestionDescription.value = params.row.description
    }
    // delete question
    function confirmDelete(){
      
      delQuestion(toDelete.value)
      $q.notify({
        color: 'blue-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Deleted'
      })
      onRequest({
        pagination: pagination.value,
        filter: undefined
      })
    }
    function onSubmit () {
      const question =  {
        description: "",
        question_type: {
          id: "",
          description: ""
        },
        position: 0,
        label: "",
        parent: {}
      }
      questionForm.value.validate().then(success => {
        if (success){
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
          question.description = questionDescription.value
          question.position = position.value
          question.question_type.id = questionType.value.id
          question.question_type.description = questionType.value.description
          question.label = questionLabel.value
          if (isPartOfSubheader.value){
          //   console.log("if", question)
            // partOfSubheader.value.subheader.push(question)
            // question.subheader = partOfSubheader.value
          //   delete question.question_type.description; 
          //   delete question.question_type.id; 
            question.parent = partOfSubheader.value
          //   question.question_type = questionType.value.id
          //   console.log("eyeyey", partOfSubheader.value)
          //   console.log("kweskwes", question)
          //   postQuestionSubheader(partOfSubheader.value.id,question)
          //   addQuestionModal.value = false
          //   onRequest({
          //     pagination: pagination.value,
          //     filter: undefined
          //   })
          //   // call for post to a question push array
          }
          // else{
            // call
            console.log("else", question)
            postQuestion(question)
            addQuestionModal.value = false
            onRequest({
              pagination: pagination.value,
              filter: undefined
            })
          // }
          

        }else{
          $q.notify({
          color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Please check the fields and change appropriy'
          })
        }
        // submitSurvey()
        
      })
    }
    const getQuestionsWithSubheaderFromApi = async () => {
    // update `props.user` to `user.value` to access the Reference value

      try {
        let arr = []
        arr = await getQuestions()
        // order by positions
        arr = orderBy(arr, orderKey.value)
        console.log("hello from get questions", questions.value)

        subHeadersQuestions.value = arr.reduce(function (notEmptyNames, question) { 
            if ((question.question_type.id == 5)) notEmptyNames.push(question)
            return notEmptyNames;
        }, []);

        console.log(" subHeadersQuestions.value",  subHeadersQuestions.value)

        return arr
        

        
        loading.value = false
      }
      catch(err) {
        throw(err)
        error.value = err
      }
  }

  function getRowsNumberCount (filter) {
      if (!filter) {
        return questions.value.length
      }
      let count = 0
      questions.value.forEach(question => {
        console.log("foreach", question.description)
        question.description.toLowerCase()
        if (question.description.includes(filter)) {
          ++count
        }
      })
      return count
    }

  function fetchFromServer (startRow, count, filter, sortBy, descending) {
      const data = filter
        ? questions.value.filter(row => 
        row.description.includes(filter))
        : questions.value.slice()

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

  async function onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter

      loading.value = true

      // emulate server
      setTimeout( async () => {
        // update rowsCount with appropriate value

        questions.value = await getQuestionsWithSubheaderFromApi()
        console.log("questions", questions.value)
        pagination.value.rowsNumber = getRowsNumberCount(filter)

        // get all rows if "All" (0) is selected
        const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage

        // fetch data from "server"
        const returnedData = fetchFromServer(startRow, fetchCount, filter, sortBy, descending)
        
        // clear out existing data and add new
        rows.value.splice(0, rows.value.length, ...returnedData)

        // don't forget to update local pagination object
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending

        // ...and turn of loading indicator
        loading.value = false
      }, 2000)
  }
  

  const getQuestionTypesFromApi = async () => {
    // update `props.user` to `user.value` to access the Reference value
      console.log("here")
      try {
        const newArray = await getQuestionTypes()
        console.log("newarray", newArray)
        //filter
        const newArray2 = newArray.map(({published_at, submittedAt,updated_at, questions, ...item}) => item)
        console.log("newarray222", newArray2)
        questionTypes.value = newArray2
        
      }
      catch(err) {
        throw(err)
        error.value = err
      }
  }
  onMounted(()=>{
    onRequest({
        pagination: pagination.value,
        filter: undefined
      })
  })
    return { 
      isPartOfSubheader,
      questions,
      questionTypes,
      loading,
      error,
      getQuestionsWithSubheaderFromApi,
      columns,
      addQuestionModal,
      addQuestionClick,
      deleteQuestion,
      editQuestion,
      //modal
      questionDescription,
      questionType,
      questionSubheader,
      questionLabel,
      position,
      onSubmit,
      questionForm,
      subHeadersQuestions,
      partOfSubheader,
      includedQuestions,
      // delete
      confirm, // modal
      confirmDelete,
      toDelete,
      deleteQuestionDescription, 
      //update modal
      updateQuestionModal,
      updateDescription,
      updateLabel,
      updatePosition,
      updateParent,
      updateQuestionType,
      onSubmitUpdateQuestion,
      updateQuestionForm,
      //table
      filter,
      onRequest,
      pagination,
      rows

    }
  },
})


</script>