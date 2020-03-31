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
    expenseAmount = () => {
        console.log(this.props.transactions)
    }

    addCategory=(e)=>{
        this.state.ExpenseChosen.push(e);
    }

    componentDidMount = () => {
        this.expenseAmount();
    }
 
    render() {
        return (
            <div style={{overflowX:'hidden'}}>
            <Weekly desc="expense"/>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Category desc="expense" chosen={this.state.ExpenseChosen} transactions={this.props.transactions} />
            <CategoryPop handle={this.addCategory} />
            </div>
            <Balance desc="expense" transactions={this.props.transactions} />
            </div>
        );
    }
}
export default Expense; 