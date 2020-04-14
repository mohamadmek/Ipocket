import React, {Component} from 'react';
import "./AccountBalance.css"
import Income from '../../pages/income';
import {Route} from 'react-router-dom';


class AccountBalance extends Component {
    constructor(){
        super();
        this.state = {
        }
      }    
    render() {
        return (
              <div className="accountBalance_div">
                <div id="accuntBalance_circle">
                  <p className="accountBalance_p_amount">
                    {this.props.wholeIncome - this.props.wholeExpense } LBP
                    {/*user table to take the chosen currency */}
                   </p>
                  <div class="accountBalance_income">
                    <button className="accountBalance_button" onClick={()=>window.location = '#/income'}>
                      <i class="fa fa-angle-double-left" aria-hidden="true" id="accountBalance_income_i"></i>
                    </button>
                  </div>
                  <div className="accountBalance_p_income">
                    <button className="accountBalance_button" onClick={()=>window.location = '#/income'}>
                      <p className="accountBalance_p_income_p">Income</p>
                    </button>
                  </div>
                  <div className="accountBalance_expense">
                    <button onClick={()=>window.location='#/expense'} className="accountBalance_button">
                      <i class="fa fa-angle-double-left" aria-hidden="true" id="accountBalance_expense_i" ></i>
                    </button>
                  </div>
                  <div className="accountBalance_p_expense">
                    <button className="accountBalance_button" onClick={()=>window.location='#/expense'}>
                      <p className="accountBalance_p_expense_p">Expense</p>
                    </button>
                  </div>
                </div>
              </div>
        );
    }
}
export default AccountBalance; 