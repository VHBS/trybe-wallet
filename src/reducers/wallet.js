// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE_2 = {
  currencies: [],
  expenses: [],
};

export default function secondReducer(state = INITIAL_STATE_2, action) {
  switch (action.type) {
  case 'WALLET_ACTION':
    return {
      ...state,
      currencies: action.currencies,
      expenses: action.expenses,
    };
  default:
    return state;
  }
}
