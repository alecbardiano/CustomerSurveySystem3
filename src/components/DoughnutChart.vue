<template>
  <div>
    <!-- <DoughnutChart ref="doughnutRef" :chartData="testData" :options="options" />
    <DoughnutChart ref="doughnutRef2" :chartData="testData1" :options="options" /> -->
    <!-- props - selected{{props}}
    <br>
    {{dataFromParent}}
    <br>
    -----------
    <br>
    {{data}}
    <br>
     <br> -->

     
    <!-- {{selected}} -->
    <DoughnutChart
    v-if="isDataLoaded"
    ref="doughnutRef"
    :chart-data="dataFromParent"
    :options="options"
    />
     <!-- <DoughnutChart
    ref="doughnutRef"
    :chart-data="data"
    :options="options"
    css-classes="chart-container"
    /> -->
  </div>
</template>

<script>
import { shuffle } from 'lodash';
import { computed, defineComponent, ref, watch, onMounted } from 'vue';
import { DoughnutChart } from 'vue-chart-3';
import { Chart, DoughnutController, ArcElement } from "chart.js"
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(DoughnutController, ArcElement)
Chart.register(ChartDataLabels);

export default defineComponent({
  name: 'DoughnutChartView',
  components: { DoughnutChart },
  props: {
        labels: {
            type: Array,
        },
        chartData: {
            type: Array,
        },
        label: {
            type: String,
        },
    },
  setup(props) {
    


    const doughnutRef = ref(null)


    

    const dataFromParent = computed(() => (
        {
            labels: props.labels,

            datasets: [{
                data: props.chartData,
                label: props.label,
                backgroundColor: ['green', '#DFFF00', '#CCCC00', 'orange', 'red', '#97B0C4']
            }]
        }
    ))

    const isDataLoaded = computed(() => {    
        console.log("props.chartData",props.chartData)
        return props.chartData && props.chartData.length !== 0
    })


    
    
    const options = ref({
        plugins: {
             datalabels: {
                formatter: (value, ctx) => {
                
                  let sum = 0;
                  let dataArr = props.chartData;
                  dataArr.map(data => {
                      sum += data;
                  });
                  let percentage = (value*100 / sum).toFixed(2)+"%";
                  return percentage;

              
                },
                color: 'black',
            },
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: props.label,
                },
            },
            
    })

     watch(props.chartData, (selection, prevSelection) => { 
    /* ... */ 
        // if(doughnutRef.value){
        //     if(isDataLoaded.value){
        //     doughnutRef.value.destroy();
        //  }
        // }
        
        
        // updateData(doughnutRef.value,props.labels,props.chartData)
    
    })

    function addData(chart, label, data) {
        chart.chartData.labels.push(label);
        chart.chartData.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.update();
    }

    function removeData(chart) {
        console.log("chart", chart)
        chart.chartData.labels.pop();
        chart.chartData.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
        chart.update();
    }

    function updateData(chart, label, data){
        removeData(chart)
        addData(chart,label,data)
    }
    onMounted( async ()  => {

        console.log("mounte", doughnutRef.value)
    //    await axios.request(options2).then(function (response) {
    //     console.log(response.data);
    //     testData.value.datasets.data = response.data.football
    //     }).catch(function (error) {
    //         console.error(error);
    //     });
    //    console.log("mounted 2", chartDatafromParent.value)
    })

    return { 
        dataFromParent,options, props, doughnutRef,isDataLoaded
        // testData1, testData, shuffleData, doughnutRef, doughnutRef2, options, props 
    
    };
  },
});
</script>

<!--  <template>
    <p style="color: blue">{{props.chartData}} </p>
    <p style="color: red">{{data}} </p>
    <p style="color: red">{{testData1}} </p>

    <br>
  <DoughnutChart :chartData="getData" />
  <DoughnutChart :chartData="testData1" />
  <DoughnutChart :chartData="data" />

</template>

<script lang="ts"> 
// import { defineComponent, toRefs, reactive, onMounted, ref, watch, computed } from 'vue';
// import { DoughnutChart } from 'vue-chart-3';



// export default defineComponent({
//   name: 'Home',
//   components: { DoughnutChart },
//   props:{
//         chartData:Object,
//     },
    
//   setup(props) {
//     const testData = {
//       labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
//       datasets: [
//         {
//           data: [30, 40, 60, 70, 5],
//           backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
//         },
//       ],
//     };

//     const getData = computed( () => {
//         // store.getters["auth/getUserProfile"]
//         return data.value
//     })

//     const data = ref(props.chartData)

    // watch(props.chartData, (newValue, oldValue) => {
    //     console.log("new watch val", newValue)
    //     updateChart(newValue)
    // })

//     function updateChart(newValue){
//         data.value = newValue
        
//     }


//     const testData1 = {
//       labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
//       datasets: [
//         {
//           data: [30, 40, 60, 70, 5],
//           backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
//         },
//       ],

//     }

//     onMounted( () => {
//     //    setQuestionID()
//     // new Chart(ctx, this.planetChartData);
    

//     })

//     return { data, props, testData1,getData }
//     ;
//   },
// });
// </script> -->
