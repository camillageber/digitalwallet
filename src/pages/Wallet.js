import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveCurrencies, fetchExpensesThunk } from '../actions';
import ExpenseForm from '../components/ExpensesForm';
import TableExpenses from '../components/TableExpenses';

class Wallet extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchExpensesThunk(saveCurrencies));
  }

  render() {
    const { email, total, currencies } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{parseFloat(total).toFixed(2)}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <ExpenseForm currencies={ currencies } />
        <TableExpenses />
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  total: wallet.total,
  currencies: wallet.currencies,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Wallet.defaultProps = {
  total: 0,
};

export default connect(mapStateToProps)(Wallet);
