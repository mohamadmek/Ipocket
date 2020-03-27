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
                {label: 'fa fa-mobile-alt', value: 'Phone',amount:[{cur:"LBP",bal:50},{cur:"EURO",bal:20}]},
                {label:'fa fa-donate', value:"Bank",amount:[{cur:"LBP",bal:45},{cur:"EURO",bal:10}]},
                {label:'fa fa-coffee', value:"Outside",amount:[{cur:"LBP",bal:150},{cur:"EURO",bal:50}]},,
                {label:'fa fa-paw', value:"Animals",amount:[{cur:"LBP",bal:25},{cur:"EURO",bal:40}]},
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