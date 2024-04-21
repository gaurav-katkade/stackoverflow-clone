import './Navbar.css'
import logo from '../../assets/logo.png'
import search from '../../assets/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar'
import {jwtDecode} from 'jwt-decode'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { useSelector,useDispatch} from 'react-redux'
import { setCurrentUser } from '../../actions/currentUser'
const Navbar = () => {
    const dispatch = useDispatch()
    var User = useSelector((state)=>(state.currentUserReducer))
    const navigate = useNavigate()
    useEffect(()=>{
        const token = User?.token
        if(token){
            const decodedToken = jwtDecode(token)
            if(decodedToken.exp*1000 < new Date().getTime()){
                handleLogout()
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))

    },[dispatch])

    const handleLogout =()=>{
        dispatch({type:'LOGOUT'})
        navigate('/')
        dispatch(setCurrentUser(null))
    }

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
                    <Link to={`/Users/${User?.result?._id}`}><Avatar backgroundColor="#009dff" px="10px" py="6px" borderRadius="50%" color="white"> {User.result.name.charAt(0).toUpperCase()}</Avatar></Link>
                    <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>
                </>        
            }
        </div>
    </nav>
  )
}

export default Navbar;
