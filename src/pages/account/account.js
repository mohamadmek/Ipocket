import React, {Component} from 'react';
import BarChart from "../../components/Barchart/barchart";
import Save from "../../components/Save/Save";
import Balance from "../../components/AccountBalance/AccountBalance";
import "./account.css"



class Account extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
      }
 
    render() {
        return (
          localStorage.getItem('token')==null?window.location='#/':
            <>
            <div className="account_div">
            <p className="account_div_p">Account</p>
            <p className="account_div_p">{this.props.date}</p>
            </div>
            <br></br>
            <div className="account_div2">
              <Balance 
                totalExpense={this.props.totalExpense}
                totalIncome={this.props.totalIncome}
                />
              <BarChart
                 transactions={this.props.transactions} 
                 />
            </div>
            
            <Save 
                 totalExpense={this.props.totalExpense}
                 totalIncome={this.props.totalIncome}
                SavingInsert={this.props.SavingInsert}
                transactions={this.props.transactions} 
                />

            </>
        );
    }
}
export default Account; 