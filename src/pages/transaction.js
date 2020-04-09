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
                    editHandler={this.props.editHandler}
                    isEdit={this.props.isEdit}
                    updateTransaction={this.props.updateTransaction}
                    title={this.props.title}
                    deleteCategories={this.props.deleteCategories}
                    transTemp={this.props.transTemp}
                    editTransInput={this.props.editTransInput}
                     />
                ))}
            </div>
        );
    }
}
export default Transaction;