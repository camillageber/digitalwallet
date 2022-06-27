// Coloque aqui suas actions

export const SAVE_LOGIN = 'SAVE_LOGIN';

const saveLogin = (email) => ({
  type: SAVE_LOGIN,
  payload: email,
});

export default saveLogin;
