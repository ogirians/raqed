// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // const count = ref(0)
  // const name = ref('Eduardo')

  const my_data = ref('');

  // const doubleCount = computed(() => count.value * 2)
  
  function loadFromLocalStorage() {
    console.log('ambil data tersimpan dari local storage,');
        
    try {
      my_data.value = JSON.parse(localStorage.getItem('my_raqed_data'));
    } catch (error) {
      console.error('Failed to parse JSON data from localStorage:', error);
      // Optionally, set a default value or handle the error in another way
      my_data.value = ''; // Default value
    }
    
  }

  function destroyData(){
    my_data.value = '';
    localStorage.removeItem('my_raqed_data');
    localStorage.removeItem('raqed_token');
  }

  // return { count, name, doubleCount, increment }
  return { my_data , loadFromLocalStorage, destroyData };
})
