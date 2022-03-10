<template>
  <q-page>
    <div class="q-pa-md">
      <q-form @submit="onSubmit" class="q-gutter-md" ref="surveyRefForm">
        <div class="row">
          <q-input
            ref="inputRef"
            filled
            lazy-rules
            :rules="[
              (val) => !!val || 'Field is required',
              (val) =>
                /^[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}$/.test(
                  val
                ) || 'Field should be a valid tsr number ex. XXX-XXX-XXX-XXX',
            ]"
            outlined
            v-model="TsrNo"
            label="TSR Number"
            style="width: 250px"
            stack-label
          />
        </div>

        <div class="row">
          <q-input
            ref="emailRef"
            filled
            lazy-rules
            :rules="[
              (val) => !!val || 'Field is required',
              (val) =>
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val) ||
                'Field should be a valid email ex. xxxx@mail.com',
            ]"
            outlined
            v-model="emailCustomer"
            label="Email"
            style="width: 250px"
            stack-label
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
        <div
          v-for="(question, parent_node_index) in orderByPositionQuestions"
          v-bind:key="question.question"
        >
          <!-- {{orderByPositionQuestions}} -->
          <!-- {{question}} -->
          <!-- {{ updateCnt(parent_node_index) }} -->

          <div v-if="question.children.length == 0">
            <div class="row">
              <p class="questions">{{ question.description }}</p>
              <!-- add 1 because index is 0 -->
            </div>
            <div class="row inline">
              <div class="inputs">
                <!-- {{question}} -->
                <CustomSurveyField
                  v-if="question.id == 3"
                  v-model="surveyAnswer.answers[parent_node_index]"
                  :questionId="question.id"
                  :question_type="question.question_type"
                  :labelval="question.label"
                />
                <CustomSurveyField
                  v-else
                  v-model="surveyAnswer.answers[parent_node_index]"
                  :questionId="question.id"
                  :question_type="question.question_type"
                  :labelval="question.label"
                />
              </div>
            </div>
          </div>
          <div v-else-if="question.children.length > 0">
            <p class="questions">{{ question.description }}</p>
            <div class="surveyquestions">
              <h5>Survey Questions</h5>

              <div
                v-for="(questionSubhead, index) in orderByNestedSurveyQuestions(
                  question.children
                )"
                v-bind:key="questionSubhead.id"
              >
                <!-- {{ updateCnt(parent_node_index) }} -->
                <!-- {{questionSubhead}} -->
                <!-- {{questionSubhead}} -->
                <!-- {{questionSubhead}} -->
                <!-- {{ orderByPositionQuestions.slice(0, parent_node_index).reduce((total, qs)=>total+=qs.subheader.length, 0)+ index }} -->
                <div class="row">
                  <div class="col-4 col-md-4">
                    <p class="questions">
                      {{ index + 1 }}. {{ questionSubhead.description }}
                    </p>
                  </div>
                  <div class="row inline">
                    <div class="inputs">
                      <!-- <div v-if="questionSubhead.id == 12">
                          <CustomSurveyField v-model="subHeaderSurveyAnswer.answers[orderByPositionQuestions.slice(0, parent_node_index).reduce((total, qs)=>total+=qs.children.length, 0)+ index]" :questionId="questionSubhead.id" lazy-rules :rules="[val => val == '' || 'Field is required']"  :question_type="questionSubhead.question_type.id"  :labelval="questionSubhead.label" />
                        </div> -->
                      <!-- indexing in nested v-model of surveyanswer -->
                      <!-- {{orderByPositionQuestions.slice(0, parent_node_index).reduce((total, qs)=>total+=qs.children.length, 0)+ index}} -->
                      <!-- {{subHeaderSurveyAnswer.answers[orderByPositionQuestions.slice(0, parent_node_index).reduce((total, qs)=>total+=qs.children.length, 0)+ index]}} -->
                      <CustomSurveyField
                        v-model="
                          subHeaderSurveyAnswer.answers[
                            orderByPositionQuestions
                              .slice(0, parent_node_index)
                              .reduce(
                                (total, qs) => (total += qs.children.length),
                                0
                              ) + index
                          ]
                        "
                        :questionId="questionSubhead.id"
                        :question_type="questionSubhead.question_type"
                        :labelval="questionSubhead.label"
                      />
                    </div>
                    <div>
                      <!-- {{subHeaderSurveyAnswer.answers[orderByPositionQuestions.slice(0, parent_node_index).reduce((total, qs)=>total+=qs.children.length, 0)+ index]}} -->
                      <q-input
                        v-if="
                          subHeaderSurveyAnswer.answers[
                            orderByPositionQuestions
                              .slice(0, parent_node_index)
                              .reduce(
                                (total, qs) => (total += qs.children.length),
                                0
                              ) + index
                          ].value < 3 &&
                          subHeaderSurveyAnswer.answers[
                            orderByPositionQuestions
                              .slice(0, parent_node_index)
                              .reduce(
                                (total, qs) => (total += qs.children.length),
                                0
                              ) + index
                          ].value != ''
                        "
                        v-model="
                          subHeaderSurveyAnswer.answers[
                            orderByPositionQuestions
                              .slice(0, parent_node_index)
                              .reduce(
                                (total, qs) => (total += qs.children.length),
                                0
                              ) + index
                          ].remarks
                        "
                        outlined
                        label="Remarks:"
                        style="width: 300px"
                        stack-label
                        lazy-rules
                        :rules="[(val) => !!val || 'Field is required']"
                      />
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
          <q-dialog v-model="prompt">
            <!-- <confirmmodal  :confirmFlag="confirmFlag"></confirmmodal> -->
            <q-card style="min-width: 500px">
              <q-card-section class="bg-primary text-white">
                <div class="text-h5 inline">
                  <span
                    >Please Confirm Answers for TSR Number: {{ TsrNo }}
                  </span>
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
                    <td
                      style="text-align: left"
                      v-if="answer.value != undefined"
                    >
                      {{ answers.description }}
                    </td>
                    <td
                      style="text-align: right"
                      v-if="answer.value != undefined"
                    >
                      {{ answers.value }}
                    </td>
                  </tr>
                </table>
                <!-- <q-icon name="check" color="primary" text-color="white" /> -->
                <!-- modal view answer -->
                <!-- <viewsurveyanswer v-model="tsrData" :cols="cols"></viewsurveyanswer> -->
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn
                  flat
                  label="Submit"
                  @click="onSubmit"
                  color="primary"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
        <div class="row justify-center">
          <q-btn
            label="Reset Form"
            class="q-ma-sm"
            color="primary"
            @click="clearFields"
          />
          <q-btn
            class="q-ma-sm"
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

    <q-dialog v-model="feedbackAfter" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">How was your experience using the app?</div>
        </q-card-section>
        <q-card-section class="row justify-center">
          <q-rating
            v-model="ratingApp.value"
            size="3.5em"
            color="primary"
            icon="star_border"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-show="ratingApp.value <= 2 && ratingApp.value > 0"
            v-model="ratingApp.remarks"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            label="Submit"
            @click="submitRateAppSurvey"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import {
  defineComponent,
  computed,
  ref,
  reactive,
  onMounted,
  onBeforeMount,
  watch,
} from "vue";
import CustomSurveyField from "../components/CustomSurveyField.vue";
import {
  countMaxDiv,
  getQuestions,
  getQuestionsWithoutAns,
  postAnswers,
  checkTSRsOtherAPI,
  checkTSRsUlimsAPI,
  checkTSRIfExists,
  postRateApp,
  validateCustomerAPI,
  getDataFromTsrSys
} from "src/axioshelper.js";

import viewsurveyanswer from "../components/modals/ViewSurveyAnswer.vue";

import orderBy from "lodash.orderby";

export default defineComponent({
  name: "Survey",
  components: { CustomSurveyField },
  setup() {
    const $q = useQuasar();
    const surveyRefForm = ref(null);
    const questions = ref([]);
    const subheadersQuestion = ref([]);
    const loading = ref(null);
    const lengthQuestions = ref(0);

    // TSR data for post Add TSR
    const emailCustomer = ref(null);
    const TsrNo = ref(null);
    const serviceData = ref(null);
    const industryData = ref(null);
    const divData = ref(null);
    const sectionData = ref(null);

    const feedbackAfter = ref(false);
    const ratingAfter = ref(null);
    const tsrDataFromApi = ref(null);

    const ratingApp = ref({
      value: "",
      remarks: "",
    });

    watch(TsrNo, (newValue, oldValue) => {
      // checkTSRsOtherAPI(newValue)
      // check tsr field if valid
      const pattern =
        /^[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}$/;
      if (pattern.test(newValue)) {
        assignTSRData(newValue);
      }
    });

    const prompt = ref(false);
    const confirmFlag = ref(false);
    const displayQuestions = ref([]);

    let totalSubHeaderLength = 0;
    // review
    const cols = ref([]);
    const answer = reactive({
      answerid: "",
      value: "",
      question: "",
      tsrNo: "",
      remarks: "",
    });
    const surveyAnswer = reactive({
      answers: [],
    });
    const subHeaderSurveyAnswer = reactive({
      answers: [],
    });

    const orderKey = ref("position");

    // assign tsr from other apis
    const assignTSRData = async (newValue) => {
      tsrDataFromApi.value = await getDataFromTsrSys(newValue);
      // check oneshop
      // tsrDataFromApi.value = await checkTSRsOtherAPI(newValue)
      // tsrDataFromApi.value = tsrDataFromApi.value[0]
      // // { "name": "Machining (Precision)", "div": "PD", "sectionCode": "PDS", "serviceCode": "MAPR", "costCenter": "28" }
      if (tsrDataFromApi.value) {
        industryData.value = tsrDataFromApi.value.indusry;
        serviceData.value = tsrDataFromApi.value.service;
        sectionData.value = tsrDataFromApi.value.sectionCode;
        divData.value = tsrDataFromApi.value.division;
      }
    };

    const getAllQuestionsFromApi = async () => {
      // update `props.user` to `user.value` to access the Reference value

      try {
        // questionsNotManipulated.value = await getData(url)
        questions.value = await getQuestionsWithoutAns();
        displayQuestions.value = questions.value.filter((Question) => {
          Question.children = questions.value.filter((child) => {
            // console.log("Question",Question)
            return child.parent === Question.id;
          });
          return Question.parent === null;
        });
        // column
        // column in survey result
        cols.value = [
          ...new Set(
            questions.value.map(({ id, description, value }) => ({
              id,
              description,
              value,
            }))
          ),
        ];

        // subheadersQuestion.value = questions.value.filter( row => row.subheader.length >0 )
        displayQuestions.value.forEach((val) => {
          val.children.forEach((sub) => {
            totalSubHeaderLength++;
            questions.value.forEach((que, index) => {
              if (sub.id == que.id) {
                questions.value.splice(index, 1);
              }
            });
          });
        });

        // total questions length subtract questions subheader
        lengthQuestions.value = questions.value.length;
        buildArrayOfAnswers();

        loading.value = false;
      } catch (err) {
        throw err;
        error.value = err;
      }
    };

    const orderByPositionQuestions = computed(() => {
      // pass a array of questions and sort by position
      return orderBy(displayQuestions.value, orderKey.value);
    });

    // for child questions in a subheader
    function orderByNestedSurveyQuestions(q) {
      // order by position
      return orderBy(q, orderKey.value);
    }

    function confirmModalShow() {
      prompt.value = true;
      // all of questions without children
      for (let i = 0; i < surveyAnswer.answers.length; i++) {
        surveyAnswer.answers[i].tsrNo = TsrNo.value; // answer.tsrno is to vmodel
        for (let j = 0; j < cols.value.length; j++) {
          if (cols.value[j].id == surveyAnswer.answers[i].question) {
            // show in confirmation modal question answer value pair
            cols.value[j].value = surveyAnswer.answers[i].value;
          }
        }
      }
      // all of the subheaders
      for (let i = 0; i < totalSubHeaderLength; i++) {
        // v-model index
        subHeaderSurveyAnswer.answers[i].tsrNo = TsrNo.value; // answer.tsrno is to vmodel
        for (let j = 0; j < cols.value.length; j++) {
          if (cols.value[j].id == subHeaderSurveyAnswer.answers[i].question) {
            // show in confirmation modal question answer value pair
            cols.value[j].value = subHeaderSurveyAnswer.answers[i].value;
          }
        }
      }
    }

    function clearFields() {
      console.log("Reseting the form");
      TsrNo.value = "";
      emailCustomer.value = "";
      surveyAnswer.answers.forEach((element) => {
        console.log("111", element);
        element.remarks = "";
        element.value = "";
      });
      subHeaderSurveyAnswer.answers.forEach((element) => {
        console.log("222", element);
        element.remarks = "";
        element.value = "";
      });

      //Iterate through each object field, key is name of the object field`
      console.log("surveyRefForm", surveyRefForm.value);
      surveyRefForm.value.reset();
    }

    async function submitRateAppSurvey() {
      if (ratingApp.value) {
        await postRateApp(ratingApp.value);
      }
    }

    async function submitSurvey() {
      if (!industryData.value || industryData.value == "") {
        industryData.value = "";
      }
      let checkedDivisionsMax = ["ATD"];
      let proceedCheckDivMax = true;
      checkedDivisionsMax.forEach(async (element) => {
        if (element == divData.value) {
          proceedCheckDivMax = await countMaxDiv(divData.value);
        }
      });

      let proceed = await validateCustomerAPI(emailCustomer.value, TsrNo.value);
      if (proceed && proceedCheckDivMax) {
        if (
          !tsrDataFromApi.value.industry ||
          tsrDataFromApi.value.industry == ""
        ) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Industry is empty",
          });
        } else {
          let a = await postAnswers(
            surveyAnswer.answers,
            subHeaderSurveyAnswer.answers,
            TsrNo.value,
            industryData.value,
            serviceData.value,
            divData.value,
            "",
            emailCustomer.value
          );

          // if survey form is accepted notify
          if (a == "200") {
            clearFields();
            $q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Submitted",
            });
            feedbackAfter.value = true;
          } else {
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: "TSR already answered",
            });
          }
        }
      } else {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Feedback invalid ",
        });
      }

      // post answers and children/subheader answers
    }

    function buildArrayOfAnswers() {
      // totalsubheader length for dynamic v-model
      for (let i = 0; i < lengthQuestions.value; i++) {
        // question please rate does not need an answer
        surveyAnswer.answers.push(answer);
      }
      // total subheader all for v-model
      for (let i = 0; i < totalSubHeaderLength; i++) {
        // question please rate does not need an answer
        subHeaderSurveyAnswer.answers.push(answer);
      }
    }

    onMounted(() => {
      getAllQuestionsFromApi();
      buildArrayOfAnswers();
    });

    // validation

    async function onSubmit() {
      surveyRefForm.value.validate().then((success) => {
        // check null values from api
        if (Object.keys(tsrDataFromApi.value).length) {
          if (success) {
            let overallAns = subHeaderSurveyAnswer.answers.find(
              (element) => element.question == 12
            );
            if (overallAns.value || overallAns.value != "") {
              submitSurvey();
            } else {
              $q.notify({
                color: "red-5",
                textColor: "white",
                icon: "warning",
                message: "Please answer Overall Rating Question",
              });
            }
          } else {
            // required field is not satisfied
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: "Please check all the fields",
            });
          }
        } else {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "TSR not Found",
          });
        }
      });
    }

    return {
      surveyRefForm,
      feedbackAfter,
      ratingApp,
      service: ref(null),
      industry: ref(null),
      comments: ref(null),
      TsrNo,
      emailCustomer,
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
      serviceData,
      industryData,
      divData,
      sectionData,
      clearFields,
      submitRateAppSurvey,
    };
  },
});
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

td,
th {
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
