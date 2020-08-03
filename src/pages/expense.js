import React, {Component} from 'react';
import ReactDOM from "react-dom";
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
        //console.log(this.props.transactions)
    }

    addCategory=(e)=>{
        this.state.ExpenseChosen.push(e);
    }

    componentDidMount = () => {
        if(localStorage.getItem('token')==null)
        {
            window.location='#/';
            console.log("heyyy")
        }
            
        this.expenseAmount();
    }



 
    render() {
        return (
            <div style={{overflowX:'hidden'}}>
                {localStorage.getItem('token')==null?window.location='#/':
                <>
            <Weekly desc="expense"
                        transactions={this.props.transactions}
                        />
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Category desc="expense"
                 transactions={this.props.transactions}//
                 categories={this.props.categories}//
                 currencies={this.props.currencies}//
                 deleteCategories={this.props.deleteCategories}
                 editCategoryInput={this.props.editCategoryInput}

                 EditCatVisible={this.props.EditCatVisible}
                 switchEditCatVisible={this.props.switchEditCatVisible}
                 EditCatModel={this.props.EditCatModel}
                 ChangeEditCatModel={this.props.ChangeEditCatModel}
                 ChangeEditCatModelDB={this.props.ChangeEditCatModelDB}

                 />
            <CategoryPop 
                desc="expense"
                handle={this.addCategory}
                visibleCategoryPop={this.props.visibleCategoryPop}
                switchPop={this.props.switchPop}
                InputPop={this.props.InputPop}
                setInputPop={this.props.setInputPop}
                editSelectCat={this.props.editSelectCat}
                selectCategory={this.props.selectCategory}
                createCategory={this.props.createCategory}//
                />
            </div>
            <Balance
                desc="expense"
                totalExpense={this.props.totalExpense}
                totalIncome={this.props.totalIncome}
                currencies={this.props.currencies}
                wholeIncome={this.props.wholeIncome}
                wholeExpense={this.props.wholeExpense}
                />
                </>
    }
            </div>
       
        );
    }
}
export default Expense; 