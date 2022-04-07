import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeExpenses, hideEditForm } from '../actions';

class EditForm extends Component {
  constructor(props) {
    super(props);

    const { data } = props;
    this.state = data;
  }

  eventHandler = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  }

  render() {
    const {
      data: { value, description, currency, method, tag },
      rateTypes,
      changeCost,
      delEditForm,
    } = this.props;

    return (
      <div>
        <div>

          <label htmlFor="value">
            Valor:
            <input
              type="text"
              name="value"
              id="value"
              defaultValue={ value }
              data-testid="value-input"
              onChange={ this.eventHandler }
            />
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              id="description"
              defaultValue={ description }
              data-testid="description-input"
              onChange={ this.eventHandler }
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              data-testid="currency-input"
              id="currency"
              name="currency"
              onChange={ this.eventHandler }
              defaultValue={ currency }
            >
              {
                rateTypes.filter((types) => types !== 'USDT').map((type, i) => (
                  <option
                    key={ i }
                    data-testid={ type }
                  >
                    {type}
                  </option>
                ))
              }
            </select>
          </label>

          <label htmlFor="method">
            Método de Pagamento:
            <select
              data-testid="method-input"
              id="method"
              name="method"
              onChange={ this.eventHandler }
              defaultValue={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Tag:
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              onChange={ this.eventHandler }
              defaultValue={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <button
            type="button"
            onClick={ () => {
              changeCost(this.state);
              delEditForm();
            } }
          >
            Editar despesa
          </button>
        </div>
      </div>
    );
  }
}

EditForm.propTypes = {
  changeCost: PropTypes.func.isRequired,
  data: PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  }).isRequired,
  delEditForm: PropTypes.func.isRequired,
  rateTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  rateTypes: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  changeCost: (data) => dispatch(changeExpenses(data)),
  delEditForm: () => dispatch(hideEditForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
