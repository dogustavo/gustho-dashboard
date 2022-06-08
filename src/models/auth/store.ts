import { createStore } from 'effector'

import { AuthState } from './types'
import * as actions from './actions'
import { signIn, signOut } from './services'

const initialStore = { isAuth: false, token: '' }

export const $auth = createStore<AuthState>(initialStore, {
  name: 'authStore'
})

$auth
  .on(actions.autorize, (state, data) => signIn({ ...state, ...data }))
  .on(actions.unautorize, () => signOut())
