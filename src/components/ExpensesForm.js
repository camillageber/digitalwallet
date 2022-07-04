import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveExpenses, fetchExpensesThunk } from '../actions';

class WalletForm extends React.Component {
  state = {
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  }

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(fetchExpensesThunk(saveExpenses, { ...this.state }));
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: 0,
      description: '',
    }));
  }

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

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
