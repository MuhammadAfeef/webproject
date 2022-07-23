import React from 'react'
import {useNavigate} from "react-router-dom";
import {Nav ,NavLogo, NavLink , Bars , NavMenu , NavBtn , NavBtnLink} from './NavbarElement';

export default function Navbar({toggle}) {

  let navigate = useNavigate()
  const handleLogout = () =>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  return (
    <>
    <Nav>
        <NavLogo to="/"> TahaLab </NavLogo> 
        <Bars onClick={toggle}/>
      <NavMenu>
        <NavLink  to="/" >Home</NavLink>
        <NavLink  to="/about" >About</NavLink>
        <NavLink  to="/about" >Services</NavLink>
        <NavLink  to="/about" >Contact Us</NavLink>
      </NavMenu>
      <NavBtn>
       {!localStorage.getItem('token')?<form>
        <NavBtnLink  to="/login" role= "button"> Login </NavBtnLink>
        </form>:<NavBtnLink to="/login" onClick={handleLogout}> Logout</NavBtnLink>}
      </NavBtn>
    </Nav>
    </>
  )
}