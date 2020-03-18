import React, { Component } from 'react';
import {Button} from 'primereact/button';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./Filter.css";
import { Calendar } from "primereact/calendar";

class Filter extends Component {
    constructor() {
        super();
        this.state = {
            datefrom:[],
            dateto:[]

            
        };
    }

    componentDidMount() { 
    }
   
    render() {        
        return (
        <>
        <div className="Filter">
            <div>
                <p className="Filter_div1">Transactions</p>
            </div>
            <div className="Filter_div2">
            <div>
                <Calendar
                    value={this.state.date}
				    onChange={e => this.setState({ datefrom: e.value })}
				    dateFormat='dd/mm/yy'
                    placeholder="Calendar From"
                    viewDate={this.state.viewDate} 
			    />
            </div>
            <div >
                <Calendar 
                    placeholder="Calendar To"
                    viewDate={this.state.viewDate} 
                    value={this.state.dateto}
                    onChange={(e) => this.setState({dateto: e.value})}
                />
               
               
            </div>
            </div>
        </div>
         </>
                
        );
    }
}
export default Filter;