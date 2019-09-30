import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location: any) {
  // tslint:disable-next-line:no-invalid-this
  return (originalPush.call(this, location) as any).catch((err: any) => err)
}

export const constantRoutes: RouteConfig[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path*',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: '',
          affix: true,
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/current',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '上传成功',
      icon: ''
    },
    children: [
      {
        path: 'ktCurrent',
        component: () => import('@/views/current/kt.vue'),
        name: 'ktCurrent',
        meta: {
          title: '空调数据',
          noCache: true
        }
      },
      {
        path: 'sbCurrent',
        component: () => import('@/views/current/sb.vue'),
        name: 'sbCurrent',
        meta: {
          title: '水泵数据',
          noCache: true
        }
      },
      {
        path: 'ktEnergy',
        component: () => import('@/views/energy/kt.vue'),
        name: 'ktEnergy',
        meta: {
          title: '空调能耗',
          noCache: true
        }
      },
      {
        path: 'sbEnergy',
        component: () => import('@/views/energy/sb.vue'),
        name: 'sbEnergy',
        meta: {
          title: '水泵能耗',
          noCache: true
        },
      },
      {
        path: 'fault',
        component: () => import('@/views/abnormal/fault.vue'),
        name: 'fault',
        meta: {
          title: '故障信息',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/abnormal',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'abnormal',
        component: () => import('@/views/abnormal/abnormal.vue'),
        name: 'abnormal',
        meta: {
          title: '上传失败',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/device',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '物联网设备',
      icon: ''
    },
    children: [
      {
        path: 'activation',
        component: () => import('@/views/iot/activation.vue'),
        name: 'activation',
        meta: {
          title: '设备激活',
          noCache: true
        }
      },
      {
        path: 'registered',
        component: () => import('@/views/iot/registered.vue'),
        name: 'registered',
        meta: {
          title: '设备注册',
          noCache: true
        }
      }
    ]
  }
]

export const asyncRoutes: RouteConfig[] = [

]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()
export default router
