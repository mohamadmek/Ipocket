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
                {this.props.transactions.map((transaction) => (
                    <Trans 
                    key={transaction.id}
                    transaction={transaction} 
                    deleteTransaction={this.props.deleteTransaction}
                    editHandler={this.props.editHandler}
                    isEdit={this.props.isEdit}
                    transId={this.props.transId}
                    updateTransaction={this.props.updateTransaction}
                    title={this.props.title} />
                ))}
            </div>
        );
    }
}
export default Transaction;