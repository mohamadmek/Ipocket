import React, {Component} from 'react';
import {Chart} from 'primereact/chart';
import "./barchart.css"
import { Calendar } from "primereact/calendar";

class Barchart extends Component {
    constructor(props){
        super(props);
        this.state = {
          signStatus : true,
          barDateFrom:'',
          barDateTo:'',
          PieDateFrom:'',
          PieDateTo:'',
          pieAmount:[],
          month:[],
          income:[],
          expense:[],
        }
      }
    barchart = () => {
        this.setState({
          signStatus: true,
        })
      }
      piechart = () => {
        this.setState({
          signStatus: false,
        })
      }
      handlefrom=(e)=>{e.preventDefault();
        this.setState({datefrom:true});
      }
      handleto=(e)=>{e.preventDefault();
        this.setState({dateto:true});
      }

      calculatePie=(from,to)=>{
        if(this.props.transactions.length !== 0){
          let fixed=this.props.transactions.filter(id =>
            id.flag ==2 && new Date(id.start_date).getTime() >= new Date(from).getTime() && new Date(id.start_date).getTime()<=new Date(to).getTime())
          let recurring = this.props.transactions.filter(id=>
            id.flag==1 && new Date(id.start_date).getTime() <= new Date(to).getTime())
              let income=0, expense=0;
              fixed.map((item)=>{
                if(item.type == "income"){ income += parseFloat(item.amount)}
                else if(item.type == "expense"){ expense += parseFloat(item.amount)}
              })
                recurring.map((item)=>{
                 if(item.type == "income"){ income += this.calculateAmount(item,"pie")}
                 else if( item.type == "expense"){ expense += this.calculateAmount(item, "pie")}
              })
              let amount=[income,expense];
              this.setState({ pieAmount : amount})
        }
      }

      calculateAmount=(item)=>{
        let total=0;
        let from="",to=""
          from=this.state.PieDateFrom;
          to=this.state.PieDateTo;
          if(new Date(from).getTime() < new Date(item.start_date).getTime()){
            from=new Date(item.start_date);
          }
          else{
            from = new Date(from)
          }
          if(item.end_date == null){
            while(new Date(item.start_date).getTime() <= new Date(to).getTime() && new Date(from).getTime() <= new Date(to).getTime()){
              total += parseFloat(item.amount);
              from.setMonth(from.getMonth()+1);
            }
            return total;
          }
          else{
            while(new Date(item.start_date).getTime() <= new Date(to).getTime() && new Date(from).getTime() <= new Date(to).getTime() && new Date(from) <= new Date(item.end_date)){
              total += parseFloat(item.amount);
              from.setMonth(from.getMonth()+1);
            }
            return total;
          }
        }

        calculateBar=(from,to)=>{
          const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          if(this.props.transactions.length != 0){
            let fromTemp=from;
            let toTemp=new Date(from);
            toTemp.setMonth(toTemp.getMonth()+1)
            let totalIncome=[];
            let totalExpense=[];
            let months=[];
            let flag=false;
            while(new Date(toTemp).getTime() <= new Date(to).getTime()){
             
              let income=0;
              let expense=0;
              this.props.transactions.map((id)=>{
                if(id.flag ==2 && new Date(id.start_date).getTime() >= new Date(fromTemp).getTime() && new Date(id.start_date) < new Date(toTemp) ){
                  if(id.type == "income"){income += parseFloat(id.amount)}
                  else {expense += parseFloat(id.amount)}
                }
                
                else if(id.flag ==1 && id.end_date==null && new Date(toTemp).getTime() >= new Date(id.start_date).getTime()){
                  if(id.type == "income"){income += parseFloat(id.amount)}
                  else {expense += parseFloat(id.amount)}
                }
                else if (id.flag==1 && id.end_date!=null && new Date(toTemp).getTime() >= new Date(id.start_date).getTime() && new Date(fromTemp).getTime() <= new Date(id.end_date).getTime()){
                  if(id.type == "income"){income += parseFloat(id.amount)}
                  else {expense += parseFloat(id.amount)}
                }  
              })
              totalIncome.push(income);
              totalExpense.push(expense);
              months.push(monthNames[new Date(fromTemp).getMonth()])

              fromTemp=new Date(fromTemp);
              fromTemp.setMonth(fromTemp.getMonth()+1);
              toTemp=new Date(toTemp);
              toTemp.setMonth(toTemp.getMonth()+1);
              if(new Date(toTemp).getTime()>new Date(to).getTime() && !flag){
                toTemp=new Date(to);
                flag=true
            }
             
            }
            this.setState({month:months, income:totalIncome, expense:totalExpense})
          }
          

        }

      componentDidMount=()=>{
        let month = new Date().getMonth()+1;
        let year = new Date().getFullYear();
        this.setState({
                  PieDateFrom : year + '-' + month + '-1',
                  PieDateTo : year + '-' + (new Date().getMonth()+1) + "-" + new Date().getDate(),
                  barDateFrom : year + '-' + '1-1',
                  barDateTo : year + '-' + (new Date().getMonth()+1) + "-" + new Date().getDate(),
                  flagPie:false,
                  flagBar:false,
                },()=>this.calculateBar(this.state.barDateFrom,this.state.barDateTo))
      }
      componentWillReceiveProps=()=>{
        if(this.props.transactions.length !== 0){
          this.calculatePie(this.state.PieDateFrom,this.state.PieDateTo);
          this.calculateBar(this.state.barDateFrom,this.state.barDateTo)

        }
      }
      componentWillUpdate=()=>{
        if(this.state.pieAmount.length==0){
          this.calculatePie(this.state.PieDateFrom,this.state.PieDateTo);
          this.calculateBar(this.state.barDateFrom,this.state.barDateTo)
        }
      }
     

    render() {
        const data = {
            labels: this.state.month,
            datasets: [
                {
                    label: 'Income',
                    backgroundColor: ' #16a085',
                    data: this.state.income
                },
                {
                    label: 'Expense',
                    backgroundColor: 'rgb(209,0,0)',
                    data: this.state.expense
                }
            ]
        };
        const datapie = {
            labels: ['Income','Expense'],
            datasets: [
                {
                    data: this.state.pieAmount,
                    backgroundColor: [
                        "#16a085",
                        "rgb(209,0,0)"
                    ],
                    hoverBackgroundColor: [
                        "#16a085",
                        "#rgb(209,0,0)"
                    ]
                }]
            };
            
        return (
          <div className="barchart_div">
            {this.state.signStatus ?
              <Chart className="main-chart" type="bar" data={data} style={{marginTop:'2rem',width:'40rem'}}/> :
              <Chart className="main-chart" type="pie" data={datapie} style={{width:'45rem'}} />}
              <div className="barchart_div2">               
                <div className="barchart_button1" id={this.state.signStatus?"barchart_button1_1":""} onClick={this.barchart} signStatus={this.state.signStatus}>Barchart</div>
                <div className="barchart_button2" id={this.state.signStatus?"":"barchart_button1_1"} onClick={this.piechart} signStatus={this.state.signStatus} >PieChart</div>

                <div className="barchart_div3" id={this.state.signStatus?"":"barchart_div3_id"}> 
                  <Calendar value={this.state.date}
                      onChange={e =>this.setState
                        ({
                         barDateFrom: new Date(e.target.value).getFullYear()+"-"+(new Date(e.target.value).getMonth()+1)+"-"+new Date(e.target.value).getDate() ,
                         flagBar:true
                        },()=>{
                          this.calculateBar(this.state.barDateFrom,this.state.barDateTo)
                        })}
                      placeholder="Calendar From"
                      //viewDate={this.state.datefrom}
                      style={{marginRight:'5px'}}
                      view="month"
                      dateFormat="mm/yy"
                      yearNavigator={true}
                      yearRange={"2010:"+new Date().getFullYear()}
                      value={!this.state.flagBar ? null :this.state.barDateFrom}
			              /> 
                   <Calendar value={this.state.date}
                      onChange={e =>this.setState
                        ({
                        barDateTo:new Date(e.target.value).getFullYear()+"-"+(new Date(e.target.value).getMonth()+1)+"-"+new Date(e.target.value).getDate() ,
                        flagBar:true
                      },()=>{
                        this.calculateBar(this.state.barDateFrom,this.state.barDateTo)
                      })}
                      placeholder="Calendar To"
                      //viewDate={this.state.dateto}
                      className="chart-calendar-to"
                      view="month"
                      dateFormat="mm/yy"
                      yearNavigator={true}
                      yearRange={"2010:"+new Date().getFullYear()}
                      value={!this.state.flagBar ? null :this.state.barDateTo}
                    />
                </div>

                <div className="barchart_div4" id={this.state.signStatus?"barchart_div3_id":""}>
                  <Calendar value={this.state.date}
                      onChange={e => this.setState
                        ({
                           PieDateFrom:new Date(e.target.value).getFullYear()+"-"+(new Date(e.target.value).getMonth()+1)+"-"+new Date(e.target.value).getDate() ,
                           flagPie:true
                          },()=>{
                            this.calculatePie(this.state.PieDateFrom,this.state.PieDateTo)
                          })}
				              dateFormat='yy/mm/dd'
                      placeholder="Calendar From"
                      //viewDate={this.state.datefrom}
                      style={{marginRight:'5px'}}
                      value={!this.state.flagPie ? null :this.state.PieDateFrom}
                     // maxDate={new Date()}
			              /> 
                   <Calendar value={this.state.date}
                      onChange={e => this.setState
                        ({
                           PieDateTo: new Date(e.target.value).getFullYear()+"-"+(new Date(e.target.value).getMonth()+1)+"-"+new Date(e.target.value).getDate() ,
                           flagPie:true
                           },()=>{
                             this.calculatePie(this.state.PieDateTo,this.state.PieDateFrom)
                           })}
				              dateFormat='dd/mm/yy'
                      placeholder="Calendar To"
                      //viewDate={this.state.dateto}
                      className="chart-calendar-to"
                      value={!this.state.flagPie ? null :this.state.PieDateTo}
                      //maxDate={new Date()}
                    />
                </div>
              </div>
                
            </div>
        );
    }
}
export default Barchart; 