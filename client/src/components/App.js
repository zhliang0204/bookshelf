import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, } from 'reactstrap';

import Home from './pages/Home';

import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
import FirstTimeLogin from './pages/FirstTimeLogin';
import BookShelf from './pages/BookShelf';
import BookCard from './pages/BookCard';
import LogginWithGoogle from './pages/LogginWithGoogle'



class App extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      books: [],
      isOpen: false
    }
    // api.loadUser();
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleLogoutClick(e) {
    api.logout()
  }
 

  render() {
    return (
      <div>
      <div className="Nav">
        <Navbar style={{backgroundColor: "#596e79"}} expand="md" inverse collapseOnSelect>

        <NavbarBrand href="/" className = 'character'>BookStore</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>

        <NavItem style={{marginRight:8}} className = 'character'>
          <NavLink to="/" exact style={{color: 'white', textDecoration: 'none',flexDirection:'row'}}>Home</NavLink>
        </NavItem>

          <NavItem style={{marginRight:8}} className = 'character'>
          {!api.isLoggedIn() && <NavLink  to="/signup" style={{color: 'white', textDecoration: 'none'}} >Signup</NavLink>}
          </NavItem>

          <NavItem style={{marginRight:8}} className = 'character'>
          {!api.isLoggedIn() && <NavLink to="/login" style={{color: 'white', textDecoration: 'none'}}>Login</NavLink>}
          </NavItem>


          <NavItem style={{marginRight:8}} className = 'character'>
          {api.isLoggedIn() && <NavLink to="/personalbookshelf" style={{color: 'white', textDecoration: 'none'}}>Bookshelf</NavLink>}   
          </NavItem>

           <NavItem style={{marginRight:8}} className = 'character'>
           {api.isLoggedIn() && <NavLink to="/" className = 'character' style={{color: 'white', textDecoration: 'none'}} onClick={(e) => this.handleLogoutClick(e)}>Logout</NavLink>}
           </NavItem>

        </Nav>
        </Collapse>
        </Navbar>
        </div>
      <div className="App">
      
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/test" component={LogginWithGoogle} />
          <Route path="/bookshelf/:id" component={BookCard} />
          <Route path="/firstlogin" component={FirstTimeLogin}/>
          {/* <Route path="/profile" component={ProfileEdit} /> */}
          {/* <Route path="/profiledetails" component={ProfileModal} /> */}
          
          

          <Route path="/personalbookshelf" component={BookShelf}/>
          {/* <Route path="/auth/google" render={()=><h2>test</h2>}/> */}
          <Route render={() => <h2>404</h2>} />
        </Switch>
        
      </div>
      </div>
    );
  }
}

export default App;
