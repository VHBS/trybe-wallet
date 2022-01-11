// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE_2 = {
  isFetching: false,
  currencies: [],
  expenses: [],
};

export default function secondReducer(state = INITIAL_STATE_2, action) {
  switch (action.type) {
  case 'REQUEST_CURRENCY':
    return { ...state, isFetching: true };
  case 'GET_CURRENCY':
    return { ...state,
      isFetching: false,
      currencies: [...state.currencies, ...action.currencies],
    };
  case 'WALLET_ACTION':
    return {
      ...state,
      expenses: [...state.expenses,
        { ...action.expenses, exchangeRates: action.exchangeRates }],
      isFetching: false,
    };
  default:
    return state;
  }
}
