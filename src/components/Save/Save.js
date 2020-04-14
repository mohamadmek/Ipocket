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
          value:[],
          currentDate:"",
          end_date:"",
          interval:""
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
              onClick: () => this.calculate()
          },
          {
            label: 'No',
          }
        ]
      })
    };

    regex=(e)=>{
      const re = /^[0-9]+$/;
      if (e.target.value.length===0 || re.test(e.target.value)) {
         this.setState({value: e.target.value});
      }
    }

    calculate=()=>{
      if(this.props.wholeExpense != undefined && this.props.wholeIncome != undefined){
        let total=parseFloat(this.props.wholeIncome) - parseFloat(this.props.wholeExpense);
        let monthnumber=-1;
        let date= this.state.currentDate;
        if (this.state.interval == 30){
          while(new Date(date).getTime() <= new Date(this.state.end_date)){
            monthnumber += 1;
            date=new Date(date);
            date.setMonth(date.getMonth()+1);
          }
        }
        else{
          while(new Date(date).getTime() <= new Date(this.state.end_date)){
            monthnumber += 1;
            date=new Date(date);
            date.setDate(date.getDate() + 7);
          }
        }
        let saving= this.state.value / monthnumber;
        if(total<=0 || total<saving){
          alert("sorry you don't have enough money ")
          this.setState({interval:"", end_date:"", value:[]})
        }
         else{
           this.props.SavingInsert(this.state.value, this.state.end_date, this.state.interval);
           this.setState({interval:"", end_date:"", value:[]})

        } 
      }

    }

    componentDidMount=()=>{
      this.setState({currentDate: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()})


    }


    render() {
        return (
              <div className="save_div">
              <br></br>
              <p className="save_div" >Save</p>
              <div className="save-wrapper">
                <Circle transactions={this.props.transactions} />
                <form className="form-save"  className="save_div_form">
                  <label for="username" className="save_div_label">Saving Amount</label> 
                  <input
                   className="save_div_input" 
                    name="username"
                    onSelect={(e)=>this.setState({value: e.target.value})}
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
                    value={this.state.end_date}
                    onChange={e=> this.setState({end_date: e.target.value})}
                   // min={this.state.currentDate.toString()}
                  />
                  <div className="save_div2">
                    <div style={{display:'flex'}}>
                      <input type="radio" name="radio_name" style={{cursor:"pointer"}} onChange={e=> this.setState({interval:30})}/>
                      <label className="save_div2_label">Montly</label>
                    </div>
                    <div style={{display:'flex'}}>
                      <input type="radio" name="radio_name" style={{cursor:"pointer",  marginLeft: '9px'}} onChange={e=> this.setState({interval:7})}/>
                      <label  className="save_div2_label">Weekly</label>
                    </div>
                  </div>
                    <button className="save_div_button" onClick={e => this.submit(e)}>Save</button>
                </form>
              </div>
              </div>
        );
    }
}
export default Save; 