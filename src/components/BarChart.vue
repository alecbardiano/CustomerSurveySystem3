

<template>
         <BarChart
            ref="barRef"
            :chart-data="data"
            :options="options"
            
        />
 
</template>

<script>
import { computed, defineComponent, ref, watch, onMounted } from 'vue';
import { BarChart } from "vue-chart-3"
import {  Chart,BarController,CategoryScale,LinearScale,BarElement } from "chart.js"
Chart.register(BarController, CategoryScale, LinearScale, BarElement)

export default defineComponent({
  name: 'BarChartView',
  components: { BarChart },
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
    setup(props){
        const barRef = ref(null)
        const dataValues = ref([
        ])
        const backgroundColor =  ['#29A0B1', 'red', 'yellow', 'purple', 'orange', 'light blue', 'brown' ,'#ECB390' ,'pink','dark green', 'gray' ,'green' ]
        // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const data = computed(() => ({
        labels:  props.labels,
        datasets: [
            {
                label: 'Month',
                data: props.chartData,
                backgroundColor: backgroundColor[0]
                
            },
        ]
        }))
        const options = ref({
             plugins: {
                datalabels: {
                    color: 'black',
                }, 
                legend: {
                    position: "bottom",
                    display: false
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
        data,options, props, barRef
        // isDataLoaded
        // testData1, testData, shuffleData, doughnutRef, doughnutRef2, options, props 
    
        };
    }
})

</script>