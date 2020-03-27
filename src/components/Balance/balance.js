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
                    <p className="title-balance">{this.props.desc==="income"?"Income":"Expense"}</p>
                    <div className={this.props.desc==="income"?"green":"red"} style={{fontSize: '27px'}}>
                      <p>LBP 150</p>
                    </div>
                    <div className={this.props.desc==="income"?"red":"green"} style={{ fontSize: '19px'}}>
                      LBP 200
                    </div>
                  </div>
                </div>
        );
    }
}
export default balance; 