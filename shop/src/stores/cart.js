import { defineStore } from "pinia";
import { ref } from "vue";
export const useCartStore = defineStore("cart", () => {

    const cartList = ref(null)
    const updateCartList = (payload) => {
        cartList.value = payload
    }

    return {
        cartList, updateCartList
    }

},
    {
        persist: {
            paths: ["cartList"]
        }
    }

)