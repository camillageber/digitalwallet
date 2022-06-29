import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesAllThunk } from '../actions';
import ExpensesForm from '../components/ExpensesForm';

class Wallet extends React.Component {
  componentDidMount() {
    const { getAllCurrencies } = this.props;
    getAllCurrencies();
  }

  render() {
    const { email, currencies } = this.props;

    return (
      <div>
        <header>
          <h3 data-testid="email-field">
            { email }
          </h3>
          <p data-testid="total-field">
            0
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </header>
        <main>
          <ExpensesForm currencies={ currencies } />
        </main>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getAllCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getAllCurrencies: () => {
    dispatch(fetchCurrenciesAllThunk());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
