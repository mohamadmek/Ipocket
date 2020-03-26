import React, {Component} from 'react';
import styled from 'styled-components';
import Weekly from "../components/WeeklyMontly/TodayWeeklyMonthly";
import Balance from "../components/Balance/balance";
import CategoryPop from "../components/categoryPopup/categorypopup";
import Category from "../components/category/category";



class Income extends Component {
    constructor(props){
        super(props);
        this.state = {////////having only one title
            Incomechosen: [
                {label: 'fa fa-hospital', value: 'Hospital',cur:"LBP",bal:50},
                {label: 'fa fa-user-graduate', value: 'School',cur:"EURO",bal:10},
                {label: 'fa fa-car-side', value: 'Car',cur:"EURO",bal:50},,
                {label: 'fa fa-shopping-cart', value: 'Shopping',cur:"LBP",bal:25},
            ],
            
        }
    }

    addCategory=(e)=>{
        this.state.Incomechosen.push(e);
    }


    render() {
        return (
<<<<<<< HEAD
            <div style={{overflowX:'hidden'}}>
=======
            <div style={{overflowX:'hidden', overflowY:'hidden'}}>
>>>>>>> e76444bfc3dce357f080d21f4280c4f84ef5d902
                <Weekly desc="income"/>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Category desc="income" chosen={this.state.Incomechosen} />
                    <CategoryPop handle={this.addCategory} />
                </div>
                <Balance desc="income"/>
            </div>
        );
    }
}
export default Income; 