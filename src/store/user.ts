import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      role: "notlogin",
    },
  }),
  actions: {
    getLoginUser({ commit, state }, payload) {
      //todo 改为从远程请求获取登录信息
      commit("updateUser", { userName: "Mouth" });
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
