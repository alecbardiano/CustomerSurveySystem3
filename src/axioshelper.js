import { api, oneshopapi, ulimsTSRapi,mailapi,csmsURL} from 'boot/axios'
import moment from 'moment';
import {groupBy, flow, chain} from 'lodash';
import { v4 as uuidv4 } from 'uuid';

let todayDate = new Date()
let today = moment().year()
let datetime = todayDate


export const getDataFromTsrSys = async (tsrNumber) => {
  return await api.get('tsrs/getTsrSystems/'+tsrNumber)
    .then(function( response ){
        return response.data
    })
}

const getTSRNoFromULIMSrSystems = async function (tsrNumber) {
     // check tsr from ULIMS
     return await ulimsTSRapi.get('/gettsr?tsr='+tsrNumber)
      .then(function( response ){
          return response.data;
      })
  }
// get data
const getTSRNoFromOneShopSystems = async function (tsrNumber) {
  
    //  get TSR from oneshop
     return await oneshopapi.get('/requests?tsrNo='+tsrNumber)
      .then(function( response ){
          return response.data.data;
      })

  }

  

const getAllQuestionsWithoutAns = function () {
      return api.get('/questions/withoutAns')
      .then(function( response ){
          return response.data;
      })

  }


const getAllQuestions = function () {

      return api.get('/questions')
      .then(function( response ){
          
          return response.data;
      })

  }

  const checkTSRExist = function (tsr) {
    //   loading.value = true;
    //   error.value = null;
      // I prefer to use fetch
      // you can use use axios as an alternative
      // console.log("apiiiii")
      // console.log(api.get('/questions'))
        return api.get('/tsrs?tsrNo='+ tsr)
        .then(function( response ){
            
            // return response.data;
            if ( response.data.length > 0 ){
              return true
            }else{
              return false
            }
        })
  
    }

const getTsrsViaYear = function (year){
  // console.log("yearere", year)
    return api.get('/tsrs?&_limit=-1&submittedAt_gte='+year+'-01-01'+'&submittedAt_lte='+year+'-12-31&_sort=division,service,submittedAt:DESC')
  .then(function( response ){
      
      // console.log("from axios")
      // console.log(response.data)
      return response.data;
    })
}

const getAllTSRsByYearAndMonth = function (month,year) {
  // mode 3 admin division
  // mode 2 dashboard
  // mode 1 admin
  let bfdate = new Date(year, month)
  let afterDate
  if(month == 12){
    month = 0
    afterDate = new Date(year+1, month)
  }else{
    afterDate = new Date(year, month+1)
  }
  let before = moment(bfdate).format('YYYY-MM-DD');
  let after = moment(afterDate).format('YYYY-MM-DD');
  
    return api.get('/tsrs?&_limit=-1&submittedAt_gte='+before+'&submittedAt_lt='+ after +'&_sort=division:ASC,service:ASC,submittedAt:DESC')
      .then(function( response ){
          
          // console.log("from axios")
          // console.log(response.data)
          return response.data;
        })
  }

const getAllTSRs = function (start,limit,division,service,beforeDate,afterDate,mode,filter) {
  // mode 4 admin with filter
  // mode 3 admin division
  // mode 2 dashboard
  // mode 1 admin
      let before = moment(beforeDate).format('YYYY-MM-DD');
      let after = moment(afterDate).format('YYYY-MM-DD');
      if (mode == 2){
        return api.get('/tsrs?&_limit=-1&submittedAt_gte='+today+'-01-01'+'&submittedAt_lte='+today+'-12-31&_sort=division,service,submittedAt:DESC')
      .then(function( response ){
          
          // console.log("from axios")
          // console.log(response.data)
          return response.data;
        })
      }
      else if (mode == 3){
        if(beforeDate && afterDate){
          return api.get('/tsrs?&_limit=-1&submittedAt_gt='+before+'&submittedAt_lte='+after+'&division='+division+'&service='+service +'&_sort=division,service,submittedAt:DESC')
          .then(function( response ){
              
              // console.log("from axios")
              // console.log(response.data)
              return response.data;
          })

        }else{
          return api.get('/tsrs?&_limit=-1&submittedAt_gte='+today+'-01-01'+'&submittedAt_lte='+today+'-12-31'+division+'&service='+service+'&_sort=division,service,submittedAt:DESC&division=')
          .then(function( response ){
              
              // console.log("from axios")
              // console.log(response.data)
              return response.data;
          })
        }
      }
      else if (mode == 4){
        if(beforeDate && afterDate){
          return api.get('/tsrs?_start='+start+'&_limit='+limit+'&submittedAt_gt='+before+'&submittedAt_lte='+after+'&division='+division+'&service='+service +'&_sort=division,service,submittedAt:DESC')
          .then(function( response ){
              
              return response.data;
          })

        }else{
          return api.get('/tsrs?_start='+start+'&_limit='+limit+'&submittedAt_gte='+today+'-01-01'+'&submittedAt_lte='+today+'-12-31&division='+division+'&service='+service+'&_sort=division,service,submittedAt:DESC&division=')
          .then(function( response ){
              
              // console.log("from axios")
              // console.log(response.data)
              return response.data;
          })
        }
      }
      else{
        if( beforeDate && afterDate){
          if(filter != ""){
            return api.get('/tsrs?tsrNo_contains='+ filter +'&_start='+start+'&_limit='+limit+'&submittedAt_gte='+before+'&submittedAt_lte='+after+'&_sort=division:ASC,service:ASC,submittedAt:DESC')
              .then(function( response ){
            
            // console.log("from axios")
            // console.log(response.data)
            // console.log("Dapat dito to diba with filter?", filter)
            return response.data;
           })
          }else{
            return api.get('/tsrs?_start='+start+'&_limit='+limit+'&submittedAt_gte='+before+'&submittedAt_lte='+after+'&_sort=division:ASC,service:ASC,submittedAt:DESC')
            .then(function( response ){
              
              // console.log("from axios")
              // console.log(response.data)
              // console.log("Dapat dito to diba")
              return response.data;
            })
          }
        }else{
          if(filter != ""){
            return api.get('/tsrs?tsrNo_contains='+ filter + '&_start='+start+'&_limit='+limit+'&submittedAt_gte='+today+'-01-01'+'&submittedAt_lte='+today+'-12-31&_sort=division:ASC,service:ASC,submittedAt:DESC')
            .then(function( response ){
                
                // console.log("from axios")
                // console.log(response.data)
                return response.data;
            })
          }
          return api.get('/tsrs?_start='+start+'&_limit='+limit+'&submittedAt_gte='+today+'-01-01'+'&submittedAt_lte='+today+'-12-31&_sort=division:ASC,service:ASC,submittedAt:DESC')
          .then(function( response ){
              
              // console.log("from axios")
              // console.log(response.data)
              return response.data;
          })
      }
    }
  }

const getAllAnswerSearch = function (searchTsrNo,mode,start,limit){
  return api.get('/answers/searchAnswer/' + searchTsrNo +'/' + mode +'/' + start +'/' + limit)
  // /answers/searchAnswer/:searchTsrNo/:mode/:rowCount/:offset
        .then(function( response ){
            
            return response.data;
        })

  // http://10.10.120.19:1337/answers/searchAnswer/MIRDC-012016-CLS-0010
}
const getCountAllAnswerSearch = function (searchTsrNo,mode){
  return api.get('/answers/searchAnswer/' + searchTsrNo +'/' + mode)
  // /answers/searchAnswer/:searchTsrNo/:mode/:rowCount/:offset
        .then(function( response ){
            
            return response.data;
        })

  // http://10.10.120.19:1337/answers/searchAnswer/MIRDC-012016-CLS-0010
}
const getAllAnswers = function () {
    //   loading.value = true;
    //   error.value = null;
      // I prefer to use fetch
      // you can use use axios as an alternative
      // console.log("apiiiii")
      // console.log(api.get('/questions'))
      // ?_start=10&_limit=10
        return api.get('/answers?_limit=-1')
        .then(function( response ){
            
            // console.log("from axios")
            // console.log(response.data)
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
          
          return response.data;
    })
}

const getTsrViaDivision = function (division) {
  // console.log("natawag ba to")
  //   loading.value = true;
  //   error.value = null;
    // I prefer to use fetch
    // you can use use axios as an alternative
    // console.log("apiiiii")
    // console.log(api.get('/questions'))
      return api.get('/tsrs/?division='+division)
      .then(function( response ){
          // console.log("from axios tsr division", response.data)
          return response.data;
    })
}

const countServicePerDivision = function () {
  return api.get('/tsrs/countPerDivisions')
    .then(function( response ){
      //       let arr = response.data
      return response.data
    })
}

const getDivisionList = function () {
    return api.get('/tsrs/divisions')
    .then(function( response ){
      //       let arr = response.data
      return response.data
    })
    //   .then(function( response ){
    //       let arr = response.data
    //       // console.log("from axios tsr division", response.data)
    //       let result = [...new Set(arr.map(item => item.division))].filter(function(val) { return val !== null; });
    //       let obj = arr.filter(item => item.division).map(
    //         ({division,service}) => (
    //           { div: division, 
    //             sec: service
    //           }
    //           ))

    //       let temparr = []
    //       temparr = obj.reduce(function (r, a) {
    //         r[a.div] = r[a.div] || [];
    //         // if service already exist, dont push to array
    //         if( !(r[a.div].includes(a.sec))){
    //           r[a.div].push(a.sec);
    //         }
    //         return r;
    //     }, Object.create(null));

    //     return temparr

    // })
}

// const getDivisionList = function () {
//   // console.log("natawag ba to")
//   //   loading.value = true;
//   //   error.value = null;
//     // I prefer to use fetch
//     // you can use use axios as an alternative
//     // console.log("apiiiii")
//     // console.log(api.get('/questions'))
//     return api.get('/tsrs/?_limit=-1')
//       .then(function( response ){
//           let arr = response.data
//           console.log("from axios tsr division", response.data)
          // let obj = arr.filter(item => item.division).map(
          //   ({division,service}) => (
          //     { [division]: service }
          //     ))
//           // let result = [...new Set(obj.map(item => item.service))]
//           // let result = [...new Map(obj.map(item =>
//           //   [item[key], item])).values()];
//           // console.log("resres", result)
//           let newarr = []
//           let keys = Object.keys(obj)
//           let total = obj.reduce((ac,a) => {
//             ['patApplied','insApplied'].forEach(k => {
//               for(let key in a[k]){
//                 ac[k][key] = ac[k][key] || 0;
//                 ac[k][key] += a[k][key]
                
//               }
//             })
//             return ac;
//           },{patApplied:{},insApplied:{}})
          
//           console.log("group", grouped_data)
  
//           let temparr = []
//           // temparr.push(Object.values(obj[0]))
//           // let key3 = Object.keys(obj[0])[0]
//           // let obj2 =  {
//           //   [key3]: temparr
//           // }
//           // newarr.push(obj2)
//           // for(let i =0 ; i<obj.length; i++){
//           //   for(let j =0; j<newarr.length; j++){
//           //     var key = Object.keys(obj[i])[0];
//           //     var key2 = Object.keys(newarr[j])[0];
//           //     var val2 = Object.values(obj[i])[0];
//           //     if(key == key2){
//           //       console.log("eyeyeyey", Object.values(newarr[j]))
//           //       let x = Object.values(newarr[j])
//           //       x.push("wat")
//           //     }else{
//           //       let temparr = []
//           //       temparr.push(val2)
//           //       let obj =  {
//           //         [key]: temparr
//           //       }
//           //       newarr.push(obj)
//           //     }
//           //     console.log(key)
//           //     console.log(key2)
//           //     console.log("new",newarr[j])
//           //     console.log("obj",obj[i])
//           //   }
//           // }
//           console.log("Aa",obj)
//           // obj.forEach(element => {
//           //   for(var key in element){
//           //     if (newarr.length ==0){
//           //       let temparr = []
//           //       temparr.push(element[key])
//           //       let obj =  {
//           //         [key]: temparr
//           //       }
//           //       newarr.push(obj)
//           //     }else{
//           //       for(let i=0 ; i < newarr.length ; i++){
//           //         for( var key2 in newarr[i]){
//           //             if (key == key2){
//           //               if(!(newarr[i][key].includes(element[key]))){
//           //                 newarr[i][key].push(element[key])
//           //               }else{
//           //                 break;
//           //               }
//           //            }
//           //            else{
//                       // let temparr = []
//                       // temparr.push(element[key])
//                       // let obj =  {
//                       //   [key]: temparr
//                       // }
//                       // newarr.push(obj)
//           //           }
//           //         }
//           //       }
//           //     }
//           //   }
//           // });

//           console.log(newarr)

//           return obj
//     })
// }

const getSectionList = function (division) {
  // console.log("natawag ba to")
  //   loading.value = true;
  //   error.value = null;
    // I prefer to use fetch
    // you can use use axios as an alternative
    // console.log("apiiiii")
    // console.log(api.get('/questions'))
    return api.get('/tsrs/?_limit=-1&division='+ division)
      .then(function( response ){
          let arr = response.data
          let result = [...new Set(arr.map(item => item.service))].filter(function(val) { return val !== null; });
          
          return result
    })
}

// http://10.10.120.19:1337/answers/?tsr.division=ATD&&question.id=6
const getAnswersForOverall = function (division,service,questionID,beforeDate,afterDate) {
  // console.log("natawag ba to")
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
    if (service != ""){
      if(beforeDate && afterDate){
        console.log("dito dapat")
        return api.get('/answers/?_limit=-1&tsr.division='+ division + '&tsr.service=' + service + '&question.id='+questionID+ '&tsr.submittedAt_gte='+before+'&tsr.submittedAt_lte='+after)
        .then(function( response ){
            // console.log("from axios tsr division", response.data)
            return response.data;
      })
    }else{
      return api.get('/answers/?_limit=-1&tsr.division='+ division + '&tsr.service=' + service+ '&question.id='+questionID+'&tsr.submittedAt_gte='+today+'-01-01'+'tsr.&submittedAt_lte='+today+'-12-31')
        .then(function( response ){
            // console.log("from axios tsr division", response.data)
            return response.data;
      })
     }
    }else{
        if(beforeDate && afterDate){
          console.log("dito dapat")
          return api.get('/answers/?_limit=-1&tsr.division='+ division + '&question.id='+questionID+ '&tsr.submittedAt_gte='+before+'&tsr.submittedAt_lte='+after)
          .then(function( response ){
              // console.log("from axios tsr division", response.data)
              return response.data;
        })
      }else{
        return api.get('/answers/?_limit=-1&tsr.division='+ division + '&question.id='+questionID+'&tsr.submittedAt_gte='+today+'-01-01'+'&tsr.submittedAt_lte='+today+'-12-31')
          .then(function( response ){
              // console.log("from axios tsr division", response.data)
              return response.data;
        })
      }
    }
    

}
 
const postAnswersToBackend = async function(answers,subheaderans,tsrNo,industry,service,division,dateImport,email) {
  
  let errorMessage = ""
  let submitDate
  let resStatus = 200
  let flagNegative = 0
  let tsrId
  let answerForFeedback = []
  let resultTsr 
  let uuid = uuidv4();
  // if flag == 1 : send email for that tsr
  // if flag == 0 : dont send
try {
  if(dateImport){
    submitDate = dateImport
  }else{
    submitDate = datetime
  }
  let tsr = {
      "tsrNo": tsrNo,
      "industry": industry,
      "service": service,
      "division": division,
      "submittedAt": submitDate,
      "uuid": uuid
  }
  
  await api.post("/tsrs", tsr)
  
  .then(response => { 
    tsrId = response.data.id
    resultTsr = response.data
  })
  .catch(function (error) {
    console.log(error.response.status);
    if (error.response) {
      // Request made and server responded
      
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.status
      
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
  })
  for (const answer of answers) {
    console.log("tsrsrsts", tsrId)
    // console.log("from axioss sssssdsd23232", answer)
    if(answer.question != ''){
      let ans = {
        tsr: tsrId,
        question: answer.question,
        value: answer.value,
        tsr_q_id: tsrId +'_' +answer.question,
        tsrNo: tsrNo
      }
      let val = parseInt(ans.value) 
      if(val <= 2){
        flagNegative = 1
      }

      await api.post("/answers", ans)
    }
    
  }
  for (const answer of subheaderans){
    console.log("tsrsrsts", tsrId)
    // console.log("from axioss sssssdsd23232", answer)
    let ans = {
      tsr: tsrId,
      question: answer.question,
      value: answer.value,
      tsr_q_id: tsrId +'_' +answer.question,
      tsrNo: tsrNo,
      remarks: answer.remarks
    }
    let val = parseInt(ans.value)
    if( val <= 2) {
      flagNegative = 1
    }
    await api.post("/answers", ans)

    

  }
  if (flagNegative == 1){
    await sendEmailNegativeFeedback(resultTsr,email)
  }
  // all good, all post requests are successful
  return resStatus

  } catch (error) {
    console.log(error)
  }

}

const sendEmailNegativeFeedback = async function(tsr,email) {
      let tsrNo = tsr.tsrNo
      let uid = tsr.uuid
      // console.log("data",data)
      // let questionDesc = data.question.description
      let division = tsr.division
      let recipient
      let cc
      let ccArr = []
//       "Edilbert Dela Peña" <emdelapena@mirdc.dost.gov.ph>; "Engr. Rommel N. Corona" <rncorona@mirdc.dost.gov.ph>; "jmvelasco" <jmvelasco@mirdc.dost.gov.ph>; rspagtalunan@mirdc.dost.gov.ph; ljgasmando@mirdc.dost.gov.ph; ljgasmando@mirdc.dost.gov.ph
// "salvacion.ruiles" <salvacion.ruiles@mirdc.dost.gov.ph>; fpliza@mirdc.dost.gov.ph; "Rodnel O. Tamayo" <rotamayo@mirdc.dost.gov.ph>; girl; "mmmillo" <mmmillo@mirdc.dost.gov.ph>; "rnmariposque" <rnmariposque@mirdc.dost.gov.ph>
      // switch(division) {
      //     case 'ATD':
      //       // code block
      //       recipient = 'rspagtalunan@mirdc.dost.gov.ph'
      //       cc = 'ljgasmando@mirdc.dost.gov.ph'
      //       break;
      //     case 'PD':
      //       // code block
      //       recipient = 'rotamayo@mirdc.dost.gov.ph'
      //       break;
      //     case 'TDD-TABDS':
      //       //code block
      //       recipient = 'mmmillo@mirdc.dost.gov.ph'
      //       cc = 'rnmariposque@mirdc.dost.gov.ph'
      //       break;
      //     case 'TSSS':
      //       //code block
      //       recipient = 'jmvelasco@mirdc.dost.gov.ph'
      //       cc = 'emdelapena@mirdc.dost.gov.ph' + ',' + 'rncorona@mirdc.dost.gov.ph'
      //       break
      //     case 'MPRD':
      //       //code block
      //       recipient = 'fpliza@mirdc.dost.gov.ph'
      //       cc = 'salvacion.ruiles@mirdc.dost.gov.ph'
      //       break;
      //     default:
      //       // code block
      //   }

      let config = {
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
      }
      //  method: 'POST',
      
      let dataBody = {
          "from": "ithelpdesk@mirdc.dost.gov.ph",
          "to": "bardiano.work@gmail.com", // recipient
          "subject": tsrNo + ' - ' + 'Negative Feedback',
          "system": "Customer Survey Management System",
          "html": {
              "firstName": "Sir/Ma'am",
              "message": "Customer Survey Management System is requesting you to review the tsrNo:" + tsrNo + " because it received a negative feedback, please provide a resolution on the provided link" ,
              "url": {
                "text": "Access Resolution Form",
                "link": csmsURL+'#/feedback/ResolutionFromFeedback/' + uid
              },
              "message2": "For remote access or work from home (WFH) setup, please connect to Virtual Private Network (VPN) using your username and password provided by the MIS unit. After a successful connection to the VPN, click on the button above.",
              "message3": "If you do not have a VPN account, please request thru Ms. Mercedita G. Abutal, Chief PMD and ISMR at email: mgabutal@mirdc.dost.gov.ph."
          }
      }
      const rawResponse = await mailapi.post('sendMail', dataBody,config)
          .then(response => response.data )
          .catch(error => {
              // element.parentElement.innerHTML = `Error: ${error.message}`;
              console.error('There was an error!', error);
          });
      console.log("rawResponse",rawResponse)

      // const content = await rawResponse.json();
      
      // console.log(content);
}

const postResFromApi = async function (answers){
  console.log("answers",answers)
  let config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
  }
  answers.forEach( async ans => {
    await api.put("/answers/"+ ans.ansID,ans,config)
    .then(res => {
      return 200
    })
    .catch(error => {
      this.errorMessage = error.message;
      console.error("There was an error!", error);
      return error
    });
    
  });
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
}

const editQuestion = async function(id,question) {
  let errorMessage = ""
  console.log("question", question)
  await api.put("/questions/"+ id, question).then(res =>{
    console.log(res)
  })

}

const deleteAllAnswers = async function (){
  let answers = await api.get('/answers?_limit=-1')
        .then(function( response ){
            
            return response.data;
        })
        console.log(answers)
  for (const element of answers) {
    console.log(element.id)
    await api.delete("/answers/" + element.id).then(res =>  {
      console.log("successfully deleted: ")
    })  
  } 
}

const deleteQuestion = async function(id) {
  let errorMessage = ""

  // cascade delete that will find specific or have filters not find all
  let answers = await api.get("/answers/").then(function( response ){
    
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

  api.delete("/questions/" + id)
  .then(res => {
    console.log("deleted question", res)
  })
   .catch(error => {
    console.error("There was an error!", error);
   });
  console.log(id)

}

const numberPositiveFeedbackCountPerDivision = function (beforeDate,afterDate,division,service)  {
  let before
  let after
  before = moment(beforeDate).format('YYYY-MM-DD');
  after = moment(afterDate).format('YYYY-MM-DD');
  return api.get('/answers/count?value_gte=4'+ '&tsr.submittedAt_gte='+before+'&tsr.submittedAt_lte='+after+'&tsr.division='+division+'&tsr.service='+service)
      .then(function( response ){
          
          return response.data;
      })
}
const numberSatisfactoryFeedbackCountPerDivision = function (beforeDate,afterDate,division,service)  {
  let before
  let after
  before = moment(beforeDate).format('YYYY-MM-DD');
  after = moment(afterDate).format('YYYY-MM-DD');
  return api.get('/answers/count?value=3'+ '&tsr.submittedAt_gte='+before+'&tsr.submittedAt_lte='+after+'&tsr.division='+division+'&tsr.service='+service)
      .then(function( response ){
          return response.data;
      })
}
const numberPoorFeedbackCountPerDivision = function (beforeDate,afterDate,division,service)  {
  let before
  let after
  before = moment(beforeDate).format('YYYY-MM-DD');
  after = moment(afterDate).format('YYYY-MM-DD');
  return api.get('/answers/?value_lte=3'+ '&tsr.submittedAt_gte='+before+'&tsr.submittedAt_lte='+after+'&tsr.division='+division+'&tsr.service='+service)
      .then(function( response ){
          return response.data;
      })
}

const positiveFeedbackCount = function (year)  {
  return api.get('/answers/count?value_gte=3&question.question_type=2&tsr.submittedAt_gte='+year+'-01-01'+'&tsr.submittedAt_lte='+year+'-12-31',{
      })
      .then(function( response ){
          return response.data;
      })
}

const positiveFeedbackCountByDateRange = function (start,limit,beforeDate,afterDate)  {
  
  let before = moment(beforeDate).format('YYYY-MM-DD');
  let after = moment(afterDate).format('YYYY-MM-DD');
  
  if(start && limit){
    return api.get('/answers/count?_start='+start+'&_limit='+limit+'&value_gte=3&question.question_type=2&tsr.submittedAt_gte='+before+'&tsr.submittedAt_lte='+after,{
    })
    .then(function( response ){
        return response.data;
    })
  }else{
    return api.get('/answers/count?value_gte=3&question.question_type=2&tsr.submittedAt_gte='+before+'&tsr.submittedAt_lte='+after,{
    })
    .then(function( response ){
        return response.data;
    })
  }
  
  
}

const positiveFeedbackCountData = function (start,limit,year)  {
  return api.get('/answers/?_start='+start+'&_limit='+limit+'&value_gte=3&question.question_type=2&tsr.submittedAt_gte='+year+'-01-01'+'&tsr.submittedAt_lte='+year+'-12-31',{
      })
      .then(function( response ){
          return response.data;
      })
}

const negativeFeedbackCount = function (year)  {
  return api.get('/answers/count?value_lte=2&value_gt=0&value_gt=0&question.question_type=2&tsr.submittedAt_gte='+year+'-01-01'+'&tsr.submittedAt_lte='+year+'-12-31',{
      })
      .then(function( response ){
          return response.data;
      })
}
const negativeFeedbackCountByDateRange = function (start,limit,beforeDate,afterDate)  {
  let before = moment(beforeDate).format('YYYY-MM-DD');
  let after = moment(afterDate).format('YYYY-MM-DD');
  return api.get('/answers/count?value_lte=2&value_gt=0&tsr.submittedAt_gte='+before+'&tsr.submittedAt_lte='+after,{
      })
      .then(function( response ){
          return response.data;
      })
}

const negativeFeedbackCountData = function (start,limit,year)  {
  return api.get('/answers/?_start='+start+'&_limit='+limit+'&value_lte=2&value_gt=0&question.question_type=2&tsr.submittedAt_gte='+year+'-01-01'+'&tsr.submittedAt_lte='+year+'-12-31',{
      }) 
      .then(function( response ){
          return response.data;
      })
}

const getNegativeFeedbackDataDaterange = function (start,limit,beforeDate,afterDate)  {
  let before = moment(beforeDate).format('YYYY-MM-DD');
  let after = moment(afterDate).format('YYYY-MM-DD');
  return api.get('/answers/?_start='+start+'&_limit='+limit+'&value_lte=2&value_gt=0&value_gt=0&question.question_type=2&tsr.submittedAt_gte='+before+'&tsr.submittedAt_lte='+after,{
      }) 
      .then(function( response ){
          return response.data;
      })
}

const getPositiveFeedbackDataDaterange = function (start,limit,beforeDate,afterDate)  {
  let before = moment(beforeDate).format('YYYY-MM-DD');
  let after = moment(afterDate).format('YYYY-MM-DD');
  return api.get('/answers/?_start='+start+'&_limit='+limit+'&value_gte=3&question.question_type=2&tsr.submittedAt_gte='+before+'&tsr.submittedAt_lte='+after,{
      }) 
      .then(function( response ){
          return response.data;
      })
}

const negativeFeedbackCountDataResolutions = function (start,limit,division,service,beforeDate,afterDate)  {
  let before = moment(beforeDate).format('YYYY-MM-DD');
  let after = moment(afterDate).format('YYYY-MM-DD');
  return api.get('/answers/?_start='+start+'&_limit='+limit+'&tsr.division_contains='+division+'&tsr.service_contains='+service+'&value_lte=2&value_gt=0&question.question_type=2&tsr.submittedAt_gte='+before+'&tsr.submittedAt_lte='+after+'&_sort=tsr.submittedAt:DESC',{
      }) 
      .then(function( response ){
          return response.data;
      })
}

const noAnswerFeedbackCount = function (year)  {
  return api.get('/answers/count?value='+ "" +'&question.question_type=2&tsr.submittedAt_gte='+year+'-01-01'+'&tsr.submittedAt_lte='+year+'-12-31',{
      })
      .then(function( response ){
          return response.data;
      })
}

const noAnswerFeedbackCountData = function (year)  {
  return api.get('/answers/?value='+ "" +'&question.question_type=2&tsr.submittedAt_gte='+year+'-01-01'+'&tsr.submittedAt_lte='+year+'-12-31',{
      })
      .then(function( response ){
          return response.data;
      })
}

const totalFeedbackCountTSRByYearWithDivisions = function (division,service,year,filter)  {
  if(filter){
    return api.get('/tsrs/count?&division='+division+'&service='+service+'tsrNo_contains='+ filter +'&submittedAt_gte='+year+'-01-01'+'&submittedAt_lte='+year+'-12-31',{
    })
    .then(function( response ){
        return response.data;
    })
  }else{
    return api.get('/tsrs/count?&division='+division+'&service='+service+'submittedAt_gte='+year+'-01-01'+'&submittedAt_lte='+year+'-12-31',{
    })
    .then(function( response ){
        return response.data;
    })
  }
}


const totalFeedbackCountTSRByYear = function (year,filter)  {
  if(filter){
    return api.get('/tsrs/count?tsrNo_contains='+ filter +'&submittedAt_gte='+year+'-01-01'+'&submittedAt_lte='+year+'-12-31',{
    })
    .then(function( response ){
        return response.data;
    })
  }else{
    return api.get('/tsrs/count?submittedAt_gte='+year+'-01-01'+'&submittedAt_lte='+year+'-12-31',{
    })
    .then(function( response ){
        return response.data;
    })
  }
  
}
const totalFeedbackCountTSR = function (beforeDate,afterDate,filter)  {
    let before = moment(beforeDate).format('YYYY-MM-DD');
    let after = moment(afterDate).format('YYYY-MM-DD');
    if (beforeDate && afterDate){
      if(filter){
        
        return api.get('/tsrs/count?tsrNo_contains='+ filter +'&submittedAt_gte='+before+'&submittedAt_lte='+after,{
            })
            .then(function( response ){
                
                return response.data;
            })
       
      }else{
        return api.get('/tsrs/count?&submittedAt_gte='+before+'&submittedAt_lte='+after,{
            })
            .then(function( response ){
                
                return response.data;
            })
      }
      
    }else{
      return api.get('/tsrs/count',{
          })
          .then(function( response ){
              return response.data;
          })
    }
}

const totalFeedbackCountTSRWithDivisions = function (division,service,beforeDate,afterDate,filter)  {
  let before = moment(beforeDate).format('YYYY-MM-DD');
  let after = moment(afterDate).format('YYYY-MM-DD');
  if (beforeDate && afterDate){
    if(filter){
      
      return api.get('/tsrs/count?&division='+division+'&service='+service+'&tsrNo_contains='+ filter +'&submittedAt_gte='+before+'&submittedAt_lte='+after,{
          })
          .then(function( response ){
              
              return response.data;
          })
     
    }else{
      return api.get('/tsrs/count?&division='+division+'&service='+service+'&submittedAt_gte='+before+'&submittedAt_lte='+after,{
          })
          .then(function( response ){
              
              return response.data;
          })
    }
    
  }else{
    return api.get('/tsrs/count',{
        })
        .then(function( response ){
            return response.data;
        })
  }
}

//new Dashboard
const allOverAllRatings = function (month,year){


  let bfdate = new Date(year, month)
  let afterDate
  if(month == 12){
    month = 0
    afterDate = new Date(year+1, month)
  }else{
    afterDate = new Date(year, month+1)
  }
  let before = moment(bfdate).format('YYYY-MM-DD');
  let after = moment(afterDate).format('YYYY-MM-DD');

  if ( year ){
    return api.get('/answers/?_limit=-1&question.id=12&tsr.submittedAt_gte='+before +'&tsr.submittedAt_lt='+after)
      .then(function( response ){
          
          return response.data;
      })
    }
}

// admin division
const allOverAllRatingsAdminDivision = function (beforeDate,afterDate){

if (beforeDate && afterDate){
  let before = moment(beforeDate).format('YYYY-MM-DD');
  let after = moment(afterDate).format('YYYY-MM-DD');
    return api.get('/answers/?_limit=-1&tsr.submittedAt_gte='+before+'&tsr.submittedAt_lte='+after+'&question.id=12')
      .then(function( response ){
          
          return response.data;
      })
  }else{
    return api.get('/answers/?_limit=-1&question.id=12&tsr.submittedAt_gte='+today+'-01-01'+'&tsr.submittedAt_lte='+today+'-12-31')
      .then(function( response ){
          
          return response.data;
      })
  }
}

const loginToSSO = function (username,password) {
      return api.post('/auth/local', {
        identifier: username.toString(),
        password: password.toString()
      }).then(function( response ){
          
          setJWT(response.data.jwt)
        }
      )
  }


// all functions called in pages

// export async function load(url) {
//     let result = await axios.get(url);
//     items.splice(0, items.length, ...result.data);
//     return items
// };

export const getPositiveFeedbackDataRange = (start,limit,before,after) => {
  return getPositiveFeedbackDataDaterange(start,limit,before,after)
}
export const getNegativeFeedbackDataRange = (start,limit,before,after) => {
  return getNegativeFeedbackDataDaterange(start,limit,before,after)
}

export const countPositiveFeedback = (year) => {
  return positiveFeedbackCount(year)
}

export const getPositiveFeedbackData = (start,limit,year) => {
  return positiveFeedbackCountData(start,limit,year)
}

export const countPositiveFeedbackByDateRange = (start,limit,before,after) => {
  return positiveFeedbackCountByDateRange(start,limit,before,after)
}

export const countNegativeFeedbackByDateRange = (start,limit,before,after) => {
  return negativeFeedbackCountByDateRange(start,limit,before,after)
}

export const countNegativeFeedback = (year) => {
  return negativeFeedbackCount(year)
}
export const getNegativeFeedbackData= (start,limit,year) => {
  return negativeFeedbackCountData(start,limit,year)
}

export const getNegativeFeedbackDataResolution = (start,limit,division,service,before,after) => {
  return negativeFeedbackCountDataResolutions(start,limit,division,service,before,after)
}

export const countNoFeedback = (year) => { 
  return noAnswerFeedbackCount(year)
}

export const getNoAnswerFeedbackData= (start,limit,year) => { 
  return noAnswerFeedbackCountData(start,limit,year)
}

export const totalTsrsCountByYear = (year,filter) => {
  return totalFeedbackCountTSRByYear(year,filter)
}

export const totalTsrsCount = (before,after,filter) => {
  return totalFeedbackCountTSR(before,after,filter)
}

export const totalTsrsCountWithDivisions = (division,service,before,after,filter) => {
  return totalFeedbackCountTSRWithDivisions(division,service,before,after,filter)
}
export const totalTsrsCountWithDivisionsByYear = (division,service,year,filter) => {
  return totalFeedbackCountTSRByYearWithDivisions(division,service,year,filter)
}


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

export const getQuestionsWithoutAns = () => {
  return getAllQuestionsWithoutAns()
}

export const getAnswers = () => {
  return getAllAnswers()
}

// mode still to change if mode is 2 get all tsr data
export const getTSRs = (start,limit,division,service,beforeDate,afterDate,mode,filter) => {
  return getAllTSRs(start,limit,division,service,beforeDate,afterDate,mode,filter)
}

export const checkTSRIfExists = (tsr) => {
  return checkTSRExist(tsr)
}

export const getQuestionTypes = () => {
  return getAllQuestionTypes()
}

export const postAnswers = (answers,subs,tsrNo,industry,service,division,importDate,email) => {
  return postAnswersToBackend(answers,subs,tsrNo,industry,service,division,importDate,email)
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

export const getOverall = (division,service,questionID,beforeDate,afterDate) =>{
  return getAnswersForOverall(division,service,questionID,beforeDate,afterDate)
}

export const positiveFeedbackPerDivision = (beforeDate,afterDate,division,service) =>{
  return numberPositiveFeedbackCountPerDivision(beforeDate,afterDate,division,service)
}

export const satisfactoryFeedbackPerDivision = (beforeDate,afterDate,division,service) =>{
  return numberSatisfactoryFeedbackCountPerDivision (beforeDate,afterDate,division,service)
}

export const poorFeedbackPerDivision = (beforeDate,afterDate,division,service) =>{
  return numberPoorFeedbackCountPerDivision(beforeDate,afterDate,division,service)
}

export const getDivList = () => {
  return getDivisionList()
}
export const getCountServicePerDivision = () => {
  return countServicePerDivision()
}

export const getSecList = (division) => {
  return getSectionList(division)
}

export const allOverAllRatingsFromApi = (beforeDate,year) => {
  return allOverAllRatings(beforeDate,year)
}

export const deleteAll = () => {
  return deleteAllAnswers()
}


export const loginToSSOStrapi = (username,password) => {
  return loginToSSO(username,password)
}

export const getTsrYear = (year) => {
  return getTsrsViaYear(year)
}

// new
export const getTSRYearAndMonth = (month,year) => {
  return getAllTSRsByYearAndMonth(month,year)
}

export const getAnswerBySearch = (search,mode,start,limit) => {
  return getAllAnswerSearch(search,mode,start,limit)
}

export const countAnswerBySearch = (search,mode) => {
  return getCountAllAnswerSearch(search,mode)
}


//  new pages
// resolution page email
export const getTsrByID = (id) => {
  // http://10.10.120.19:1337/answers/?tsr.uuid=d0476b3c-c260-4fc6-92a9-ac4e8068e488&value_lte=2&value_gte=""
  return api.get('/answers/?tsr.uuid='+id+'&value_lte=2&value_gt=""')
      .then(function( response ){
          
          return response.data;
      })
}


// http://10.10.120.19:1337/answers/?value_lte=2&value_gt=0

export const getQuestionByID = (id) => {
  return api.get('/questions/'+id)
      .then(function( response ){
          
          return response.data;
      })
}

export const validateCustomerAPI = (email,tsrNo) => {

  return api.get('/tsrs/validateSurvey/' + email +'/' + tsrNo)
      .then(function( response ){
          return response.data;
      })
}

export const countMaxDiv = (division) => {
  // http://10.10.120.19:1337/tsrs/countMaxDiv/ATD
  return api.get('/tsrs/countMaxDiv/' + division)
      .then(function( response ){
          return response.data;
      })
}



export const updateAnswerResolution = (answers) => {
  return postResFromApi(answers)
}

export const postRateApp = (rating) => {
  rating.value = rating.value.toString();
  return api.post("/ratings/", rating).then(function (response) {
    return response.data;
  });
};

export const findOverallPerfCenter = (before,after) => {
  console.log("before",before,"after",after)
  let payload = {
    beforeVal: '',
    afterVal: ''
  }
  if (before && after){
    payload.beforeVal = moment(new Date(before),"MM-DD-YYYY")
    payload.afterVal = moment(new Date(after),"MM-DD-YYYY")
  }else{
    payload.beforeVal = moment(new Date(new Date().getFullYear(), 0, 1), "MM-DD-YYYY");
    payload.afterVal = moment(new Date(new Date().getFullYear(), 11, 31), "MM-DD-YYYY");
  }
  console.log('payload',payload)
  

  return api.get("/tsrs/findOverallCenter/"+payload.beforeVal+'/'+payload.afterVal).then(function (response) {
    
    return response.data;
  });
 
  // return api.get("/tsrs/findOverallCenter",{params: {
  //   before: payload.beforeVal,
  //   after: payload.afterVal
  //   }
  // }).then(function (response) {
    
  //   return response.data;
  // });
};

export const findNumberCustomer = (before,after) => {
  console.log("before",before,"after",after)
  let payload = {
    beforeVal: '',
    afterVal: ''
  }
  if (before && after){
    payload.beforeVal = moment(new Date(before),"MM-DD-YYYY")
    payload.afterVal = moment(new Date(after),"MM-DD-YYYY")
  }else{
    payload.beforeVal = moment(new Date(new Date().getFullYear(), 0, 1), "MM-DD-YYYY");
    payload.afterVal = moment(new Date(new Date().getFullYear(), 11, 31), "MM-DD-YYYY");
  }
  console.log('payload',payload)
  

  return api.get("/tsrs/findNumberOfCustomers/"+payload.beforeVal+'/'+payload.afterVal).then(function (response) {
    
    return response.data;
  });
}

export const findOverallPerformanceCenter = (before,after) => {
  console.log("before",before,"after",after)
  let payload = {
    beforeVal: '',
    afterVal: ''
  }
  if (before && after){
    payload.beforeVal = moment(new Date(before),"MM-DD-YYYY")
    payload.afterVal = moment(new Date(after),"MM-DD-YYYY")
  }else{
    payload.beforeVal = moment(new Date(new Date().getFullYear(), 0, 1), "MM-DD-YYYY");
    payload.afterVal = moment(new Date(new Date().getFullYear(), 11, 31), "MM-DD-YYYY");
  }
  console.log('payload',payload)
  

  return api.get("/tsrs/findOverallPerformanceCenter/"+payload.beforeVal+'/'+payload.afterVal).then(function (response) {
    
    return response.data;
  });
}

export const findOverallPerformanceCenterPercentage = (before,after) => {
  console.log("before",before,"after",after)
  let payload = {
    beforeVal: '',
    afterVal: ''
  }
  if (before && after){
    payload.beforeVal = moment(new Date(before),"MM-DD-YYYY")
    payload.afterVal = moment(new Date(after),"MM-DD-YYYY")
  }else{
    payload.beforeVal = moment(new Date(new Date().getFullYear(), 0, 1), "MM-DD-YYYY");
    payload.afterVal = moment(new Date(new Date().getFullYear(), 11, 31), "MM-DD-YYYY");
  }
  console.log('payload',payload)
  

  return api.get("/tsrs/findOverallPerformanceCenterPercentage/"+payload.beforeVal+'/'+payload.afterVal).then(function (response) {
    
    return response.data;
  });
}
export const findSummaryOfCitizen = (before,after,division,service) => {
  console.log("before",before,"after",after)
  let payload = {
    beforeVal: '',
    afterVal: ''
  }
  if (before && after){
    payload.beforeVal = moment(new Date(before),"MM-DD-YYYY")
    payload.afterVal = moment(new Date(after),"MM-DD-YYYY")
  }else{
    payload.beforeVal = moment(new Date(new Date().getFullYear(), 0, 1), "MM-DD-YYYY");
    payload.afterVal = moment(new Date(new Date().getFullYear(), 11, 31), "MM-DD-YYYY");
  }
  console.log('payload',payload)
  

  return api.get("/tsrs/findSummaryOfCitizen/"+payload.beforeVal+'/'+payload.afterVal+'/'+division+'/'+service).then(function (response) {
    
    return response.data;
  });
}






