import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./utils/dayjs";
//自动设置html标签字体大小
import "amfe-flexible"


import Vant from "vant";
import "vant/lib/index.css";

import "./assets/scss/index.scss"

Vue.use(Vant);

new Vue({
	store,
	router,
	render: (h) => h(App)
}).$mount("#app");
