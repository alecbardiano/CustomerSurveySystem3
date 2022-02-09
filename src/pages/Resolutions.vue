<template>
  <div class="q-pa-md">
    <h6> Please accomplish all of the fields </h6>
  </div>
  <div class="q-pa-md" style="margin-left: 40px">
    <div class="row inline">
      <q-select v-model="division" @update:model-value="fillSectionList()" :options="divisions" label="Division" style="width: 200px; " />
      <q-select v-model="service" :options="services" label="Service" style="width: 200px;  margin-left: 40px" />
    </div>
  </div>

  <div class="q-pa-md" style="margin-left: 40px" >
    <div class="row">
      <q-form ref="dateform">
        <div class="row inline">
          <q-input outlined filled mask="date" v-model="beforeDate" lazy-rules :rules="[val => val <= afterDate || 'Field should be earlier than after date']" placeholder="mm/dd/yy" hint="Start Date" >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="beforeDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input> 
          <!-- :rules="[val => !!val || 'Field is required', val => !isNaN(val) || 'Field should be a number']" -->
          <q-input outlined filled mask="date" v-model="afterDate" lazy-rules :rules="[val => val >= beforeDate || 'Field should be later than before date']"   placeholder="mm/dd/yy" hint="End Date" style=" margin-left: 40px">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="afterDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-form>
    </div>

  </div>
  <div class="q-pa-md">
    <p></p>
  </div>
  <div class="q-pa-md">
    <!-- :filter="filter"
      v-model:pagination="pagination"
      @request="onRequest" -->
    <q-table
      class="my-sticky-header-table"
      v-if="rowsOverall"
      title="Summary of Citizen/Client Satisfaction Survey CCSS Rating" 
      :rows="rowsOverall"
      :columns="colsOverall"
      row-key="name"
      :loading="loading"
      binary-state-sort
      separator="cell"
      style="height: 700px"
      :rows-per-page-options="[0]"
    >

    <template v-slot:top-row>
       <q-tr>
        <q-td colspan="100%">
          {{division}}
        </q-td>
      </q-tr>
      <q-tr>
        <q-td colspan="100%">
          {{service}}
        </q-td>
      </q-tr>
    </template>

    



      <template v-slot:bottom-row>
        <q-tr>
          <q-td>
            No. of Respondents
          </q-td>
          <q-td >
            {{noRespondents}}
          </q-td>
        </q-tr>
        <q-tr>
          <q-td >
            No. and % of customers who rated the service as very satisfactory or better
          </q-td>
          <q-td >
             {{noVerySatisfactory}}
          </q-td>
        </q-tr>
        <q-tr>
          <q-td >
             No. and % of customers who rated the service as satisfactory or better
          </q-td>
          <q-td >
             {{noSatisfactory}}
          </q-td>
        </q-tr>
        <q-tr>
          <q-td >
             No. and % of customers who rated the service as Fair or Poor
          </q-td>
          <q-td>
             {{noPoor}}
          </q-td>
        </q-tr>
        <q-tr>
          <q-td >
             No. and % of customers who didn't have an Overall Answer
          </q-td>
          <q-td>
             {{noNoOverall}}
          </q-td>
        </q-tr>

      </template>
    </q-table>
  </div>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-header-table"
      title="Total Summary of Citizen/Client Satisfaction Survey CCSS Rating" 
      :rows="rowsTotal"
      :columns="colsTotal"
      row-key="name"
      binary-state-sort
      separator="cell"
      style="height: 350px"
      :rows-per-page-options="[0]"
    >
    </q-table>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Resolutions'
})
</script>
