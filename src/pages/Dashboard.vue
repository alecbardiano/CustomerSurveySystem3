<template>
  <div class="layout-padding ">
    <div class="flex wrap gutter">
      <div class="width-1of3 sm-auto">
        <CardDashboardFeedbackCount
          title="Feedback Total YTD"
          backgroundColor="green"
          icon-name="local_post_office"
          :total="35">
        </CardDashboardFeedbackCount>
      </div>
      <div class="width-1of3 sm-auto">
        <CardDashboardFeedbackCount title="Negative Feedback YTD" backgroundColor="red" :total="36"> </CardDashboardFeedbackCount>
      </div>
      <div class="width-1of3 sm-auto">
        <CardDashboardFeedbackCount
          title="Positive Feedback YTD"
          backgroundColor="blue"
          :total="38">
        </CardDashboardFeedbackCount>
      </div>
    </div>
    
  </div>
  <div style="width: 400px">
    <BarChart v-bind="barChartProps" />

    <!-- {{barChartProps}} -->
  </div>


</template>


<script type="text/javascript">

  import { defineComponent, ref, computed } from 'vue'
  import CardDashboardFeedbackCount from '../components/CardDashboardFeedbackCount.vue'
  import { Chart, registerables } from 'chart.js'
  // import { BarChart, useBarChart } from 'vue-chart-3'


  Chart.register(...registerables);
  
  export default {
    name: 'Dashboard',
    components: {
      CardDashboardFeedbackCount
    },
    setup() {
    const dataValues = ref([30, 40, 60, 70, 5]);
    const totalPosts = ref(0);
    const totalComments = ref(0);
    const totalTodos =  ref(0);


    // const chartData = computed(() => ({
    //   labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
    //   datasets: [
    //     {
    //       data: dataValues.value,
    //       backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    //     },
    //   ],
    // }));


    return {totalPosts, totalComments, totalTodos, CardDashboardFeedbackCount};
  },
  }
</script>
<style></style>
