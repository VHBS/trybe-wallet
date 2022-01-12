import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrency, walletAction, fetchCurrencyDidMount } from '../actions/index';

const alimentacao = 'Alimentação';

class InputForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  render() {
    const categoryTag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { walletState: { currencies } } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
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
      </form>
    );
  }
}

InputForm.propTypes = {
  fatchDispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  walletState: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencyMount: () => dispatch(fetchCurrencyDidMount()),
  fatchDispatch: (state) => dispatch(fetchCurrency(state)),
  walletDispatch: (state) => dispatch(walletAction(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);
