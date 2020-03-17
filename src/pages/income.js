import React, {Component} from 'react';
import styled from 'styled-components';
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
      Description = styled.div``;

 
    render() {
        return (
            <>
            <this.Description>
            <Weekly desc="income"/>
            <Category desc="income"/>
            <br></br>
            <CategoryPop/>
            <Balance desc="income"/>
            </this.Description>

            </>
        );
    }
}
export default Income; 