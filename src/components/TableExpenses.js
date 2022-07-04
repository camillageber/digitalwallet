import React from 'react';
import { connect } from 'react-redux';
import infoTable from './infoTable';

class TableExpenses extends React.Component {
  render() {
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
        </table>
      </div>
    );
  }
}

// https://www.w3schools.com/tags/tag_thead.asp
// https://www.w3schools.com/tags/tag_tr.asp

export default connect()(TableExpenses);
