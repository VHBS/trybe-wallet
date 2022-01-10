// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE_1 = {
  email: '',
};

export default function firstReducer(state = INITIAL_STATE_1, action) {
  switch (action.type) {
  case 'LOGIN_ACTION':
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}
