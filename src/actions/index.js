// Coloque aqui suas actions
import fetchApiAll from '../services/FetchApiAll';

export const SAVE_LOGIN = 'SAVE_LOGIN';
export const GET_ALL_CURRENCIES = 'GET_ALL_CURRENCIES';

export const saveLogin = (email) => ({
  type: SAVE_LOGIN,
  payload: email,
});

export const getAllCurrencies = (curencies) => ({
  type: GET_ALL_CURRENCIES,
  payload: Object.keys(curencies),
});

export const fetchCurrenciesAllThunk = () => async (dispach) => {
  const resultApi = await fetchApiAll();
  dispach(getAllCurrencies(resultApi));
};
