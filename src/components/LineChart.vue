

<template>

         <LineChart
            ref="lineRef"
            :chart-data="data"
            :options="options"
            
        />
 
</template>

<script>
import { computed, defineComponent, ref, watch, onMounted } from 'vue';
import { LineChart } from "vue-chart-3"
import {  Chart,CategoryScale,LinearScale, LineController, LineElement } from "chart.js"
Chart.register(LineController, CategoryScale, LinearScale, LineElement)

export default defineComponent({
  name: 'LineChartView',
  components: { LineChart },
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
        labelkeys: {
            type: Array,
        },
    },
    setup(props){
        const lineRef = ref(null)
         const dataSetVal = computed(() => 


        {
            let ds = []
            for(let i=0; i< props.chartData.length; i++){
                let obj = {
                    label: props.labelkeys[i],
                    data: props.chartData[i],
                    borderColor: backgroundColor[i]
                    
                }
                ds.push(obj)
            }
            
            return ds
        })
        const backgroundColor =  ['blue', 'red', 'yellow', 'purple', 'orange', 'light blue', 'brown' ,'#ECB390' ,'pink','dark green', 'gray' ,'green', "red-orange" ]
        // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        // const data = computed(() => ({
        // labels:  props.labels,
        // // datasets: dataSetVal
        // datasets: [
            // {
            //     label: 'Month',
            //     data: props.chartData[0],
            //     backgroundColor: backgroundColor[0]
                
            // },
            // {
            //     label: 'Month2',
            //     data: props.chartData[1],
            //     backgroundColor: backgroundColor[0]
                
            // },
        // ]
        // }))
        const data = computed(() => {
            let obj = {}
            obj['labels'] = props.labels
            obj['datasets'] = dataSetVal.value
            return obj
        })
        const options = ref({
             plugins: {
                datalabels: {
                    color: 'white',
                }, 
                legend: {
                    position: "bottom",
                    display: true
                },
                title: {
                    display: true,
                    text: props.label,
                },
                responsive: true,
                maintainAspectRatio: false
             }
        })

        return { 
        dataSetVal,data,options, props, lineRef, 
        // isDataLoaded
        // testData1, testData, shuffleData, doughnutRef, doughnutRef2, options, props 
    
        };
    }
})

</script>