import React, { Component,useState } from 'react';
import Filter from "../components/Filter/Filter";
import Trans from "../components/TransComponent/TransComponent";
import {useTransition, animated} from 'react-spring';

// class Transaction extends Component {
const Transaction = (props) => {

    // render() {
        
        return (
            <>
                <Filter/>
                <br></br>
                {props.transactions.map(item => (  
                        <Trans transaction={item} />
                ))}
                
            </>
        );
    
}
export default Transaction;