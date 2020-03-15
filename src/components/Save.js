import React, {Component} from 'react';
import styled from 'styled-components';
import Circle from "./CircleP.js";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'


class Save extends Component {
    constructor(){
        super();
        this.state = {
          signStatus : true,
          date:false
        }
      }
      Description = styled.div`
      padding:0rem 5rem 5rem 2rem ;
      max-width: 100%;
      overflow-x: hidden;
      .xx{
        color:transparent;
      }`;

      Input = styled.input`
      background: none;
      border-top: none;
      border-right: none;
      border-left: none;
      border-color: #16a085;
      font-size: 14px;
      margin-top: 0px;
      padding-right: 50%;
      margin-bottom: 2rem;
    }`;

    SignUpButton = styled.button`
      padding: 10px 40px;
      border-radius: 50px;
      background-color: #16a085;
      border: none;
      margin-top: 20px;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
    `;

    handle=(e)=>{e.preventDefault();
      this.setState({date:true});
    }
    submit = (e) => {
      e.preventDefault();
      confirmAlert({
        title: 'Confirm to Save',
        message: 'Are you sure to save this amount.',
        buttons: [
          {
            label: 'Yes',
             /* onClick: () => alert('Click Yes') */
          },
          {
            label: 'No',
            /* onClick: () => alert('Click No') */
          }
        ]
      })
    };



    render() {
        return (
            <>
              <this.Description>
              <br></br>
              <p style={{color: 'rgb(95, 113, 132)', fontWeight: 'bold', fontSize:'45px'}}>Save</p>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <Circle/>
                <form style={{width: "50%", marginTop:'2rem'}}>
                  <label for="username" style={{display:"block", color:'rgb(95, 113, 132)',fontWeight: 'bold', fontSize:'20px'}}>Saving Amount</label> 
                  <this.Input 
                    name="username"
                    onSelect={(e)=>{e.preventDefault()}}
                  />
                  <label for="password" style={{display:"block", color:'rgb(95, 113, 132)',fontWeight: 'bold', fontSize:'20px'}}>Date</label>
                  <this.Input 
                    type="date" 
                    name="password"
                    style={{width:'28rem'}} 
                    id='zs' 
                    className={this.state.date?
                      document.getElementById('zs').value===""?
                      "xx":"":"xx"} 
                      onSelect={this.handle}
                  />
                  <div style={{color: '#ccc', fontWeight: 'bold',display:'flex',justifyContent:'space-between',width:'30%'}}>
                    <div style={{display:'flex'}}>
                      <input type="radio" name="radio_name" style={{cursor:"pointer"}}/>
                      <label style={{display:"block", color:'rgb(95, 113, 132)',fontWeight: 'bold', fontSize:'15px'}}>Montly</label>
                    </div>
                    <div style={{display:'flex'}}>
                      <input type="radio" name="radio_name" style={{cursor:"pointer"}}/>
                      <label  style={{display:"block", color:'rgb(95, 113, 132)',fontWeight: 'bold', fontSize:'15px'}}>Weekly</label>
                    </div>
                  </div>
                    <this.SignUpButton onClick={this.submit}>Save</this.SignUpButton>
                </form>
              </div>
              </this.Description>
          </>
        );
    }
}
export default Save; 