import React from 'react'
import styled from 'styled-components'
import OrderItem from './OrderItem.js'

function OrderBody({item}) {
    
    return (
       <Container>
           {
               item.product.map((data) => (
                    <OrderItem 
                        image = {data.image}
                        name = {data.name}
                        price = {data.price}
                        quantity = {data.quantity}
                    />
               ))
           }
           
       </Container>
    )
}

export default OrderBody
const Container = styled.div`
`