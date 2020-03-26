import React, {Component} from 'react';
import Circle from "../CircleP/CircleP.js";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import "./Save.css";

class Save extends Component {
    constructor(){
        super();
        this.state = {
          signStatus : true,
          date:false,
          value:[]
        }
      }

/*     handle=(e)=>{
      e.preventDefault();
      this.setState({date:true});
    } */
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

    regex=(e)=>{
      const re = /^[0-9]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
         this.setState({value: e.target.value});
      }
    }




    render() {
        return (
              <div className="save_div">
              <br></br>
              <p className="save_div" >Save</p>
              <div className="save-wrapper">
                <Circle/>
                <form className="form-save"  className="save_div_form">
                  <label for="username" className="save_div_label">Saving Amount</label> 
                  <input
                   className="save_div_input" 
                    name="username"
                    onSelect={(e)=>{e.preventDefault()}}
                    type="numeric"
                    min="1"
                    value={this.state.value}
                    onChange={this.regex}
                    required pattern="[0-9]+"
                    style={{width:'100%'}} 
                  />
                  <label for="password" className="save_div_label">Date</label>
                  <input
                    name="zc"
                    className="save_div_input"
                    type="date" 
                    name="password"
                    style={{width:'100%'}}
                   /*  id={this.state.date?
                      document.getElementsByName('zs').value===""?
                      "save_exception":"":"save_exception"} 
                      onSelect={this.handle} */
                  />
                  <div className="save_div2">
                    <div style={{display:'flex'}}>
                      <input type="radio" name="radio_name" style={{cursor:"pointer"}}/>
                      <label className="save_div2_label">Montly</label>
                    </div>
                    <div style={{display:'flex'}}>
                      <input type="radio" name="radio_name" style={{cursor:"pointer",  marginLeft: '9px'}}/>
                      <label  className="save_div2_label">Weekly</label>
                    </div>
                  </div>
                    <button className="save_div_button" onClick={this.submit}>Save</button>
                </form>
              </div>
              </div>
        );
    }
}
export default Save; 