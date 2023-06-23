import { defineStore } from "pinia";
import { ref } from "vue";
export const useCategoryStore = defineStore("category", () => {
    const categoryList = ref(null)
    const cityInfo = ref(null)
    const activeCategory = ref(0)
    const updateCategory = (payload) => {
        categoryList.value = payload
    }
    const updateCity = (payload) => {
        cityInfo.value = payload
    }
    const updateActiveCategory = (payload) => {
        activeCategory.value = payload
    }
    return {
        categoryList, updateCategory, updateCity, cityInfo, activeCategory, updateActiveCategory
    }
},
    {
        persist: {
            paths: ["categoryList", "cityInfo", "activeCategory"]
        }
    }

)