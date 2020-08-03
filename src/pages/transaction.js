import React, { Component } from 'react';
import Filter from '../components/Filter/Filter';
import Trans from '../components/TransComponent/TransComponent';

class Transaction extends Component {
  constructor() {
    super();
    this.state = {};
  }

 

  render() {
    return (
      <div>
        {localStorage.getItem('token')==null?window.location='#/':
                <>
        <Filter dateFrom={this.props.dateFrom} dateTo={this.props.dateTo} handleFrom={this.props.handleFrom} transactions={this.props.transactions} />
        <br></br>
        {this.props.transactions.map((transaction) => (
          <Trans
            transaction={transaction}
            deleteCategories={this.props.deleteCategories}//yes
            ChangeEditCatModelDB={this.props.ChangeEditCatModelDB}
          />
        ))}
        </>
  }
      </div>
    );
  }
}
export default Transaction;
