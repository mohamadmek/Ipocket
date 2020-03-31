import React, { Component,useState } from 'react';
import Filter from "../components/Filter/Filter";
import Trans from "../components/TransComponent/TransComponent";
import {useTransition, animated} from 'react-spring';

// class Transaction extends Component {
const Transaction = (props) => {

    // render() {      
        const transition = useTransition(props.transactions, props.transactions.id, {
            from: {opacity:0, marginTop: -100, marginBottom: 100},
            enter: {opacity:1, marginTop: 0, marginBottom: 0}
        });
        return (
            <>
                <Filter/>
                <br></br>
                {transition.map(({item, key, props}) => (
                    <animated.div key={key} style={props} >
                        <Trans transaction={item} />
                    </animated.div>
                ))}
                
            </>
        );
    
}
export default Transaction;