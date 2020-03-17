import React, {Component} from 'react';
import styled from 'styled-components';
import Weekly from "../components/WeeklyMontly/TodayWeeklyMonthly";
import Balance from "../components/Balance/balance";
import CategoryPop from "../components/categoryPopup/categorypopup";
import Category from "../components/category/category";



class Expense extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
      }
      Description = styled.div``;

 
    render() {
        return (
            <>
            <this.Description>
            <Weekly desc="expense"/>
            <Category desc="expense"/>
            <br></br>
            <CategoryPop/>
            <Balance desc="expense"/>
            </this.Description>

            </>
        );
    }
}
export default Expense; 