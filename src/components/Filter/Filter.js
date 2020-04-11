import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./Filter.css";

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterDate: {
                dateFrom: '',
                dateTo: '',
            },
            transactions: [],
        
        };
    }

    handleFrom = e => {
        e.preventDefault();
        let filterDate = {...this.state.filterDate};
        const name = e.target.name;
        filterDate[name] = e.target.value;
        this.setState({ filterDate })
        let transactions = [...this.props.transactions];
        const filteredTransactions = transactions.filter(transaction =>
            parseInt(transaction.created_at) > 1)
            console.log(filteredTransactions[0].created_at)
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
                        value={this.state.filterDate.datefrom}
                        onChange={this.handleFrom}
                        // dateFormat='dd/mm/yy'
                        placeholder="Calendar From"
                        className="transaction-calendar"
                        value={this.state.datefrom}
                        name="dateFrom"
                    />
                </div>
                <div style={{marginLeft: "1rem"}} >
                    <input 
                        type="date"
                        name="dateTo"
                        placeholder="Calendar To" 
                        value={this.state.filterDate.dateto}
                        onChange={this.handleFrom}
                        className="transaction-calendar"
                        value={this.state.dateto}
                    />
                
                
                </div>
            </div>
        </div>
      
                
        );
    }
}
export default Filter;