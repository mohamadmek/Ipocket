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
            
            isEdit: false,
            transTemp:[],
            
            title: "",
            flagEdit:false,
            titleCategory:[],
            categoryInput:[],
            selectCategory:"",
            tempId:-1
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
    

    getTransactions = async () => {
        try {
            const response = await fetch('http://localhost:8000/transaction');
            const result = await response.json();
            
            if(result.status){
                this.setState({
                    transactions: result.transaction
                })
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

    updateTransaction = () => {
        
        console.log("hel")
        
    }

    editCategory=(item)=>{
        this.setState({categoryInput:item})
    }
    editSelectCat=(item)=>{
        this.setState({selectCategory:item})
    }

    editHandler = (item ) => {
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

    editTransInput=(value,index)=>{
        let newState = Object.assign({}, this.state);
        let key=newState.transTemp[index];
        if(index == 2){
            key.title=value
        }
        else if(index ==3){
            key.date=value
        }
        else if(index==1){
            key.amount=value
        }
        this.setState(newState);        
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
        this.getTransactions();
        this.getCategories();
        this.getCurrencies();
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
                mobileMenuActive: false
            })
        }
    }

    createMenu() {
        this.menu = [
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', command: () => {window.location = '#/'}},
            {label: 'Income', icon: 'fas fa-download', command: () => {window.location = '#/income'}},
            {label: 'Expenses', icon: 'fas fa-upload', command: () => {window.location = '#/expense'}},
            {label: 'Transactions', icon:"fas fa-exchange-alt", command: () => {window.location = '#/transaction'}},
        ];
    }

   /*  shouldComponentUpdate(nextProps, nextState){
        if(this.state.transactions === nextState.transactions && this.state.categories === nextState.categories){
            return false;
        }
        else{
            return true;
        }
    } */

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
                <Route path="/transaction" 
                component={() => ( <Tranaction 
                                transactions={this.state.transactions}
                                editHandler={this.editHandler}
                                isEdit={this.state.isEdit}
                                updateTransaction={this.updateTransaction}
                                title={this.state.title}
                                deleteCategories={this.deleteCategories}
                                transTemp={this.state.transTemp}
                                editTransInput={this.editTransInput}
                                /> )} />
                <Route path="/login" exact component={Login} />
                <Route path="/" exact component={Account} />
                <Route path="/save" exact  component={Save} />
                <Route path="/income" exact component={() => ( <Income
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
                                                                    /> )} />
                <Route path="/expense" exact component={() => ( <Expense 
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

                                                                    /> )} />
            </div>

                <div className="layout-mask"></div>
            </div>
        );
    }
}

export default App;