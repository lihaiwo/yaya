export default [
  {path: '/mood',component: () => import('@/view/mood/index/index'),
    children: [
      // 基本组件
      {path: '',component: () => import('@/view/mood/index/welcome'),  name: 'welcome', meta: {title: '目录界面',},},
      {path: '/video',component: () => import('@/view/mood/video'),  name: 'video', meta: {title: '实时通讯',},},
    ]
  }
]