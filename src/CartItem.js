import { ClassSharp } from '@material-ui/icons';
import React from 'react'
import styled from 'styled-components'
import { db } from './firebase'
function CartItem({ email,id, item }) {
    const imageItem = require(`${item.image}`).default;

    let option=[];
    for(let i=0;i<Math.max(item.quantity+1,20);i++){
        option.push(<option value={i}> Qty: {i}</option>);
    }

    const deleteQuantity = () => {
        //e.preventDefault();
        db.collection("user").doc(email).collection('cartitem').doc(id).delete();
    }

    const changeQuantity = (quantity) => {
        db.collection("user").doc(email).collection('cartitem').doc(id).update({
            quantity: parseInt(quantity)
        });
    }

    return (
        <Container>
            <ImageContainer>
                <img src={ imageItem }/>
            </ImageContainer>
            <CartItemInfo>
                <CartItemInfoTop>
                    <h2>{item.name}</h2>
                </CartItemInfoTop>
                <CartItemInfoBottom>
                    <CartItemQuantity>
                        <select value={item.quantity} onChange={(e) => changeQuantity(e.target.value)}>
                            {option}
                        </select>
                    </CartItemQuantity>
                    <CartItemDelete onClick={ deleteQuantity }>Delete</CartItemDelete>
                </CartItemInfoBottom>
            </CartItemInfo>

            <CartItemPrice>
                ${item.price}
            </CartItemPrice>
        </Container>
    )
}

export default CartItem

const Container = styled.div`
    padding-top: 12px;
    padding-bottom: 12px;
    display: flex;
    border-bottom: 1px solid #DDD;
    height: 200px;
`
const ImageContainer = styled.div`
    width: 150px;
    flex-shrink: 0;
    flex-grow: 0;
    margin-right: 16px;
    img {
        object-fit: contain;
        height: 100%;
        width: 100%;
    }
`
const CartItemInfo = styled.div`
    flex-grow: 1;
`
const CartItemInfoTop = styled.div`
    color: black;
    h2 {
        font-size: 18px;
    }
`
const CartItemInfoBottom = styled.div`
    display: flex;
    margin-top: 4px;
    align-items: center;
`
const CartItemQuantity = styled.div`
    select {
        border-radius: 7px;
        background-color: #F0F2F2;
        padding: 8px;
        box-shadow: 0 2px 5px rgba(15,17,17,15);
    }

    select:focus {
        outline: none;
    }
`
const CartItemDelete = styled.div`
    color: #007185;
    margin-left: 16px;
    cursor: pointer;

`
const CartItemPrice = styled.div`
    font-size: 18px;
    font-weight: 700;
    margin-left: 16px;
`

