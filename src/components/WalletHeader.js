import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletHeader extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">
          {
            total.reduce((acc, cur) => {
              const rateObj = Object.values(cur.exchangeRates)
                .find((rate) => rate.code === cur.currency);

              return acc + Number(rateObj.ask) * Number(cur.value);
            }, 0).toFixed(2)
          }
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

WalletHeader.propTypes = ({
  email: PropTypes.string.isRequired,
  total: PropTypes.arrayOf(PropTypes.object).isRequired,
});

const mapStateToProps = (state) => ({
  email: state.user.email.email,
  total: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletHeader);
