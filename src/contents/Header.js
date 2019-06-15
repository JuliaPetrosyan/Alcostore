import React from 'react';
import './index.css';
import lcoLogo from './lcoLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import alcoholl from './images.jpg';

class Header extends React.Component {
  render() {
    return (

        <div className="Header">
            <img className="backgrImg" src={alcoholl} />
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="logoa">
                        <a className="logoa" href="/"><img className="logoa" src={lcoLogo} alt="logo" /></a>
                    </div>
                    <div className="line"></div>
                    <div className="container-dark">
                        <button className="button" type="button">
                            <div className="menu">
                                <svg className="path" width="19" height="25">
                                    <path className="path1" d="M0,5 30,5" stroke="#b14526" stroke-width="4"></path>
                                    <path className="path2" d="M0,14 30,14" stroke="#b14526" stroke-width="4"></path>
                                    <path className="path3" d="M0,23 30,23" stroke="#b14526" stroke-width="4"></path>
                                </svg>
                                <b>Menu</b></div>
                                <div className="dropdown-content">
                                    <ul className="ul1">Bear</ul>
                                    <p className="cotegLine"></p>
                                    <ul>Brandy</ul>
                                    <p className="cotegLine"></p>
                                    <ul>Champagne</ul>
                                    <p className="cotegLine"></p>
                                    <ul>Coctail</ul>
                                    <p className="cotegLine"></p>
                                    <ul>Liqueur</ul>
                                    <p className="cotegLine"></p>
                                    <ul>Vodka</ul>
                                    <p className="cotegLine"></p>
                                    <ul>Wine</ul>
                                </div>

                        </button>
                        <span className="formGroup">
                            <input type="text" className="search" placeholder="Search" name="search" />
                                <FontAwesomeIcon className="btnSrch"
                                    icon="search"
                                />
                        </span>
                        <span>
                            <button type="submit" className="basketIcon">
                                <FontAwesomeIcon className="basket"
                                    icon="cart-plus"
                                />
                                <small className="cart-notification">0</small>
                                <p className="notif-back"></p>
                            </button>
                        </span>
                    </div>
                </div>
            </nav>
        </div>
    );
  }
}

export default Header;