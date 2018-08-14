import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'feed',
      component: require('@/components/Feed').default
    },
    {
      path: '/comments/commentId',
      name: 'comments',
      component: require('@/components/Comments').default
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/components/Settings').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
