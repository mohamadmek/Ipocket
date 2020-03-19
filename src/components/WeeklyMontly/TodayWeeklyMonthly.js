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
                    <div className="TodayWeekly_div">
                        <div className="TodayWeekly_div_inner">
                            <div style={{fontSize:'30px'}}>
                            <p className="TodayWeekly_div_inner_p">Today</p>
                            </div>
                            <div className="TodayWeekly_div_inner_div" id={this.props.desc==="expense"?"TodayWeeklyExcept":""}>
                                <p className="TodayWeekly_div_inner_p">30 LBP</p>
                                </div>
                        </div>
                        </div>
                    <div className="TodayWeekly_div2">
                       <div className="TodayWeekly_div_inner">
                            <div className="Todayweekly_div_div">
                            <p className="TodayWeekly_div_inner_p">Weekly</p>
                            </div>
                            <div className="TodayWeekly_div_inner_div" id={this.props.desc==="expense"?"TodayWeeklyExcept":""}>
                                <p className="TodayWeekly_div_inner_p" >30 LBP</p>
                                </div>
                        </div>
                    </div>
                    <div className="TodayWeekly_div3" >
                        <div className="TodayWeekly_div_inner">
                            <div className="TodayWeekly_div_inner_p_p" >
                                <p className="TodayWeekly_div_inner_p" >Monthly</p>
                            </div>
                            <div className="TodayWeekly_div_inner_div" id={this.props.desc==="expense"?"TodayWeeklyExcept":""}>
                                <p className="TodayWeekly_div_inner_p">100 LBP</p>
                        </div>
                    </div>
                    </div>  
                </div>
        );
    }
}
export default TodayWeeklyMonthly;