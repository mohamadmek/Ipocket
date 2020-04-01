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
            <div className="transaction" id="c">
                <div className="tranaction_div1">
                    <h2>{this.props.transaction.title}</h2>
                    <div className="transaction_div1_p">
                        <div><p>{this.props.transaction.start_date}</p></div>
            <div style={{marginLeft: '5px'}}><p>{this.props.transaction.created_at}</p></div>
                    </div>
                </div>
                <div className="transaction_div2" >
                <h2>{this.props.transaction.amount}</h2>
                
                    <div className="transaction_icon" style={{marginTop: '10px'}}>
                        <button onClick={(e) => this.props.deleteTransaction(this.props.transaction.id)}><i className="fas fa-trash"></i></button>
                        <i style={{marginLeft: '8px', }} className="fas fa-edit"></i>
                    </div>
                </div>
            </div>
        </>
        );
    }
}
export default TransComponent;