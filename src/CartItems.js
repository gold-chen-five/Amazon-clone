import React from 'react'
import styled from 'styled-components'
import CartItem from './CartItem.js'
function CartItems({ email,cartItems }) {
    return (
        <Container>
            <Titles>Shopping Cart</Titles>
            <hr />
            <ItemsContainer>
                {
                    cartItems.map((item) => (
                        <CartItem
                            email={email}
                            id={item.id}
                            item={item.product}
                        />
                    ))
                }
            </ItemsContainer>
        </Container>
    )
}

export default CartItems

const Container = styled.div`
    flex: 0.8;
    margin-right: 18px;
    padding: 20px;
    background-color: white;
    border-radius: 7px;
    box-shadow: 0 2px 5px black;
`
const Titles = styled.div`
    margin-bottom: 8px;
    font-weight: bold;
`
const ItemsContainer = styled.div`
`
