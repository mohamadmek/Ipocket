import React, { Component } from 'react';
import './TransComponent.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

class TransComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
        };
    }

    updateTransaction = () => {
        const id = this.props.transaction.id;
        console.log("asd")
    }

    viewForm = () => {
        return (
            <div className="transaction" id={this.props.transaction.type == 'expense' ? 's1' : 's2'}>
                <div className="tranaction_div1">
                    <h2>{this.props.transaction.title}</h2>
                    <div className="transaction_div1_p">
                        <div><p>{this.props.transaction.created_at}</p></div>
                    </div>
                </div>
                <div className="transaction_div2" >
                    <h2 style={{marginBottom: '10px'}}>{this.props.transaction.amount}</h2>
                    <div className="transaction_icon">
                        <i 
                        className="fas fa-trash" 
                        onClick={() => this.props.deleteTransaction(this.props.transaction.id)} 
                        style={{marginRight: '12px', cursor: 'pointer'}}
                        ></i>
                        <i onClick={(e) => this.props.editHandler(this.props.transaction.id, e)} className="fas fa-edit" style={{cursor: 'pointer'}}></i>
                    </div>
                </div>
            </div>
        )
    }


    editForm = () => {
    return(  
        <form onSubmit={() => this.updateTransaction()}>
            <div className="transaction" id={this.props.transaction.type == 'expense' ? 's1' : 's2'}>
            <div className="tranaction_div1">
                <h2><input type="text" className="transaction-input" defaultValue={this.props.transaction.title} name="title" /></h2>
                <div className="transaction_div1_p">
                    <div><p><input type="date" className="transaction-input" name="created_at" defaultValue={this.props.transaction.created_at} /></p></div>
                    <div><p>01:15pm</p></div>
                </div>
            </div>
            <div className="transaction_div2_edit" >
                <h2 style={{marginBottom: '10px'}}>
                    <input 
                    type="number"
                    className="transaction-input" 
                    defaultValue={this.props.transaction.amount} 
                    name="amount" />
                </h2>
                <div className="transaction_icon">
                    <button type="submit" style={{borderRadius: "5px", }}>Save</button>
                </div>
            </div>
        </div>
        </form>
    
    )
    }

    render() {        
        return (
        <>  
            {(this.props.isEdit && this.props.transId == this.props.transaction.id) ? this.editForm() : this.viewForm()}
        </>
        );
    }
}
export default TransComponent;