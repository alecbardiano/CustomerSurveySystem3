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
        // console.log("props.chartData",props.chartData)
        return props.chartData && props.chartData.length !== 0
    })


    
    
    const options = ref({
        plugins: {
             datalabels: {
                formatter: (value, ctx) => {
                
                  let sum = 0;
                  let dataArr = props.chartData;
                //   dataArr.map(data => {
                //       sum += data;
                //   });
                  let percentage = (value).toFixed(2)+"%";
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
        // console.log("chart", chart)
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

        // console.log("mounte", doughnutRef.value)
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
