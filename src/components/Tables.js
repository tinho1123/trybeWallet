import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeCost, showEditForm } from '../actions';
import EditForm from './EditForm';

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curExpenses: [],
    };
  }

  render() {
    const { costs, deleteCost, showForm, isFormEditOn } = this.props;
    const { curExpenses } = this.state;
    return (
      <div>
        { isFormEditOn && <EditForm data={ curExpenses } />}

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
            {
              costs.map((cost) => {
                const {
                  value, description, currency, method, tag, exchangeRates, id,
                } = cost;
                const rateObj = Object
                  .values(exchangeRates)
                  .find((rate) => rate.code === currency);
                return (
                  <tr key={ id }>
                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{method}</td>
                    <td>{value}</td>
                    <td>{rateObj.name.split('/')[0]}</td>
                    <td>{Number(rateObj.ask).toFixed(2)}</td>
                    <td>{(value * Number(rateObj.ask)).toFixed(2)}</td>
                    <td>{rateObj.name.split('/')[1]}</td>
                    <td>
                      <button
                        type="button"
                        data-testid="edit-btn"
                        onClick={ () => (
                          this.setState({ curExpenses: cost }, () => showForm())) }
                      >
                        Editar despesa
                      </button>
                      <button
                        data-testid="delete-btn"
                        onClick={ () => {
                          deleteCost(id);
                        } }
                        type="button"
                      >
                        X

                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  costs: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteCost: PropTypes.func.isRequired,
  isFormEditOn: PropTypes.bool.isRequired,
  showForm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  costs: state.wallet.expenses,
  isFormEditOn: state.wallet.editForm,
});

const mapDispatchToProps = (dispatch) => ({
  deleteCost: (id) => dispatch(removeCost(id)),
  showForm: () => dispatch(showEditForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
