import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { dofinishloginApi } from "@/api/user.js"
import { showSuccessToast, showFailToast } from "vant";
export const useUserStore = defineStore('user', () => {
  // 定义数据 需要存储token userid
  const userInfo = reactive({ userid: '', token: "" })
  const addressInfo = ref(null)
  let router = useRouter()
  let route = useRoute()
  //  
  let getAddressInfo = (payload) => {
    addressInfo.value = payload
  }
  // 判断登录状态
  let isLogin = computed(() => {
    return !!(userInfo.token && userInfo.userid)
  })
  let token = computed(() => {
    return userInfo.token
  })
  let userid = computed(() => {
    return userInfo.userid
  })
  // 更新登录的数据
  let updateUserInfo = (payload) => {
    //   把登录的数据存到userInfo 中   
    for (let key in payload) {
      if (Object.hasOwn(userInfo, key)) {
        console.log(11);
        userInfo[key] = payload[key]
      }
    }
  }
  // 登录并更新数据
  let loginAndUpdateUserInfo = async (payload) => {
    try {
      let res = await dofinishloginApi(payload);
      console.log(res.data);
      updateUserInfo(res.data)
      if (route.query.returnUrl) {
        router.replace(route.query.returnUrl);
      } else {
        router.replace("/mine")
      }
      showSuccessToast(res.message)
    } catch (err) {
      showFailToast(err.message);
    }
  }
  // 退出并删除数据
  let exitAndUpdateUserInfo = async () => {
    updateUserInfo({ token: "", userid: '' })
  }
  // 需要将全部的数据进行导出
  return {
    isLogin, loginAndUpdateUserInfo, exitAndUpdateUserInfo, userInfo, token, userid, addressInfo, getAddressInfo
  }

},
  {
    persist: {
      key: 'userInfo',
      paths: ["userInfo", "isLogin", "addressInfo"]
    }
  }

)
