import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    categories: [],
    carts: [],
    isAuthenticated: false,
    totPrice: 0,
    history: [],
    transaction: [],
  },
  mutations: {
    SET_PRODUCT(state, payload) {
      state.products = payload;
    },
    SET_CATEGORY(state, payload) {
      state.categories = payload;
    },
    SET_AUTH(state, boolean) {
      state.isAuthenticated = boolean;
    },
    SET_CART(state, payload) {
      state.carts = payload;
    },
    SET_TOTPRICE(state, payload) {
      state.totPrice = payload;
    },
    SET_HISTORY(state, payload) {
      state.history = payload;
    },
    SET_TRANSACTION(state, payload) {
      state.transaction = payload;
    },
  },
  actions: {
    fetchCategories({ commit }) {
      axios({
        url: "http://localhost:3000/category",
        method: "GET",
      })
        .then(({ data }) => {
          commit("SET_CATEGORY", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchProducts({ commit }) {
      axios({
        url: `http://localhost:3000/products`,
        method: "GET",
      })
        .then(({ data }) => {
          commit("SET_PRODUCT", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login(context, payload) {
      return axios({
        url: "http://localhost:3000/login",
        method: "POST",
        data: payload,
      });
    },
    register(context, payload) {
      return axios({
        url: "http://localhost:3000/register",
        method: "POST",
        data: payload,
      });
    },
    search({ commit }, data) {
      axios({
        url: "http://localhost:3000/products/search",
        method: "POST",
        data,
      })
        .then(({ data }) => {
          console.log(data);
          if (data.category === "Flower Bouquet") {
            commit("SET_PRODUCT", data.products);
          } else {
            commit("SET_HANDCRAFTS", data.products);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchHistory({ commit }) {
      axios({
        url: "http://localhost:3000/histories/",
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          commit("SET_HISTORY", data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    fetchTransaction({ commit }, id) {
      axios({
        url: `http://localhost:3000/transaction/${id}`,
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          commit("SET_TRANSACTION", data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    fetchCart({ commit }) {
      axios({
        url: "http://localhost:3000/carts/1",
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          commit("SET_CART", data);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue.price;
          const totalPrice = data.reduce(reducer, 0);
          commit("SET_TOTPRICE", totalPrice);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addCart(context, payload) {
      console.log("tes");
      return axios({
        url: "http://localhost:3000/carts/1",
        method: "POST",
        data: payload,
        headers: {
          access_token: localStorage.access_token,
        },
      });
    },
    patchCart(context, payload) {
      return axios({
        url: `http://localhost:3000/carts/${payload.cartId}`,
        method: "PATCH",
        data: payload.quantity,
        headers: {
          access_token: localStorage.access_token,
        },
      });
    },
    patchProduct(context, payload) {
      return axios({
        url: `http://localhost:3000/products/${payload.id}`,
        method: "PATCH",
        data: payload.stock,
        headers: {
          access_token: localStorage.access_token,
        },
      });
    },
    authenticate({ commit }, payload) {
      commit("SET_AUTH", payload);
    },
    deleteProduct(context, payload) {
      return axios({
        url: `http://localhost:3000/carts/${payload}`,
        method: "DELETE",
        data: payload,
        headers: {
          access_token: localStorage.access_token,
        },
      });
    },
    addTransaction(context, payload) {
      return axios({
        url: "http://localhost:3000/transaction/",
        method: "POST",
        data: payload,
        headers: {
          access_token: localStorage.access_token,
        },
      });
    },
    addHistory(context, payload) {
      return axios({
        url: "http://localhost:3000/histories/",
        method: "POST",
        data: payload,
        headers: {
          access_token: localStorage.access_token,
        },
      });
    },
    checkoutPaymentGateway(_, payload) {
      axios({
        url: "http://localhost:3000/payment/createInvoice",
        method: "POST",
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          amount: payload.totalBuildPrice,
        },
      })
        .then(({ data }) => {
          return window.location.assign(data.invoice_url);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
  getters: {
    filteredProducts: (state) => (payload) => {
      if (payload) {
        return state.products.filter(
          (products) => products.category === payload
        );
      } else {
        return state.products;
      }
    },
  },
});
