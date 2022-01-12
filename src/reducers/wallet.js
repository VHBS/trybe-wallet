// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE_2 = {
  isFetching: false,
  currencies: [],
  expenses: [],
  valorTotal: 0,
  isEditing: false,
  itemEditing: {},
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
      valorTotal: Number(state.valorTotal) + (Number(action.expenses.value)
        * Number(action.exchangeRates[action.expenses.currency].ask)),
      expenses: [...state.expenses,
        { ...action.expenses,
          value: action.expenses.value,
          exchangeRates: action.exchangeRates }],
      isFetching: false,
    };
  case 'DELETE_ACTION':
    return {
      ...state,
      expenses: action.deletedItem,
      valorTotal: Number(state.valorTotal) - Number(action.valueDeletedItem),
      testando: action.valueDeletedItem,
    };
  case 'EDITING_ACTION':
    return {
      ...state,
      isEditing: true,
      itemEditing: { objeto: action.itemEditing,
        indice: action.indiceItem,
      },
    };
  case 'EDIT_DONE_ACTION':
  {
    const newExpenses = state.expenses.map((expense) => {
      if (expense.id === action.itemEditado.id) {
        return action.itemEditado;
      }
      return expense;
    });
    return {
      ...state,
      isEditing: false,
      expenses: newExpenses,
    }; }
  default:
    return state;
  }
}
