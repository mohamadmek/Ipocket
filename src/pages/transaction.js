import React, { Component,useState } from 'react';
import Filter from "../components/Filter/Filter";
import Trans from "../components/TransComponent/TransComponent";
import {useTransition, animated} from 'react-spring';

// class Transaction extends Component {
const Transaction = (props) => {

    // render() {      
        const transition = useTransition(props.chosen, props.chosen.id, {
            from: {opacity:0, marginTop: -100, marginBottom: 100},
            // enter: item => async (next, cancel) => {
            //     await new Promise(resolve => setTimeout(resolve, 300));
            //     await next({ opacity: 1, marginTop: 0, marginBottom: 0 })
            //   },
            enter: {opacity:1, marginTop: 0, marginBottom: 0}
        });
        return (
            <>
                <Filter/>
                <br></br>
                {transition.map(({item, key, props}) => (
                    <animated.div key={key} style={props} >
                        <Trans tran={item} />
                    </animated.div>
                ))}
                
            </>
        );
    
}
export default Transaction;