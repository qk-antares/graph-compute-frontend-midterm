export default [
  { path: '/motif', name: '图模体', component: './Motif/Motif' },
  { path: '/sim', name: '图相似度', component: './Sim/Sim' },
  { path: '/ged', name: '图编辑路径', component: './Ged/Ged' },
  { path: '/', redirect: '/motif' },
  { path: '*', layout: false, component: './404' },
];
