<template>
  <div class="q-pa-md row items-start q-gutter-md showhim" >
    
    <q-card class="customCard">
       <q-card-section class="bg-primary text-white">
        <div class="text-h6">{{title}}</div>
      </q-card-section>
      <div align="center" >
       
        <q-card-section >
           <div class="ok">
            <p class="fontsizeCard"> {{ total }} </p>
           </div>
           <div class="showme">
          
          </div>
        </q-card-section>
        
      </div>

      
    </q-card>

  </div>
  
</template>
<script type="text/javascript">
import { computed, defineComponent, ref, watch, onMounted } from 'vue';
export default defineComponent({
    props: ['title', 'total', 'backgroundColor', 'iconName', 'tsrFeedbackData', 'modalFlag'],
    name: 'CardDashboardFeedbackView',
    setup(props) {
      const modal = ref(false)
      const maximizedToggle = ref(true)
      function showModal(){
        console.log("yo")
      }

      return{
        props,
        modal,
        maximizedToggle,
        showModal
      }
    }
})
</script>
<style scoped>
  .fontsizeCard {
    font-size: 54px;
  }
  .customCard{
      height: 200px;
      width: 275px;
  }

  /* .showme{ 
    display: none;
    
 }
 .showhim:hover .showme{
  display : block;
  
 }
 .showhim:hover .ok{
   display : none;
   opacity: 1;
   transition: .3s;
 } */
</style>