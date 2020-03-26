import React, {Component} from 'react';
import "./AccountBalance.css"


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
                  <p className="accountBalance_p_amount">600 LBP</p>
                  <div class="accountBalance_income">
                    <button>
                      <i class="fa fa-angle-double-left" aria-hidden="true" id="accountBalance_income_i"></i>
                    </button>
                  </div>
                  <p className="accountBalance_p_income">Income</p>
                  <div className="accountBalance_expense">
                    <i class="fa fa-angle-double-left" aria-hidden="true" id="accountBalance_expense_i" ></i>
                  </div>
                  <p className="accountBalance_p_expense">Expense</p>
                </div>
              </div>
        );
    }
}
export default AccountBalance; 