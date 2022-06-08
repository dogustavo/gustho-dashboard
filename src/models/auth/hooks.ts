import { useStore } from 'effector-react'
import { $auth } from './store'
import * as actions from './actions'

export function useAuth() {
  const { isAuth, token } = useStore($auth)

  return {
    isAuth,
    token,
    ...actions
  }
}
