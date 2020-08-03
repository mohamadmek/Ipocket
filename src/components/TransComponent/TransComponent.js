import React, { Component } from 'react';
import './TransComponent.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

class TransComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
                transTemps:[],
                isEdits:false
        };
    }


    viewForm = () => {
        return (
            <div className="transaction" id={this.props.transaction.type == 'expense' ? 's1' : 's2'}>
                <div className="tranaction_div1">
                    <h2>{this.props.transaction.title}</h2>
                    <div className="transaction_div1_p">
                        <div><p>{this.props.transaction.start_date}</p></div>
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
                        <i onClick={(e) =>this.setState({transTemps: this.props.transaction , isEdits:true}) /* this.props.editHandler(this.props.transaction) */} className="fas fa-edit" style={{cursor: 'pointer'}}></i>
                    </div>
                </div>
            </div>
        )
    }
    edit = (e,desc) => {
        let newState = Object.assign({}, this.state);
        switch(desc){
            case "title":
                newState.transTemps.title = e;
                break;
            case "date":
                newState.transTemps.start_date =e;
                break;
            case "amount":
                newState.transTemps.amount=e;
                break;
        }
        this.setState(newState);
    }
    editForm = () => {
        return(  
            <>
               <div className="transaction" id={this.props.transaction.type == 'expense' ? 's1' : 's2'}>
                <div className="tranaction_div1">
                    <h2>
                        <input type="text" 
                        className="transaction-input" 
                        value={this.state.transTemps.title} 
                        name="title"
                        onChange={(e)=>this.edit(e.target.value,"title")}
                        />
                    </h2>
                    <div className="transaction_div1_p">
                        <div><p>
                            <input 
                            type="date" 
                            className="transaction-inputs" 
                            name="created_at"
                            onSelect={(e)=>{e.preventDefault()}}
                            value={this.state.transTemps.start_date}
                            onChange={(e)=>this.edit(e.target.value,"date")}
                            /></p></div>
                    </div>
                </div>
                <div className="transaction_div2_edit" >
                    <h2 style={{marginBottom: '10px'}}>
                        <input 
                        type="number"
                        min="1"
                        className="transaction-input" 
                        value={this.state.transTemps.amount} 
                        name="amount"
                        required pattern="[0-9]+"
                        onChange={(e)=>this.edit(e.target.value,"amount")}
                        />
                    </h2>
                    <div className="transaction_icon">
                        <button onClick={(e) => ( this.setState({isEdits:false}),this.props.ChangeEditCatModelDB(this.state.transTemps))} type="submit" style={{borderRadius: "5px",marginRight:'5px'}}>Save</button>
                        <button onClick={(e) => this.setState({isEdits:false})} style={{borderRadius: "5px"}}>Cancel</button>
                    </div>
                </div>
            </div>
            </>
        
        )
        } 

    render() {        
        return (
        <>  
          {this.state.isEdits && this.props.transaction.id == this.state.transTemps.id ? this.editForm() : this.viewForm()}
        </>
        );
    }
}
export default TransComponent;