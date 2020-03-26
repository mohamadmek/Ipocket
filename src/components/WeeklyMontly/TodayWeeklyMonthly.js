import React, { Component } from 'react';
import "./TodayWeeklyMonthly.css";

class TodayWeeklyMonthly extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {        
        return (
            <div className="TodayWeekly">
                        <div className="TodayWeekly_div_inner">
                            <div  className="title-m">
                                <p className="TodayWeekly_div_inner_p">Today</p>
                            </div>
                            <div className="TodayWeekly_div_inner_div" id={this.props.desc==="expense"?"TodayWeeklyExcept":""}>
                                <p className="TodayWeekly_div_inner_p">30 LBP</p>
                            </div>
                        </div>         
                        <div className="TodayWeekly_div_inner">
                            <div className="Todayweekly_div_div title-m" >
                            <p className="TodayWeekly_div_inner_p">Weekly</p>
                            </div>
                            <div className="TodayWeekly_div_inner_div" id={this.props.desc==="expense"?"TodayWeeklyExcept":""}>
                                <p className="TodayWeekly_div_inner_p" >30 LBP</p>
                            </div>
                        </div>
                        <div className="TodayWeekly_div_inner m_monthly">
                            <div className="TodayWeekly_div_inner_p_p title-m" >
                                <p className="TodayWeekly_div_inner_p" >Monthly</p>
                            </div>
                            <div className="TodayWeekly_div_inner_div" id={this.props.desc==="expense"?"TodayWeeklyExcept":""}>
                                <p className="TodayWeekly_div_inner_p">100 LBP</p>
                            </div>
                        </div>
                </div>
        );
    }
}
export default TodayWeeklyMonthly;