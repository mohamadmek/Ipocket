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
                      <p>LBP 150</p>
                    </div>
                    <div className="red">
                      LBP 200
                    </div>
                  </div>
                </div>
        );
    }
}
export default balance; 