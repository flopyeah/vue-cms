import Login from '../views/Login'
import Password from '../views/Password'

const routesFront = [
  {
    path: '/front',
    name: 'Front',
    component: Login,
    meta: {
      layout: 'AuthLayout'
    }
  },
  {
    path: '/index',
    name: 'Index',
    component: Password,
    meta: {
      layout: 'AuthLayout'
    }
  }
]

export default routesFront
