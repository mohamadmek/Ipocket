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
        console.log("choco", this.props)   
        return (
            <>
            <div className="transaction" id="c">
                <div className="tranaction_div1">
                    <h2>Category Title</h2>
                    <div className="transaction_div1_p">
                        <div><p>7/3/2020</p></div>
                        <div><p>01:15pm</p></div>
                    </div>
                </div>
                <div className="transaction_div2" >
                <h2>{this.props.tran.label}</h2>
                
                    <div className="transaction_icon">
                        <i className="fas fa-trash"></i>
                        <i className="fas fa-edit"></i>
                    </div>
                </div>
            </div>
            {/* <div className="transaction">
                <div className="tranaction_div1">
                    <h2>Category Title</h2>
                    <div className="transaction_div1_p">
                        <div><p>7/3/2020</p></div>
                        <div><p>12:37pm</p></div>
                    </div>
                </div>
                <div className="transaction_div2" >
                    <h2>- LBP 10000</h2>
                
                    <div className="transaction_icon">
                        <i className="fas fa-trash"></i>
                        <i className="fas fa-edit"></i>
                    </div>
                </div>
            </div> */}
        </>
        );
    }
}
export default TransComponent;