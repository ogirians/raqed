<template>
    <v-container>
        <div>
            <v-card class="mx-auto mb-5 mt-2" max-width="700">
                <v-card-title>
                    <h4>halo, ogy</h4>
                </v-card-title>
            </v-card>
            <v-card min-height="200" max-width="700" class="mx-auto mb-5">
                <v-select
                :items="['simpp-dev', 'simpp-dev-demo']"
                density="compact"
                label="Database"
                ></v-select>
                <v-card-title class="text-wrap">
                    <h6>taruh querynya disini (update, delete, insert only)</h6>
                </v-card-title>
                <v-textarea
                label="query"
                model-value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                name="input-7-1"
                variant="filled"
                class="ma-5"
                clearable
                v-model = description
                ></v-textarea>
                <v-divider />
                <div class="d-flex">
                    <v-btn :disabled="run_loader == true" @click="createTask_Api()" small class="my-3 mr-3 ml-auto" color="primary">
                    <v-progress-circular
                        color="white"
                        size="15"
                        indeterminate
                        v-if = "run_loader"
                    ></v-progress-circular>
                    <div v-else>
                        Run
                    </div>
                    </v-btn>        
                </div>
                
            </v-card>
            
            <v-card min-height="200" max-width="700" class="mx-auto">
                <v-card-title>
                    <h6>output querynya disini</h6>
                    
                </v-card-title>
                <v-card color="" grow min-height="200" class="ma-5 pa-3">
                       <table v-if="result_query">
                        <tr>
                            <td>updated row</td>
                            <td class="px-3">:</td>
                            <td>{{ result_query.rowCount }}</td>
                        </tr>
                        <tr>
                            <td>query</td>
                            <td class="px-3"> :</td>
                            <td>{{ result_query.query }}</td>
                        </tr>
                        <tr>
                            <td>finish time</td>
                            <td class="px-3"> :</td>
                            <td>{{ result_query.finishTime }}</td>
                        </tr>
                       </table>

                       <div v-if="error_query">
                            {{error_query}}
                       </div>
                 </v-card>
            </v-card>
        </div>
        <v-snackbar
          v-model="snackbar"
          timeout="-1"
        >
          <div v-if="query_is_ran == true">
            berhasil run query
          </div>
          <div v-if="query_is_ran == false">
            gagal run query
          </div>
          <template v-slot:actions>
            <v-btn
              :color="query_is_ran == true ? 'green' : 'red'"
              variant="text"
              @click="snackbar = false"
             
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
    </v-container>
</template>

<script setup>
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { computed, ref, reactive } from 'vue'

const store_my_data = useAuthStore(); 

const snackbar = ref(false);
const result_query = ref('');
const error_query = ref('');
const run_loader = ref(false);
const query_is_ran = ref(false);
const description = ref('select * from your_heart')

const action_up = computed(() => {
    let trimed = '';
    let action = '';
    
    trimed = description.value.trimStart()
    action = trimed.split(' ')[0];

    console.log(action.toUpperCase());
    return action.toUpperCase();
})


const description_kb = computed(() => {
 return '```'+inlineQuery(description.value.trimStart())+'```'
})

const title_kb = computed(() => {
    // description.value.trimStart();   
   
    let tablename = '';
    let title = '';
    let trimed = '';

    trimed = inlineQuery(description.value.trimStart());
    if (action_up.value === 'INSERT'){
        tablename = trimed.split(' ')[2];
    }

    if (action_up.value === 'UPDATE'){
        tablename = trimed.split(' ')[1];
    }

    if (action_up.value === 'DELETE'){
        tablename = trimed.split(' ')[2];
    }

    title = action_up.value+' '+'simpp-dev.'+tablename
    return title; 
})

const form_createTask = reactive({
    jsonrpc: "2.0",
    method: "createTask",
    id: 11,
    params: {
        owner_id: 11,
        creator_id: 11,
        description: description_kb,
        title: title_kb,
        project_id: 59,
        color_id: "amber",
        column_id: 447,
        priority : 1 
    }
})

function  createTask_Api() {
    result_query.value = "";
    error_query.value = "";
    run_loader.value = true;
    if(action_up.value === 'INSERT' ||  action_up.value === 'UPDATE'|| action_up.value === 'DELETE'){
        axios.post('', form_createTask)
        .then(response => {
            console.log('berhasil input kanboard')
            runQuery_api();
        })
        .catch(error => {
            console('gagal insert kanboard')
            error_query.value=error.response.data.message;
        })
        run_loader.value = false;
    } else {
        console.log('jangan dek ya..')
        error_query.value='jangan dek ya..';
        snackbar.value = true;
        query_is_ran.value  =false;
        run_loader.value = false;
    }
}

function runQuery_api(){
    axios.post('http://localhost:3001',{query : inlineQuery(description.value.trimStart())})
    .then(response => {
        result_query.value=response.data;
        snackbar.value = true;
        query_is_ran.value  = true;
    })
    .catch(error => {
        console.log(error.response)
        error_query.value=error.response.data.message;
        snackbar.value = true;
        query_is_ran.value  = false;
    })
}

function inlineQuery(query) {
    console.log(query)
    if (typeof query !== 'string') {
        throw new Error('Query must be a string');
    }

    if(query !== '' || query !== null){
        return query.replace(/\s+/g, ' ').trim();
    }
}


 
</script>