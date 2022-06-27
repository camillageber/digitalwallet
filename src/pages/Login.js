import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveLogin } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isBtnDisabled: true,
  }

  // fonte: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  checkingEmailValue = () => {
    const { email, password } = this.state;
    const emailForm = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const MIN_LENGTH = 6;

    if (email.match(emailForm) && password.length >= MIN_LENGTH) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.checkingEmailValue());
  }

  submitLogin = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(saveLogin(email));
    history.push('/carteira');
  }

  render() {
    const { email, password, isBtnDisabled } = this.state;

    return (
      <form>
        <input
          onChange={ this.handleChange }
          name="email"
          value={ email }
          type="email"
          data-testid="email-input"
        />
        <input
          onChange={ this.handleChange }
          name="password"
          value={ password }
          type="password"
          data-testid="password-input"
          placeholder="alguem@alguem.com"
        />
        <button
          type="button"
          disabled={ isBtnDisabled }
          onClick={ this.submitLogin }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
