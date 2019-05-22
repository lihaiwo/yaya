export default [
  {path: '/',component: () => import('@/view/layout/index/base'),
    children: [
      // 基本组件
      {path: '',component: () => import('@/view/welcome.vue'),  name: 'welcome', meta: {title: '目录界面',},},
    ]
  }
]