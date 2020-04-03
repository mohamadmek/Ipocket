import React, { Component } from 'react';
import './TransComponent.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

class TransComponent extends Component {
    constructor() {
        super();
        this.state = {
            
        };
    }


    render() {        
        return (
            <>
            <div className="transaction" id={this.props.transaction.type == 'expense' ? 's1' : 's2'}>
                <div className="tranaction_div1">
                    <h2>{this.props.transaction.title}</h2>
                    <div className="transaction_div1_p">
                        <div><p>{this.props.transaction.created_at}</p></div>
                        <div><p>01:15pm</p></div>
                    </div>
                </div>
                <div className="transaction_div2" >
                    <h2 style={{marginBottom: '10px'}}>{this.props.transaction.amount}</h2>
                    <div className="transaction_icon">
                        <i 
                        className="fas fa-trash" 
                        onClick={() => this.props.deleteTransaction(this.props.transaction.id)} 
                        style={{marginRight: '12px'}}
                        ></i>
                        <i className="fas fa-edit"></i>
                    </div>
                </div>
            </div>
        </>
        );
    }
}
export default TransComponent;