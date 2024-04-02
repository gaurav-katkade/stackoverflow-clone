import './Navbar.css'
import logo from '../../assets/logo.png'
import search from '../../assets/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar'

import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    var User = null;
  return (
    <nav className='navbar-nav'>
        <div className='navbar'>
            <Link to="/" className='nav-item nav-logo'>
                <img src={logo} alt='logo'></img>
            </Link>
            <Link to="/" className='nav-item nav-btn'>Aboout</Link>
            <Link to="/" className='nav-item nav-btn'>Products</Link>
            <Link to="/" className='nav-item nav-btn'>For Teams</Link>
            <form>
                <input type='text' placeholder='Search...'/>
                <img  className="search-icon" src={search}  alt="search" width="18"/>
            </form>
            {User ===null?
                <Link to="/Auth" className='nav-item nav-links'>Log in</Link> :
                <>
                    <Link to="/"><Avatar backgroundColor="#009dff" px="10px" py="6px" borderRadius="50%" color="white">G</Avatar></Link>
                    <button className='nav-item nav-links'>Log out</button>
                </>        
            }
        </div>
    </nav>
  )
}

export default Navbar;
