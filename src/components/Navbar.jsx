import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faAddressCard , faHouseUser, faChartArea ,faChevronRight } from '@fortawesome/free-solid-svg-icons';
import logo from '../styles/imgs/logo.png'

export default function Navbar() {
    function handleNavbar(){
        var elMenu = document.querySelector('.menu');
        var elScreen = document.querySelector('.screen');
        elMenu.classList.toggle('menu-open');
        elScreen.classList.toggle('open');
    }

    return (
        <header className="header flex row center space-between">
            <div className="screen" onClick={handleNavbar}></div>
            <div className="logo">
                <img src={logo} alt="BITcoin." /> 
            </div>
            <div className="menu ">
                <NavLink exact to="/">Homepage <FontAwesomeIcon className="icon" icon={faHouseUser}/> <FontAwesomeIcon className="chevron" icon={faChevronRight}/></NavLink>
                <NavLink exact to="/contact">Contact <FontAwesomeIcon className="icon" icon={faAddressCard}/><FontAwesomeIcon className="chevron" icon={faChevronRight}></FontAwesomeIcon></NavLink>
                <NavLink exact to="/statistic">Charts <FontAwesomeIcon className="icon" icon={faChartArea}/><FontAwesomeIcon className="chevron" icon={faChevronRight}></FontAwesomeIcon></NavLink>
                <div className="app-name">MisterBITcoin</div>
            </div>
            <div className="menu-btn flex row center" onClick={handleNavbar}>
                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </div>
        </header>
    )
}