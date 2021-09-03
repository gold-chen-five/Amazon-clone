import React, { useState, useEffect} from 'react'
import styled from 'styled-components'
import BannerImg from './images/bannerimg.jpg'
import Banner2 from './images/banner2.jpg'
import Banner3 from './images/banner3.jpg'
import Banner4 from './images/banner4.jpg'
import Product from './Product.js'
import { db } from './firebase'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

function Home({email}) {
    const [products, setProducts] = useState([])
    
    const getProducts = () => {
        db.collection('product').onSnapshot((snapshot)=>{
            let tempProducts = [];
            tempProducts = snapshot.docs.map((doc)=> ( 
                {
                    id: doc.id,
                    product: doc.data()
                }
            ));

            setProducts(tempProducts);
        })
    }

    useEffect(()=>{
        getProducts()
    }, [])

    return (
        <Container>
            <Slide>
                <Banner></Banner>
                <BannerTwo></BannerTwo>
                <BannerThree></BannerThree>
                <BannerFour></BannerFour>
            </Slide>
            <Content>
                    {
                        
                        products.map((data)=>(
                            <ProductSize>
                                <Product
                                    email={email}
                                    title={data.product.name}
                                    price={data.product.price}
                                    rating={data.product.rating}
                                    image={data.product.image}
                                    id={data.id}
                                />
                            </ProductSize>
                        ))
                    }
               
                
            </Content>
        
            
        </Container>
    )
}

export default Home

const Container = styled.div`
    width: 1500px;
    margin: 0 auto;
`

const Banner = styled.div`
    background-image: url(${BannerImg});
    min-height:600px;
    background-position: center;
    background-size: cover;
    z-index: 1;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 60%,  rgba(0, 0, 0, 0));
`
const BannerTwo = styled(Banner)`
    background-image: url(${Banner2});
`
const BannerThree = styled(Banner)`
    background-image: url(${Banner3});
`
const BannerFour = styled(Banner)`
    background-image: url(${Banner4});
`
const Content = styled.div`
    padding-left: 10px;
    padding-right: 10px;
    margin-top: -350px;
    max-width: 1500px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

const ProductSize = styled.div`
    display: flex;
    height: 450px;
    width: 475px;
`
