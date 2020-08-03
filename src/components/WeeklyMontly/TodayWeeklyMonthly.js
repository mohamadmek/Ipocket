import React, { Component } from 'react';
import "./TodayWeeklyMonthly.css";

class TodayWeeklyMonthly extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today:null,
            weekly:0,
            monthly:0, 
            date:"" 
        };
    }
 

        componentDidMount=()=>{
            this.calculateBalance();
        } 
     
        componentWillUpdate=()=>{
           if(this.state.today===null){
               this.calculateBalance()
           }
        }
        calculateBalance=()=>{
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
                 if(this.props.desc == item.type  &&  currentYear == new Date(item.start_date).getFullYear()){
                    let today = new Date(item.start_date).getDate();
                      //weekly = new Date(item.start_date).getDay();
                      if(currentMonth==month){
                        monthly += parseFloat(item.amount);
                      }
                     if(today == currentDay){
                         daily += parseFloat(item.amount);
                     }
                     if(this.weeklyNumber(item) != undefined)
                        weekly += parseFloat(this.weeklyNumber(item));
                 }
            })
            this.setState({today: daily , monthly:monthly, weekly:weekly})
         }
        }
        weeklyNumber=(item)=>{
            if(item != undefined){
                let itemDate=new Date(item.start_date).getDate();
                let curr = new Date().getDay();
                let i=curr;
               
                if(i==0){ 
                    for(let c=1 ; c<8 ; c++){
                        var date = new Date();
                        var last = new Date(date.getTime() - (c * 24 * 60 * 60 * 1000));
                        var day =last.getDate();
                        var month=last.getMonth()+1;
                        var year=last.getFullYear(); 
                        var calDate=year + '-' + month + '-' + day;
                        if(Date.parse(calDate) == Date.parse(item.start_date)){
                            return item.amount
                        } 
                    }
                }
                else{
                    for (i=0 ; i<curr ; i++) {
                        var date = new Date();
                        var last = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000));
                        var day =last.getDate();
                        var month=last.getMonth()+1;
                        var year=last.getFullYear(); 
                        var calDate=year + '-' + month + '-' + day;
                        if(Date.parse(calDate) == Date.parse(item.start_date)){
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