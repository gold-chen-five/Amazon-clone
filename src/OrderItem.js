import React from 'react'
import styled from 'styled-components'
function OrderItem({image, name, price, quantity}) {
    const img = require(`${image}`).default;
    return (
        <Container>
           <Image >
               <img src={img}/>
           </Image>
           <MiddleItem>
                <Name>{name}</Name>
                <br></br>
                <CountItem>
                    <Price>${price} *</Price>
                    <Quantity>{quantity}</Quantity>
                </CountItem>
                
           </MiddleItem>
        </Container>
    )
}

export default OrderItem
const Container = styled.div`
    display:flex;
    height: 200px;
    margin: 0 0 20px 0;
    border-bottom: 1px solid #DDD;
    padding: 15px;
`
const Image = styled.div`
    flex-grow: 0;
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        object-fit: contain;
        height: 100%;
        width: 100%;
    }
`
const MiddleItem = styled.div`
    flex-grow: 1;
    padding: 0 0 0 30px;
`
const Name = styled.div`
    font-weight: bold;
`
const CountItem = styled.div`
    display: flex;
`
const Price = styled.div`
    font-weight: bold;
`
const Quantity = styled.div`
    font-weight: bold;
`