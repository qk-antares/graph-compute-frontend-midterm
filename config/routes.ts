export default [
  { path: '/home', hideInMenu: true, component: './Home' },
  { path: '/', redirect: '/home' },
  { path: '*', layout: false, component: './404' },
];
