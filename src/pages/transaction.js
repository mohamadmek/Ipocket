import React, { Component } from 'react';
import Filter from "../components/Filter/Filter";
import Trans from "../components/TransComponent/TransComponent";

class Transaction extends Component {
    constructor() {
        super();
        this.state = {
            
        };
    }


    componentDidMount() {
        
    }

    render() {        
        return (
            <div>
                <Filter/>
                <br></br>
                {this.props.transactions.map((transaction, index) => (
                    <Trans 
                    transaction={transaction} 
                    deleteTransaction={this.props.deleteTransaction} />
                ))}
            </div>
        );
    }
}
export default Transaction;