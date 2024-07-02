import { createStore } from "vuex";
const store = createStore({
  state: {
    id: localStorage.getItem("id") || null,
  },
  mutations: {
    setId(state, id) {
      state.id = id;
      localStorage.setItem("id", id);
    },
  },
  actions: {
    updateId({ commit }, id) {
      commit("setId", id);
    },
  },
  getters: {
    getId: (state) => state.id,
  },
});
export default store;
