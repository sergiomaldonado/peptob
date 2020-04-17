import React from 'react';
import './App.css';
import { Navbar } from 'react-bootstrap';
import AuthUserContext from './AuthUserContext';


const Navigation = () =>

  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>

<div>
<Navbar className="navBar">
  <Navbar.Brand style={{ color: 'white' }} href="#home">Reporte Ciudadano</Navbar.Brand>
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
    </Navbar.Text>
  </Navbar.Collapse>
</Navbar>
</div>

const NavigationNonAuth = () =>
<div>

<Navbar className="navBar">
  <Navbar.Brand href="#home">Reporte Ciudadano</Navbar.Brand>
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
 </Navbar.Text>
  </Navbar.Collapse>
</Navbar>

</div>

export default Navigation;