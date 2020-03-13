 import React, {Component} from 'react';
 import {CircularProgressbarWithChildren,} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


class CircleP extends Component {
  constructor(){
      super();
      this.state = {}
    }
render(){const percentage = 100-32*100/166;
  return(
    <>
  
  <div>
    <div style={{ width: "20rem",margin:"1rem 1rem 1rem 1rem" }}>
    <CircularProgressbarWithChildren
  value={percentage}
 /*  text={`${percentage} LBP`} */
  styles={{
    // Customize the root svg element
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
    <div style={{display:'flex',color:'rgb(95, 113, 132)'}}>
       <p style={{fontSize:30,marginRight:'0.7rem'}}>166</p>
       <p style={{fontSize:27}}> saving</p>
    </div>
    <div style={{display:'flex',justifyContent:'space-between',color:'rgb(81, 197, 183)'}}>
      <p style={{fontSize:30,marginRight:'0.7rem'}}>32</p>
      <p style={{fontSize:27}}> left</p>
    </div>
  </CircularProgressbarWithChildren>
</div>
</div>

    </>
  )
}};
export default CircleP;  