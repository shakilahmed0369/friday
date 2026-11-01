import { createBrowserRouter } from 'react-router'
import HomePage from '../App'
import ArticlePage from '../pages/ArticlePage'
import CategoryPage from '../pages/CategoryPage'
import NotFoundPage from '../pages/NotFoundPage'
import InfoPage from '../pages/InfoPage'
import AuthPage from '../pages/AuthPage'
import Root from './Root'

export const router = createBrowserRouter([
  {
    Component: Root,
    children: [
      { path: '/', Component: HomePage },
      { path: '/category/:slug', Component: CategoryPage },
      { path: '/article/:slug', Component: ArticlePage },
      { path: '/about', Component: InfoPage },
      { path: '/editorial-policy', Component: InfoPage },
      { path: '/privacy', Component: InfoPage },
      { path: '/terms', Component: InfoPage },
      { path: '/accessibility', Component: InfoPage },
      { path: '/sign-in', Component: AuthPage },
      { path: '/register', Component: AuthPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
