import React from 'react';
import { Component } from 'react';
import UserService from '../services/UserService'

export default class Signup extends Component {
    state = {
        userDetails: {
            email: '',
            password: ''
        }
    }

    handleInput = (ev) => {
        const {value , id} = ev.target
        this.setState(prevState => {
            return {
                userDetails: {
                    ...prevState.userDetails,
                    [id]: value
                }
            }
        })
    }

    createAccount = () => {
        const {email,password} = this.state.userDetails;
        if(email && password){      
              UserService.signup(this.state.userDetails);
              console.log('Register Success!');
              this.setState(prevState => {
                  return {
                      userDetails:{
                          ...prevState.userDetails,
                          email:'',
                          password:''
                      }
                  }
              })

        }else console.log('Missing Fields !')
    }


    render() {
        
        return (
            <section className="staff flex row center space-between">
                <div className="login-box flex column space-between">
                    <h2>Create your Account</h2>
                    <p>Securely Manage your Crypto and Move your Coins on trusted reliable Exchange Channels.</p>
                    <div className="input-user">
                        <div className="flex row center">Email :
                         <input id="email" type="text" placeholder="Example@gmail.com" value={this.state.userDetails.email} onChange={(ev) => this.handleInput(ev)} /></div>
                    </div>
                    <div className="input-pass">
                        <div className="flex row center">Password :
                         <input id="password" type="password" placeholder="******" value={this.state.userDetails.password} onChange={(ev) => {this.handleInput(ev)}} /></div>
                    </div>

                    <div className="checkbox-wrapper flex row center">
                        <input onChange={console.log('Change CheckBox!')} type="checkbox" checked></input>
                        <span>I wish to be notified about new product features and trading opportunities</span>
                    </div>



                    <div className="register-btn-wrapper flex column center space-evenly">
                        <button className="register" onClick={this.createAccount}>Create Account</button>
                        <div>
                            Already have an account? <span className="signIn-btn" onClick={() => { this.props.history.push('/') }}>Sign in</span>
                        </div>
                    </div>
                </div >
                <div className="aside"></div>
            </section >
        )
    }
}