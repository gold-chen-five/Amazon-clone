import React from 'react'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'
import { db } from './firebase'
import { Link } from "react-router-dom";
function CartTotal({getCount, getTotal, cartItems, email}) {
    let date="";

    const todayDate = () => {
        let today=new Date();
        let numDate = (datenum) => {
            if(datenum<10){
                datenum="0"+datenum;
                return datenum;
            }else{
                return datenum;
            }
            
        }
        let dateItem=today.getFullYear()+""
                    +numDate((today.getMonth()+1))+""
                    +numDate(today.getDate())+" "
                    +today.getHours()+":"
                    +today.getMinutes()+":"
                    +today.getSeconds();
       date=dateItem;
    }

    const orderProducts = () => {
        //setdate
        todayDate();
        let arr=[];
        cartItems.forEach((item) => {
            arr.push({
                'image':item.product.image,
                'name':item.product.name,
                'price':item.product.price,
                'quantity':item.product.quantity
            });
            //delete all user cartitem products
            db.collection("user").doc(email).collection('cartitem').doc(item.id).delete();
        });
        //put user cartitem products into order account products
        db.collection('order').doc(email).set({
            [date]:arr
        })
        //put user cartitem products into user history
        db.collection('user').doc(email).collection('orderHistory').doc(date).set({
            product:arr
        })
           
    }

    return (
        <Container>
            <Subtotal>
                ({getCount()} items)Total Price: 
                <NumberFormat value={ getTotal() } displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </Subtotal>
            <Link to="/order">
                <CheckOutButton onClick={orderProducts}>Order</CheckOutButton>
            </Link>    
        </Container>
    )
}

export default CartTotal

const Container = styled.div`
    flex: 0.3;
    padding: 20px;
    background-color: white;
`
const Subtotal = styled.h2`
    margin-bottom: 16px;
`
const CheckOutButton = styled.button`
    background-color: #f0c14b;
    width: 100%;
    padding: 4px 8px;
    border: 2px solid #a88734;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px; 
    :hover {
        background-color: #ddb347;
    }
`