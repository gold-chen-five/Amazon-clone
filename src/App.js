import { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header.js';
import Cart from './Cart.js';
import Home from './Home.js';
import OrderHistory from './OrderHistory.js'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from 'styled-components';
import { db ,auth} from './firebase';
import Login from './Login.js';

function App() {
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  

  const signOut = () => {
    auth.signOut().then(() => {
        localStorage.removeItem('user');
        setUser(null);
    })
  }

  

  return (
    <Router>
      {
        !user ? (<Login setUser={setUser}/>
          ):(
          <Container>
            <Header signOut={signOut} user={user} />

            <Switch>

              <Route path="/cart">
                <Cart email={user.email}/>
              </Route>

              <Route path="/order">
                <OrderHistory email={user.email}/>
              </Route>

              <Route path="/">
                <Home email={user.email}/>
              </Route>

            </Switch>
          </Container>
         )
      }
    </Router>
  );
}

export default App;

const Container = styled.div`
  background-color: #EAEDED;
`