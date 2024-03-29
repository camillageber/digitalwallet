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

// export const getAllCurrencies = (curencies) => ({
//   type: GET_ALL_CURRENCIES,
//   payload: Object.keys(curencies),
// });

// export const fetchCurrenciesAllThunk = () => async (dispach) => {
//   const resultApi = await fetchApiAll();
//   dispach(getAllCurrencies(resultApi));
// };

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  payload: currencies,
});

export const saveExpenses = (payload) => ({
  type: SAVE_EXPENSES,
  payload,
});

// export const fetchExpensesThunk = (action, objWallet) => async (dispatch) => {
//   try {
//     const url = await fetch('https://economia.awesomeapi.com.br/json/all');
//     const apiData = await url.json();
//     dispatch(action({ ...objWallet, exchangeRates: apiData }));
//   } catch (error) {
//     console.log(error);
//   }
// };

export const fetchCurrenciesAllThunk = () => async (dispatch) => {
  const data = await fetchApiAll();

  dispatch(
    saveCurrencies(
      Object.keys(data).filter((currencie) => currencie !== 'USDT'),
    ),
  );
};

export const fetchExpensesThunk = (expense) => async (dispatch) => {
  await dispatch(saveExpenses(expense));
};

// Auxílio nos requisitos 6, 7 e 8 do colega Carlos Daniel na sala de estudos.
