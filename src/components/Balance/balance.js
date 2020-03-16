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
            <>
              
              <div id="balance_div">
                  <div className="balance_inner">
                      <p>{this.props.desc==="income"?"Income":"Expence"} : </p>
                      <div className="p_balance_inner">
                      <p>150 LBP</p>
                          <p>50 EURO</p>
                      </div>
                  </div>
                  <div className="balance_inner_inner">
                  <p>{this.props.desc!=="income"?"Income":"Expence"} : </p>
                      <div className="p_balance_inner_inner">
                      <p >50 LBP</p>
                         <p>10 EURO</p>
                      </div>
                  </div>
                </div>
             
          </>
        );
    }
}
export default balance; 