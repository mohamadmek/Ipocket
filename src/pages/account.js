import React, {Component} from 'react';
import styled from 'styled-components';
import BarChart from "../components/barchart";
import Save from "../components/Save";
import Balance from "../components/AccountBalance";



class Account extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
      }
      Description = styled.div`
      display:flex;
      justify-content: space-between;
      margin-left:1rem`;
  
      handle=()=>{
        let a=new Date().getMonth()+1;
        let b=new Date().getDate()+"/"+a+"/"+new Date().getFullYear();
        return b;
      }
 
    render() {
        return (
            <>
            <this.Description>
            <p style={{color: 'rgb(95, 113, 132)', fontWeight: 'bold', fontSize:'45px'}}>Account</p>
            <p style={{color: 'rgb(95, 113, 132)', fontWeight: 'bold', fontSize:'45px'}}>{this.handle()}</p>
            </this.Description>
            <br></br>
            <Balance/> 
            <BarChart />
            <Save/>

            </>
        );
    }
}
export default Account; 