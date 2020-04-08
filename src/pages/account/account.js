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
              <BarChart/>
            </div>
            
            <Save/>

            </>
        );
    }
}
export default Account; 