<template>
  <v-app>
    <v-main>
      <v-app>
        <router-view />
      </v-app>
    </v-main>
  </v-app>
</template>

<script setup>
  import axios from 'axios'

  const username = 'ogirians';
  const password = 'ed37ea7c1b3cd6cd4526c290f886ce296f89f8c10ea8f2b178e270ee08ae';
  // Encode the username and password in Base64
  const credentials ='b2dpcmlhbnM6ZWQzN2VhN2MxYjNjZDZjZDQ1MjZjMjkwZjg4NmNlMjk2Zjg5ZjhjMTBlYThmMmIxNzhlMjcwZWUwOGFl';
  axios.defaults.baseURL = 'https://itki.rsudrsoetomo.jatimprov.go.id/kanboard/plugins/ApiCors/jsonrpc.php';
  // axios.defaults.headers.common['Authorization'] = 'Basic '+credentials;
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
</script>
