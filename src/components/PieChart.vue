<template>
<div class="chart-container" >
    {{props.chartData}}
    {{props}}
    <canvas id="canvas"  class="canvasClass"></canvas>
</div>
</template>

<script>
import Chart from 'chart.js/auto'
import { computed, onMounted, ref } from "vue";





export default {
    
  name: 'PieChart',
  props:{
        chartType:String,
        chartData:Object,
        chartOptions:Object
    },
    
  setup(props) {
    const PieChartData = ref(0)

    function chartConstructor(chartType, chartData, chartOptions) {
        const chartElement = document.querySelector("canvas");
        const chart = new Chart(chartElement, {
        type: chartType,
        data: chartData,
        options: chartOptions,
     });

     return chart
    }
    onMounted( () => {
    //    setQuestionID()
        let chartType = "pie"
        let chartData = props.chartData
        let chartOptions = props.options
        chartConstructor(chartType, chartData,chartOptions);
    // new Chart(ctx, this.planetChartData);

    })

    
    return {
      PieChartData,
      props
    };
  }
}
</script>
<style scoped>
.chart-container{
    position: relative; 
    height:70vh; 
    width:80vw
}
</style>