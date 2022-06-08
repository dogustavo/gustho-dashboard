import { createEvent } from 'effector'
import { AuthState } from './types'

export const autorize = createEvent<AuthState>()

export const unautorize = createEvent()
