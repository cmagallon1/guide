import auth0 from 'auth0-js'
import { apollo } from './apollo'
import {
  initAuthHelpers,
  login as auth0Login,
  logout as auth0Logout,
} from 'auth0-helpers'

const client = new auth0.WebAuth({
  domain: 'graphql.auth0.com',
  clientID: '8fErnZoF3hbzQ2AbMYu5xcS0aVNzQ0PC',
  responseType: 'token',
  audience: 'https://api.graphql.guide',
  scope: 'openid profile guide'
})

initAuthHelpers({
  client,
  usePopup: true,
  authOptions: {
    connection: 'github',
    owp: true,
    popupOptions: { height: 623 },
  },
  checkSessionOptions: {
    redirect_uri: window.location.origin
  },
  onError: e => console.error(e)
})

export const login = () => {
  auth0Login({
    onCompleted: e => {
      if (e) {
        console.error(e)
        return
      }

      apollo.reFetchObservableQueries()
    },
  })
}

export const logout = () => {
  auth0Logout()
  apollo.resetStore()

  // To delete only and specific field we can user evict and gc
  // apollo.cache.evict({ fieldName: 'currentUer' }) this one deletes the specific fieldname
  // apollo.cache.gc() this one removes all the non reachable cache objects after delete current user
}