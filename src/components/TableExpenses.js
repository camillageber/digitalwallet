import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import infoTable from './infoTable';

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
            {expenses.map((expenseEl, index) => (
              <tr key={ `${expenseEl.value}-${index}` }>
                <td>{expenseEl.description}</td>
                <td>{expenseEl.tag}</td>
                <td>{expenseEl.method}</td>
                <td>{parseFloat(expenseEl.value).toFixed(2)}</td>
                <td>{expenseEl.exchangeRates[expenseEl.currency].name}</td>
                <td>
                  {parseFloat(expenseEl.exchangeRates[expenseEl.currency].ask)
                    .toFixed(2)}
                </td>
                <td>
                  {(parseFloat(expenseEl.value) * parseFloat(expenseEl
                    .exchangeRates[expenseEl.currency].ask)).toFixed(2)}
                </td>
                <td>Real</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

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
