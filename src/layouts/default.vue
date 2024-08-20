<template>
  <v-app>
    <v-main style="background-color:grey">
        <div :style="'width:'+width+'px; position:absolute; bottom:0;'">
          <v-img
              height="500"
              src="@/assets/image_raqed.png"
              aspect-ratio="4/3"
          >
        </v-img>
      </div>
        
        <router-view />
    <!-- <AppFooter /> -->
     </v-main>
  </v-app>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import { useDisplay } from 'vuetify'
const { name } = useDisplay()



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

  //
</script>
