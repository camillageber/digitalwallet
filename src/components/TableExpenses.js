import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import infoTable from './infoTable';
import cambio from '../services/cambio';

class TableExpenses extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              {infoTable.map((info, index) => (
                <th key={ `${info}-${index}` }>{info}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenses.map(
              ({
                id,
                description,
                tag,
                method,
                value,
                currency,
                exchangeRates,
              }) => (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{cambio(currency)}</td>
                  <td>
                    {Number(exchangeRates[currency].ask) > 100
                      ? Number(exchangeRates[currency].ask.replace('.', '')).toFixed(2)
                    || Number(exchangeRates[currency].ask).toFixed(2)
                      : Number(exchangeRates[currency].ask).toFixed(2)}
                  </td>
                  <td>
                    {(value * (Number(exchangeRates[currency].ask > 100
                      ? exchangeRates[currency].ask.replace('.', '')
                      : exchangeRates[currency].ask))).toFixed(2)}
                  </td>
                  <td>Real</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

// O map acima recebe uma lógica para evitar que a conta de mudança de câmbio pela api venha com o valor errado, devido ao uso de ponto depois da casa das centenas (principalmente se tratando da moeda BTC). Auxílio do colega Carlos Daniel para realizar esse exercício.
// https://www.w3schools.com/tags/tag_thead.asp
// https://www.w3schools.com/tags/tag_tr.asp
// https://www.w3schools.com/tags/tag_tbody.asp

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(TableExpenses);
