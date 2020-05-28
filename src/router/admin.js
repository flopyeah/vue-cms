import ArticlesList from '../views/ArticlesList'
import ArticlesDetail from '../views/ArticlesDetail'
import MediasList from '../views/MediasList'
import MediasDetail from '../views/MediasDetail'
import UsersList from '../views/UsersList'
import Login from '../views/Login'
import Password from '../views/Password'
import Dashboard from '../views/Dashboard'
import Parametre from '../views/Parametre'
import TagList from '../views/TagList'
import CategoryList from '../views/CategoryList'
import NotFound404 from '../views/NotFound404'
import ArticlesAdd from '../views/ArticlesAdd'

const routesAdmin = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      layout: 'AuthLayout',
      title: 'Connexion - Login'
    }
  },
  {
    path: '/password',
    name: 'Password',
    component: Password,
    meta: {
      layout: 'AuthLayout',
      title: 'Connexion - Mot de passe oublié'
    }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      layout: 'AdminLayout',
      title: 'Dashboard'
    }
  },
  {
    path: '/articles',
    name: 'ArticlesList',
    component: ArticlesList,
    meta: {
      requiresAuth: true,
      layout: 'AdminLayout',
      title: 'Articles'
    }
  },
  {
    path: '/articles/new',
    name: 'ArticlesAdd',
    component: ArticlesAdd,
    meta: {
      requiresAuth: true,
      layout: 'AdminLayout',
      title: 'Articles'
    }
  },
  {
    path: '/articles/:id',
    name: 'ArticlesDetail',
    component: ArticlesDetail,
    meta: {
      requiresAuth: true,
      layout: 'AdminLayout',
      title: 'Articles'
    }
  },
  {
    path: '/medias',
    name: 'MediasList',
    component: MediasList,
    children: [
      {
        name: 'MediasListFolder',
        path: '/medias/folder/:id',
        component: MediasList
      }
    ],
    meta: {
      requiresAuth: true,
      layout: 'AdminLayout',
      title: 'Medias'
    }
  },
  {
    path: '/medias/:id',
    name: 'MediasDetail',
    component: MediasDetail,
    meta: {
      requiresAuth: true,
      layout: 'AdminLayout',
      title: 'Medias'
    }
  },
  {
    path: '/users',
    name: 'UsersList',
    component: UsersList,
    meta: {
      requiresAuth: true,
      layout: 'AdminLayout',
      title: 'Utilisateurs'
    }
  },
  {
    path: '/parametre',
    name: 'Parametre',
    component: Parametre,
    meta: {
      requiresAuth: true,
      layout: 'AdminLayout',
      title: 'Parametre'
    }
  },
  {
    path: '/tags',
    name: 'TagList',
    component: TagList,
    meta: {
      requiresAuth: true,
      layout: 'AdminLayout',
      title: 'Tags'
    }
  },
  {
    path: '/categories',
    name: 'CategoryList',
    component: CategoryList,
    meta: {
      requiresAuth: true,
      layout: 'AdminLayout',
      title: 'Catégories'
    }
  },
  {
    path: '*',
    name: 'NotFound404',
    component: NotFound404,
    meta: {
      layout: 'PublicLayout',
      title: 'Page non disponible'
    }
  }
]

export default routesAdmin
