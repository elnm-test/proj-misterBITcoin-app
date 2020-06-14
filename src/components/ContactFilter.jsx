import React, { Component } from 'react';

export default class ContactFilter extends Component {
    
    setFilter = (ev) => {
        this.props.changeFilter(ev.target.value)
    }

    render() {
        return (
            <div className="filter-wrapper">
                <input className="filter" onInput={(ev) => {this.setFilter(ev)}} type="text" placeholder="Search By Name ..." />
            </div>
        )
    }
}