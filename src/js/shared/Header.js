import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import fedexlogo from '../../assets/images/fedex_logo.png'


const Header = () => { 
  return (
  <header>
    <nav className="navbar navbar-toggleable-md navbar-default justify-content-between">
      <Link to="/" className="navbar-brand"><img src={fedexlogo} alt="fedexlogo"></img></Link>
    </nav>
    <nav className="navbar navbar-toggleable-md navbar-primary justify-content-between">  
        <div className="navbar-main">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link" activeClassName="selected">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/SearchResult" className="nav-link" activeClassName="selected">SearchResult</NavLink>
            </li>
            </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
