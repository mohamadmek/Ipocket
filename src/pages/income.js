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
                {label: 'fa fa-hospital', value: 'Hospital',amount:[{cur:"LBP",bal:50},{cur:"EURO",bal:20}]},
                {label: 'fa fa-user-graduate', value: 'School',amount:[{cur:"LBP",bal:45},{cur:"EURO",bal:10}]},
                {label: 'fa fa-car-side', value: 'Car',amount:[{cur:"LBP",bal:150},{cur:"EURO",bal:50}]},,
                {label: 'fa fa-shopping-cart', value: 'Shopping',amount:[{cur:"LBP",bal:25},{cur:"EURO",bal:40}]},
            ],
            
        }
      }

    addCategory=(e)=>{
        this.state.Incomechosen.push(e);
    }

 
    render() {
        return (
            <div style={{overflowX:'hidden'}}>
            <Weekly desc="income"/>
            <Category desc="income" chosen={this.state.Incomechosen}/>
            <br></br>
            <CategoryPop handle={this.addCategory}/>
            <Balance desc="income"/>
            </div>
        );
    }
}
export default Income; 