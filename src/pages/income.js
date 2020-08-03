import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import Weekly from "../components/WeeklyMontly/TodayWeeklyMonthly";
import Balance from "../components/Balance/balance";
import CategoryPop from "../components/categoryPopup/categorypopup";
import Category from "../components/category/category";



class Income extends Component {
    constructor(props){
        super(props);
        this.state = {   
        }
    }

   

    render() {
        return (
            <div style={{overflowX:'hidden', overflowY:'hidden'}}>
                <Weekly desc="income"
                        transactions={this.props.transactions}
                        />
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Category 
                        desc="income" 
                        transactions={this.props.transactions}
                        categories={this.props.categories}
                        currencies={this.props.currencies}
                        deleteCategories={this.props.deleteCategories}
                        editCategoryInput={this.props.editCategoryInput}
                        ChangeEditCatModelDB={this.props.ChangeEditCatModelDB}
                        />
                    <CategoryPop
                        desc="income"
                        createCategory={this.props.createCategory}//
                        />
                </div>
                <Balance 
                desc="income"
                totalExpense={this.props.totalExpense}
                totalIncome={this.props.totalIncome}
                currencies={this.props.currencies}
                />
            </div>
        );
    }
}
export default Income; 