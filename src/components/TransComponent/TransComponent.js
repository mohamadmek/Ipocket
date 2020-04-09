import React, { Component } from 'react';
import './TransComponent.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

class TransComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
                title: '',
                createdAt: '',
                amount: null,
        };
    }

    handleChange = (e) => {
        let inputName = e.target.name
        // let newState = Object.assign({}, this.state);
        // console.log(newState)
        this.setState({ inputName : e.target.value })
    }

    updateTransaction = (e) => {
        const id = this.props.transaction.id;
        console.log("soko")
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
                        onClick={()=>this.props.deleteCategories(this.props.transaction)}
                        style={{marginRight: '12px', cursor: 'pointer'}}
                        ></i>
                        <i onClick={(e) => this.props.editHandler(this.props.transaction)} className="fas fa-edit" style={{cursor: 'pointer'}}></i>
                    </div>
                </div>
            </div>
        )
    }

 


    editForm = () => {
    return(  
        <>
           <div className="transaction" id={this.props.transaction.type == 'expense' ? 's1' : 's2'}>
            <div className="tranaction_div1">
                <h2>
                    <input type="text" 
                    className="transaction-input" 
                    value={this.props.transTemp[2].title} 
                    name="title"
                    autoFocus={this.props.transTemp[4].focus==1 ? true : false}
                    onChange={(e)=>this.props.editTransInput(e.target.value,2)}
                    />
                </h2>
                <div className="transaction_div1_p">
                    <div><p>
                        <input 
                        type="date" 
                        className="transaction-input" 
                        name="created_at"
                        value={this.props.transTemp[3].date}
                       
                        onChange={(e)=>console.log("e",e.target.name)} /* this.props.editTransInput(e.target.value,3)} */

                        /></p></div>
                    <div><p>01:15pm</p></div>
                </div>
            </div>
            <div className="transaction_div2_edit" >
                <h2 style={{marginBottom: '10px'}}>
                    <input 
                    type="number"
                    min="0"
                    className="transaction-input" 
                    value={this.props.transTemp[1].amount} 
                    name="amount"
                    />
                </h2>
                <div className="transaction_icon">
                    <button onClick={(e) => this.updateTransaction(e)} type="submit" style={{borderRadius: "5px", }}>Save</button>
                </div>
            </div>
        </div>
        </>
    
    )
    }

    render() {        
        return (
        <>  
          {this.props.isEdit && this.props.transaction.id == this.props.transTemp[0].id ? this.editForm() : this.viewForm()}
          
        </>
        );
    }
}
export default TransComponent;