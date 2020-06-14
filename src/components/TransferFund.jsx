import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
import UserService from '../services/UserService';
import UserMsg from '../components/UserMsg'
import {withRouter} from 'react-router-dom'

 class TransferFund extends Component {
    state = {
        ammount: null,
        status:null
    }

    handleAmmount = async (ev) => {
        ev.persist();
        var value = +ev.target.value;
        if (!isNaN(value)) {
            await this.setState((prevState) => {
                return {
                    ammount: value,
                    status:null
                }
            })
        }
    }

    handleTransfer = async () => {
        if (this.state.ammount) {
            var status = (this.props.userCoins < this.state.ammount || this.state.ammount < 0) ? false : true;
            this.setState({
                status
            })
            await UserService.addMove(this.props.toId, status, this.state.ammount);
            this.props.history.push('/contact/' + this.props.toId)
            document.querySelector('.msg-container').style.display = 'inline-block'
            document.querySelector('.msg-wrapper').style.display = 'inline-block'

            setTimeout(() => {
                this.setState({
                    status:null
                })
                document.querySelector('.msg-container').style.display = 'none'
                document.querySelector('.msg-wrapper').style.display = 'none'

            }, 4000)
        }
    }

    render() {
        return (
            <div className="transfer flex row center justify-start">
                <button onClick={this.handleTransfer} className="btn-transfer">Transfer</button><input onChange={(ev) => { this.handleAmmount(ev) }} className="input-transfer" type="text" placeholder="Ammount" /> <FontAwesomeIcon icon={faBitcoin} className="icon" />
                <div className="msg-container flex row center">
                    <UserMsg status={this.state.status} />
                </div>   
            </div>
        )
    }
}

export default withRouter(TransferFund);