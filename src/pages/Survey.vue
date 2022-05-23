<template>
  <q-page>
    <div class="q-pa-md">
      <q-form @submit="onSubmit" class="q-gutter-md" ref="surveyRefForm">
        <div class="row">
          <div >
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
          <div >
            <div class="q-pa-md">
              <q-btn round color="primary" @click="showQRStream=true" icon="fas fa-qrcode" >
                <q-tooltip class="bg-white text-primary">Scan QR</q-tooltip>
              </q-btn>
              
            </div>
          </div>
         
        </div>
         
        

        <div class="row">
          <div class="q-pa-lg">
            Preferred verification:
            <q-option-group
              v-model="group"
              :options="options"
              color="primary"
              inline
            />
          </div>

          <!-- <q-input 
        ref="inputRef"
        filled
        outlined  v-model="TsrNo" label="TSR Number" style="width: 150px" stack-label 
        
        /> -->
        </div>
        <div class="row">
          <div class="q-pa-lg">
            <q-input
              ref="emailRef"
              v-if="modeValidate == 3"
              filled
              lazy-rules
              :rules="[
                (val) => !!val || 'Field is required',
                (val) =>
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val) ||
                  'Field should be a valid email ex. xxxx@mail.com',
              ]"
              outlined
              v-model="emailCustomerValidate"
              :label="selectedLabel"
              style="width: 250px"
              stack-label
            />
            <q-input
              ref="emailRef"
              filled
              lazy-rules
              v-else-if="modeValidate == 1"
              :rules="[
                (val) => !!val || 'Field is required',
                (val) =>
                  /^(09|\+639)\d{9}$/.test(val) ||
                  'Field should be a valid mobile number ex 09xxxxxxxxx or +639xxxxxxxxx',
              ]"
              outlined
              v-model="emailCustomerValidate"
              :label="selectedLabel"
              style="width: 250px"
              stack-label
            />
            <q-input
              ref="emailRef"
              filled
              lazy-rules
              v-else
              :rules="[
                (val) => !!val || 'Field is required',
                (val) =>
                  /^\d{3}-\d{4}$/.test(val) ||
                  'Field should be a valid telephone number ex xxx-xxxx',
              ]"
              outlined
              v-model="emailCustomerValidate"
              :label="selectedLabel"
              style="width: 250px"
              stack-label
            />
          </div>
        </div>
        <div id="legendPanel">
          <table>
            <tr>
              <th colspan="2">Legend</th>
            </tr>
            <tr>
              <th>Rating</th>
              <th>Smiley</th>
            </tr>
            <tr>
              <th>Poor - 1</th>
              <th>
                <q-icon name="sentiment_very_dissatisfied" size="2.0em" />
              </th>
            </tr>
            <tr>
              <th>Fair - 2</th>
              <th><q-icon name="sentiment_dissatisfied" size="2.0em" /></th>
            </tr>
            <tr>
              <th>Satisfactory - 3</th>
              <th><q-icon name="sentiment_satisfied" size="2.0em" /></th>
            </tr>
            <tr>
              <th>Very Satisfactory - 4</th>
              <th><q-icon name="sentiment_satisfied_alt" size="2.0em" /></th>
            </tr>
            <tr>
              <th>Excellent - 5</th>
              <th><q-icon name="sentiment_very_satisfied" size="2.0em" /></th>
            </tr>
          </table>
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
        <div class="row">
          <div class="">
            <div
              v-for="(question, parent_node_index) in orderByPositionQuestions"
              v-bind:key="question.question"
            >
              <!-- {{orderByPositionQuestions}} -->
              <!-- {{question}} -->
              <!-- {{ updateCnt(parent_node_index) }} -->
              <div>
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
                    <div class="row inline>">
                      <div class="col-4">
                        <h5>Survey Questions</h5>
                      </div>
                    </div>

                    <div
                      class="q-pa-md"
                      v-for="(
                        questionSubhead, index
                      ) in orderByNestedSurveyQuestions(question.children)"
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
                                      (total, qs) =>
                                        (total += qs.children.length),
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
                                      (total, qs) =>
                                        (total += qs.children.length),
                                      0
                                    ) + index
                                ].value < 3 &&
                                subHeaderSurveyAnswer.answers[
                                  orderByPositionQuestions
                                    .slice(0, parent_node_index)
                                    .reduce(
                                      (total, qs) =>
                                        (total += qs.children.length),
                                      0
                                    ) + index
                                ].value != ''
                              "
                              v-model="
                                subHeaderSurveyAnswer.answers[
                                  orderByPositionQuestions
                                    .slice(0, parent_node_index)
                                    .reduce(
                                      (total, qs) =>
                                        (total += qs.children.length),
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
    
    <q-dialog v-model="showQRStream">
      <q-card style="width: 100%"> 
        <q-card-section class="row items-center bg-primary text-white">
          <div class="text-h6">Scan QR Code</div>
            <q-space />
            <q-btn class="float-right" dense flat icon="close" v-close-popup>
              <q-tooltip class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
        </q-card-section>
        <q-card-section class="bg-white" >
          <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
            <div v-show="showScanConfirmation" class="scan-confirmation">
              <!-- <img :src="$withBase('/checkmark.svg')" alt="Checkmark" width="128px" /> -->
            </div>
          </qrcode-stream>
        </q-card-section>

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
  onBeforeUnmount,
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
  getDataFromTsrSys,
} from "src/axioshelper.js";

import viewsurveyanswer from "../components/modals/ViewSurveyAnswer.vue";

import orderBy from "lodash.orderby";

import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue3-qrcode-reader'

export default defineComponent({
  name: "Survey",
  components: { CustomSurveyField, QrcodeStream },
  setup() {
    let timer;

    // qr code
    console.log("QrcodeStream",QrcodeStream)
    const showScanConfirmation = ref(false)
    const camera = ref('auto')
    const result = ref(null)
    const showQRStream = ref(false)

    const $q = useQuasar();
    const surveyRefForm = ref(null);
    const questions = ref([]);
    const subheadersQuestion = ref([]);
    const loading = ref(null);
    const lengthQuestions = ref(0);
    

    // TSR data for post Add TSR
    const emailCustomerValidate = ref(null);
    const TsrNo = ref(null);
    const serviceData = ref(null);
    const industryData = ref(null);
    const divData = ref(null);
    const sectionData = ref(null);

    const feedbackAfter = ref(false);
    const ratingAfter = ref(null);
    const tsrDataFromApi = ref(null);

    const group = ref("mobileNumber");
    const modeValidate = ref(1);
    const selectedLabel = ref("Mobile Number");

    const options = [
      {
        label: "Mobile Number",
        value: "mobileNumber",
      },
      {
        label: "Telephone Number",
        value: "telNumber",
      },
      {
        label: "Email",
        value: "email",
      },
    ];

    const ratingApp = ref({
      value: "",
      remarks: "",
    });

    watch(group, (newValue, oldValue) => {
      // checkTSRsOtherAPI(newValue)
      // check tsr field if valid
      let retVal;
      switch (newValue) {
        case "mobileNumber":
          retVal = "Mobile Number";
          modeValidate.value = 1;
          break;
        case "telNumber":
          retVal = "Telephone Number";
          modeValidate.value = 2;
          break;
        case "email":
          modeValidate.value = 3;
          retVal = "Email";
          break;

        default:
          break;
      }
      emailCustomerValidate.value = "";
      selectedLabel.value = retVal;
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
        questions.value = orderBy(questions.value, orderKey.value);
        displayQuestions.value = questions.value.filter((Question) => {
          Question.children = questions.value.filter((child) => {
            return child.parent === Question.id;
          });
          return Question.parent === null;
        });
        // column
        // column in survey result
        console.log("questions.value.", questions.value);
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

    function showLoading() {
      $q.loading.show({
        message: "Please wait for data to be submitted..",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary",
      });
    }

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer);
        $q.loading.hide();
      }
    });

    function hideLoading() {
      timer = void 0;
      $q.loading.hide();
    }
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
      TsrNo.value = "";
      emailCustomerValidate.value = "";
      surveyAnswer.answers.forEach((element) => {
        element.remarks = "";
        element.value = "";
      });
      subHeaderSurveyAnswer.answers.forEach((element) => {
        element.remarks = "";
        element.value = "";
      });

      //Iterate through each object field, key is name of the object field
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

      let proceed = await validateCustomerAPI(
        emailCustomerValidate.value,
        TsrNo.value,
        modeValidate.value
      );
      if (proceed == "403") {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You are not authorized to submit a survey ",
        });
      }
      if (proceed == "400") {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Duplicate TSR",
        });
      } else if (proceedCheckDivMax == "403") {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You are not authorized to submit a survey ",
        });
      } else if (proceed && proceedCheckDivMax) {
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
          showLoading();
          let a = await postAnswers(
            surveyAnswer.answers,
            subHeaderSurveyAnswer.answers,
            TsrNo.value,
            tsrDataFromApi.value.industry,
            tsrDataFromApi.value.service,
            tsrDataFromApi.value.division,
            "",
            emailCustomerValidate.value
          );
          console.log("aaaaa", a);

          // if survey form is accepted notify
          if (a == "200") {
            clearFields();
            hideLoading();
            $q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Submitted",
            });
            feedbackAfter.value = true;
          } else if (a == "401" || a == "404") {
            hideLoading();
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: "Error in submitting Form, Please check connection",
            });
          } else if (a == "500") {
            hideLoading();
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: "TSR-No is Duplicate",
            });
          }
        }
      } else {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Verification error",
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
        if (!tsrDataFromApi.value) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Please check all the fields",
          });
        } else if (Object.keys(tsrDataFromApi.value).length) {
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


    async function onInit (promise) {
      try {
        await promise
      } catch (e) {
        console.error(e)
      } finally {
        showScanConfirmation.value = camera.value === "off"
      }
    }

    async function onDecode (content) {
      console.log("splitContent",splitContent)
      console.log("splitContent222",splitContent[0])
      if(content){
        let splitContent = content.split('|')
        if(splitContent.length > 0){
          if (/^[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}$/.test(splitContent[0])){
              
              TsrNo.value = splitContent[0]
              switch (modeValidate.value) {
                case 1:
                  emailCustomerValidate.value = splitContent[1]
                  break;
                case 2:
                  emailCustomerValidate.value = splitContent[1]
                  break;
                case 3:
                  emailCustomerValidate.value = splitContent[2]
                  break;
                default:
                  break;
              }
              showQRStream.value = false
            }else{
              console.log("splitContent",splitContent)
              console.log("splitContent222",splitContent[0])
              $q.notify({
                color: "red-5",
                textColor: "white",
                icon: "warning",
                message: "QR invalid",
              });
            }
          
        }
      }else{
        if (/^[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}$/.test(splitContent[0])){
            TsrNo.value = splitContent[0]
            showQRStream.value = false
          }else{
             console.log("splitContent",splitContent)
             console.log("splitContent222",splitContent[0])
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: "QR invalid",
            });
          }
        }
      
      
     
      
      pause()
      await timeout(500)
      unpause()
      
      
    }

    function unpause () {
      camera.value = 'auto'
    }

    function pause () {
      camera.value = 'off'
    }

    function timeout (ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    }

    return {
      surveyRefForm,
      feedbackAfter,
      ratingApp,
      service: ref(null),
      industry: ref(null),
      comments: ref(null),
      TsrNo,
      emailCustomerValidate,
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
      showLoading,

      // option groups verification
      group,
      options,
      selectedLabel,
      modeValidate,

      // qr codes
      onDecode,
      QrcodeStream,
      showScanConfirmation,
      camera,
      result,
      onInit,
      showQRStream
      
    };
  },
});
// vanilla
let lastScrollTop = 0;
setTimeout(function() {
    document.getElementById("legendPanel").style.visibility = "hidden";
}, 2000); // <-- time in milliseconds

document.addEventListener(
  "scroll",
  function () {
    // or window.addEventListener("scroll"....
    var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop) {
      // downscroll code
      document.getElementById("legendPanel").style.visibility = "hidden";
      document.getElementById("legendPanel").style.opacity = "0";
      document.getElementById("legendPanel").style.transition =
        "visibility 0s, opacity 0.5s linear";
      // visibility: hidden;
      // opacity: 0;
      // transition: visibility 0s, opacity 0.5s linear;
    } else {
      document.getElementById("legendPanel").style.visibility = "visible";
      document.getElementById("legendPanel").style.opacity = "1";
      document.getElementById("legendPanel").style.transition =
        "visibility 0s, opacity 0.5s linear";
      setTimeout(function() {
          document.getElementById("legendPanel").style.visibility = "hidden";
      }, 2000); // <-- time in milliseconds


      // upscroll code
      // document.getElementById("toolbar").style.top = "-50px";
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  },
  false
);
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
#legendPanel {
  position: -webkit-sticky; /* Safari */
  position: fixed;
  top: 40px;
  right: 0;
  height: 70px;
  visibility: visible;
}
.scan-confirmation {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, .8);

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}



</style>
