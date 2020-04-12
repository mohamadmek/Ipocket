import React, {Component} from 'react';
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

    addCategory=(e)=>{
        this.state.Incomechosen.push(e);
    }

    componentDidMount() {
        if(!localStorage.getItem('token')){
            window.location('#/')
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
                        desc="income"
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