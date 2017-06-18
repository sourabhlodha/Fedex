import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';


const Header = () => { 
  
  const onLogout = () => {
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-toggleable-md">
      <Link to="/" className="navbar-brand"><Logo /></Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
              <NavLink exact to="/" className="nav-link" activeClassName="selected">Dashboard</NavLink>
              
          </li>
          <li className="nav-item">
            <NavLink exact to="/search-assets" className="nav-link" activeClassName="selected">Search Assets</NavLink>
          </li>
        </ul>
      </div>
      
      <div className="logout">
        <button onClick={onLogout} className="btn logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Header;
