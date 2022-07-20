import router from '@/router'
import store from '@/store'
const Address = ['/favorate', '/rent', '/add']
// console.log(Address)
router.beforeEach((to, from, next) => {
  const isShow = !!store.state.user
  const index = Address.indexOf(to.fullPath)
  if (index !== -1 && isShow === false) {
    next('/login')
  } else {
    next()
  }
})
