import Vue from 'vue';
import App from './app.vue';
import VueRouter from 'vue-router';
import { resolve } from 'dns';

Vue.use(VueRouter);

const RouterConfig = {
    mode:'history',
    routes:Routers
}

const router = new VueRouter(RouterConfig);
new Vue({
    el:'#app',
    router:router,
    render:h=>h(App)
});

const Routers=[
    {
        path:'/index',
        component:(resolve) =>require(['./views/index.vue'],resolve)
    },
    {
        path:'/about',
        component:(resolve) =>require(['./views/about.vue'],resolve)
    }   

]
