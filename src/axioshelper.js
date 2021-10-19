import { api, oneshopapi, ulimsTSRapi} from 'boot/axios'
import moment from 'moment';

let today = new Date();
today = moment().year()
const getTSRNoFromULIMSrSystems = async function (tsrNumber) {
  //   loading.value = true;
  //   error.value = null;
    // I prefer to use fetch
    // you can use use axios as an alternative
    // console.log("apiiiii")
    // console.log(api.get('/questions'))
     return await ulimsTSRapi.get('/gettsr?tsr='+tsrNumber)
      .then(function( response ){
          // console.log(response.data.results)
          console.log("responsesese" , response.data)
          return response.data;
      })
  }
// get data
const getTSRNoFromOneShopSystems = async function (tsrNumber) {
  //   loading.value = true;
  //   error.value = null;
    // I prefer to use fetch
    // you can use use axios as an alternative
    // console.log("apiiiii")
    // console.log(api.get('/questions'))
     return await oneshopapi.get('/requests?tsrNo='+tsrNumber)
      .then(function( response ){
          // console.log(response.data.results)
          console.log("responsesese" , response.data.data)
          return response.data.data;
      })

  }

const getAllQuestions = function () {
  //   loading.value = true;
  //   error.value = null;
    // I prefer to use fetch
    // you can use use axios as an alternative
    // console.log("apiiiii")
    // console.log(api.get('/questions'))
      return api.get('/questions')
      .then(function( response ){
          // console.log(response.data.results)
          return response.data;
      })

  }

const getAllTSRs = function () {
  
  console.log("today", today)
  //   loading.value = true;
  //   error.value = null;
    // I prefer to use fetch
    // you can use use axios as an alternative
    // console.log("apiiiii")
    // console.log(api.get('/questions'))
    // ?_start=10&_limit=10
      return api.get('/tsrs?_limit=-1&created_at_gte='+today+'-01-01'+'&created_at_lte='+today+'-12-31&_sort=created_at:DESC')
      .then(function( response ){
          // console.log(response.data.results)
          console.log("from axios")
          console.log(response.data)
          return response.data;
      })
  }

const getAllAnswers = function (start,limit) {
    //   loading.value = true;
    //   error.value = null;
      // I prefer to use fetch
      // you can use use axios as an alternative
      // console.log("apiiiii")
      // console.log(api.get('/questions'))
      // ?_start=10&_limit=10
        return api.get('/answers?_start='+start+'&_limit='+limit)
        .then(function( response ){
            // console.log(response.data.results)
            console.log("from axios")
            console.log(response.data)
            return response.data;
        })
    }
const getAllQuestionTypes = function () {
  //   loading.value = true;
  //   error.value = null;
    // I prefer to use fetch
    // you can use use axios as an alternative
    // console.log("apiiiii")
    // console.log(api.get('/questions'))
      return api.get('/question-types')
      .then(function( response ){
          // console.log(response.data.results)
          return response.data;
    })
}

const getTsrViaDivision = function (division) {
  console.log("natawag ba to")
  //   loading.value = true;
  //   error.value = null;
    // I prefer to use fetch
    // you can use use axios as an alternative
    // console.log("apiiiii")
    // console.log(api.get('/questions'))
      return api.get('/tsrs/?division='+division)
      .then(function( response ){
          console.log("from axios tsr division", response.data)
          return response.data;
    })
}
// http://10.10.120.19:1337/answers/?tsr.division=ATD&&question.id=6
const getAnswersForOverall = function (division,questionID,beforeDate,afterDate) {
  console.log("natawag ba to")
  //   loading.value = true;
  //   error.value = null;
    // I prefer to use fetch
    // you can use use axios as an alternative
    // console.log("apiiiii")
    // console.log(api.get('/questions'))
    let before
    let after
    before = moment(beforeDate).format('YYYY-MM-DD');
    after = moment(afterDate).format('YYYY-MM-DD');
    if(beforeDate && afterDate){
        console.log("before",beforeDate)
        console.log("after",afterDate)
        return api.get('/answers/?tsr.division='+ division + '&&question.id='+questionID+ '&created_at_gte='+before+'&created_at_lte='+after)
        .then(function( response ){
            console.log("from axios tsr division", response.data)
            return response.data;
      })
    }else{
      return api.get('/answers/?tsr.division='+ division + '&&question.id='+questionID+'&created_at_gte='+today+'-01-01'+'&created_at_lte='+today+'-12-31')
        .then(function( response ){
            console.log("from axios tsr division", response.data)
            return response.data;
      })
    }
      
}
 
const postAnswersToBackend = async function(answers,subheaderans,tsrNo,industry,service,division) {
  
  let errorMessage = ""
  console.log(answers)
  // 10.10.120.19:1337/tsrs
  // api.post("/tsrs",tsrNo)
//   {
//     "tsr": 4,
//     "question": 4,
//     "value": "4",
//     "tsr_q_id": "4_4",
//     "tsrNo": "8050"
// }
//division
//sector add
  let tsr = {
      "tsrNo": tsrNo,
      "industry": industry,
      "service": service,
      "division": division
  }
  let tsrId
  await api.post("/tsrs", tsr)
  .then(response => 
    tsrId = response.data.id
  )
  answers.forEach(function (answer) {
    console.log("tsrsrsts", tsrId)
    console.log("from axioss sssssdsd23232", answer)
    let ans = {
      tsr: tsrId,
      question: answer.question,
      value: answer.value,
      tsr_q_id: tsrId +'_' +answer.question,
      tsrNo: tsrNo
    }
    api.post("/answers", ans)
    .then()
    .catch(error => {
      errorMessage = error.message;
      console.error("There was an error!", error);
    });
  })
  subheaderans.forEach(function (answer) {
    console.log("tsrsrsts", tsrId)
    console.log("from axioss sssssdsd23232", answer)
    let ans = {
      tsr: tsrId,
      question: answer.question,
      value: answer.value,
      tsr_q_id: tsrId +'_' +answer.question,
      tsrNo: tsrNo
    }
    api.post("/answers", ans)
    .then()
    .catch(error => {
      errorMessage = error.message;
      console.error("There was an error!", error);
    });
  })
}

const postQuestionToBackend = async function(question) {
  let errorMessage = ""
  await api.post("/questions", question)
  .then(res => {
    console.log("resresrespostques", res)
  })
  .catch(error => {
    this.errorMessage = error.message;
    console.error("There was an error!", error);
  });
}

const postQuestionToBackendExistingSubheader = async function(id,question) {
  let errorMessage = ""
  let postid
  await api.post("/questions", question).then(res =>{
    postid = res.data.id
  })
  const res = await api.get("/questions/"+id)
  const task = res.data
  const subheader = res.data
  question.id = postid
  console.log("ques", question)
  console.log("sub", task)
  await api.post("/questions/" + id, function(request,response){
    {
      task
    }
  })
  .then(res => {
    console.log("campmates")
    console.log(res);
  // console.log(res.data);
  })
  .catch(error => {
    this.errorMessage = error.message;
    console.error("There was an error!", error);
  });
}

const editQuestion = async function(id,question) {
  let errorMessage = ""
  console.log("question", question)
  await api.put("/questions/"+ id, question).then(res =>{
    console.log(res)
  })

}

const deleteQuestion = async function(id) {
  let errorMessage = ""

  // cascade delete that will find specific or have filters not find all
  let answers = await api.get("/answers/").then(function( response ){
    // console.log(response.data.results)
        return response.data;
    })
  console.log("answers", answers)
    answers.forEach(function (arrayItem) {
      var toDeleteID = arrayItem.id;
      console.log("todelelelele", toDeleteID)
      console.log("arrayarray", arrayItem)
      if(arrayItem.question.id == id){
        
        api.delete("/answers/" + toDeleteID).then(res =>  {
          console.log("successfully deleted: ", toDeleteID)
         })
      }
  });
    // console.log("lindablaire", ans)

    api.delete("/questions/" + id)
  .then(res => {
    console.log("succesful delete");
    console.log("deleted question", res)
  //   // axios.delete("http://10.10.120.19:1337/answers/" + id)
  })
   .catch(error => {
  //   this.errorMessage = error.message;
    console.error("There was an error!", error);
   });
  console.log(id)

}

export async function load(url) {
    let result = await axios.get(url);
    items.splice(0, items.length, ...result.data);
    return items
};

// exports
// raw data
export const checkTSRsOtherAPI = (tsrNumber) => {
  return getTSRNoFromOneShopSystems(tsrNumber)
}

export const checkTSRsUlimsAPI = (tsrNumber) => {
  return getTSRNoFromULIMSrSystems(tsrNumber)
}



export const getQuestions = () => {
  return getAllQuestions()
}

export const getAnswers = (start,limit) => {
  return getAllAnswers(start,limit)
}


export const getTSRs = () => {
  return getAllTSRs()
}
export const getQuestionTypes = () => {
  return getAllQuestionTypes()
}

export const postAnswers = (answers,subs,tsrNo,industry,service,division) => {
  return postAnswersToBackend(answers,subs,tsrNo,industry,service,division)
}

export const postQuestion = (question) => {
  return postQuestionToBackend(question)
}

export const postQuestionSubheader = (id,question) => {
  return postQuestionToBackendExistingSubheader(id,question)
}
export const updateQuestion = (id,question) => {
  return editQuestion(id,question)
}
export const delQuestion = (id) => {
  return deleteQuestion(id)
}

export const tsrViaDivision = (division) => {
  return getTsrViaDivision(division)
}

export const getOverall = (division,questionID,beforeDate,afterDate) =>{
  return getAnswersForOverall(division,questionID,beforeDate,afterDate)
}
