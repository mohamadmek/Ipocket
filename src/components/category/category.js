
import React, { Component, PureComponent } from 'react';
import {Dialog} from 'primereact/dialog';
import { Button } from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import "./category.css";

const currentdate = new Date();
const currentYear = currentdate.getFullYear();
const maxdate = new Date(currentdate.setYear(currentdate.getFullYear() + 1));

class category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {   
            temp:[],
            currency: [
                {label:"EURO",value: 'EURO'},
                { label:"LBP",value: 'LBP'} 
            ],
            icon: [
                {label: 'fa fa-hospital', value: 'Hospital'},
                {label: 'fa fa-user-graduate', value: 'School'},
                {label: 'fa fa-running', value: 'Sports'},
                {label: 'fa fa-car-side', value: 'Car'},
                {label: 'fa fa-mobile-alt', value: 'Phone'},
                {label: 'fa fa-home', value: 'Home'},
                {label: 'fa fa-shopping-cart', value: 'Shopping'},
                {label: 'fa fa-tree', value: 'Nature'},
                {label: 'fa fa-utensils', value: 'Food'},
                {label:'fa fa-donate', value:"Bank"},
                {label:'fa fa-gifts', value:"Gift"},
                {label:'fa fa-coffee', value:"Outside"},
                {label:'fa fa-paw', value:"Animals"},
                {label:'fa fa-plane', value:"Traveling"},
                {label:'fa fa-asterisk', value:"Other"}
            ],
            categories:[],
            visibleEdit:false,
            tempinput:"",
            title:"",
            SelectCategory:"",
            transactionId:-1,
            categoryId:-1,
        };
        
    }

    onChange(e){
        this.setState({curTemp:e.value})
    }
    onRadio(e){
        this.setState({radio:e})
    }
    create(e){
        let a={cur:this.state.curTemp,bal:document.getElementById('category_popup_div2_inputs').value};
        let b= {label:this.props.chosen[this.state.index].label, value:this.props.chosen[this.state.index].value,cur:this.state.curTemp,bal:document.getElementById('category_popup_div2_inputs').value};
        this.props.chosen[this.state.index]=b;
        this.setState({ visible: false ,curTemp:"",index:-1});
    }

     editCategories(e,id){
      
    }

    carTemplate(option) {
        if(!option.value) {
            return option.label;
        }
        else {
            return (
                <div className="p-clearfix">
                    <i class={option.label} aria-hidden="true"  style={{display:'inline-block',fontSize:'24px'}}/>
                    <span style={{float:'right',margin:'.5em .25em 0 0'}}>{option.value}</span>
                </div>
            );
        }
    }

    componentDidMount=()=>{
        this.categoryInput.focus();
      // document.getElementsByClassName("zeinab").focus();
        if(this.props.categories!=0 && this.props.transactions.length!=0)
            this.categories();
    }
    categories=()=>{
        let i=[];
        this.props.transactions.map((item)=>{
            this.props.desc=="income"?
                i.push(this.props.categories.filter(id=>id.id==item.categories_id && item.type=="income")):
                i.push(this.props.categories.filter(id=>id.id==item.categories_id && item.type=="expense")) 
            });
            this.setState({categories:i})
         }
    
    currencyTransacion=(currency)=>{
        let s=this.props.currencies.filter(id => id.id==currency)[0].symbol;
        return s;
    }

    headername=(item)=>{
       // this.setState({visibleEdit:true});
       // this.props.transactions.filter(id => id.categories_id == item)
/*         if(this.props.FlagCategory[0]){
          let a=  this.props.transactions.filter(item =>item.categories_id == this.props.FlagCategory[1][0].id,this.props.transactions)
          let b= a[0].title;
          return b 
        }
        return " "; */
        if(item!=undefined){
            let b=this.props.transactions.filter(id => id.categories_id == item[0].id);
            this.setState({title:b[0].title, temp:b[0].title ,transactionId:b[0].id,categoryId:item[0].id})
        }

    }
    handleChange=(e)=>{
       // document.getElementById("zeinab").focus();

    }

	render() {
        const footer = (
			<div>
				<Button
					label='Create'
					icon='pi pi-check'
                    /* onClick={e=>this.create(e)} */
                    style={{backgroundColor:'#16a085',color:'white'}}
				/>
				<Button
					label='cancel'
					icon='fa fa-trash'
					onClick={e => this.setState({ visible: false })}
                    className='p-button-secondary'
                    style={{color:'rgb(95,113,132)'}}
				/>
			</div>
        );
        const footer2= (
			<div>
				<Button
					label='Edit'
					icon='pi pi-check'
                    onClick={e=>{this.setState({visibleEdit:false});this.props.editCategoryInput(this.state.transactionId,this.state.temp,this.state.SelectCategory,this.state.categoryId)}}
                    style={{backgroundColor:'#16a085',color:'white'}}
				/>
				<Button
					label='cancel'
					icon='fa fa-trash'
                    /* onClick={e =>this.props.switchCategoryFlag("")} */
                    onClick={(e)=>this.setState({visibleEdit:false})}
                    className='p-button-secondary'
                    style={{color:'rgb(95,113,132)'}}
				/>
			</div>
		);
		return (
        <div className="category_div">
            {this.state.categories.map((item,index) =>item.length==0?"":
                <div className="category_div_inner">
                 <div>
                    <p className="category_div_p1">
                        {this.props.transactions.filter(id =>id.categories_id==item[0].id)[0].title}
                    </p>
                </div>
                <div className="category_div_inner1">
                    <div>
                    <button className="category_div_button">
                        <i class={item[0].name} aria-hidden="true" id="category_div_i" /* onClick={e=>this.setState({visible:true,index:i,temp:item}) } */></i>
                    </button>
                    </div>
                    <div className="category_div_inner2_22">
                    <div><button className="category_div_inner2_button" onClick={()=> {this.setState({visibleEdit:true});this.headername(item)}} /* onClick={e=> this.props.switchCategoryFlag(item) this.editCategories(e,item[0].id)} */><i className="fas fa-edit"></i></button></div>
                    <div><button className="category_div_inner2_button"  onClick={e=>this.props.deleteCategories(item[0].id)}><i className="fas fa-trash"></i></button></div>
                    </div>
                </div>
                <div>
                    <p className="category_div_inner1" id={this.props.desc==="expense"?"category_except":""}>
                        <div style={{marginRight:'7px'}}>
                            {this.props.currencies.length!=0?this.currencyTransacion(this.props.transactions.filter(id => id.categories_id == item[0].id)[0].currencies_id):""}
                        </div>
                        <div>
                            {this.props.transactions.filter(id => id.categories_id == item[0].id)[0].amount}
                        </div>

                    </p>
                </div> 
            </div>
                )}
                {/* <Dialog
                    header={this.state.temp.value+" "+ this.props.desc}
                    footer={footer} 
                    visible={this.props.flagCategory}
                    style={{width:'25%'}}
                    modal={true}
                    onHide={e => this.setState({ visible: false })}>
                <div className="category_popup_div2">
                    <div>
                    <Dropdown 
                        value={this.state.curTemp}
                        options={this.state.currency} 
                        onChange={e => this.onChange(e)}
                        itemTemplate={this.carTemplate}  
                        style={{width: '70%',margin:'10px 0px 0px 0px'}}
                        placeholder="currency"
                        showClear={true}/>
                    <input type="number" placeholder="Amount" id="category_popup_div2_inputs" min="1"></input>
                    <div className="category_popup_div2_drop" >
                        <div className="category_popup_div2-1">
                            <input className="category_popup_div2-1_input" type="radio" name="radio_name" value="fixed" onChange={e=>this.onRadio(e.target.value)}/>
                            <label  className="category_popup_div2-1_label">Fixed</label>
                        </div>
                        <div style={{display:'flex'}}>
                            <input type="radio" name="radio_name" className="category_popup_div2-1_input" value="recurring" onChange={e=>this.onRadio(e.target.value)}/>
                            <label className="category_popup_div2-1_label">Recurring</label>
                        </div>
                    </div>
                    <Calendar
                        disabled={this.state.radio=="fixed"?false:true} 
                        value={this.state.date} 
                        onChange={(e) => this.setState({date: e.value})} 
                        placeholder="enter date if fixed"
                        maxDate={maxdate}
                        style={{width:'14rem'}}/>
                    </div>
                <div>
            </div>
        </div> 
        </Dialog>*/}
                 <Dialog
                   header={/* this.headername()+" " + */this.state.title + " " + this.props.desc}
                    footer={footer2} 
                    /* visible={this.props.FlagCategory[0]} */
                    visible={this.state.visibleEdit}
                    style={{width:'25%'}}
                    modal={true}
                    dismissableMask={false}
                    closable={false}
                    /* onHide={e =>this.props.switchCategoryFlag()}> */
                    onHide={e=>this.setState({visibleEdit:false})}>
                <div className="category_popup_div2">
                  <div>    
                    <input 
                        type="text" 
                        placeholder="Category Name" 
                        style={{width:'70%'}} 
                        id="category_popup_div2_inputs" 
                        name="categoryInput" 
                        value={this.state.temp}
                        onChange={e=>this.setState({temp:e.target.value})}
                        ref={(input) => { this.categoryInput = input }}>
                    </input>
                    </div>
                    <div>
                    {/*    <Dropdown 
                      className="zeinab"
                        value={this.state.cars}
                        options={this.state.cars} 
                        //onChange={e =>this.onCarChange2(e) }
                        style={{width: '70%',margin:'10px 0px 0px 0px'}}
                        placeholder="choose icon"
                        showClear={true}
                        
                        //onMouseDown={e=>this.onCarChange2(e)}
                        //onFocus={e=>this.onCarChange2(e)}
                        placeholder="ZEINAB"
                        />  */}
                       <select  onChange={(e)=>this.setState({SelectCategory:e.target.value})} className="category_select">
                             {this.state.icon.map((item)=>
                              <option value={item.label}>
                            {/*  <i className={item.label}></i> */}
                                 {item.value} Icon</option> 
                             )}
                        </select>

                    </div>
                </div>
                </Dialog>
                
        </div>
    	);
    }
}
export default category;
