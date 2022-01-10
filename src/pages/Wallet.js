import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { userState } = this.props;
    return (
      <div>
        <header>
          <span data-testid="email-field">
            {
              userState.email
            }
          </span>
          <span data-testid="total-field">
            0
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </header>
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
});

export default connect(mapStateToProps)(Wallet);
