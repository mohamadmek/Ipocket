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
            <div style={{overflowX:'hidden', overflowY:'hidden'}}>
                <Weekly desc="income"/>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Category 
                        desc="income" 
                        transactions={this.props.transactions}
                        categories={this.props.categories}
                        currencies={this.props.currencies}
                        deleteCategories={this.props.deleteCategories}
                        editCategoryInput={this.props.editCategoryInput}
                        />
                    <CategoryPop handle={this.addCategory} />
                </div>
                <Balance desc="income"/>
            </div>
        );
    }
}
export default Income; 