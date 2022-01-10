// Coloque aqui suas actions

export function loginAction({
  email,
}) {
  return { type: 'LOGIN_ACTION',
    email,
  };
}

export function walletAction({
  currencies,
  expenses,
}) {
  return { type: 'SECOND_FORM_ACTION',
    currencies,
    expenses,
  };
}
