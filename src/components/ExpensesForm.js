import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExpensesThunk } from '../actions';
import fetchApiAll from '../services/FetchApiAll';

class ExpensesForm extends React.Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
    exchangeRates: null,
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  }

  // https://www.horadecodar.com.br/2020/12/11/remover-propriedade-de-objeto-javascript/
  // Auxílio nos requisitos 6, 7 e 8 do colega Carlos Daniel na sala de estudos.
  handleClick = async () => {
    const { findTotal } = this.props;

    const fetchCurrencies = await fetchApiAll();
    delete fetchCurrencies.USDT;

    this.setState({ exchangeRates: fetchCurrencies }, () => {
      const { fetchExpenses } = this.props;
      fetchExpenses(this.state);
      this.setState((previousState) => ({
        id: previousState.id + 1,
        value: '',
        description: '',
      }));
    });

    findTotal();
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor
            <input
              data-testid="value-input"
              id="value"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>

          <label htmlFor="description">
            Descrição
            <input
              data-testid="description-input"
              id="description"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>

          <label htmlFor="currency">
            Moeda
            <select id="currency" onChange={ this.handleChange } value={ currency }>
              {currencies.map((currencie, index) => (
                <option key={ `${currencie}-${index}` }>{currencie}</option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            Método de pagamento
            <select
              data-testid="method-input"
              id="method"
              onChange={ this.handleChange }
              value={ method }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Categoria
            <select
              data-testid="tag-input"
              id="tag"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchExpenses: (state) => dispatch(fetchExpensesThunk(state)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

ExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchExpenses: PropTypes.func.isRequired,
  findTotal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
