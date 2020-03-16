import React, { Component } from 'react';
import styled from 'styled-components';

class TodayWeeklyMonthly extends Component {
    constructor() {
        super();
        this.state = {
            
        };
    }

    Description = styled.div`
      display:flex;
      justify-content: space-between;
      margin-left:1rem;
      display:flex;
      .zz{
        color:rgb(95, 113, 132);
        display:flex;
        justify-content:space-between;
        margin:10px 10px 10px 10px;}
      .amount{
          height:5rem;
          width:55%;
          color:white;
          background-color:#16a085;
          font-size:30px;
      }`
    

    render() {        
        return (
            <div>
               {/*  <div className="p-col-12 p-lg-4">
                    <div className="card summary">
                        <span className="title">Users</span>
                        <span className="detail">Number of visitors</span>
                        <span className="count visitors">12</span>
                    </div> */}
                <this.Description>
                    <div style={{height: '7rem',
                    width: '27%',
                    border: '7px solid rgb(95, 113, 132)'}}>
                        <div className="zz">
                            <div style={{fontSize:'30px'}}>
                            <p style={{textAlign:'center',marginTop:'10%'}}>Today</p>
                            </div>
                            <div className="amount">
                                <p style={{textAlign:'center',marginTop:'10%'}}>30 LBP</p>
                                </div>
                        </div>
                        </div>
                    <div style={{height: '7rem',
                    width: '27%',
                    border: '7px solid rgb(95, 113, 132)'}}>
                       <div className="zz">
                            <div style={{fontSize:'30px'}}>
                            <p style={{textAlign:'center',marginTop:'10%'}}>Weekly</p>
                            </div>
                            <div className="amount">
                                <p style={{textAlign:'center',marginTop:'10%'}}>30 LBP</p>
                                </div>
                        </div>
                    </div>
                    <div style={{height: '7rem',
                    width: '27%',
                    border: '7px solid rgb(95, 113, 132)'}}>
                        <div className="zz">
                            <div style={{fontSize:'28px'}}><p style={{textAlign:'center',marginTop:'10%'}}>Monthly</p>
                            </div>
                            <div className="amount">
                                <p style={{textAlign:'center',marginTop:'10%'}}>100 LBP</p>
                        </div>
                    </div>
                    </div>
                </this.Description>

                
                </div>
        );
    }
}
export default TodayWeeklyMonthly;