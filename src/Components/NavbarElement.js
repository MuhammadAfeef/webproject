import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import {FaBars} from "react-icons/fa";

export const Nav = styled.nav`
background : #133978;
height : 80px ;
display : flex ;
justify-content :space-between;
padding : 0.5rem calc((100vw - 1000px) / 2);
z-index : 10 ; 
`
export const NavLogo = styled.div`
    color : #fff ; 
    display : flex;
    align-items : center;
    text-decoration : none ; 
    padding : 0 1rem ; 
    height : 100%;
    cursor : pointer ;
    font-size : 25px ; 
    font-family: 'Mochiy Pop One', sans-serif;
    font-weight : 600 ;
&:hover {
    color : #0A1932;
}
`
export const NavLink = styled(Link)`
    color : #fff ; 
    display : flex;
    align-items : center;
    text-decoration : none ; 
    padding : 0 1rem ; 
    height : 100%
    cursor : pointer ;

&:hover {
    color : #0A1932;
}
`
export const Bars = styled(FaBars)`
display : none;
color : #fff ; 

@media screen and (max-width:768px){
    display:block;
    position:absolute; 
    top : 0;
    right : 0 ;
    transform: translate(-100%, 75%);
    font-size : 2rem ; 
    cursor : pointer; 
}
`
export const NavMenu = styled.div`
 display : flex ; 
 align-items : center ; 
 margin-right : -24px;

 @media screen and (max-width:768px){
    display:none;
 }
`
export const NavBtn = styled.nav`
display : flex ; 
align-items : center ; 
margin-right : 24px ; 

@media screen and (max-width : 768px){
    display : none ; 
}

`
export const NavBtnLink = styled(Link)`
border-radius : 4px;
background : #fff ; 
padding : 10px 22px;
color : #133978;
border : none ;
outline : none;
cursor : pointer ; 
transition : all 0.2s ease-in-out;
text-decoration : none ; 


&:hover {
    transition: all 0.2s ease-in-out ; 
    background : #0A1932;
    color : #fff;
}
`