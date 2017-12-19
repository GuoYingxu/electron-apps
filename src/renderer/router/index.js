import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pdf',
      component: require('@/components/pdf1/index').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
