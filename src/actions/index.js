// Coloque aqui suas actions

export function requestCurrency() {
  return { type: 'REQUEST_CURRENCY' };
}

export function loginAction({
  email,
}) {
  return { type: 'LOGIN_ACTION',
    email,
  };
}

export function walletAction({ exchangeRates, expenses }) {
  return { type: 'WALLET_ACTION',
    expenses,
    exchangeRates,
  };
}

export function currencyAction({ currencies }) {
  return { type: 'GET_CURRENCY',
    currencies,
  };
}

export function deleteAction({ deletedItem, valueDeletedItem }) {
  return { type: 'DELETE_ACTION',
    deletedItem,
    valueDeletedItem,
  };
}

export function editAction({ itemEditing, indiceItem }) {
  return { type: 'EDITING_ACTION',
    itemEditing,
    indiceItem,
  };
}

export function editDoneAction({ itemEditado }) {
  return { type: 'EDIT_DONE_ACTION',
    itemEditado,
  };
}

export function fetchCurrency(expenses) {
  return async (dispatch) => {
    dispatch(requestCurrency());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        delete data.USDT;
        return dispatch(walletAction({ expenses, exchangeRates: data }));
      });
  };
}

export function fetchCurrencyDidMount() {
  return async (dispatch) => {
    dispatch(requestCurrency());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        delete data.USDT;
        const keysData = Object.keys(data);
        return dispatch(currencyAction({ currencies: keysData }));
      });
  };
}
