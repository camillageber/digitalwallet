// Coloque aqui suas actions
import fetchApiAll from '../services/FetchApiAll';

export const SAVE_LOGIN = 'SAVE_LOGIN';
export const GET_ALL_CURRENCIES = 'GET_ALL_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';

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

export const saveCurrencies = (payload) => ({
  type: SAVE_CURRENCIES,
  payload,
});

export const saveExpenses = (payload) => ({
  type: SAVE_EXPENSES,
  payload,
});

export const fetchExpensesThunk = (action, objWallet) => async (dispatch) => {
  try {
    const url = await fetch('https://economia.awesomeapi.com.br/json/all');
    const apiData = await url.json();
    dispatch(action({ ...objWallet, exchangeRates: apiData }));
  } catch (error) {
    console.log(error);
  }
};

// fonte: ajuda nesse requisito dos colegas na sala de estudos.
