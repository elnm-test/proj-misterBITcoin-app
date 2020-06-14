import React, { Component } from 'react';
import UserService from '../services/UserService';
import BitcoinService from '../services/BitcoinService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUsers, faCoins } from '@fortawesome/free-solid-svg-icons';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';


export default class HomePage extends Component {
    state = {
        userInputDetails: {
            email: '',
            password: ''
        },

        user: (sessionStorage.getItem('loggedInUser') || {}),
        userCurrencyRate: 0,
    }

    handleInput = (ev) => {
        const { value, id } = ev.target
        this.setState(prevState => {
            return {
                userInputDetails: {
                    ...prevState.userInputDetails,
                    [id]: value
                }
            }
        })
    }

    handleLogin = async () => {
        const { email, password } = this.state.userInputDetails;
        if (email && password) {
            var user = await UserService.login({ email, password })
            if (user) {
                var userCurrencyRate = await BitcoinService.getRate(user.coins);
                this.setState({
                    user,
                    userCurrencyRate,
                })
            }

        } else console.log('Missing Sign in Fields!')
        var userInputDetails = { email: '', password: '' }
        this.setState({
            userInputDetails
        })

    }

    handleLogout = async () => {
        UserService.logout();
        this.setState({
            user: {}
        })
    }

    async componentDidMount() {
        var user = await UserService.getUser();
        if (Object.keys(user).length) {
            var userCurrencyRate = await BitcoinService.getRate(user.coins);
            this.setState({
                userCurrencyRate: userCurrencyRate.toFixed(2)
            })
        }
        this.setState({
            user: user,
        })
    }
    render() {

        var { email, coins } = this.state.user;
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        var elSection = (email) ?
            (<section>

                <div className="user-info flex column center align-start">
                    <h1>Welcome , {email}</h1>
                    <div className="flex column balance-container">
                        <h3>Current Balance : </h3>
                        <div className="user-data flex row center space-between">
                            <div className="user-data-currency flex column">
                                <div><span className="span-title">BITcoins : </span><FontAwesomeIcon icon={faBitcoin} className="icon" /> {coins.toFixed(3)}</div>
                                <div><span className="span-title">USD :</span><FontAwesomeIcon icon={faCoins} className="icon" /> {formatter.format(this.state.userCurrencyRate)}</div>
                            </div>
                            <div className="flex column center">
                                <span className="span-title">Current BTC USD</span>
                                <span>$ {parseInt(this.state.userCurrencyRate / coins)} </span>
                            </div>
                        </div>
                    </div>
                    <div className="user-data-btn-container">
                        <button className="btn-logout btn-home" onClick={this.handleLogout}>Logout</button>
                        <Link to="/moves" className="btn-history btn-home"> Moves history → </Link>
                    </div>
                </div>


            </section >) :
            <div className="login-box flex column space-between">
                <div className="input-user flex row center justify-start">
                    <FontAwesomeIcon className="icon " icon={faUsers} ></FontAwesomeIcon>
                    <input id="email" value={this.state.userInputDetails.email} onChange={(ev) => this.handleInput(ev)} type="text" placeholder="Email" />
                </div>
                <div className="input-pass  flex row center justify-start">
                    <FontAwesomeIcon className="icon" icon={faLock} ></FontAwesomeIcon>
                    <input id="password" value={this.state.userInputDetails.password} onChange={(ev) => this.handleInput(ev)} type="password" placeholder="Password" />
                </div>
                <div className="login-btns">
                    <button className="login btn-home" onClick={this.handleLogin}>Sign In</button>
                    <button className="register btn-home" onClick={() => { this.props.history.push('/signup') }}>Register</button>
                </div>
            </div>

        return (
            <section>
                <div className="homepage">
                    <div className="flex column container homepage-content">
                        <h1 className="title">Trusted and Secure BITcoin Wallet Transfer</h1>
                        <p>
                            Your guide to the world of an open financial system.
                            Get started with the easiest and most secure platform to
                            manage Cryptocurrency.
                    </p>
                        {elSection}
                    </div>
                </div>
            </section>
        )
    }
}

