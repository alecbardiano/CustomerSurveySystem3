<template>
<!--   
  <ul v-if="!loading && data && data.length">
    <li v-for="question of data" v-bind:key="question.question">
      <p><strong> {{question.category}}</strong></p>
    </li>
  </ul>
  <p v-if="loading">
   Still loading..
   <>
  </p>
  <p v-if="error">  -->
    <div class="row">
      <div class="col-4 col-md-4">
        {{reviewQuestion.QuestionId}} {{reviewQuestion.question}}
      </div>
          <q-rating
            v-for="(data) in reviewData" :key="data.id"
            v-model="data.selected"
            :options="data.options"
            size="3.0em"
            icon="star_border"
            color="primary"
            inline />
            <!-- add click here  -->
            <!-- <div style="padding-left:4  0px">
              N/A
              <q-radio v-model="reviewData.selected" />
            </div> -->
    </div>
</template>
<script>
import { ref, computed, onMounted, reactive,toRefs  } from "vue";
import axios from "axios";
// app.provide('axios', this.$axios)
export default {
  name: 'Questions',
  props: {
    // add some code here from survey file
  },
  setup() {
    let data = ref(null);
    let loading = ref(true);
    let error = ref(null);

    // async function fetchData() {
    //   loading.value = true;
    //   // I prefer to use fetch
    //   // you can use use axios as an alternative
    //   await axios.get('https://opentdb.com/api.php?amount=10')
    //         .then(function( response ){
    //             // console.log(response.data.results)
    //             data = response.data.results;
    //             console.log(data)
    //         }.bind(this))
    //         .then(res => {
    //       // a non-200 response code
    //       if (!res.ok) {
    //         // create error instance with HTTP status text
    //         const error = new Error(res.statusText);
    //         error.json = res.json();
    //         throw error;
    //       }
    //       return res.json();
    //     })
    //     .then(json => {
    //       // set the response data
    //       console.log(json.data)
    //       data.value = json.data;
    //     })
    //     .catch(err => {
    //       error.value = err;
    //       // In case a custom JSON error response was provided
    //       if (err.json) {
    //         return err.json.then(json => {
    //           // set the JSON response message
    //           error.value.message = json.message;
    //         });
    //       }
    //     })
    //     .then(() => {
    //       loading.value = false;
    //     });
    //     }

    // onMounted(() => {
    //   fetchData();
    // });

    return {
      data,
      loading,
      error
    };
  }
}
</script>