import Vue from 'vue'
import Vuex from 'vuex'
import api from "./api"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    collectionItems: [],
    user: JSON.parse(localStorage.getItem("user")),
  },
  getters: {
    collectionItemCount: state => state.collectionItems.length,
    isAuthenticated: state => !!state.user
  },
  mutations: {
    setCollectionItems(state, items) {
      state.collectionItems = items;
    },
    addCollectionItem(state, item) {
      state.collectionItems.push(item);
    },
    // deleteCollectionItem(state, item) {
      
    // },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem("user");
      state.collectionItems = [];
    }
  },
  actions: {
    getCollectionItems({ commit }) {
      if (this.getters.isAuthenticated) {
        
        api.getCollectionItems().then(response => {
          commit("setCollectionItems", response.data);
        });
      }
    },
    createCollectionItem({ commit }, photoId) {
      
      api.createCollectionItem(photoId).then(response => {
        commit("addCollectionItem", response.data);
      });
    },
    deleteCollectionItem({ commit }, photoId) {
      api.deleteCollectionItem(photoId).then(response => {
        this.dispatch("getCollectionItems");
      })
    },
    signIn({ commit }, { username, password }) {
      // The Promise used for router redirect in Signin.vue
      return new Promise((resolve, reject) => {
        api
          .createSession(username, password)
          .then(response => {
            commit("setUser", response.data);
            this.dispatch("getCollectionItems");
            resolve();
          })
          .catch(error => {
            // if the request fails, clear user
            commit("clearUser");
            reject(error.response.data.error);
          });
      });
    },
    signUp({ commit }, { username, password }) {

      return new Promise((resolve, reject) => {
        api
          .createUser(username, password)
          .then(response => {
            commit("setUser", response.data);
            this.dispatch("getCollectionItems");
            resolve();
          })
          .catch(error => {
            commit("clearUser");
            reject(error.response.data.errors);
          });
      });
    },
    signOut({ commit }) {
      // The Promise used for router redirect in Header.vue
      return new Promise(resolve => {
        api.deleteSession().then(() => {
          commit("clearUser");
          resolve();
        });
      });
    },
    makeComment({ commit }, data) {
      api.createComment(data)
        .then(response => {
        // commit("getComment", response.data);
      });
    }
  },
  modules: {
  }
})
