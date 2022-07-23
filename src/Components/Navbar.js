import React,{useState} from 'react';
import Sidebar from './Sidebar/Sidebar';
import NavbarTwo from './NavbarTwo';

export default function Navbar() {
  const [isOpen , setIsOpen] = useState (false);
  const toggle = () =>{
    setIsOpen(!isOpen)
  }
  return (
    <>
       <Sidebar isOpen = {isOpen} toggle = {toggle} />
       <NavbarTwo toggle={toggle}/>
    </>
  )
}
