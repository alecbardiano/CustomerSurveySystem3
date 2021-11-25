import { getTSRs, allOverAllRatingsFromApi} from 'src/axioshelper.js'
import groupBy from 'lodash'
import moment from 'moment';

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
    for (var key in divisionsAndSections) {
        for (const element of divisionsAndSections[key]) {
      // console.log("divisionsAndSections232", divisionsAndSections.value[divisions.value[i]])
      let stringColField = element.toString().concat(key.toString())
      let col = { name: element, align: 'center', label: element, field: stringColField, sortable: true }
      cols.push(col)
      }
    }
    return cols
}

async function buildOverallPerfRows (divisionsAndSections){
    let rowsOverallPerformance = []
    
    rowsOverallPerformance.push({servicearea: "5 - Outstanding" , id: 5})
    rowsOverallPerformance.push({servicearea: "4 - Very Satisfactory" ,  id: 4 })
    rowsOverallPerformance.push({servicearea: "3 - Satisfactory", id: 3})
    rowsOverallPerformance.push({servicearea: "2 - Fair & 1 - Poor", id: 2})
    rowsOverallPerformance.push({servicearea: "Total", id: 1})
    // let tsrs = await getTSRs()
    let totalAnswerOverall = await allOverAllRatingsFromApi("","")
      totalAnswerOverall = totalAnswerOverall.filter(function (el) {
        return el.tsr != null;
      });
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
      };

      for (var key in divisionsAndSections) {
        for (const element of divisionsAndSections[key]) {
          let stringColField = element.toString().concat(key.toString())
          // filter all data
          let sample = totalAnswerOverall.filter((elementTSR) => {
          if(elementTSR.tsr){
            if(elementTSR.tsr.division == key && elementTSR.tsr.service == element){
              return elementTSR
            }
          }
        })
        
        // console.log("sampless", sample)
        const counts = {
          5: 0, 
          4: 0,
          3: 0, 
          2: 0,
          1: 0
        };
        // console.log("x", x+=sample.length)
        // console.log("sample", sample.length)
        for (const element of sample) {
          let num = element.value
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
              value = value.toFixed(2).toString() + '%'
              arrayItem[stringColField] = value
            }
            
            });
          }
        }
      }

      // row add percentage field
      console.log("mansCounts", mainCounts)
      
      let totalPercentRow = 0
      rowsOverallPerformance.forEach(row => {
        let res = (parseFloat(mainCounts[row.id])/ totalAnswerOverall.length * 100)
        row['percentage'] = res.toFixed(2).toString() + '%'
        totalPercentRow +=res
      });
      console.log("yayeyey", rowsOverallPerformance)
      let tempObj = {}
      tempObj['value'] = parseFloat(totalPercentRow).toFixed(2).toString() + '%'
      totalPerField.push(tempObj)

       for (var key in divisionsAndSections) {
          for (const element of divisionsAndSections[key]) {
          let service = element.toString().concat(key.toString())
          let a = rowsOverallPerformance.map(a => a[service]);
          let sum = a.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
          tempObj['value'] = sum.toFixed(2).toString() + '%'
          totalPerField.push(tempObj)
        }
      }
      rowsOverallPerformance.push(totalPerField)

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
    for (var key in divisionsAndSections) {
        for (const element of divisionsAndSections[key]) {
      // console.log("divisionsAndSections232", divisionsAndSections.value[divisions.value[i]])
      let stringColField = element.toString().concat(key.toString())
      let col = { name: element, align: 'center', label: element, field: stringColField, sortable: true }
      cols.push(col)
      }
    }
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
  console.log("from data retrieve", divisionsAndSections)
  let rowsnumberOfCustomers = []
  // tsrList.value
      // Number of customers Row generation
      let totalRespondentsPerMonth = 0
      // group by months
      var result = _(tsrList)
      .groupBy(v => moment(v.created_at).format('MMMM'))
      .value();

        console.log("Res", result)
        for (var key in result) {
            if (result.hasOwnProperty(key)) {
              let row = {}
              let totalPerMonth = 0
              row['month'] = key
              
              let temp = result[key]
              console.log("temp", temp)
              for (var key2 in divisionsAndSections) {
                for (const element of divisionsAndSections[key2]) {
                  let stringColField = element.toString().concat(key2.toString())
                  // filter all data
                  let sample = temp.filter((elementTSR) => {
                  if(elementTSR.tsrNo){
                    if(elementTSR.division == key2 && elementTSR.service == element){
                      console.log("pasok oh loko" )
                      return elementTSR
                    }
                  }
                  
                  })
                  row[stringColField] = sample.length
                  totalPerMonth += sample.length
                }
              }
              // total horizontal
              row['total'] = totalPerMonth
              totalRespondentsPerMonth += totalPerMonth
              
              rowsnumberOfCustomers.push(row)
            }
        }
        
        // total per service
        for (var key2 in divisionsAndSections) {
           for (const element of divisionsAndSections[key2]) {
           let stringColField = element.toString().concat(key2.toString())
           let sample = filterMyArr(rowsnumberOfCustomers, stringColField)
          //  console.log("Samp", sample)
           let sum = sample.reduce((a, b) => a + b, 0)
           let arrTotal = {}
           // total vertical per service
           arrTotal["value"] = sum
          //  totalActualRespondents.push(arrTotal)
          }
        }

        // total actual respondents
      // let tot = {}
      // tot["value"] = totalRespondentsPerMonth
      // totalActualRespondents.push(tot)
      return rowsnumberOfCustomers
}
async function buildTable(){
  tsrs.value = await getTSRs("","","","","","",2)
  buildColumns()
  buildRowsOverallPerformance()
  totalAnswerOverall.value = await allOverAllRatingsFromApi("","")
  totalAnswerOverall.value = totalAnswerOverall.value.filter(function (el) {
    return el.tsr != null;
  });
  console.log("totalAnswerOverallleng", totalAnswerOverall.value.length)
  totalNoResponse.value = totalTsrs.value - totalAnswerOverall.value.length

  //
  const mainCounts = {
    5: 0, 
    4: 0,
    3: 0, 
    2: 0,
    1: 0,
  };

  for (var key in divisionsAndSections.value) {
    for (const element of divisionsAndSections.value[key]) {
      let stringColField = element.toString().concat(key.toString())
      // filter all data
      let sample = totalAnswerOverall.value.filter((elementTSR) => {
      if(elementTSR.tsr){
        if(elementTSR.tsr.division == key && elementTSR.tsr.service == element){
          return elementTSR
        }
      }
    })
    
    // console.log("sampless", sample)
    const counts = {
      5: 0, 
      4: 0,
      3: 0, 
      2: 0,
      1: 0
    };
    // console.log("x", x+=sample.length)
    // console.log("sample", sample.length)
    for (const element of sample) {
      let num = element.value
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
    console.log("Counts", counts)
    
    for(let [key2, value] of Object.entries(counts)){
      // total vertical per service
      rowsOverallPerformance.value.forEach(function (arrayItem) {
        if(key2 == arrayItem.id){
          value = (value/ sample.length) * 100
          value = value.toFixed(2).toString() + '%'
          arrayItem[stringColField] = value
        }
        
        });
      }
    }
  }

  // row add percentage field
  console.log("mansCounts", mainCounts)
  let totalPercentRow = 0
  rowsOverallPerformance.value.forEach(row => {
    let res = (parseFloat(mainCounts[row.id])/ totalAnswerOverall.value.length * 100)
    row['percentage'] = res.toFixed(2).toString() + '%'
    totalPercentRow +=res
  });
  let tempObj = {}
  tempObj['value'] = parseFloat(totalPercentRow).toFixed(2).toString() + '%'
  totalPerField.value.push(tempObj)

   for (var key in divisionsAndSections.value) {
      for (const element of divisionsAndSections.value[key]) {
      let service = element.toString().concat(key.toString())
      let a = rowsOverallPerformance.value.map(a => a[service]);
      let sum = a.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
      tempObj['value'] = sum.toFixed(2).toString() + '%'
      totalPerField.value.push(tempObj)
    }
  }

  // [ { "dimension": [], "value": 0 }, { "scoreservice": [], "value": 3.18 }, { "ATD": [], "value": 3.16 }, { "PD": [], "value": 3.22 } ]
  
}
export const overAllColumns = (div) => {
    return buildOverallPerfColumns(div)
}
export const overAllRows = (div) => {
    return buildOverallPerfRows(div)
}

export const numberOfCustomersColumnsData= (div) => {
    return buildNumberOfCustomersColumns(div)
}

export const numberOfCustomersRowsData = (div,tsr) => {
  return buildNumberOfCustomersRows(div,tsr)
}
  