import React from 'react';
import PropTypes from 'prop-types';

class ExpensesForm extends React.Component {
  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="expenses">
          Despesas:
          <input
            id="expenses"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="coin">
          Moeda:
          <select id="coin">
            {currencies.map((currencie) => (
              <option key={ currencie }>{currencie}</option>
            ))}

          </select>
        </label>
        <label htmlFor="payment">
          Pagamento:
          <select id="payment" data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select id="tag" data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

ExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ExpensesForm;
