import React, { Component } from 'react';
import classNames from 'classnames';
import { AppTopbar } from '../AppTopbar';
import { AppMenu } from '../AppMenu';
import { AppProfile } from '../AppProfile';
import { Route, withRouter } from 'react-router-dom';
import Tranaction from './transaction';
import Account from './account/account';
import Login from './login';
import Save from '../components/Save/Save';
import Income from '../pages/income';
import Expense from '../pages/expense';
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
      filterDate: {
        dateFrom: '',
        dateTo:
          new Date().getFullYear() +
          '-' +
          (new Date().getMonth() + 1) +
          '-' +
          new Date().getDate(),
      },
      categories: [],
      currencies: [],
      date: '',

      totalIncome: 0,
      totalExpense: 0,

      title: '',
    };
    this.onWrapperClick = this.onWrapperClick.bind(this);
    this.onToggleMenu = this.onToggleMenu.bind(this);
    this.onSidebarClick = this.onSidebarClick.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.createMenu();
  }
  ChangeEditCatModelDB = async (item) => {
    /////////////*****************////////// */
    try {
      const token = localStorage.getItem('token');
      const responseTrans = await fetch(
        `http://localhost:8000/api/transaction/${item.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            amount: item.amount,
            start_date: item.start_date,
            flag: item.flag,
            currencies_id: item.currencies_id,
            title : item.title
          }),
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );console.log(item)
      const result = await responseTrans.json();
      if (result.status) {
        let tranIndex = -1;
        let newState = Object.assign({}, this.state);
        this.state.transactions.map((id, index) =>
          id.id == item.id ? (tranIndex = index) : ''
        );
        newState.transactions[tranIndex].amount = item.amount;
        newState.transactions[tranIndex].start_date = item.start_date;
        newState.transactions[tranIndex].flag = item.flag;
        newState.transactions[tranIndex].currencies_id = item.currencies_id;
        this.setState(newState);
        this.TotalExpenseIncome();
        this.forceUpdate();
      }
    } catch (err) {
      console.log(err);
    }
  };

  createCategory = async (e, trans, cat) => {
    ///////////***************//////////// */
    try {
      const token = localStorage.getItem('token');
      const responseTrans = await fetch(`http://localhost:8000/api/categories`, {
        method: 'POST',
        body: JSON.stringify({
          name: cat,
          users_id: localStorage.getItem('userID'),
        }),
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const result = await responseTrans.json();
      if (result.status) {
        try {
          const token = localStorage.getItem('token');
          const responseTrans = await fetch(
            `http://localhost:8000/api/transaction/`,
            {
              method: 'POST',
              body: JSON.stringify({
                title: trans,
                flag: 2,
                amount: 0,
                start_date:
                  new Date().getFullYear() +
                  '-' +
                  (new Date().getMonth() + 1) +
                  '-' +
                  new Date().getDate(),
                interval: 2,
                type: e,
                categories_id: result.category.id,
                users_id: localStorage.getItem('userID'),
                currencies_id: 1,
              }),
              headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            }
          );
          const resultT = await responseTrans.json();
          if (resultT.status) {
            let newCat = {
              id: result.category.id,
              name: cat,
              users_id: localStorage.getItem('userID'),
            };

            let newTran = {
              id: resultT.transaction.id,
              title: trans,
              flag: 2,
              amount: 0,
              start_date:
                new Date().getFullYear() +
                '-' +
                (new Date().getMonth() + 1) +
                '-' +
                new Date().getDate(),
              interval: 2,
              type: e,
              categories_id: result.category.id,
              users_id: localStorage.getItem('userID'),
              currencies_id: 1,
            };
           

            this.setState({
              transactions: [...this.state.transactions, newTran],
              categories: [...this.state.categories, newCat],
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleFrom = (e) => {
    /////////*************/////////////// */
    e.preventDefault();
    let filterDate = { ...this.state.filterDate };
    const name = e.target.name;
    filterDate[name] = e.target.value;
    this.setState({ filterDate }, () => {
      let transactions = [...this.state.transactions];
      const filteredTransactions = transactions.filter(
        (transaction) =>
          new Date(transaction.start_date).getTime() >=
            new Date(this.state.filterDate.dateFrom).getTime() &&
          new Date(transaction.start_date).getTime() <=
            new Date(this.state.filterDate.dateTo).getTime()
      );
      if(this.state.filterDate.dateFrom === "" && this.state.filterDate.dateTo === ""){
        this.getTransactions();
        }else {
            this.setState({ transactions: filteredTransactions });
        }
     
     
    });
  };

  getTransactions = async () => {
    /////////***********////////// */
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/api/transaction/${localStorage.getItem('userID')}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const result = await response.json();
      //const final = result.transaction.filter(final => final.start_date != final.end_date)
      if (result.status == 'success') {
        this.setState({
          transactions: result.transaction,
        },()=>this.TotalExpenseIncome());
      }
    } catch (err) {
      console.log(err);
    }
  };

  deleteTransaction = async (id) => {
    /////////************//////// */
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/api/transaction2/${id}`, {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const result = await response.json();
        const transactions = this.state.transactions.filter(
          (transaction) => transaction.id != id
        );
        this.setState({ transactions }, async () => {
            const trans = await fetch(`http://localhost:8000/api/transaction/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    end_date : result.transaction.start_date
                }),
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                  },
            })
        });
      }
     catch (err) {
      console.log(err);
    }
  };


  getCategories = async () => {
    ////////////*************///////// */
    if (!this.state.flagCategory) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/categories', {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        const result = await response.json();
        if (result.status) {
          this.setState({
            categories: result.category,
            flagCategory: true,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  getCurrencies = async () => {
    ///////////***********////////// */
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/currencies', {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const result = await response.json();
      if (result.status) {
        this.setState({
          currencies: result.currencies,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.getTransactions();
      this.getCategories();
      this.getCurrencies();
    } else {
      window.location = '#/';
    }
  }

  TotalExpenseIncome = () => {
    ///////////****************//// */
    let income = 0,
      expense = 0;
    let a = new Date().getMonth() + 1;
    let b = new Date().getDate() + '-' + a + '-' + new Date().getFullYear();
    this.state.transactions.map((id) => {
      id.type == 'income'
        ? (income += parseFloat(id.amount))
        : (expense += parseFloat(id.amount));
    });
    this.setState({ date: b, totalExpense: expense, totalIncome: income });
    this.forceUpdate();
  };

  deleteCategories = async (id) => {
    ////////////************/////////// */
    let cat = this.state.categories.filter(
      (cat_id) => cat_id.id == id.categories_id
    );
    this.deleteTransaction(id.id);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:8000/api/categories/${cat[0].id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      const result = await response.json();
      if (result.status) {
        const categories = this.state.categories.filter(
          (category) => category.id != cat[0].id
        );
        this.setState({ categories });
      }
    } catch (err) {
      console.log(err);
    }
  };
  onWrapperClick(event) {
    if (!this.menuClick) {
      this.setState({
        overlayMenuActive: false,
        mobileMenuActive: false,
      });
    }

    this.menuClick = false;
  }

  onToggleMenu(event) {
    this.menuClick = true;

    if (this.isDesktop()) {
      if (this.state.layoutMode === 'overlay') {
        this.setState({
          overlayMenuActive: !this.state.overlayMenuActive,
        });
      } else if (this.state.layoutMode === 'static') {
        this.setState({
          staticMenuInactive: !this.state.staticMenuInactive,
        });
      }
    } else {
      const mobileMenuActive = this.state.mobileMenuActive;
      this.setState({
        mobileMenuActive: !mobileMenuActive,
      });
    }

    event.preventDefault();
  }

  onSidebarClick(event) {
    this.menuClick = true;
  }

  onMenuItemClick(event) {
    if (!event.item.items) {
      this.setState({
        overlayMenuActive: false,
        mobileMenuActive: false,
        changed: true,
      });
    } else this.setState({ changed: true });
  }

  createMenu() {
    this.menu = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        command: () => {
          window.location = '#/account';
        },
      },
      {
        label: 'Income',
        icon: 'fas fa-download',
        command: () => {
          window.location = '#/income';
        },
      },
      {
        label: 'Expenses',
        icon: 'fas fa-upload',
        command: () => {
          window.location = '#/expense';
        },
      },
      {
        label: 'Transactions',
        icon: 'fas fa-exchange-alt',
        command: () => {
          window.location = '#/transaction';
        },
      },
      {
        label: 'Log Out',
        icon: 'fas fa-power-off',
        command: () => {
          localStorage.clear();
          window.location = '#/';
        },
      },
    ];
  }

  shouldComponentUpdate(nextProps, nextState) {
    Object.compare = function (obj1, obj2) {
      //Loop through properties in object 1
      for (var p in obj1) {
        //Check property exists on both objects
        if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

        switch (typeof obj1[p]) {
          //Deep compare objects
          case 'object':
            if (!Object.compare(obj1[p], obj2[p])) return false;
            break;
          //Compare function code
          case 'function':
            if (
              typeof obj2[p] == 'undefined' ||
              (p != 'compare' && obj1[p].toString() != obj2[p].toString())
            )
              return false;
            break;
          //Compare values
          default:
            if (obj1[p] != obj2[p]) return false;
        }
      }

      //Check object 2 for any extra properties
      for (var p in obj2) {
        if (typeof obj1[p] == 'undefined') return false;
      }
      return true;
    };

    const stateComp = Object.compare(this.state, nextState);
    const propComp = Object.compare(this.props, nextProps);
    if (stateComp === false || propComp === false || this.state.changed == true)
      return true;
    else return false;
  }

/*   addClass(element, className) {
    if (element.classList) element.classList.add(className);
    else element.className += ' ' + className;
  }

  removeClass(element, className) {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      );
  } */

  isDesktop() {
    return window.innerWidth > 1024;
  }

  componentDidUpdate() {
    /* if (this.state.mobileMenuActive)
      this.addClass(document.body, 'body-overflow-hidden');
    else this.removeClass(document.body, 'body-overflow-hidden'); */
  }

  editCategoryInput = async (trans, cat) => {
    //////////***************////////// */
    const token = localStorage.getItem('token');

    try {
      const responseTrans = await fetch(
        `http://localhost:8000/api/transaction/${trans.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ title: trans.title }),
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      const result = await responseTrans.json();
      if (result.status) {
        try {
          const response = await fetch(
            `http://localhost:8000/api/categories/${trans.categories_id}`,
            {
              method: 'PUT',
              body: JSON.stringify({ name: cat }),
              headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            }
          );
          const resultTrans = await response.json();
          if (resultTrans.status) {
            let catIndex = -1,
              tranIndex = -1;
            this.state.categories.map((id, index) =>
              id.id == trans.categories_id ? (catIndex = index) : ''
            );
            let newState = Object.assign({}, this.state);
            this.state.transactions.map((id, index) =>
              id.id == trans.id ? (tranIndex = index) : ''
            );

            newState.transactions[tranIndex].title = trans.title;
            newState.categories[catIndex].name = cat;

            this.setState(newState);
            this.forceUpdate();
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  SavingInsert=async(value,start,interval)=>{
    //////////////*******************////////// */
    try {
      const token = localStorage.getItem('token');
      const responseTrans = await fetch(
        `http://localhost:8000/api/transaction/`,
        {
          method: 'POST',
          body: JSON.stringify({
            title: 'saving',
            flag: 1,
            amount: parseFloat(value),
            start_date:
              new Date().getFullYear() +
              '-' +
              (new Date().getMonth() + 1) +
              '-' +
              new Date().getDate(),
            end_date:start,
            interval:parseInt(interval),
            type: 'expense',
            categories_id: 18,
            users_id: localStorage.getItem('userID'),
            currencies_id: 1,
          }),
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      const resultT = await responseTrans.json();
      if (resultT.status) {
      

        let newTran = {
          id: resultT.transaction.id,
          title: 'saving',
          flag: 2,
          amount: 0,
          start_date:
            new Date().getFullYear() +
            '-' +
            (new Date().getMonth() + 1) +
            '-' +
            new Date().getDate(),
          end_date:start,
          interval: 2,
          type: 'expense',
          categories_id:18,
          users_id: localStorage.getItem('userID'),
          currencies_id: 1,
        };
       

        this.setState({
          transactions: [...this.state.transactions, newTran]
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const logo =
      this.state.layoutColorMode === 'dark'
        ? 'assets/layout/images/logo-white.svg'
        : 'assets/layout/images/logo.svg';

    const wrapperClass = classNames('layout-wrapper', {
      'layout-overlay': this.state.layoutMode === 'overlay',
      'layout-static': this.state.layoutMode === 'static',
      'layout-static-sidebar-inactive':
        this.state.staticMenuInactive && this.state.layoutMode === 'static',
      'layout-overlay-sidebar-active':
        this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
      'layout-mobile-sidebar-active': this.state.mobileMenuActive,
    });

    const sidebarClassName = classNames('layout-sidebar', {
      'layout-sidebar-dark': this.state.layoutColorMode === 'dark',
      'layout-sidebar-light': this.state.layoutColorMode === 'light',
    });

    return (
      <div className={wrapperClass} onClick={this.onWrapperClick}>
        <AppTopbar onToggleMenu={this.onToggleMenu} />
        <div
          ref={(el) => (this.sidebar = el)}
          className={sidebarClassName}
          onClick={this.onSidebarClick}
        >
         {/*  <div className="layout-logo">
            <img alt="Logo" src={logo} />
          </div> */}
          <AppProfile />
          <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
        </div>
        <div className="layout-main">
          <Route
            path="/transaction"
            render={(props) => {
               return (
                <Tranaction
                  transactions={this.state.transactions}
                  dateFrom={this.state.filterDate.dateFrom}
                  dateTo={this.state.filterDate.dateTo}
                  handleFrom={this.handleFrom}
                  deleteCategories={this.deleteCategories}
                  ChangeEditCatModelDB={this.ChangeEditCatModelDB}
                  {...props}
                />
              );
            }}
          />
          <Route path="/" exact render={(props) => <Login />} />
          <Route
            path="/account"
            render={(props) => (
              <Account
                totalExpense={this.state.totalExpense}
                totalIncome={this.state.totalIncome}
                date={this.state.date}
                transactions={this.state.transactions}
                SavingInsert={this.SavingInsert}
                {...props}
              />
            )}
          />
          <Route path="/save" component={Save} />
          <Route
            path="/income"
            render={(props) => (
              <Income
                transactions={this.state.transactions} 
                categories={this.state.categories} 
                currencies={this.state.currencies} 
                deleteCategories={this.deleteCategories} 
                editCategoryInput={this.editCategoryInput} 
                createCategory={this.createCategory} 
                ChangeEditCatModelDB={this.ChangeEditCatModelDB}
                totalExpense={this.state.totalExpense}
                totalIncome={this.state.totalIncome}
                {...props}
              />
            )}
          />
          <Route
            path="/expense"
            render={(props) => (
              <Expense
                transactions={this.state.transactions} 
                categories={this.state.categories}
                currencies={this.state.currencies} 
                deleteCategories={this.deleteCategories} 
                editCategoryInput={this.editCategoryInput} 
                createCategory={this.createCategory} 
                ChangeEditCatModelDB={this.ChangeEditCatModelDB} 
                totalExpense={this.state.totalExpense}
                totalIncome={this.state.totalIncome}
                {...props}
              />
            )}
          />
        </div>

        <div className="layout-mask"></div>
      </div>
    );
  }
}

export default App;
