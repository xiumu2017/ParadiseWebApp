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
    name: 'meal',
    component: () => import('./view/meal'),
    meta: {
      title: '饮食管理'
    }
  },
  {
    name: 'meal-form',
    component: () => import('./view/meal/form'),
    meta: {
      title: '饮食管理'
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
      title: 'HomePage'
    }
  },
  {
    name: 'sleep',
    component: () => import('./view/sleep'),
    meta: {
      title: '睡了么'
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