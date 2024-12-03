<template>
  <!-- <HelloWorld /> -->
  
    <!-- <v-app-bar extended>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title>Application</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon="mdi-dots-vertical">
      </v-btn>
    </v-app-bar> -->

    
      <v-container>
        
        
        <div style="position: absolute; top:40%; left:50%;  transform: translate(-50%, -50%);">
          <div class="d-flex mx-auto mt-10" style="width:300px">
          <div style="width:130px" class="me-auto">
            <v-img
            class="" 
            height="50px"
            src="@/assets/logo_raqed.png"
            >
            </v-img>
          </div>
          <div style="width:50px">
            <v-img
              class=""
              height="50px"
              src="@/assets/logo_postgre.png"
            >
            </v-img>
          </div>
        </div>  
          <v-sheet class="mx-auto elevation-5 mt-5 rounded-lg"  width="300">
            <v-form @submit.prevent class="pa-5">
              <v-text-field
                v-model="formAuth.username"
                label="user name"
              ></v-text-field>
              <v-text-field
                v-model="formAuth.password"
                label="password"
                type = "password"
              ></v-text-field>
              <h5>**silahkan login menggunakan akun kanboard**</h5>
              <v-btn @click="getLogin()" class="mt-2" type="submit" color="primary" block>Submit</v-btn>
            </v-form>
          </v-sheet>
        </div>
        <v-overlay
          :model-value="overlay"
          class="align-center justify-center"
        >
          <v-progress-circular
            color="primary"
            size="64"
            indeterminate
          ></v-progress-circular>
          <v-sheet>

          </v-sheet>
        </v-overlay>
        <v-snackbar
          v-model="snackbar"
          timeout="-1"
        >
          <div v-if="isLogin == true">
            berhasil login
          </div>
          <div v-if="isLogin == false">
            gagal login
          </div>
          <template v-slot:actions>
            <v-btn
              :color="isLogin == true ? 'green' : 'red'"
              variant="text"
              @click="snackbar = false"
             
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <!-- <v-row>
          <v-col
            v-for="n in 24"
            :key="n"
            cols="4"
          >
            <v-card height="200"></v-card>
          </v-col>
        </v-row> -->
      </v-container>
  
</template>

<script setup>
   import axios from 'axios'
   import { computed, ref, reactive } from 'vue'
   import { useDisplay } from 'vuetify'
   import { useAuthStore } from '@/stores/auth'
   import { useRoute, useRouter } from 'vue-router'
   const router = useRouter()
  
   const store_my_data = useAuthStore();
 
  
  const { name } = useDisplay()
  const overlay = ref(false);
  const snackbar = ref(false);
  const myData = ref('');
  const isLogin = ref(false);
  const token = ref('');

  const formAuth= reactive({username : '', password: ''})
  const width = computed(() => {
    // name is reactive and
    // must use .value
    switch (name.value) {
      case 'xs': return 200
      case 'sm': return 200
      case 'md': return 300
      case 'lg': return 500
      case 'xl': return 500
      case 'xxl': return 500
    }

    return undefined
  })

  onMounted(() => {
      console.log('Component is mounted');
      // Perform initialization here, similar to created hook
      // message.value = 'Hello from onMounted!';
      // loadFromLocalStorage();(
      store_my_data.loadFromLocalStorage();
      if(store_my_data.my_data){
        router.push({path:'/home'})
      }
    });


  const formAuthBtoa = computed(() => {
    token.value = btoa(formAuth.username+':'+formAuth.password);
    return token.value
  })

  function getLogin(){
    axios.defaults.headers.common['Authorization'] = 'Basic '+formAuthBtoa.value;
    overlay.value = true;
    axios.post('', {"jsonrpc": "2.0", "method": "getMe", "id":1})
    .then(response => {
        myData.value = response.data;
        overlay.value = false;
        snackbar.value = true;
        isLogin.value = true;
        store_my_data.my_data = response.data;
        saveTokenToLocalStorage(token.value);
        saveMyDataToLocalStorage(JSON.stringify(response.data));
        router.push({path:'/home'})
    })
    .catch(error => {
       console.log(error.response.data)
       isLogin.value = false;
       snackbar.value = true;
       overlay.value = false;
    });
    
  }

  function  saveTokenToLocalStorage(data) {
      localStorage.setItem('raqed_token', data);
  }

  function  saveMyDataToLocalStorage(data) {
      localStorage.setItem('my_raqed_data', data);
  }


  
</script>
