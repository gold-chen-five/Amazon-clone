import React from 'react'
import styled from 'styled-components'
import CartItems from './CartItems.js'
import CartTotal from './CartTotal.js'
import { db ,auth} from './firebase';
import { useState, useEffect} from 'react';
function Cart({email}) {
    const [cartItems, setCartItems ] = useState([]);

    const getCartItems = () =>{
        db.collection('user').doc(email).collection('cartitem').onSnapshot((snapshot) =>{
          const tempItems= snapshot.docs.map((doc) => ({
            id: doc.id,
            product: doc.data()
          }))
          setCartItems(tempItems);
        })
    }

    const getTotal = () => {
        let totalPrice=0;
        cartItems.forEach((item)=>{
            totalPrice += (item.product.price*item.product.quantity);
        })
        return totalPrice;
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
            <CartItems cartItems={cartItems} email={email}/>
            <CartTotal getCount={getCount} getTotal={getTotal} cartItems={cartItems} email={email}/>
        </Container>
    )
}

export default Cart

const Container = styled.div`
    display: flex;
    padding: 14px 18px 0 18px;
    align-items: flex-start;
`