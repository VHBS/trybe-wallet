// import user from './user';
// import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
import { combineReducers } from 'redux';
import firstReducer from './user';
import secondReducer from './wallet';

const rootReducer = combineReducers({ user: firstReducer, wallet: secondReducer });

export default rootReducer;
