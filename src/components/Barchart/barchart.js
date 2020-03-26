import React, {Component} from 'react';
import {Chart} from 'primereact/chart';
import "./barchart.css"
import { Calendar } from "primereact/calendar";

class Barchart extends Component {
    constructor(props){
        super(props);
        this.state = {
          signStatus : true,
        }
      }
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
          <div className="barchart_div">
            {this.state.signStatus ?
              <Chart className="main-chart" type="bar" data={data} style={{marginTop:'2rem'}}/> :
              <Chart className="main-chart" type="pie" data={datapie} style={{width:'45rem'}} />}
              <div className="barchart_div2">               
                <div className="barchart_button1" id={this.state.signStatus?"barchart_button1_1":""} onClick={this.barchart} signStatus={this.state.signStatus}>Barchart</div>
                <div className="barchart_button2" id={this.state.signStatus?"":"barchart_button1_1"} onClick={this.piechart} signStatus={this.state.signStatus} >PieChart</div>

                <div className="barchart_div3">
                  <Calendar value={this.state.date}
				              onChange={e => this.setState({ datefrom: e.value })}
				              dateFormat='dd/mm/yy'
                      placeholder="Calendar From"
                      viewDate={this.state.datefrom}
                      style={{marginRight:'5px'}}
			              /> 
                   <Calendar value={this.state.date}
				              onChange={e => this.setState({ dateto: e.value })}
				              dateFormat='dd/mm/yy'
                      placeholder="Calendar To"
                      viewDate={this.state.dateto}
                      className="chart-calendar-to"
                    />
                </div>
              </div>
                
            </div>
        );
    }
}
export default Barchart; 