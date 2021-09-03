import React from 'react'
import styled from 'styled-components'
import logo from './images/Amazon.png'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link } from "react-router-dom";
import { db } from './firebase';
import { useState, useEffect} from 'react';

function Header({ signOut,user }) {
    const [cartItems, setCartItems ] = useState([]);

    const getCartItems = () =>{
        db.collection('user').doc(user.email).collection('cartitem').onSnapshot((snapshot) =>{
          const tempItems= snapshot.docs.map((doc) => ({
            id: doc.id,
            product: doc.data()
          }))
          setCartItems(tempItems);
        })
    }

    const getCount= () => {
        let count=0;
        cartItems.forEach((item) => {
            count+=item.product.quantity;
        })
        return count;
    }

    useEffect(() => { 
        getCartItems();
      }, [])

    return (
        <Container>
            <HeaderLogo>
                 <Link to="/">
                    <img src={logo}/>
                </Link>
            </HeaderLogo>
            <HeaderOptionAddress>
                <LocationOnIcon/>
                <HeaderOption>
                    <OptionLineOne>HELLO</OptionLineOne>
                    <OptionLineTwo>select your address</OptionLineTwo>
                </HeaderOption>
                
            </HeaderOptionAddress>

            <HeaderSearch>
                <HeaderSearchInput type='text'/>
                <HeaderSearchContainer>
                    <SearchIcon/>
                </HeaderSearchContainer>
            </HeaderSearch>
            
            <HeaderNavItems>

                <HeaderOption onClick={signOut}>
                    <OptionLineOne>Hello, {user.name}</OptionLineOne>
                    <OptionLineTwo>Account Logout</OptionLineTwo>
                </HeaderOption>
                <HeaderOption>
                    <Link to="/order">
                        <OptionLineOne>Order</OptionLineOne>
                        <OptionLineTwo>History</OptionLineTwo>
                    </Link>
                </HeaderOption>

                <HeaderOptionCart>
                    <Link to="/cart">
                        <ShoppingBasketIcon/>
                        <CartCount>{ getCount() }</CartCount>
                    </Link>
                </HeaderOptionCart>
                

            </HeaderNavItems>
           
        </Container>
    )
}

export default Header

const Container = styled.div`
    height: 60px;
    background-color: #0F1111;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
`

const HeaderLogo = styled.div`
    img {
        width:100px;
        margin-left: 11px;
    }
`

const HeaderOptionAddress = styled.div`
    padding-left: 9px;
    display: flex;
    align-items: center;
`
const OptionLineOne = styled.div`
`
const OptionLineTwo = styled.div`
`
const HeaderSearch = styled.div`
    display: flex;
    flex-grow: 1;
    height: 40px;
    border-radius: 4px;
    overflow: hidden;
    margin-left: 4px;
    background-color: white;
    :focus-within {
        box-shadow: 0 0 0 3px #F90;
    }
`
const HeaderSearchInput = styled.input`
    flex-grow: 1;
    border: 0;
    :focus {
        outline: none;
    }
`
const HeaderSearchContainer = styled.div`
    background-color: #febd69;
    width: 45px;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`
const HeaderNavItems = styled.div`
    display: flex;

`
const HeaderOption = styled.div`
   padding: 10px 9px 10px 9px;
   cursor: pointer;
   a {
        text-decoration: none;
        color: white;
   }
`
const HeaderOptionCart = styled.div`
    display: flex;
    a {
        display: flex;
        align-items: center;
        padding-right: 9px;
        color: white;
        text-decoration: none;
    }
    
`
const CartCount = styled.div`
    padding-left: 4px;
    font-weight: 700;
    color: #f08804;
`