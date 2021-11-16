import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/home',
    meta: {
      showBottomNav: false,
      showTopNav: false,
    }
  },
  {
    name: 'login',
    component: () => import('./view/login'),
    meta: {
      title: '登录',
      showBottomNav: false,
      showTopNav: false,
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
    name: 'timeline-things',
    component: () => import('./view/timeline/things'),
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
    name: 'word',
    component: () => import('./view/word'),
    meta: {
      title: '📕 单词本'
    }
  },
  {
    name: 'home',
    component: () => import('./view/home'),
    meta: {
      title: 'HomePage',
      showTopNav: false,
      showBottomNav: true,
    }
  },
  {
    name: 'sleep',
    component: () => import('./view/sleep'),
    meta: {
      title: '睡了么'
    }
  },
  {
    name: 'sleep-form',
    component: () => import('./view/sleep/form'),
    meta: {
      title: '记录睡眠'
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
