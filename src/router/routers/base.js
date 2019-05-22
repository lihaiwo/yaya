export default [
  {path: '/mood',component: () => import('@/view/layout/index/base'),
    children: [
      // 基本组件
      {path: '',component: () => import('@/view//mood/index'),  name: 'welcome', meta: {title: '目录界面',},},
    ]
  }
]