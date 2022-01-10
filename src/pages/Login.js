import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateButton = this.validateButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  validateButton() {
    const { email, password } = this.state;
    const passwordMin = 6;
    if (email.includes('@') && email.includes('.com') && password.length >= passwordMin) {
      return false;
    }
    return true;
  }

  handleClick() {
    const { dispatch, history } = this.props;
    dispatch(loginAction(this.state));
    history.push('/carteira');
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <input
          id="email"
          type="text"
          data-testid="email-input"
          onChange={ this.handleChange }
          name="email"
        />

        <input
          id="password"
          type="password"
          data-testid="password-input"
          onChange={ this.handleChange }
          name="password"
        />
        <button
          type="button"
          disabled={ this.validateButton() }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>);
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
