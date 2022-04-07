import React from 'react';
import WalletHeader from '../components/WalletHeader';
import Form from '../components/Form';
import Tables from '../components/Tables';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <WalletHeader />
        <Form />
        <Tables />
      </div>
    );
  }
}

export default Wallet;
