<template>
  <div class="layout-padding ">
    <div class="flex wrap gutter">
      <div class="width-1of3 sm-auto">
        <CardDashboardFeedbackCount
          title="Total TSRS YTD"
          backgroundColor="green"
          icon-name="local_post_office"
          :total="totalTsrs">
        </CardDashboardFeedbackCount>
      </div>
      <div class="width-1of3 sm-auto">
        <CardDashboardFeedbackCount title="Negative Feedback YTD" backgroundColor="red" :total="totalNegative"> </CardDashboardFeedbackCount>
      </div>
      <div class="width-1of3 sm-auto">
        <CardDashboardFeedbackCount
          title="Positive Feedback YTD"
          backgroundColor="blue"
          :total="totalPositive">
        </CardDashboardFeedbackCount>
      </div>
    </div>
    
  </div>
  <!-- <div style="width: 400px">
    <BarChart v-bind="barChartProps" />

  </div> -->

  <div class="q-pa-md">
  
   <q-table
      :rows="tableData"
      class="my-sticky-header-table"
      :columns="columns"
      row-key="col1"
      separator="cell"
      title="Overall Performance of the Center Based on CSS Responses"
    >
    <template v-slot:header="props">
        <q-tr>
          <q-th colspan="1" >col type1</q-th>
          <q-th colspan="2" >col type2</q-th>
          <q-th colspan="3" >col type3</q-th>
        </q-tr>
        <q-tr>
          <q-th key="col1" :props="props" >col1</q-th>
          <q-th key="col2" :props="props" >col2</q-th>
          <q-th key="col3" :props="props" >col3</q-th>
          <q-th key="col4" :props="props" >col4</q-th>
          <q-th key="col5" :props="props" >col5</q-th>
          <q-th key="col6" :props="props" >col6</q-th>
        </q-tr>
    </template>
        
    </q-table>
  </div>

  <div class="q-pa-md">
    <q-table
      :rows="tableData"
      :columns="columns"
      class="my-sticky-header-table"
      row-key="col1"
      title="Number of Customers and CSM Respondents Per Service Area"
      separator="cell"
    >
    <template v-slot:header="props">
        <q-tr>
          <q-th v-bind:key="div.name" v-for="div in divisions " :colspan="sample" >{{div}}</q-th>
        </q-tr>
        <q-tr>
          <q-th key="col1" :props="props" >col1</q-th>
          <q-th key="col2" :props="props" >col2</q-th>
          <q-th key="col3" :props="props" >col3</q-th>
          <q-th key="col4" :props="props" >col4</q-th>
          <q-th key="col5" :props="props" >col5</q-th>
          <q-th key="col6" :props="props" >col6</q-th>
        </q-tr>
    </template>
        
    </q-table>
  </div>

</template>


<script type="text/javascript">

  import { defineComponent, ref, computed, onMounted } from 'vue'
  import { getDivList, countPositiveFeedback, countNegativeFeedback, totalTsrsCount} from 'src/axioshelper.js'
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
    const totalNegative = ref(0);
    const totalPositive = ref(0);
    const totalTsrs =  ref(0);
    const sample = ref(2)
    const tableData = ref([{
        col1: 'x', col2: 'x', col3: 'x', col4: 'x', col5: 'x', col6: 'x'
      }])


    
    const divisions = ref([])

    const rowsOverallPerformance = ref([])
    const rowsnumberOfCustomers = ref([])  
    const colsOverallPerformance = ref([])
    const colsnumberOfCustomers = ref([])
    
    const columns = ref([
        { name: 'col1', align: 'center', label: 'col1', field: 'col1', sortable: true },
        { name: 'col2', align: 'center', label: 'col2', field: 'col2', sortable: true },
        { name: 'col3', align: 'center', label: 'col3', field: 'col3', sortable: true },
        { name: 'col4', align: 'center', label: 'col4', field: 'col4', sortable: true },
        { name: 'col5', align: 'center', label: 'col5', field: 'col5', sortable: true },
        { name: 'col6', align: 'center', label: 'col6', field: 'col6', sortable: true },
      ])



    async function LoadFeedbackCounts(){
      totalTsrs.value = await totalTsrsCount()
      totalNegative.value = await countNegativeFeedback()
      console.log("totalnega", totalNegative.value)
      totalPositive.value = await countPositiveFeedback()

    }

    async function buildTable(){

      
    }
    
    onMounted( async () => {
      console.log("mounted")
      LoadFeedbackCounts()
      divisions.value = await getDivList()
      console.log("divi",divisions.value)
     
    })

    

    // const chartData = computed(() => ({
    //   labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
    //   datasets: [
    //     {
    //       data: dataValues.value,
    //       backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    //     },
    //   ],
    // }));


    return {
      totalNegative, 
      totalPositive, 
      totalTsrs, 
      CardDashboardFeedbackCount, 
      columns,
      tableData,
      divisions,
      sample
    
    };
  },
  }
</script>
<style>

    

</style>
