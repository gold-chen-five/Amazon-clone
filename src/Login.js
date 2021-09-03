import React from 'react'
import styled from 'styled-components'
import amazonLogo from './images/AmazonLogo.png'
import { auth,db ,provider } from './firebase'
function Login({setUser}) {

    const signInDatabase = (email,name) => {
        const userItem = db.collection("user").doc(email);
        userItem.get().then((doc) => {
            if(doc.exists){
            }else{
                db.collection("user").doc(email).set({name:name});
            }
        });
    }

    const signIn = () => {
        auth.signInWithPopup(provider).then((result) => {
            let user = result.user;
            let newUser = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            };
            localStorage.setItem('user', JSON.stringify(newUser));
            signInDatabase(newUser.email,newUser.name);
            setUser(newUser);
        }).catch((error) => {
            alert(error.message);
        });
    }

    return (
        <Container>
            <Content>
                <AmazonLogo src={amazonLogo}/>
                <h1>Sign into Amazon</h1>
                <LoginButton onClick={ signIn }>
                    Sign in with Google
                </LoginButton>
            </Content>
        </Container>
    )
}

export default Login

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #f8f8f8;
    display: grid;
    place-items: center;
`
const Content = styled.div`
    padding: 100px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 1px 3px gray;
    text-align: center;
`
const AmazonLogo = styled.img`
    height: 100px;
    margin-bottom: 40px;

`
const LoginButton = styled.button`
    margin-top: 50px;
    background-color: #f0c14b;
    height: 40px;
    border: 2px solid #a88734;
    border-radius: 4px;
    padding: 4px 8px:
    cursor: pointer;
`
