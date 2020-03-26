import React, {Component} from 'react';
import BarChart from "../../components/Barchart/barchart";
import Save from "../../components/Save";
import Balance from "../../components/AccountBalance/AccountBalance";
import "./account.css"



class Account extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
      }
      
  
      handle=()=>{
        let a=new Date().getMonth()+1;
        let b=new Date().getDate()+"/"+a+"/"+new Date().getFullYear();
        return b;
      }
 
    render() {
        return (
            <>
            <div className="account_div">
            <p className="account_div_p">Account</p>
            <p className="account_div_p">{this.handle()}</p>
            </div>
            <br></br>
            <div className="account_div2">
              <Balance/>
              <BarChart/>
            </div>
            
            <Save/>

            </>
        );
    }
}
export default Account; 