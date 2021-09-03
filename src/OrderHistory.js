import React from 'react'
import styled from 'styled-components'
import OrderBody from './OrderBody.js'
import { db } from './firebase'
import { useState, useEffect} from 'react'

function OrderHistory({email}) {
    const [orderHis,setOrderHis] = useState([]);
    const getTotal = (item) => {
        console.log(item);
        let totalPrice=0;
        item.product.product.forEach((data)=>{
            totalPrice += (data.price*data.quantity);
        })
        return totalPrice;
    }
    
    const getOrderHis = () => {
        db.collection('user').doc(email).collection('orderHistory').onSnapshot((snapshot)=>{
            const temp = snapshot.docs.map((doc)=>({
                id:doc.id,
                product:doc.data()
            }));
            setOrderHis(temp);
        });
    }

    useEffect(()=>{
        getOrderHis()
    }, [])

    return (
        <Container>
            <Title>Order Success</Title>
            {
                orderHis.map((item)=>(
                    <OrderItem>
                        <OrderTime>Order Time: {item.id}</OrderTime>
                        <hr />
                        <OrderBody item={item.product}/>
                        <OrderTotal>total cost: ${getTotal(item)}</OrderTotal>
                    </OrderItem>
                ))
            }
            
        </Container>
    )
}

export default OrderHistory

const Container = styled.div`
`
const Title = styled.div`
    width: 60%;
    background-color: white;
    height: 100px;
    border-radius: 7px;
    box-shadow: 0 2px 5px black;
    margin: 20px 0 20px 20px;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    justify-content: center; 
    align-items: center;

`
const OrderItem = styled.div`
    background-color: white;
    height: auto;
    width: 60%;
    border-radius: 7px;
    box-shadow: 0 2px 5px black;
    margin: 20px 0 20px 20px;
    padding: 20px;
`
const OrderTime = styled.div`  
    font-weight: bold;
`
const OrderTotal = styled.div`
    font-weight: bold;
    display: flex;
    justify-content: flex-end;
`