import React, { Component } from 'react';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      signStatus : true,
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
  `;

   Description = styled.div`
    background-color: rgb(81, 197, 183);
    width: 50%;
   `;

   Login = styled.div`
    width: 50%;
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
    margin-top: 90px;
    margin-left: 80px;
    margin-bottom: 20px;
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
    handleClickLogin = () => {
      this.setState({
        signStatus: false,
      })
    }
    handleClickSignup = () => {
      this.setState({
        signStatus: true,
      })
    }
    signUpForm = <form style={{marginLeft: "80px"}}>
      <label for="username" style={{display:"block", color: "#fff"}}>USERNAME</label>
      <this.Input name="username" placeholder="Enter you Username" />
      <label for="email" style={{display:"block", color: "#fff"}}>EMAIL</label>
      <this.Input type="email" name="email" placeholder="Enter you Email" />
      <label for="password" style={{display:"block", color: "#fff"}}>PASSWORD</label>
      <this.Input type="password" name="password" placeholder="Enter you Password" style={{display:"block"}} />
      <div style={{color: '#ccc', fontWeight: 'bold', marginTop: "20px"}}><input type="checkbox" style={{cursor:"pointer"}}/> I agree all statements in <span style={{color:'#fff', borderBottom:'2px solid rgb(81, 197, 183)'}}>terms of service</span></div>
      <this.SignUpButton>Sign Up</this.SignUpButton>
      <span style={{marginLeft: '10px', color: '#E1E1E1',borderBottom:'2px solid rgb(81, 197, 183)', cursor:"pointer"}} onClick={this.handleClickSignup}>I'm already a member</span>
    </form>;

    signInForm = <form style={{marginLeft: "80px"}}>
    <label for="username" style={{display:"block", color: "#fff"}}>USERNAME</label>
    <this.Input name="username" placeholder="Enter you Username" />
    <label for="password" style={{display:"block", color: "#fff"}}>PASSWORD</label>
    <this.Input type="password" name="password" placeholder="Enter you Password" style={{display:"block"}} />
    <this.SignUpButton>Sign In</this.SignUpButton>
    <span style={{marginLeft: '10px', color: '#E1E1E1',borderBottom:'2px solid rgb(81, 197, 183)', cursor:"pointer"}} onClick={this.handleClickLogin}>Sign Up</span>
  </form>;
    
  render() {
    return (
      <this.Wrapper>
        <this.Description>
        <Carousel style={{marginTop: '280px'}} interval={5500} pauseOnHover={true} touch={true}  wrap={true} animation={false} pauseOnVisibility={false} nextIcon={false} prevIcon={false}>
            <Carousel.Item  >
              <Carousel.Caption style={{position: 'relative',left:'0',right:'0'}}>
                <div>Ipocket</div>
              </Carousel.Caption>
                 
           </Carousel.Item>
           <Carousel.Item>
           <Carousel.Caption style={{position: 'relative',left:'0',right:'0'}}>
              <div>Hello World</div>
              </Carousel.Caption>
           </Carousel.Item>
        </Carousel>
        </this.Description>
        <this.Login>
          <div style={{textAlign: "right", margin: "20px 20px 0 0"}} >
          <this.Button2 onClick={this.handleClickSignup} signStatus={this.state.signStatus}>Sign In</this.Button2>
          <this.Button1 onClick={this.handleClickLogin} signStatus={this.state.signStatus}>Sign Up</this.Button1>
          </div>
          <this.Header signStatus={this.state.signStatus}>
            <div className="signInTitle">Sign In</div>
            <div className="btw">or</div>
            <div className="signUpTitle">Sign Up</div>
          </this.Header>
          {this.state.signStatus ? this.signInForm : this.signUpForm}
          
        </this.Login>
      </this.Wrapper>
    );
  }
}

export default Login;