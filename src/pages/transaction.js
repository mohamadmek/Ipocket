import React, { Component } from 'react';
import Filter from "../components/Filter/Filter";
import Trans from "../components/TransComponent/TransComponent";

class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
        };
    }
    
    deleteTransaction = async (id) => {
        try{
            const response = await fetch(`http://localhost:8000/transaction/${id}`,
            {method: "DELETE"});
            const result = await response.json();
            if(result.status) {
                const transactions = this.state.transactions.filter(
                    transaction => transaction.id != id
                );
                console.log("minux",transactions)
                this.setState({
                    transactions
                })
            }
        } catch(err) {
            console.log(err)
        }
    }

    getTransactions = async () => {
        try {
            const response = await fetch('http://localhost:8000/transaction');
            const result = await response.json();
            if(result.status){
                this.setState({
                    transactions: result.transaction
                })
            }
        } catch (err) {
            console.log(err);
        }
    };

    componentDidMount () {
        this.getTransactions();
    }

    render() {
        return (
            <>
                <Filter/>
                <br></br>
                {this.state.transactions.map((item, key) => (  
                    <Trans key={key} transaction={item} deleteTransaction={this.deleteTransaction} />
                ))}
                
            </>
        );
    }
}
export default Transaction;