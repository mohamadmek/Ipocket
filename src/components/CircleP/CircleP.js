import React, {Component} from 'react';
import {CircularProgressbarWithChildren,} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./CircleP.css";


class CircleP extends Component {
  constructor(){
      super();
      this.state = {}
    }
  

render(){const percentage = 100-32*100/166;
  return(

    <div className="circle-save" id="zc">
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
    <div className="circle_div">
       <p className="circle_div_p1" >166</p>
       <p className="circle_div_p2"> saving</p>
    </div>
    <div className="circle_div2">
      <p className="circle_div2_p">32</p>
      <p className="circle_div2_p2"> left</p>
    </div>
  </CircularProgressbarWithChildren>
</div>
  )
}};
export default CircleP;  