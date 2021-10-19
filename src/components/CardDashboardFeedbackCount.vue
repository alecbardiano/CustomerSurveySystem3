<template>
  <div class="q-pa-md row items-start q-gutter-md">

    <q-card class="customCard">
       <q-card-section class="bg-primary text-white">
        <div class="text-h6">{{title}}</div>
      </q-card-section>
      <div align="center">
        <q-card-section>
           <p class="fontsizeTotal"> {{ total }} </p>
        </q-card-section>
      </div>
    </q-card>

  </div>
</template>
<script type="text/javascript">
  export default {
    props: ['title', 'total', 'backgroundColor', 'iconName'],
    data () {
      return {
        options: {
          separator: '.'
        }
      }
    }
  }
</script>
<style scoped>
  .fontsizeTotal {
    font-size: 54px;
  }
  .customCard{
      height: 200px;
      width: 275px;
  }
</style>