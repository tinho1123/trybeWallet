import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expenses } from '../actions';
import requestCurrencies from '../Fetch';

const ALIMENTACAO = 'Alimentação';

const INITIAL_STATE = {
  id: 0,
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: ALIMENTACAO,
};

const metodos = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const categorias = [ALIMENTACAO, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

export class Form extends Component {
  constructor() {
    super();

    this.state = {
      ...INITIAL_STATE,
      exchangeRates: {},
      keys: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleClick(forms) {
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    const apiRates = await requestCurrencies();
    this.setState({
      id: id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
      exchangeRates: apiRates,
    });
    forms({ id, value, description, currency, method, tag, exchangeRates });
  }

  async fetchApi() {
    const exchangeRates = await requestCurrencies();
    const keys = Object.keys(exchangeRates);
    this.setState({
      keys,
      exchangeRates,
    });
  }

  render() {
    const { forms } = this.props;
    const {
      keys,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <div>
        <label htmlFor="value">
          Valor:
          <input
            value={ value }
            onChange={ this.handleChange }
            type="number"
            data-testid="value-input"
            id="value"
            name="value"
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            value={ description }
            onChange={ this.handleChange }
            type="text"
            data-testid="description-input"
            id="description"
            name="description"
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            value={ currency }
            onChange={ this.handleChange }
            data-testid="currency-input"
            name="currency"
            id="currency"
          >
            {
              keys.filter((moeda) => moeda !== 'USDT')
                .map((moeda) => (
                  <option
                    key={ moeda }
                    value={ `${[moeda]}` }
                    data-testid={ [moeda] }
                  >
                    {moeda}
                  </option>))
            }
          </select>
        </label>

        <label htmlFor="method">
          Método de Pagamento:
          <select
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
            name="method"
            id="method"
          >
            {
              metodos.map((metodo) => (
                <option
                  key={ metodo }
                  value={ metodo }
                >
                  {metodo}
                </option>
              ))
            }
          </select>
        </label>

        <label htmlFor="tag">
          Categoria:
          <select
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
            name="tag"
            id="tag"
          >
            {
              categorias.map((categoria) => (
                <option
                  key={ categoria }
                  value={ categoria }
                >
                  {categoria}
                </option>
              ))
            }
          </select>
        </label>

        <button
          type="button"
          onClick={ () => this.handleClick(forms) }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  forms: (state) => dispatch(expenses(state)),
});

export default connect(null, mapDispatchToProps)(Form);

Form.propTypes = {
  forms: PropTypes.instanceOf(Object).isRequired,
};
