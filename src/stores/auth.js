// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // const count = ref(0)
  // const name = ref('Eduardo')

  const my_data = ref('');

  // const doubleCount = computed(() => count.value * 2)
  
  // function increment() {
  //   count.value++
  // }

  // return { count, name, doubleCount, increment }
  return { my_data }
})
