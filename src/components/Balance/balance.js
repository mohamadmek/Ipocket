import React, {Component} from 'react';
import "./balance.css"


class balance extends Component {
    constructor(props){
        super(props);
        this.state = {
          sumExpense: '',
          sumIncome: '',
        }
      }

    sumExpense = () => {
      const expenseArr = this.props.transactions.filter(type => type.type == 'expense' );
      expenseArr.map(amount => (
        this.state.sumExpense += amount.amount
      ));
      return this.state.sumExpense;
    }

    sumIncome = () => {
      const expenseArr = this.props.transactions.filter(type => type.type == 'mo' );
      expenseArr.map(amount => (
        this.state.sumIncome += amount.amount
      ));
      return this.state.sumIncome;
    }

    // componentDidMount = () => {
    //   this.sumExpense();
    // }

    render() {
        return (
                <div id="balance_div">
                  <div className="balance_inner" id={this.props.desc!=="income"?"balance_except":""}>
                    <p className="title-balance">{this.props.desc==="income"?"Income":"Expense"}</p>
                    <div className={this.props.desc==="income"?"green":"red"} style={{fontSize: '27px'}}>
                      <p>LBP {this.props.desc==="expense" ? this.sumExpense() : this.sumIncome()}</p>
                    </div>
                    <div className={this.props.desc==="income"?"red":"green"} style={{ fontSize: '19px'}}>
                    {this.props.desc==="income" ? this.sumExpense() : this.sumIncome()}
                    </div>
                  </div>
                </div>
        );
    }
}
export default balance; 