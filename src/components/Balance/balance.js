import React, {Component} from 'react';
import "./balance.css"


class balance extends Component {
    constructor(props){
        super(props);
        this.state = {
          sumExpense: 0,
          sumIncome: 0,
        }
      }

    sumExpense = () => {
      let sumExpense = 0;
      const expenseArr = this.props.transactions.filter(type => type.type == 'expense' );
      expenseArr.map(amount => (
        sumExpense += parseFloat(amount.amount)
      ));
      this.setState({
        sumExpense: parseFloat(sumExpense)
      })
    }

    sumIncome = () => {
      let sumIncome = 0;
      const expenseArr = this.props.transactions.filter(type => type.type == 'income' );
      expenseArr.map(amount => (

        sumIncome += parseFloat(amount.amount)
      ));
      
      this.setState({
        sumIncome: parseFloat(sumIncome)
      })
    }

    componentDidMount = () => {
      this.sumExpense();
      this.sumIncome();
    }

    render() {
        return (
                <div id="balance_div">
                  <div className="balance_inner" id={this.props.desc!=="income"?"balance_except":""}>
                    <p className="title-balance">{this.props.desc==="income"?"Income":"Expense"}</p>
                    <div className={this.props.desc==="income"?"green":"red"} style={{fontSize: '27px'}}>
                      <p>LBP {this.props.desc==="expense" ? this.state.sumExpense : this.state.sumIncome}</p>
                    </div>
                    <div className={this.props.desc==="income"?"red":"green"} style={{ fontSize: '19px'}}>LBP { this.props.desc==="income" ? this.state.sumExpense : this.state.sumIncome}
                    </div>
                  </div>
                </div>
        );
    }
}
export default balance; 