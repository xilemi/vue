import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useMdaStore = defineStore('mda', () => {
  const a = ref(10)
  const obj = reactive({ name: 'xile', age: 19 })
  let b = computed(() => {
    return a.value * 2
  })
  function addA() {
    a.value++
    obj.age++
  }
  return { a, obj, b, addA }
})
