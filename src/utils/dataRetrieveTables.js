import { getTSRs, allOverAllRatingsFromApi, getOverall} from 'src/axioshelper.js'
import groupBy from 'lodash'
import moment from 'moment';
import orderBy from 'lodash.orderby';

function filterMyArr (myArr, condition) {
    return myArr.map(element => element[condition])
}


function buildOverallPerfColumns (divisionsAndSections){
    let cols = []
    cols.push( {
        name: 'Service Area',
        align: 'left',
        label: 'Service Area/Rating',
        field: 'servicearea',
        sortable: true
      })
      cols.push( {
      name: 'Percentage (Overall)',
      align: 'center',
      label: 'Percentage',
      field: 'percentage',
      sortable: true
    })
    divisionsAndSections.forEach(element => {
      let stringColField = element.keyname
      let col = { name: element.service, align: 'center', label: element.service, field: stringColField, sortable: true }
      cols.push(col)
    });
      // console.log("divisionsAndSections232", divisionsAndSections.value[divisions.value[i]])
      
    return cols
}

function buildOverallPerfRows (divisionsAndSections, alltsrs){
    console.log("hello?")
    let rowsOverallPerformance = []
    
    rowsOverallPerformance.push({servicearea: "5 - Outstanding" , id: 5})
    rowsOverallPerformance.push({servicearea: "4 - Very Satisfactory" ,  id: 4 })
    rowsOverallPerformance.push({servicearea: "3 - Satisfactory", id: 3})
    rowsOverallPerformance.push({servicearea: "2 - Fair", id: 2})
    rowsOverallPerformance.push({servicearea: "1 - Poor", id: 1})
    rowsOverallPerformance.push({servicearea: "Total", id: 6})
    // let tsrs = await getTSRs()
    // let totalAnswerOverall = await allOverAllRatingsFromApi("","")
    //   totalAnswerOverall = totalAnswerOverall.filter(function (el) {
    //     return el.tsr != null;
    //   });
    
    let picked = alltsrs.map(({ answers, service, division }) => ({answers, service, division}));
    // picked.filter(d => d.courses.every(c => courses.includes(c.id)));
    // get overall
   
    let overallratings = picked.map(function(pi){
       console.log("pi", pi)
       let objectOver = {
        tsr: {
          service: pi.service,
          division: pi.division
        }
       }
       let answer = pi.answers.filter(function(v){
          if( v.question == 12){
            console.log("VVV", v.question)
            return v
          }
        })
        objectOver['answer'] = { 
          ... answer[0]
        }; 

        return objectOver
      })
    // console.log("totalansweroverall", totalAnswerOverall)
    //   let totalNoResponse = totalTsrs.value - totalAnswerOverall.value.length
    let totalPerField = []
    let totalRespondentsPerMonth = 0

      //
      const mainCounts = {
        5: 0, 
        4: 0,
        3: 0, 
        2: 0,
        1: 0,
        6: 0,
      };
      
      divisionsAndSections.forEach(element => {

        let stringColField = element.keyname
          // filter all data
        let sample = overallratings.filter((elementTSR) => {
        if(elementTSR.tsr){
          if(elementTSR.tsr.division == element.division && elementTSR.tsr.service == element.service){
            return elementTSR
          }
        }
       })
       // service area object counts with total
        const counts = {
          5: 0, 
          4: 0,
          3: 0, 
          2: 0,
          1: 0,
          6:0
        };
        // console.log("x", x+=sample.length)
        // console.log("sample", sample.length)
        for (const elementSample of sample) {
          let num = elementSample.answer.value
          if (num == 1){
            counts[1] +=1
            mainCounts[1] +=1
          }else if ( num == 2){
            counts[2] +=1
            mainCounts[2] +=1
          }else if(num ==3 ){
            counts[3] +=1
            mainCounts[3] +=1
          }else if(num == 4){
            counts[4] +=1
            mainCounts[4] +=1
          }else if(num == 5){
            counts[5] +=1
            mainCounts[5] +=1
          }
          else{
            counts[0] += 1
            mainCounts[0] +=1
          }
        };
        // console.log("Counts", counts)
        
        for(let [key2, value] of Object.entries(counts)){
          // total vertical per service
          rowsOverallPerformance.forEach(function (arrayItem) {
            if(key2 == arrayItem.id){
              value = (value/ sample.length) * 100
              if(isNaN(value)){
                value = 0
              }
              value = value.toFixed(2).toString() + '%'
              arrayItem[stringColField] = value
            }
            
            });
          }
        
      });
        
        // console.log("sampless", sample)
        

      let totalPercentRow = 0
      // total rows per service
      rowsOverallPerformance.forEach(row => {
        let res = (parseFloat(mainCounts[row.id])/ overallratings.length * 100)
        row['percentage'] = res.toFixed(2).toString() + '%'
        // increment total of percentage
        totalPercentRow +=res
        console.log('rowsOverallPerformance',rowsOverallPerformance)
        console.log('totalPercentRow',totalPercentRow)
      });
      console.log('rowsOverallPerformance',rowsOverallPerformance)
      // total
      rowsOverallPerformance[5]['percentage'] = totalPercentRow.toFixed(2).toString() + '%'
    

      divisionsAndSections.forEach(element => {
        let service = element.keyname
        let a = rowsOverallPerformance.map(a => a[service]);
        let sum = Math.round(a.reduce((a, b) => parseFloat(a) + parseFloat(b), 0))
        console.log("sum",sum)
        // rows
        rowsOverallPerformance[5][service] = sum.toFixed(2).toString() + '%'
    
       });
          
      // rowsOverallPerformance.push(totalPerField)

      return rowsOverallPerformance
}
function buildNumberOfCustomersColumns (divisionsAndSections){
  
  let cols = []
  cols.push({
    name: 'Month',
    align: 'left',
    label: 'Month',
    field: 'month',
    sortable: true
  })

  divisionsAndSections.forEach(element => {
    let stringColField = element.keyname
    let col = { name: element.service, align: 'center', label: element.service, field: stringColField, sortable: true }
    cols.push(col)
  });
  
    cols.push({
        name: 'Total',
        align: 'center',
        label: 'Total',
        field: 'total',
        sortable: true
      })
    return cols
}
function buildNumberOfCustomersRows (divisionsAndSections, tsrList){
  // console.log("from data retrieve", divisionsAndSections)
  let rowsnumberOfCustomers = []
  // tsrList.value

    tsrList = orderBy(tsrList,'submittedAt', 'asc')
      // Number of customers Row generation
      let totalRespondentsPerMonth = 0
      // group by months
      var result = _(tsrList)
      .groupBy(v => moment(v.submittedAt).format('MMMM-YYYY'))
      .value();


        console.log("Res", result)
        for (var key in result) {
            if (result.hasOwnProperty(key)) {
              let row = {}
              let totalPerMonth = 0
              row['month'] = key
              
              let temp = result[key]
              divisionsAndSections.forEach(element => {
                let stringColField = element.keyname
                  // filter all data
                  let sample = temp.filter((elementTSR) => {
                  if(elementTSR.tsrNo){
                    if(elementTSR.division == element.division && elementTSR.service == element.service){
                      // console.log("pasok oh loko" )
                      return elementTSR
                    }
                  }
                  
                  })
                  row[stringColField] = sample.length ? sample.length : 0
                  totalPerMonth += sample.length
              });
                  
              // total horizontal
              row['total'] = Math.round(totalPerMonth).toFixed(2).toString()
              totalRespondentsPerMonth += totalPerMonth
              
              rowsnumberOfCustomers.push(row)
            }
        }
        
        // total per service
        let arrTotal = {}
        let totalOfTotals = 0
        divisionsAndSections.forEach(element => {
          let stringColField = element.keyname
          let sample = filterMyArr(rowsnumberOfCustomers, stringColField)
        //  console.log("Samp", sample)
          let sum = sample.reduce((a, b) => a + b, 0)
          
          arrTotal[stringColField] = sum
          // total vertical per service
          arrTotal["month"] = "Total Actual Respondents"
          totalOfTotals += sum
        });
           
          //  totalActualRespondents.push(arrTotal)
        arrTotal['total'] = totalOfTotals
        rowsnumberOfCustomers.push(arrTotal)
        // total actual respondents
      // let tot = {}
      // tot["value"] = totalRespondentsPerMonth
      // totalActualRespondents.push(tot)
      return rowsnumberOfCustomers
}

function buildSummaryPerDivisionRows (questions,divisionsAndSections,allTsrs){
  let rowsSummary = []
  
  let dataDivision = []
      
  divisionsAndSections.forEach(element => {
        
     
          let index = 0
          // if(index % 5 == 0){
          //   rowsSummary.push({division: key2, service: "" ,servicearea: "5 - Outstanding" , id: 5})
          //   rowsSummary.push({division: key2, service: element, servicearea: "4 - Very Satisfactory" , id: 4 })
          // }
          rowsSummary.push({division: element.division, service: element.service ,servicearea: "5 - Outstanding" , id: 5})
          rowsSummary.push({division: element.division, service: element.service, servicearea: "4 - Very Satisfactory" , id: 4 })
          rowsSummary.push({division: element.division, service: element.service,servicearea: "3 - Satisfactory", id: 3 })
          rowsSummary.push({division: element.division, service: element.service,servicearea: "2 - Fair", id: 2})
          rowsSummary.push({division: element.division, service: element.service,servicearea: "1 - Poor", id: 1})
          rowsSummary.push({division: element.division, service: element.service,servicearea: "No Response", id: 0})
          // let dataDivision = await getOverall(key2,element,questions[j].id,'01-01-2021','12-31-2021')
          // console.log("dataDivisiondataDivision",dataDivision)
          let answersperDivision = []
          dataDivision = allTsrs.filter(a => a.division == element.division && a.service == element.service)
          for (let j=0; j<questions.length; j++){ 
            const counts = {
                    5: 0, 
                    4: 0, 
                    3:0, 
                    2:0,
                    1:0,
                    0:0
                  };
          if(allTsrs.length != 0){
            
            dataDivision.map((nestedObject)=>{
              if (typeof nestedObject.answers != 'undefined'){
                nestedObject.answers.map(a => {
                  if( a.question == questions[j].id){
                    if (isNaN(a.value)){
                      counts[0] += 1
                    }else{
                      counts[a.value] = (counts[a.value] ? counts[a.value] + 1 : 1) 
                    }
                    
                  }
                 
                })
                    
                  }

              })
              let x = 0
              for(let [key, value] of Object.entries(counts)){
                //  console.log("vavavaval", value)
                rowsSummary.forEach(function (arrayItem) {
                  if (arrayItem.division == element.division && arrayItem.service == element.service)
                  if(key == arrayItem.id){
                    
                    
                    value = (value/ dataDivision.length) * 100
                    if(isNaN(value)){
                      value = 0
                    }
                    value = value.toFixed(2).toString() + '%'
                    arrayItem[questions[j].id] = value
                    arrayItem['countsDivision'] = dataDivision.length
                    arrayItem['verysatis'] = x
                    
                    // arrayItem['countsDivision'] = dataDivision.length
                  }
              });
            }
            
        }

        

      console.log("rowsSummary",rowsSummary)
      }
  });
  return rowsSummary
  
}

function buildSummaryPerDivisionColumns (questions){
  let columnSummary = []

  columnSummary.push( {
    name: 'serviceArea',
    align: 'left',
    label: 'Service Area/Rating',
    field: 'servicearea',
    sortable: true
  })
  for (let j =0; j < questions.length ; j++){
    // remove subheaders in columns filter
    if(questions[j].question_type != 5){
    let column = {
      name: '',
      align: 'left',
      label: '',
      field: '',
      sortable: true
    }
    // dynamic here for the question
    // console.log("helloooo", listOfTsr.value[0].questionsWithAnswer[j])

    // change this code
    column.name = questions[j].description
    column.label = questions[j].description
    column.field = questions[j].id
    if(questions[j].question_type == 2){
      columnSummary.push(column)
      }
    }
  }
  return columnSummary
  
}

export const summaryPerDivisionRows = (questions,div,answers) => {
  return buildSummaryPerDivisionRows(questions,div,answers)
}

export const summaryPerDivisionColumns = (questions) => {
  return buildSummaryPerDivisionColumns(questions)
}

export const overAllColumns = (div) => {
    return buildOverallPerfColumns(div)
}
export const overAllRows = (div,tsr) => {
    console.log('rowsOverallPerformanceluh')
    return buildOverallPerfRows(div,tsr)
}

export const numberOfCustomersColumnsData= (div) => {
    return buildNumberOfCustomersColumns(div)
}

export const numberOfCustomersRowsData = (div,tsr) => {
  return buildNumberOfCustomersRows(div,tsr)
}
  