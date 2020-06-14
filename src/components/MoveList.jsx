import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRecycle } from '@fortawesome/free-solid-svg-icons';
import utilService from '../services/utilService'

export default class MoveList extends Component {
    state = {
        currencyRate: (localStorage.getItem('currencyRate') || 0)
    }



    render() {
        var userMoves = utilService.loadFromSession('loggedInUser').moves.sort((a,b)=> {return b.at-a.at})
        const moves = (this.props.moves)? this.props.moves : userMoves;
        var elMoves = moves.map((move) => {

            var dateTime = new Date(move.at);
            const [, month, day, year] = dateTime.toDateString().split(' ');
            const hour = (dateTime.getHours() + 1 < 10) ? '0' + dateTime.getHours() : dateTime.getHours();
            const minute = (dateTime.getMinutes() + 1 < 10) ? '0' + dateTime.getMinutes() : dateTime.getMinutes();
            const sec = (dateTime.getSeconds() + 1 < 10) ? '0' + dateTime.getSeconds() : dateTime.getSeconds();
            const status = (move.status) ? 'Approved' : 'Rejected'
            if (this.props.moves) {
                
                return (
                    <section className="move-preview" key={move.serial}>
                        <div className="flex row center space-between">
                            <div className="move-info flex column">
                                <div className="transaction-wrapper flex column">
                                    <div className="request-serial">Serial No. : {move.serial}</div>
                                    <div className="request-ammount">
                                        <span className="bitcoin"><span>₿</span> {move.bitcoin}</span> | <span className="usd">$ {(move.bitcoin / this.state.currencyRate).toFixed(2)}</span></div>
                                </div>
                                <div className="status-bar">Status: <span className={status}>{status}</span></div>
                                <div className="date-wrapper"> {day} {month},{year} , {hour}:{minute}:{sec}</div>
                            </div>
                            <div className="status-bar-mobile">Status: <span className={status}>{status}</span></div>

                        </div>
                    </section>
                )
            } else {
                return (
                    <div className="move-preview container move-preview-other" key={move.serial}>
                        <div className="flex row center space-between">
                            <div className="move-info flex column">
                                <div className="transaction-wrapper flex column">
                                    <div className="request-serial">Serial No. : {move.serial}</div>
                                    <div className="request-ammount">
                                        <span className="bitcoin"><span>₿</span> {move.bitcoin}</span> | <span className="usd">$ {(move.bitcoin / this.state.currencyRate).toFixed(2)}</span></div>
                                </div>
                                <div className="date-wrapper"> {day} {month},{year} , {hour}:{minute}:{sec}</div>
                            </div>
                            <div className="status">Status: <span className={status}>{status}</span></div>
                        </div>
                    </div>
                )
            }
        })
        if(moves.length === 0) {
            elMoves = (<section className="contact-default flex row center">
                No Transaction Has Been Made To Contact
            </section>)
        }
        const template = (this.props.moves) ?
            (<section className="move-list-container">
                {elMoves}
            </section>) :
            (<section>
                <div className="movelist-hero flex row center">
                    <h2 className="title">
                        <FontAwesomeIcon className="icon" icon={faRecycle} />
                        Moves History
                    </h2>
                </div>
                <div className="container move-list-wrapper">
                    {elMoves}
                </div>
            </section>);

        return (
            template
        )
    }
}