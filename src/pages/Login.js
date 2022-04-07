import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.userValidate = this.validateUser.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm(event) {
    event.preventDefault();
    const { loginDispatch, history } = this.props;
    const { email } = this.state;
    loginDispatch(email);
    history.push('/carteira');
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  validateUser(email, password) {
    const PASSWORD_MAX_LENGTH = 6;
    return (
      email.includes('@') && email.endsWith('.com')
      && password.length >= PASSWORD_MAX_LENGTH
    );
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form onSubmit={ this.onSubmitForm }>
          <label htmlFor="email-input">
            Login:
            <input
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="email-input"
              id="email-input"
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
              data-testid="password-input"
              id="password-input"
            />
          </label>
          <button
            type="submit"
            disabled={ !this.validateUser(email, password) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (email) => dispatch(userLogin({ email })),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Login.propTypes = {
  history: PropTypes.shape([]),
  loginDispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
