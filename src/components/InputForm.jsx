import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrency, walletAction,
  fetchCurrencyDidMount, editDoneAction } from '../actions/index';

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
    this.handleClickEdited = this.handleClickEdited.bind(this);
    this.checkEditing = this.checkEditing.bind(this);
    this.checkNotEditing = this.checkNotEditing.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { walletState: { isEditing } } = this.props;
    if (isEditing !== prevProps.walletState.isEditing
      && isEditing === true) {
      this.checkEditing();
    } else if (isEditing !== prevProps.walletState.isEditing
      && isEditing === false) {
      this.checkNotEditing();
    }
  }

  checkEditing() {
    const { walletState: { itemEditing: { objeto } } } = this.props;
    this.setState({
      id: objeto.id,
      value: objeto.value,
      description: objeto.description,
      currency: objeto.currency,
      method: objeto.method,
      tag: objeto.tag,
      exchangeRates: objeto.exchangeRates,
    });
  }

  checkNotEditing() {
    this.setState({
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
    });
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

  handleClickEdited() {
    const { editDoneDispatch } = this.props;
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    const itemEditado = {
      id, value, description, currency, method, tag, exchangeRates };
    editDoneDispatch({ itemEditado });
  }

  render() {
    const categoryTag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { walletState: { currencies, isEditing } } = this.props;
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
        {isEditing ? (
          <button
            type="button"
            onClick={ this.handleClickEdited }
          >
            Editar despesa
          </button>)
          : (
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Adicionar despesa
            </button>)}
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
  editDoneDispatch: (state) => dispatch(editDoneAction(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);
