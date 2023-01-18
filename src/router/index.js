import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import VueMeta from "vue-meta";

Vue.use(VueRouter);
Vue.use(VueMeta);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart"),
  },
  {
    path: "/history",
    name: "History",
    component: () => import("../views/History"),
  },
  {
    path: "/history/:id",
    name: "Transaction",
    component: () => import("../views/Transaction"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (localStorage.access_token) {
    if (to.name === "Login") {
      next(false);
    } else {
      next();
    }
  } else {
    if (to.name === "Login") {
      next();
    } else if (to.name === "Register") {
      next();
    } else if (to.name === "Home") {
      next();
    } else {
      next({ name: "Home" });
    }
  }
});

export default router;
