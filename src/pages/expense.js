import React, {Component} from 'react';
import Weekly from "../components/WeeklyMontly/TodayWeeklyMonthly";
import Balance from "../components/Balance/balance";
import CategoryPop from "../components/categoryPopup/categorypopup";
import Category from "../components/category/category";



class Expense extends Component {
    constructor(props){
        super(props);
        this.state = {
            ExpenseChosen:[
                {label: 'fa fa-mobile-alt', value: 'Phone',cur:"LBP",bal:20},
                {label:'fa fa-donate', value:"Bank",cur:"LBP",bal:10},
                {label:'fa fa-coffee', value:"Outside",cur:"LBP",bal:50},
                {label:'fa fa-paw', value:"Animals",cur:"LBP",bal:40},
            ],
        }
}
    addCategory=(e)=>{
        this.state.ExpenseChosen.push(e);
    }
 
    render() {
        return (
            <div style={{overflowX:'hidden'}}>
            <Weekly desc="expense"/>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Category desc="expense" chosen={this.state.ExpenseChosen}/>
            <CategoryPop handle={this.addCategory}/>
            </div>
            <Balance desc="expense"/>
            </div>
        );
    }
}
export default Expense; 