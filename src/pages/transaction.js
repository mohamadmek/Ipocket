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
        if(!localStorage.getItem('token')){
            window.location('#/')
        }
    }

    render() {        
        return (
            <div>
                <Filter transactions={this.props.transactions} />
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
                    editTransDB={this.props.editTransDB}
                     />
                ))}
            </div>
        );
    }
}
export default Transaction;