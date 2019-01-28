import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/home",
      name: "home",
      component: require("@/views/home").default
    },
    {
      path: "/dongtai",
      name: "dongtai",
      component: require("@/views/dongtai").default
    },
    {
      path: "/shequ",
      name: "shequ",
      component: require("@/views/shequ").default
    },
    {
      path: "/shici",
      name: "shici",
      component: require("@/views/shici").default
    },
    {
      path: "/shuji",
      name: "shuji",
      component: require("@/views/shuji").default
    },
    {
      path: "/baodao",
      name: "baodao",
      component: require("@/views/baodao").default
    },
    {
      path: "/caidan",
      name: "caidan",
      component: require("@/views/caidan").default
    },
    {
      path: "/fuwu",
      name: "fuwu",
      component: require("@/views/fuwu").default
    },
    {
      path: "/dangri",
      name: "dangri",
      component: require("@/views/dangri").default
    },
    {
      path: "/gongyi",
      name: "gongyi",
      component: require("@/views/gongyi").default
    },
    {
      path: "/fengcai",
      name: "fengcai",
      component: require("@/views/fengcai").default
    },
    {
      path: "/yuyue",
      name: "yuyue",
      component: require("@/views/yuyue").default
    },
    {
      path: "/daolan",
      name: "daolan",
      component: require("@/views/daolan").default
    },
    {
      path: "/geren",
      name: "geren",
      component: require("@/views/geren").default
    },
    {
      path: "/dangxiao",
      name: "dangxiao",
      component: require("@/views/dangxiao").default
    },
    {
      path: "/",
      name: "/",
      component: require("@/views/home").default
    },
    {
      path: "*",
      redirect: "/"
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});