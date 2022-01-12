import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteAction } from '../actions/index';

class ExpensesTable extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target: { id, value } }) {
    const { walletState: { expenses }, deleteDispatch } = this.props;
    const deletedItem = expenses.filter((item) => Number(item.id) !== Number(id));
    deleteDispatch({ deletedItem, valueDeletedItem: value });
  }

  render() {
    const { walletState: { expenses } } = this.props;
    // console.log(this.props);
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((item) => (
            <tr key={ item.id }>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{Number(item.value)}</td>
              <td>{item.exchangeRates[item.currency].name}</td>
              <td>{Number(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
              <td>
                {(Number(item.value)
                  * Number(item.exchangeRates[item.currency].ask)).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  data-testid="delete-btn"
                  type="button"
                  id={ item.id }
                  value={ Number(item.value)
                    * Number(item.exchangeRates[item.currency].ask) }
                  onClick={ this.handleClick }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  walletState: PropTypes.shape({
  }),
  deleteDispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  walletState: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  deleteDispatch: (state) => dispatch(deleteAction(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
