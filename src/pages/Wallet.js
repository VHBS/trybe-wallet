import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrency, walletAction, fetchCurrencyDidMount } from '../actions/index';
import ExpensesTable from '../components/ExpensesTable';
import InputForm from '../components/InputForm';
import InputFormEditing from '../components/InputFormEditing';

const alimentacao = 'Alimentação';

class Wallet extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.reduceMassa = this.reduceMassa.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencyMount } = this.props;
    fetchCurrencyMount();
  }

  handleChange({ target: { id, value } }) {
    this.setState({
      [id]: value,
    });
  }

  handleClick() {
    const { value, description, currency } = this.state;
    if (value !== '' && description !== '' && currency !== '') {
      const { fatchDispatch } = this.props;
      let { id } = this.state;
      fatchDispatch(this.state);
      this.setState({
        id: id += 1,
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: alimentacao,
      });
    }
  }

  reduceMassa() {
    const { walletState: { expenses } } = this.props;
    if (expenses.length > 0) {
      return expenses.reduce((acc, curr) => Number(acc)
      + (Number(curr.value)
      * Number(curr.exchangeRates[curr.currency].ask)), 0).toFixed(2);
    }
    return 0;
  }

  render() {
    const { userState, walletState: { isEditing } } = this.props;
    // console.log(this.props);
    return (
      <div>
        <header>
          <span data-testid="email-field">
            {
              userState.email
            }
          </span>
          <span data-testid="total-field">
            { this.reduceMassa() }
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </header>
        {isEditing ? (<InputFormEditing />) : <InputForm />}
        {/* <form>
          <label htmlFor="value">
            Valor da despesa
            <input
              type="number"
              onChange={ this.handleChange }
              id="value"
              data-testid="value-input"
              value={ value }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              type="text"
              onChange={ this.handleChange }
              id="description"
              data-testid="description-input"
              value={ description }
            />
          </label>
          <label htmlFor="currency">
            Moeda referente a despesa
            <select
              id="currency"
              onChange={ this.handleChange }
              data-testid="currency-input"
              value={ currency }
            >
              {currencies.map((moeda, indice) => (
                <option
                  key={ moeda + indice }
                  value={ moeda }
                  data-testid={ moeda }
                >
                  {moeda}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Forma de pagamento
            <select
              id="method"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tipo de despesa
            <select
              id="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
            >
              {categoryTag.map((item) => (
                <option key={ item } value={ item }>{item}</option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form> */}
        <ExpensesTable />
      </div>
    );
  }
}

Wallet.propTypes = {
  userState: PropTypes.shape({
    email: PropTypes.string,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  userState: state.user,
  walletState: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencyMount: () => dispatch(fetchCurrencyDidMount()),
  fatchDispatch: (state) => dispatch(fetchCurrency(state)),
  walletDispatch: (state) => dispatch(walletAction(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
