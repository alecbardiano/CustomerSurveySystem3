<template>
  <div>
    <DoughnutChart ref="doughnutRef" :chartData="testData" :options="options" />
    <DoughnutChart ref="doughnutRef2" :chartData="testData1" :options="options" />
    <button @click="shuffleData">Shuffle</button>
  </div>
</template>

<script>
import { shuffle } from 'lodash';
import { computed, defineComponent, ref, watch, onMounted } from 'vue';
import { DoughnutChart } from 'vue-chart-3';
import axios from 'axios'


export default defineComponent({
  name: 'Home',
  components: { DoughnutChart },
  props:{
        chartData:Object,
    },
  setup(props, { emit }) {
    
    const doughnutRef = ref();
    const doughnutRef2 = ref();


    // var options2 = {
    //     method: 'GET',
    //     url: 'https://weatherapi-com.p.rapidapi.com/sports.json',
    //     params: {q: 'London'},
    //     headers: {
    //         'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
    //         'x-rapidapi-key': '8521fcb5efmshdd290527ad3a118p1f63f9jsnbb898c1d8953'
    //     }
    // };

    


    const chartDatafromParent = computed({
      get: () => {
        console.log("get data from computed", props.chartData.datasetsd)
        if (props.chartData) {
          console.log("get data from computed", props.chartData)
          return props.chartData;
        } else {
          return "";
        }
      },
      set: (value) => {
          if (value){
            emit("update:chartData", {
            ...props.chartData,
            value: value,
            });
          }else{
            return null
          }
          
      },
    });

    const options = ref({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Doughnut Chart',
        },
      },
    });
    const testData1 = {
      labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
      datasets: [
        {
          data: [30, 40, 60, 70, 5],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
        },
      ],
    };


    const testData = computed(() => ({
      labels: chartDatafromParent.value.labels,
      datasets: [
        {
          data: chartDatafromParent.value,
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
        },
      ],
    }));

    watch(props.chartData, (newValue, oldValue) => {
        console.log("new watch val", newValue)
        updateChart(newValue)
    })

    function setQuestionID (){
      emit("update:chartData", {
            ...props.chartData,
        });
    }
    

    function shuffleData() {
      data.value = shuffle(data.value);
    }

    onMounted( async ()  => {
       console.log("testData",  testData.value)
       console.log("testdata1" ,testData1)

    //    await axios.request(options2).then(function (response) {
    //     console.log(response.data);
    //     testData.value.datasets.data = response.data.football
    //     }).catch(function (error) {
    //         console.error(error);
    //     });
    //    console.log("mounted 2", chartDatafromParent.value)
    })

    return { testData1, testData, shuffleData, doughnutRef, doughnutRef2, options, props };
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
