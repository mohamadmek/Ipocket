import React, {Component} from 'react';
import styled from 'styled-components';
import Weekly from "../components/TodayWeeklyMonthly";
import Balance from "../components/Balance/balance";
import CategoryPop from "../components/categoryPopup/categorypopup";



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
            <Weekly/>
            <CategoryPop/>
            <Balance desc="income"/>
            </this.Description>

            </>
        );
    }
}
export default Income; 