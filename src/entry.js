/* global Vue */

/* weex initialized here, please do not move this line */
// import {
//     query
// } from "./common/util";
const {
    router
} = require("./router");
const App = require("@/index.vue");
// const APP_ENV = query("dev") || WXEnvironment.config.env;
// const displayLog = query("log") === "1";
// if (APP_ENV !== "production" || displayLog) {
//     const Vconsole = require("vconsole");
//     let vConsole = new Vconsole();
//     Vue.use(vConsole)
// }
/* eslint-disable no-new */
// Vue.prototype.$api = new API({
//     type: 2
// });
new Vue(Vue.util.extend({
    el: "#root",
    router
}, App));
router.push("/");