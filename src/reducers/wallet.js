import { SAVE_CURRENCIES, SAVE_EXPENSES, GET_ALL_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  total: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_ALL_CURRENCIES:
    return {
      ...state,
      currencies: action.payload.filter((currencie) => currencie !== 'USDT'),
    };
  case SAVE_CURRENCIES:
    return { ...state,
      currencies: Object.keys(action.payload.exchangeRates)
        .filter((currency) => currency !== 'USDT') };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      total: parseFloat(state.total) + (parseFloat(action.payload
        .value) * parseFloat(action.payload.exchangeRates[action.payload.currency].ask)),
    };
  default: return state;
  }
};

export default wallet;

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseFloat

// algumas dúvidas retiradas no slack: https://trybecourse.slack.com/archives/C0320DL79QS/p1656798292263889
