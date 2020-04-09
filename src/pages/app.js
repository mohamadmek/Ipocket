import React, {Component} from 'react';
import classNames from 'classnames';
import {AppTopbar} from '../AppTopbar';
import {AppMenu} from '../AppMenu';
import {AppProfile} from '../AppProfile';
import {Route} from 'react-router-dom';
import Tranaction from './transaction';
import Account from "./account/account";
import Login from './login';
import Save from "../components/Save/Save";
import Income from "../pages/income";
import Expense from "../pages/expense";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../layout/layout.scss';

class App extends Component {
    
    constructor() {
        super();
        this.state = {
            layoutMode: 'static',
            layoutColorMode: 'dark',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,

            transactions: [],
            categories: [],
            currencies: [],
            date:"",

            totalIncome:0,
            totalExpense:0,
            
            isEdit: false,
            transTemp:[],
            
            title: "",
            flagEdit:false,
            titleCategory:[],
            categoryInput:[],
            selectCategory:"",
            tempId:-1,

            visibleCategoryPop:false,
            InputPop:[],

            EditCatVisible:false,
            EditCatModel:[],
            changed:false
        };
        this.onWrapperClick = this.onWrapperClick.bind(this);
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.createMenu();
    }

    
    switch=(item)=>{
        let a=this.state.categories.filter(id => id.id == item.categories_id);
        this.setState({
            flagEdit:!this.state.flagEdit ,
            titleCategory:item.title,
            categoryInput:item.title,
            tempId:item.id,
            selectCategory:a[0].name
        })
    }
    cancel=()=>{
        this.setState({flagEdit:false})
    }
    
    switchPop=()=>{
        this.setState({
            visibleCategoryPop : ! this.state.visibleCategoryPop,
            selectCategory : ""
        })
    }

    setInputPop=(e)=>{
        this.setState({InputPop: e})
    }

    switchEditCatVisible=(e)=>{
        if(e!=1){console.log(e)
            this.setState({
                EditCatVisible: ! this.state.EditCatVisible,
                EditCatModel:e
            })
        }
        else
        this.setState({EditCatVisible: ! this.state.EditCatVisible})

    }

    ChangeEditCatModel=(value,index)=>{
        let newState = Object.assign({}, this.state);
        if(index == "amount"){
            newState.EditCatModel.amount=value;
        }
        else if(index == "flag"){
            if(value==1){
                newState.EditCatModel.end_date=""
            }
            newState.EditCatModel.flag=value;
        }
        else if(index == "date"){
            newState.EditCatModel.end_date=value;
        }
        else if(index == "currencies"){
            newState.EditCatModel.currencies_id=value;
        }

        this.setState(newState);
    }

    ChangeEditCatModelDB=async () =>{
        try{
            const responseTrans = await fetch(`http://localhost:8000/transaction/${this.state.EditCatModel.id}`,
            {method:
                'PUT',
            body:
                JSON.stringify({
                    amount:this.state.EditCatModel.amount,
                    end_date:this.state.EditCatModel.end_date,
                    flag:this.state.EditCatModel.flag,
                    currencies_id:this.state.EditCatModel.currencies_id,
                    start_date:this.state.date,

                }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            });
            const result = await responseTrans.json();
            if(result.status) {

                let tranIndex=-1;
                let newState = Object.assign({}, this.state);
                this.state.transactions.map((id,index)=>id.id==this.state.EditCatModel.id ? tranIndex=index:"");
                newState.transactions[tranIndex].amount=this.state.EditCatModel.amount;
                newState.transactions[tranIndex].end_date=this.state.EditCatModel.end_date;
                newState.transactions[tranIndex].flag=this.state.EditCatModel.flag;
                newState.transactions[tranIndex].currencies_id=this.state.EditCatModel.currencies_id
                newState.EditCatVisible = false;
                this.setState(newState);
            }
          }catch(err) {
        console.log(err);
          }
    }


    createCategory= async (e)=>{///////////////must udate the users_id
        console.log("create",this.state.InputPop,this.state.selectCategory,e)
        try{
            const responseTrans = await fetch(`http://localhost:8000/categories`,
            {method:
                'POST',
            body:
                JSON.stringify({
                    name:this.state.selectCategory,
                    users_id:1
                }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            });
            const result = await responseTrans.json();
            if(result.status) {
                 try{
                    const responseTrans = await fetch(`http://localhost:8000/transaction/`,
                    {method:
                        'POST',
                    body:
                        JSON.stringify({
                            title:this.state.InputPop,
                            flag:2,
                            amount:0,
                            start_date:this.state.date,
                            interval:2,
                            type:e,
                            categories_id:result.category.id,
                            users_id:1,
                            currencies_id:1
                        }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                    });
                    const resultT = await responseTrans.json();
                    if(resultT.status) {
                        let newCat={
                            id:result.category.id,
                            name:this.state.selectCategory,
                            users_id:1
                        };
                        
                            let newTran={
                                id:resultT.transaction.id,
                                title:this.state.InputPop,
                                flag:2,
                                amount:0,
                                start_date:1/1/20,
                                interval:2,
                                type:e,
                                categories_id:result.category.id,
                                users_id:1,
                                currencies_id:1
                        }
                        
                        this.state.categories.push(newCat);
                        this.state.transactions.push(newTran);
                        this.switchPop();
                    }
                  }catch(err) {
                console.log(err);
                  }
            }
          }catch(err) {
        console.log(err);
          }

    }

    getToken = async () => {
        try {
            const response = await fetch(`http://localhost:8000/login`, {
                method: 'POST',
                body: JSON.stringify({
                    email: 'zeinab@gmail.com',
                    password: 'zeinab'
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            const result = await response.json();
            localStorage.setItem('token', result.access_token)
        } catch(err) {
            console.log(err)
        }
    }
    

    getTransactions = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/transaction', {
                method: 'GET',
                header: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const result = await response.json();
            console.log("oka", result)
            if(result.status){
                this.setState({
                    transactions: result.transaction
                })
                this.TotalExpenseIncome();
            }
        } catch (err) {
            console.log(err);
        }
        };
    
    deleteTransaction = async (id) => {
        try{
            const response = await fetch(`http://localhost:8000/transaction/${id}`,
            {method: "DELETE"});
            const result = await response.json();
            if(result.status) {
                const transactions = this.state.transactions.filter(transaction => transaction.id != id)
                this.setState({transactions})
            }
        } catch(err) {
            console.log(err);
        }
    }

    editCategory=(item)=>{
        this.setState({categoryInput:item})
    }
    editSelectCat=(item)=>{
        this.setState({selectCategory:item})
    }

    editHandler = (item ) => {
        if(item == "cancel"){
            this.setState({isEdit : ! this.state.isEdit})
        }
        else{
            let a=[
                {id:item.id},
                {amount:item.amount},
                {title:item.title},
                {date:item.start_date},
                {focus:1}
            ]
            this.setState({
                isEdit: !this.state.isEdit,
                transTemp:a
            })
        }
    }

    editTransInput=(value,index)=>{
        let newState = Object.assign({}, this.state);
        let key=newState.transTemp;
        const re = /^[0-9]+$/;

        if(index ==4){
            if(value == "title")
                key[4].focus=1
            else if(value == "date")
                key[4].focus=2;
            else if (value == "amount")
                key[4].focus=3 
        }
        else{
            if(index == 2)
                key[index].title=value
            else if(index ==3)
                key[index].date=value
            else if(index==1)
                    key[index].amount=value;
        }
        this.setState(newState);   
    }

    editTransDB = async ()=>{
        try{
            const responseTrans = await fetch(`http://localhost:8000/transaction/${this.state.transTemp[0].id}`,
            {method:
                'PUT',
            body:
                JSON.stringify({
                    title:this.state.transTemp[2].title,
                    amount:this.state.transTemp[1].amount,
                    start_date:this.state.transTemp[3].date
                }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            });
            const result = await responseTrans.json();
            if(result.status) {

                let tranIndex=-1;
                let newState = Object.assign({}, this.state);
                this.state.transactions.map((id,index)=>id.id==this.state.transTemp[0].id ? tranIndex=index:"");
                newState.transactions[tranIndex].title=this.state.transTemp[2].title;
                newState.transactions[tranIndex].amount=this.state.transTemp[1].amount;
                newState.transactions[tranIndex].start_date=this.state.transTemp[3].date;
                newState.isEdit = false;
                this.setState(newState);
            }
          }catch(err) {
        console.log(err);
          }
    }

    getCategories = async () => {
        if(!this.state.flagCategory){
            try {
                const response = await fetch('http://localhost:8000/categories');
                const result = await response.json();  
                if(result.status){
                    this.setState({
                        categories: result.category,
                        flagCategory: true
                    });
                } 
            }catch (err) {
                console.log(err);
            }
        }
    };

    getCurrencies = async () => {
            try {
                const response = await fetch('http://localhost:8000/currencies');
                const result = await response.json();  
                if(result.status){
                    this.setState({
                    currencies: result.currencies
                    })
                } 
            } catch (err) {
                console.log(err);
            }
        };
    
    componentDidMount(){
        this.getToken();
        this.getTransactions();
        // this.getCategories();
        // this.getCurrencies();
    }

    TotalExpenseIncome=()=>{
        let income=0 ,expense=0;
        let a=new Date().getMonth()+1;
        let b= new Date().getDate() + "/" + a + "/" + new Date().getFullYear();
        this.state.transactions.map((id)=>{
              id.type == "income"? income += parseFloat(id.amount) : expense += parseFloat(id.amount) })
            this.setState({ date:b , totalExpense :expense ,totalIncome: income})
    }

    deleteCategories = async (id) => {
        let cat=this.state.categories.filter(cat_id => cat_id.id == id.categories_id);
        this.deleteTransaction(id.id);
        try{
            const response = await fetch(`http://localhost:8000/categories/${cat[0].id}`,
            {method: "DELETE"});
            const result = await response.json();
            if(result.status) {
                const categories = this.state.categories.filter(category => category.id != cat[0].id)
                this.setState({categories})
            }
        } catch(err) {
            console.log(err);
        } 
    }
    onWrapperClick(event) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            });
        }

        this.menuClick = false;
    }
    
    onToggleMenu(event) {
        this.menuClick = true;

        if (this.isDesktop()) {
            if (this.state.layoutMode === 'overlay') {
                this.setState({
                    overlayMenuActive: !this.state.overlayMenuActive
                });
            }
            else if (this.state.layoutMode === 'static') {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive
                });
            }
        }
        else {
            const mobileMenuActive = this.state.mobileMenuActive;
            this.setState({
                mobileMenuActive: !mobileMenuActive
            });
        }

        event.preventDefault();
    }

    onSidebarClick(event) {
        this.menuClick = true;
    }

    onMenuItemClick(event) {
       
        if(!event.item.items) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false, 
                changed:true
            })
        }
        else
        this.setState({changed:true})
    }

    createMenu() {
        this.menu = [
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', command: () => {window.location = '#/'}},
            {label: 'Income', icon: 'fas fa-download', command: () => {window.location = '#/income'}},
            {label: 'Expenses', icon: 'fas fa-upload', command: () => {window.location = '#/expense'}},
            {label: 'Transactions', icon:"fas fa-exchange-alt", command: () => {window.location = '#/transaction'}},
        ];
    }

    shouldComponentUpdate(nextProps, nextState){
        Object.compare = function (obj1, obj2) {
            //Loop through properties in object 1
            for (var p in obj1) {
                //Check property exists on both objects
                if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;
         
                switch (typeof (obj1[p])) {
                    //Deep compare objects
                    case 'object':
                        if (!Object.compare(obj1[p], obj2[p])) return false;
                        break;
                    //Compare function code
                    case 'function':
                        if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
                        break;
                    //Compare values
                    default:
                        if (obj1[p] != obj2[p]) return false;
                }
            }
         
            //Check object 2 for any extra properties
            for (var p in obj2) {
                if (typeof (obj1[p]) == 'undefined') return false;
            }
            return true;
        };
        
       const stateComp= Object.compare(this.state, nextState);
       const propComp = Object.compare(this.props, nextProps);
       console.log(stateComp, propComp);
       if(stateComp ===false ||propComp ===false ||this.state.changed==true)
       return true;
       else 
       return false;
       
    }

    addClass(element, className) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    removeClass(element, className) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    componentDidUpdate() {
        if (this.state.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    }

    editCategoryInput=async()=>{
        let tran=this.state.transactions.filter(id => id.id ==this.state.tempId);
        let cat=this.state.categories.filter(id => id.id == tran[0].categories_id)

        try{
            const responseTrans = await fetch(`http://localhost:8000/transaction/${this.state.tempId}`,
            {method:
                'PUT',
            body:
                JSON.stringify({title:this.state.categoryInput}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            });
            const result = await responseTrans.json();
            if(result.status) {
                try{
                    const response = await fetch(`http://localhost:8000/categories/${cat[0].id}`,
                    {method:
                        'PUT',
                    body:
                        JSON.stringify({name:this.state.selectCategory}),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                    });
                    const resultTrans = await response.json();
                    if(resultTrans.status) {

                        let catIndex=-1,tranIndex=-1;
                        this.state.categories.map((id,index)=>id.id==cat[0].id?catIndex=index:"");
                        let newState = Object.assign({}, this.state);
                        this.state.transactions.map((id,index)=>id.id==this.state.tempId?tranIndex=index:"");
                        
                        newState.transactions[tranIndex].title=this.state.categoryInput;
                        newState.categories[catIndex].name=this.state.selectCategory;
                        newState.flagEdit=false;

                        this.setState(newState); 

                    }

        }catch(err){
            console.log(err)
        }
    }}catch(err) {
        console.log(err);
    }  


    }



    render() {
        const logo = this.state.layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg': 'assets/layout/images/logo.svg';

        const wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive
        });

        const sidebarClassName = classNames("layout-sidebar", {
            'layout-sidebar-dark': this.state.layoutColorMode === 'dark',
            'layout-sidebar-light': this.state.layoutColorMode === 'light'
        });

        

        return (
            
            <div className={wrapperClass} onClick={this.onWrapperClick}>
                <AppTopbar onToggleMenu={this.onToggleMenu}/>
                <div ref={(el) => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}>
                    <div className="layout-logo">
                        <img alt="Logo" src={logo} />
                    </div>
                    <AppProfile />
                    <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
                </div>
            <div className="layout-main">
                <Route path="/transaction" render={(props) => {/*  this.setState({changed:!this.state.changed}); */ return <Tranaction 
                                                                    transactions={this.state.transactions}
                                                                    editHandler={this.editHandler}
                                                                    isEdit={this.state.isEdit}
                                                                    updateTransaction={this.updateTransaction}
                                                                    title={this.state.title}
                                                                    deleteCategories={this.deleteCategories}
                                                                    transTemp={this.state.transTemp}
                                                                    editTransInput={this.editTransInput}
                                                                    editTransDB={this.editTransDB}
                                                                    {...props}
                                                                    /> } }/>
                <Route path="/login" exact component={Login} />
                <Route path="/" exact render={(props) => ( < Account 
                                                                    totalExpense={this.state.totalExpense}
                                                                    totalIncome={this.state.totalIncome}
                                                                    date={this.state.date}
                                                                    {...props}
                                                                    />)} />
                <Route path="/save" exact  component={Save} />
                <Route path="/income" exact render={(props) => ( <Income
                                                                    transactions={this.state.transactions} 
                                                                    categories={this.state.categories}
                                                                    currencies={this.state.currencies}
                                                                    
                                                                    deleteCategories={this.deleteCategories}
                                                                    editCategoryInput={this.editCategoryInput}
                                                                    flagEdit={this.state.flagEdit}
                                                                    switch={this.switch}
                                                                    titleCategory={this.state.titleCategory}
                                                                    editCategory={this.editCategory}
                                                                    categoryInput={this.state.categoryInput}
                                                                    cancel={this.cancel}
                                                                    editSelectCat={this.editSelectCat}
                                                                    selectCategory={this.state.selectCategory}
                                                                    
                                                                    visibleCategoryPop={this.state.visibleCategoryPop}
                                                                    switchPop={this.switchPop}
                                                                    InputPop={this.state.InputPop}
                                                                    setInputPop={this.setInputPop}
                                                                    createCategory={this.createCategory}

                                                                    EditCatVisible={this.state.EditCatVisible}
                                                                    switchEditCatVisible={this.switchEditCatVisible}
                                                                    EditCatModel={this.state.EditCatModel}
                                                                    ChangeEditCatModel={this.ChangeEditCatModel}
                                                                    ChangeEditCatModelDB={this.ChangeEditCatModelDB}

                                                                    totalExpense={this.state.totalExpense}
                                                                    totalIncome={this.state.totalIncome}
                                                                    {...props}
                                                                    /> )} />
                <Route path="/expense" exact render={(props) => ( <Expense 
                                                                    transactions={this.state.transactions}
                                                                    categories={this.state.categories}
                                                                    currencies={this.state.currencies}
                                                                    
                                                                    deleteCategories={this.deleteCategories}
                                                                    editCategoryInput={this.editCategoryInput}
                                                                    flagEdit={this.state.flagEdit}
                                                                    switch={this.switch}
                                                                    titleCategory={this.state.titleCategory}
                                                                    editCategory={this.editCategory}
                                                                    categoryInput={this.state.categoryInput}
                                                                    cancel={this.cancel}
                                                                    editSelectCat={this.editSelectCat}
                                                                    selectCategory={this.state.selectCategory}

                                                                    visibleCategoryPop={this.state.visibleCategoryPop}
                                                                    switchPop={this.switchPop}
                                                                    InputPop={this.state.InputPop}
                                                                    setInputPop={this.setInputPop}
                                                                    createCategory={this.createCategory}

                                                                    EditCatVisible={this.state.EditCatVisible}
                                                                    switchEditCatVisible={this.switchEditCatVisible}
                                                                    EditCatModel={this.state.EditCatModel}
                                                                    ChangeEditCatModel={this.ChangeEditCatModel}
                                                                    ChangeEditCatModelDB={this.ChangeEditCatModelDB}

                                                                    totalExpense={this.state.totalExpense}
                                                                    totalIncome={this.state.totalIncome}
                                                                    {...props}
                                                                    /> )} />
            </div>

                <div className="layout-mask"></div>
            </div>
        );
    }
}

export default App;