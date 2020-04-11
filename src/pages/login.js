import React, { Component } from 'react';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      signStatus : true,
      email: null,
      password: null,
      error: '',
      message: '',
      registrationInfo: {
        username: '',
        email: '',
        password: '',
        currency: '3',
        amount: null,
        image: '',
      }
    }
  }
   Wrapper = styled.div`
    display: flex;
    z-index: 1000;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    flex-wrap: wrap;
    @media all and (max-width: 588px){
      .d_mn{
        display: none;
      }
    }
  `;

   Description = styled.div`
    background-color: rgb(81, 197, 183);
    width: 50%;
   `;

   Login = styled.div`
    width: 50%;
    @media all and (max-width:588px){
      width:100%;
    }
    background: linear-gradient(270deg, rgb(52, 74, 94), rgb(52, 74, 94), rgb(52, 74, 94));
    background-size: 600% 600%;
    -webkit-animation: AnimationName 38s ease infinite;
    -moz-animation: AnimationName 38s ease infinite;
    animation: AnimationName 38s ease infinite;

@-webkit-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@-moz-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
   `;

   Button1 = styled.button`
    padding: 10px 15px;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    background-color: ${props => props.signStatus ? 'rgb(95, 113, 132)' : 'rgb(81, 197, 183)'};
    border: none;
    cursor: pointer;
    font-weight: bold;
    color: #fff;
   `;

    Button2 = styled.button`
    padding: 10px 15px;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    background-color: ${props => props.signStatus ? 'rgb(81, 197, 183)' : 'rgb(95, 113, 132)'};
    border: none;
    cursor: pointer;
    font-weight: bold;
    color: #fff;
    `;

    Header = styled.div`
    display: flex;
    margin-top: 70px;
    margin-left: 80px;
    margin-bottom: 20px;
    @media all and (max-width: 870px){
      margin-left: 30px !important;
      
    }
    .btw{
      margin: 0 8px;
      padding-top: 5px;
      color: #E1E1E1;
    }
    .signInTitle,.signUpTitle{
      font-size: 1.4rem;
      color: #E1E1E1;
      font-weight: 400;
    }
    .signInTitle{
      color: ${props => props.signStatus ? '#fff' : '#E1E1E1'};
      padding-bottom: ${props => props.signStatus ? '5px' : '0px'};
      border-bottom: ${props => props.signStatus ? '2px solid rgb(81, 197, 183)' : 'none'};
    }
    .signUpTitle{
      color: ${props => props.signStatus ? '#E1E1E1' : '#fff'};
      padding-bottom: ${props => props.signStatus ? '0px' : '5px'};
      border-bottom: ${props => props.signStatus ? 'none' : '2px solid rgb(81, 197, 183)'};
    }
    `;

    Input = styled.input`
      background: none;
      border-top: none;
      border-right: none;
      border-left: none;
      border-color: rgb(95, 113, 132);
      font-size: 14px;
      color: #E1E1E1;
      margin-top: 0px;
      padding-right: 50%;
      margin-bottom: 10px;
      @media all and (max-width: 870px){
        padding-right:20%;
      }
    `;

    SignUpButton = styled.button`
      padding: 10px 40px;
      border-radius: 50px;
      background-color: rgb(81, 197, 183);
      border: none;
      margin-top: 20px;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
    `;
    Form = styled.form`
      margin-left: 80px;
      @media all and (max-width: 870px){
        margin-left:30px;
      }
    `;
    handleClickLogin = () => {
      this.setState({
        signStatus: false,
        message: ''
      })
    }
    handleClickSignup = () => {
      this.setState({
        signStatus: true,
        message: '',
      })
    }

    handleSignIn = async (e) => {
      e.preventDefault();
      try {
        // const body = new FormData();
        // body.append('email', this.state.email);
        // body.append('password', this.state.password);
        const response = await fetch('http://localhost:8000/login', {
          method: 'POST',
          body: JSON.stringify({
                            email: `${this.state.email}`,
                            password: `${this.state.password}`
                        }),
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
        })
        const result = await response.json();
        localStorage.setItem('token', result.access_token)
        if(result.access_token) {
          // this.props.history.push('/account');
          // return <Redirect to="/account" />
          // this.Wrapper = styled.div`display: none;`
          this.Wrapper = styled.div`display: none;`
          console.log('token', localStorage.getItem('token'))
        window.location = '#/account'
        this.setState({email: '', password: ''})
        } else {
          this.setState({ error: 'Login Failed',email: '', password: '', message: 'Password or email Wrong' })
          this.Wrapper = styled.div`
          display: flex;
          z-index: 1000;
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          flex-wrap: wrap;`
        }
  
      } catch(err) {
        console.log(err)
        this.setState({ error: err })
      }
    }

    changeHandler = (e) => {
      e.preventDefault();
      let registrationInfo = {...this.state.registrationInfo}
      let name = e.target.name;
      registrationInfo[name] = e.target.value;
      this.setState({ registrationInfo })
    }

    

    handleSignUp = async (e) => {
      e.preventDefault();
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        body: JSON.stringify({
          name: this.state.registrationInfo.username,
          email: this.state.registrationInfo.email,
          password: this.state.registrationInfo.password,
          currencies_id: parseInt(this.state.registrationInfo.currency),
          amount:  this.state.registrationInfo.amount,
          image: 'mohamad'
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
      })
      const result = await response.json()
      if(result.access_token){
        this.setState({ 
          registrationInfo: {
            username: '',
            email: '',
            password: '',
            currency: '',
            amount: '',
            image: '',
          },
          message: 'Successfully Signed up',
        })
        
      }else{
        this.setState({
          message: 'Sign up Failed'
        })
      }
    }

    

    signUpForm = () => {
      return (
        <this.Form onSubmit={e => this.handleSignUp(e)}>
      <label for="username" style={{display:"block", color: "#fff"}}>USERNAME</label>
      <this.Input
        name="username" 
        placeholder="Enter you Username"
        onChange={this.changeHandler}
        value={this.state.registrationInfo.username}
        />
      <label for="email" style={{display:"block", color: "#fff"}}>EMAIL</label>
      <this.Input value={this.state.registrationInfo.email} onChange={this.changeHandler}  type="email" name="email" placeholder="Enter you Email" />
      <label for="password" style={{display:"block", color: "#fff"}}>PASSWORD</label>
      <this.Input value={this.state.registrationInfo.password} onChange={this.changeHandler} type="password" name="password" placeholder="Enter you Password" style={{display:"block"}} />

      <label for="amount" style={{display:"block", color: "#fff"}}>AMOUNT</label>
      <this.Input value={this.state.registrationInfo.amount} onChange={this.changeHandler} type="number" name="amount" placeholder="Enter you Amount" style={{display:"block"}} />

      <select value={this.state.registrationInfo.currency} onChange={this.changeHandler} name="currency" style={{display: 'block', marginTop: '5px'}}>
        <option value="1">$</option>
        <option value="2">€</option>
        <option value="3">LBP</option>
      </select>
      <div style={{color: '#ccc', fontWeight: 'bold', marginTop: "20px"}}><input type="checkbox" style={{cursor:"pointer"}}/> I agree all statements in <span style={{color:'#fff', borderBottom:'2px solid rgb(81, 197, 183)'}}>terms of service</span></div>
      <div style={{color: '#ccc', fontWeight:'bold', fontSize:'18px'}}>{ this.state.message }</div>
      <this.SignUpButton>Sign Up</this.SignUpButton>
      <span style={{marginLeft: '10px', color: '#E1E1E1',borderBottom:'2px solid rgb(81, 197, 183)', cursor:"pointer"}} onClick={this.handleClickSignup}>I'm already a member</span>
    </this.Form>
      )
    }
    
    

    signInForm = () => {
      return (
        <this.Form onSubmit={e => this.handleSignIn(e)}>
    <label for="email" style={{display:"block", color: "#fff"}}>Email</label>
    <this.Input
    type="email" 
    name="email" 
    placeholder="Enter you Email"
    onChange={e => this.setState({ email: e.target.value })}
    value={this.state.email}
    />
    <label for="password" style={{display:"block", color: "#fff"}}>PASSWORD</label>
    <this.Input 
      type="password" 
      name="password" 
      placeholder="Enter you Password" 
      style={{display:"block"}}
      value={this.state.password}
      onChange={e => this.setState({ password: e.target.value })} />
      <div style={{color:'#ccc', fontWeight: 'bold', fontSize: '20px'}}>{this.state.message}</div>
    <this.SignUpButton type="submit">Sign In</this.SignUpButton>
    <span style={{marginLeft: '10px', color: '#E1E1E1',borderBottom:'2px solid rgb(81, 197, 183)', cursor:"pointer"}} onClick={this.handleClickLogin}>Sign Up</span>
  </this.Form>
      )
    }
    
    
  render() {
    return (
      <this.Wrapper>
        <this.Description className="d_mn">
        <Carousel style={{marginTop: '220px'}} interval={5500} pauseOnHover={true} touch={true}  wrap={true} animation={false} pauseOnVisibility={false} nextIcon={false} prevIcon={false}>
            <Carousel.Item  style={{marginBottom: '240px'}}>
              <Carousel.Caption style={{position: 'relative',left:'0',right:'0'}}>
                <h1 style={{fontSize: '5rem'}}>Ipocket</h1>
              </Carousel.Caption>
                 
           </Carousel.Item>
           <Carousel.Item style={{marginBottom: '100px'}}>
           <Carousel.Caption style={{position: 'relative',left:'0',right:'0', padding: '20px'}}>
           <h3 style={{fontSize: '1.7rem',}}>
             <div>Ipocket</div>
           It automatically tracks your spending, categorizes it, and alerts you when/if you approach your budget limit. You can even ask for custom savings tips within the app.
           everything is shown in simple, intuitive graphs and charts, making it one of the most popular personal finance apps in the world.
           </h3>
              </Carousel.Caption>
           </Carousel.Item>
        </Carousel>
        </this.Description>
        <this.Login class="m_w100">
          <div style={{textAlign: "right", margin: "20px 20px 0 0"}} >
          <this.Button2 onClick={this.handleClickSignup} signStatus={this.state.signStatus}>Sign In</this.Button2>
          <this.Button1 onClick={this.handleClickLogin} signStatus={this.state.signStatus}>Sign Up</this.Button1>
          </div>
          <this.Header signStatus={this.state.signStatus}>
            <div className="signInTitle">Sign In</div>
            <div className="btw">or</div>
            <div className="signUpTitle">Sign Up</div>
          </this.Header>
          {this.state.signStatus ? this.signInForm() : this.signUpForm()}
          
        </this.Login>
      </this.Wrapper>
    );
  }
}

 export default Login; 