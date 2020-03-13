import React, {Component} from 'react';
import {Chart} from 'primereact/chart';
import styled from 'styled-components';
import { Calendar } from "primereact/calendar";

class Barchart extends Component {
    constructor(props){
        super(props);
        this.state = {
          signStatus : true,
          dateto:false,
          datefrom:false
        }
      }
    Description = styled.div`
    margin-left: 2rem;
    max-width: 100%;
    overflow-x: hidden;
    .bar_div{
        position:relative;
        left:42rem;
        bottom:5rem;
    };
    .xx{
      color:transparent;
    }`;

    Button1 = styled.button`
    padding: 10px 15px;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    background-color: ${props => props.signStatus ? 'rgb(95, 113, 132)' : '#16a085'};
    border: none;
    cursor: pointer;
    font-weight: bold;
    color: #fff;
    position:relative;
    left:45rem;
    bottom:15rem;
   `;

    Button2 = styled.button`
    padding: 10px 15px;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    background-color: ${props => props.signStatus ? '#16a085' : 'rgb(95, 113, 132)'};
    border: none;
    cursor: pointer;
    font-weight: bold;
    color: #fffa;
    position:relative;
    left:45rem;
    bottom:15rem;
   `;
   Input = styled.input`
      background: none;
      border-top: none;
      border-right: none;
      border-left: none;
      border-color: rgb(95, 113, 132);
      font-size: 14px;
      margin-top: 0px;
      margin-bottom: 2rem;
    }`;
    barchart = () => {
        this.setState({
          signStatus: true,
        })
      }
      piechart = () => {
        this.setState({
          signStatus: false,
        })
      }
      handlefrom=(e)=>{e.preventDefault();
        this.setState({datefrom:true});
      }
      handleto=(e)=>{e.preventDefault();
        this.setState({dateto:true});
      }

    render() {
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Income',
                    backgroundColor: ' #16a085',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Expense',
                    backgroundColor: 'rgb(209,0,0)',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
        const datapie = {
            labels: ['Income','Expense'],
            datasets: [
                {
                    data: [300, 50],
                    backgroundColor: [
                        "#16a085",
                        "rgb(209,0,0)"
                    ],
                    hoverBackgroundColor: [
                        "#16a085",
                        "#rgb(209,0,0)"
                    ]
                }]
            };
            
        return (
          
            <>
                <this.Description>
                    {this.state.signStatus ?
                        <Chart width="40rem" type="bar" data={data}/> :
                        <Chart type="pie" data={datapie} width="47rem"/>}                 
                <this.Button2 onClick={this.barchart} signStatus={this.state.signStatus}>Barchart</this.Button2>
                <this.Button1 onClick={this.piechart} signStatus={this.state.signStatus} >PieChart</this.Button1>
                <div className="bar_div">

                <div style={{display:'flex'}}>
                    <div>
                  <this.Input 
                    type="date" 
                    name="password"
                    style={{width:'97%'}} 
                    id='from' 
                    className={this.state.datefrom?
                      document.getElementById('from').value===""?
                      "xx":"":"xx"} 
                      onSelect={this.handlefrom}
                  />
                  
                  <label for="password" style={{display:"block", color:'rgb(95, 113, 132)',fontWeight: 'bold', fontSize:'15px'}}>Date From</label>
                  </div>
                  <div>
                  <this.Input 
                    type="date" 
                    name="password"
                    style={{width:'97%'}} 
                    id='to' 
                    className={this.state.dateto?
                      document.getElementById('to').value===""?
                      "xx":"":"xx"} 
                      onSelect={this.handleto}
                  />
                  <label for="password" style={{display:"block", color:'rgb(95, 113, 132)',fontWeight: 'bold', fontSize:'15px'}}>Date To</label>
                  </div>
                  </div>

                {/* <Calendar
                    value={this.state.date}
				    onChange={e => this.setState({ datefrom: e.value })}
				    dateFormat='dd/mm/yy'
                    placeholder="Calendar From"
                    viewDate={this.state.viewDate} 
			    />
                   <Calendar
                    value={this.state.date}
				    onChange={e => this.setState({ datefrom: e.value })}
				    dateFormat='dd/mm/yy'
                    placeholder="Calendar To"
                    viewDate={this.state.viewDate} 
			    /> */}
                </div>
                </this.Description>
            </>
        );
    }
}
export default Barchart; 