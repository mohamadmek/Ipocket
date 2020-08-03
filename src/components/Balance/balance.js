import React, {Component} from 'react';
import "./balance.css"


class balance extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
      }

    render() {
        return (
                <div id="balance_div">
                  <div className="balance_inner" id={this.props.desc!=="income"?"balance_except":""}>
                    <p className="title-balance">{this.props.desc==="income"?"Income":"Expence"}</p>
                    <div className="p_balance_inner green">
                      <p>LBP
                         {/*table user to get the currency*/}
                         {this.props.desc == "expense" ? this.props.totalExpense : this.props.totalIncome}
                        </p>
                    </div>
                    <div className="red">
                      LBP {this.props.desc == "income" ? this.props.totalExpense : this.props.totalIncome}
                    </div>
                  </div>
                </div>
        );
    }
}
export default balance; 