import React from 'react';
import {useNavigate} from "react-router-dom";
import { SidebarContainer , Icon , CloseIcon ,SidebarWrapper,SidebarMenu,SidebarRoute,SideBtnWrap,SidebarRoutes } from './SidebarElement';

const Sidebar = ({isOpen , toggle}) => {
    let navigate = useNavigate()
    const handleLogout = () =>{
        localStorage.removeItem('token');
        navigate('/login')
      }
  return (
    <SidebarContainer isOpen = {isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon/>
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
        <SidebarRoute to='/' onClick={toggle}>Home</SidebarRoute>
        <SidebarRoute to='/about' onClick={toggle}>About</SidebarRoute>
        <SidebarRoute to='/about' onClick={toggle}>Services</SidebarRoute>
        <SidebarRoute to='/about' onClick={toggle}>Contact-US</SidebarRoute>
        
        </SidebarMenu>
        <SideBtnWrap>
        {!localStorage.getItem('token')?<form>
        <SidebarRoutes  to="/login" role= "button"> Login </SidebarRoutes>
      </form>:<SidebarRoutes to="/login" onClick={handleLogout}> Logout</SidebarRoutes>}
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar
