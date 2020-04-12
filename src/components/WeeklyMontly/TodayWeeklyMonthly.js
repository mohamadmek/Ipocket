import React, { Component } from 'react';
import "./TodayWeeklyMonthly.css";

class TodayWeeklyMonthly extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today:0,
            weekly:0,
            monthly:0, 
            date:"" 
        };
    }
 
     componentWillReceiveProps=()=>{
        let currentDay = new Date().getDate();
        let currentMonth = new Date().getMonth()+1;
        let currentYear = new Date().getFullYear();
        let currentWeek = new Date().getDay();
         if(this.props.transactions.length !=0){
            let monthly=0;
            let weekly=0;
            let  daily=0;
             this.props.transactions.map((item) =>{ 
                let month = new Date(item.start_date).getMonth()+1;
                 if(this.props.desc == item.type  &&  currentYear == new Date(item.start_date).getFullYear() && currentMonth == month){
                    let today = new Date(item.start_date).getDate();
                     let week = new Date(item.start_date).getDay();
                     monthly += parseFloat(item.amount);
                     if(today == currentDay){
                         daily += parseFloat(item.amount);
                     }
                     if(this.weeklyNumber(item) != undefined)
                        currentWeek += parseFloat(this.weeklyNumber(item));
                 }
            })
            this.setState({today: daily , monthly:monthly, weekly:currentWeek})
         }
        } 
        weeklyNumber=(item)=>{
            if(item != undefined){
                let itemDate=new Date(item.start_date).getDate();
                let curr = new Date().getDay();
                let i=curr;
                if(i==0){
                    for(i=7 ; i>0 ; i--){
                        let first =new Date().getDate() - i+1;
                        
                        if(itemDate == first){
                            return item.amount
                        }
                    }
                }
                else{
                    for (i=curr ; i>0 ; i--) {
                        let first = new Date().getDate() - i+1;
                        if(itemDate == first){
                            return item.amount
                        }
                    } 
                }
            }
        }

    render() {        
        return (
            <div className="TodayWeekly">
                        <div className="TodayWeekly_div_inner">
                            <div  className="title-m">
                                <p className="TodayWeekly_div_inner_p">Today</p>
                            </div>
                            <div className="TodayWeekly_div_inner_div" id={this.props.desc==="expense"?"TodayWeeklyExcept":""}>
                                <p className="TodayWeekly_div_inner_p">{this.state.today} LBP</p>
                            </div>
                        </div>         
                        <div className="TodayWeekly_div_inner">
                            <div className="Todayweekly_div_div title-m" >
                            <p className="TodayWeekly_div_inner_p">Weekly</p>
                            </div>
                            <div className="TodayWeekly_div_inner_div" id={this.props.desc==="expense"?"TodayWeeklyExcept":""}>
                                <p className="TodayWeekly_div_inner_p" >{this.state.weekly} LBP</p>
                            </div>
                        </div>
                        <div className="TodayWeekly_div_inner m_monthly">
                            <div className="TodayWeekly_div_inner_p_p title-m" >
                                <p className="TodayWeekly_div_inner_p" >Monthly</p>
                            </div>
                            <div className="TodayWeekly_div_inner_div" id={this.props.desc==="expense"?"TodayWeeklyExcept":""}>
                                <p className="TodayWeekly_div_inner_p">{this.state.monthly} LBP</p>
                            </div>
                        </div>
                </div>
        );
    }
}
export default TodayWeeklyMonthly;