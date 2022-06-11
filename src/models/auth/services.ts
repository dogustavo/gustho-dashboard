import { AuthState } from './types';

export const signIn = (state: AuthState) => {
  localStorage.setItem('userToken', state.token);

  return {
    ...state,
    isAuth: state.isAuth,
    token: state.token,
  };
};

export const signOut = () => {
  localStorage.removeItem('userToken');
  window.location.reload();

  return { isAuth: false, token: '' };
};
