export default [
  {path: '/mood',component: () => import('@/view/layout/index/base'),
    children: [
      // 基本组件
      {path: '',component: () => import('@/view/mood/index'),  name: 'welcome', meta: {title: '目录界面',},},
      {path: '/video',component: () => import('@/view/video/index'),  name: 'video', meta: {title: '实时通讯',},},
    ]
  }
]