import React, {Component} from 'react';
import {CircularProgressbarWithChildren,} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./CircleP.css";


class CircleP extends Component {
  constructor(){
      super();
      this.state = {
        wholesaving:0,
        saving:1,
        total:0,
        rest:0

      }
    }
  calculate=()=>{
     if(this.props.transactions.length != 0){
      let a =this.props.transactions.filter(id => id.type== "expense" && (id.interval==7 || id.interval==30));
     let date=new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
    let monthnumber=-1;
        if (a[0].interval == '30'){
          while(new Date(date).getTime() <= new Date(a[0].end_date)){
            monthnumber += 1;
            date=new Date(date);
            date.setMonth(date.getMonth()+1);
          }
        }
        else if (a[0].interval=='7'){
          while(new Date(date).getTime() <= new Date(a[0].end_date)){
            monthnumber += 1;
            date=new Date(date);
            date.setDate(date.getDate() + 7);
          }
        }
        let d=a[0].start_date;
        let current=1;
        if (a[0].interval == '30'){
          while(new Date(d).getTime() <= new Date().getTime()){
            current += 1;
            d=new Date(d);
            d.setMonth(d.getMonth()+1);
          }
        }
        else if (a[0].interval=='7'){
          while(new Date(date).getTime() <= new Date(a[0].end_date)){
            current += 1;
            d=new Date(d);
            d.setDate(d.getDate() + 7);
          }
        }
        let saving=parseFloat( a[0].amount) / monthnumber;
        let total= saving*current;

        let rest=parseFloat(a[0].amount)-total
        this.setState({saving:saving, wholesaving:parseFloat(a[0].amount),times:monthnumber,total:total,rest:rest})
      }
  }
  componentWillReceiveProps=()=>{
    if(this.props){
     // this.calculate();
    }
  }

render(){const percentage = 100-parseFloat(this.state.saving) * 100/parseInt(this.state.wholesaving);
  return(

    <div className="circle-save" id="zc">
     
      <CircularProgressbarWithChildren
        value={percentage}
      /*  text={`${percentage} LBP`} */
        styles={{
        root: {},
        path: {
        stroke: `#16a085`,
        strokeLinecap: 'butt',
        transition: 'stroke-dashoffset 0.5s ease 0s',
        transform: 'rotate(0.25turn)',
        transformOrigin: 'center center',
        },
      trail: {
        stroke: '#d6d6d6',
        strokeLinecap: 'butt',
        transform: 'rotate(0.25turn)',
        transformOrigin: 'center center',
      },
      text: {
        fill: '#f88',
        fontSize: '16px',
      },
  
      background: {
        fill: '#3e98c7',
      },
    }}>
    <div className="circle_div">
  <p className="circle_div_p1" >{this.state.total} </p>
       <p className="circle_div_p2"> saving</p>
    </div>
    <div className="circle_div2">
  <p className="circle_div2_p">{this.state.rest}</p>
      <p className="circle_div2_p2"> left</p>
    </div>
  </CircularProgressbarWithChildren>
</div>
  )
}};
export default CircleP;  