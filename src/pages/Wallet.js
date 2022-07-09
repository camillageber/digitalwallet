import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesAllThunk } from '../actions';
import ExpenseForm from '../components/ExpensesForm';
import TableExpenses from '../components/TableExpenses';

class Wallet extends React.Component {
  state = {
    total: 0,
  }

componentDidMount = () => {
  const { fetchCurrenciesThunk } = this.props;
  fetchCurrenciesThunk();
}

  // A função abaixo recebe uma lógica para evitar que a conta de mudança de câmbio pela api venha com o valor errado, devido ao uso de ponto depois da casa das centenas (principalmente se tratando da moeda BTC). Auxílio do colega Carlos Daniel para realizar esse exercício.
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/replace
  findTotal = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, { value, exchangeRates, currency }) => {
      const sum = acc + (value * (Number(exchangeRates[currency].ask > 100
        ? exchangeRates[currency].ask.replace('.', '')
        : exchangeRates[currency].ask)));
      return sum;
    }, 0);
    this.setState({ total });
  };

  render() {
    const { email } = this.props;
    const { total } = this.state;
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{parseFloat(total).toFixed(2)}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <ExpenseForm findTotal={ this.findTotal } />
        <TableExpenses />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  // total: wallet.total,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesThunk: () => dispatch(fetchCurrenciesAllThunk()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  // currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrenciesThunk: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
