import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./Filter.css";

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        
        };
    }

    

    componentDidMount() {
        this.setState({ transactions: this.props.transactions })

    }

    render() {        
        return (
        <div className="Filter">
            <div>{console.log("date",this.state.dateto)}
                <p className="Filter_div1">Transactions</p>
            </div>
            <div className="Filter_div2">
                <div>
                    <input
                        type="date"
                        value={this.props.datefrom}
                        onChange={this.props.handleFrom}
                        dateFormat='yy/mm/dd'
                        placeholder="Calendar From"
                        className="transaction-calendar"
                        name="dateFrom"
                    />
                </div>
                <div style={{marginLeft: "1rem"}} >
                    <input 
                        type="date"
                        name="dateTo"
                        placeholder="Calendar To" 
                        value={this.props.dateto}
                        onChange={this.props.handleFrom}
                        className="transaction-calendar"
                        dateFormat='yy/mm/dd'
                    />
                
                
                </div>
            </div>
        </div>
                
        );
    }
}
export default Filter;