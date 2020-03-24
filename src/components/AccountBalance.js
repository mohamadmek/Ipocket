import React, {Component} from 'react';
import styled from 'styled-components';


class AccountBalance extends Component {
    constructor(){
        super();
        this.state = {
        }
      }
      Description = styled.div`
      overflow-y: hidden;
      display: flex;
      justify-content: center;
      margin-bottom: 4rem;
      #circle {
        border-radius: 50%;
        width:18rem;
        height:18rem;
        border: 10px solid rgb(95, 113, 132);
        }
      .p_amount{
        font-size:2.7rem;
        position: relative;
        display: flex;
        justify-content: center;
        top: 35%;
        color:rgb(95, 113, 132);
      }
       .income {
          transform: rotate(80deg);
          position: relative;
          top:9rem;
          right:5.8rem;
       }
       .p_income{
         font-size:1.4rem;
         color:#16a085;
         transform:rotate(65deg);
         position:relative;
         top: 8.4rem;
         right: 3.3rem;
        }
        .expense {
          transform: rotate(95deg);
          position: relative;
          left: 6.5rem;
          top: 3.5rem;
       }
       .p_expense{
        font-size:1.4rem;
        transform:rotate(300deg);
        position:relative;
        left: 8.5rem;
        bottom: 7.5rem;
       }
       `;    
    render() {
        return (
          <>
              <this.Description>
              <div id="circle">
                <p className="p_amount">600 LBP</p>
              <div class="income">
                <i class="fa fa-angle-double-left" aria-hidden="true" style={{fontSize:'3rem',color:'#16a085'}}></i>
                </div>
                <p className="p_income">Income</p>
              <div class="expense">
                <i class="fa fa-angle-double-left" aria-hidden="true" style={{fontSize:'3rem',color:'rgb(209,0,0)'}}></i>
                </div>
                <p className="p_expense" style={{color:'rgb(209,0,0)'}}>Expense</p>
                </div>
              </this.Description>
          </>
        );
    }
}
export default AccountBalance; 