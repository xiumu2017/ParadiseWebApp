import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    name: 'login',
    component: () => import('./view/login'),
    meta: {
      title: '登录'
    }
  },
  {
    name: 'timeline',
    component: () => import('./view/timeline'),
    meta: {
      title: '时光机'
    }
  },
  {
    name: 'bing',
    component: () => import('./view/bing'),
    meta: {
      title: 'Bing'
    }
  },
  {
    name: 'home',
    component: () => import('./view/home'),
    meta: {
      title: '商品详情'
    }
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};