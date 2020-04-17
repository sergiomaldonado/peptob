import React, { Component } from 'react'
import './../App.css'
import {Container, Row, Col, Navbar,Badge} from 'react-bootstrap'

import { Home, Bell, User} from 'react-feather';
 



const estadoInicial = {
   
}

class BottomNavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...estadoInicial
    };
  }
  componentDidMount() { 
    
  }
  
  render() {
       return(
        
          <div>
          <Navbar className="bottomNav" expand="lg" variant="light" bg="light" fixed="bottom" sticky="bottom">
          <Container>
          <Container>
            <Row>
              <Col className="icon_bottomNav" md={4} xs={4}><Home onClick={()=>this.props.cambiarDeVistaHome(true, false, false)} size="25"/></Col>
              <Col className="icon_bottomNav" md={4} xs={4}><Bell onClick={()=>this.props.cambiarDeVistaHome(false, true, false)} size="25"/> <Badge style={{ position:"absolute", marginLeft: "-10px", marginTop:"-3px" }} variant="success">1</Badge></Col>
              <Col className="icon_bottomNav" md={4} xs={4}><User onClick={()=>this.props.cambiarDeVistaHome(false, false, true)} size="25"/></Col>
            </Row>
          </Container>
  </Container>
</Navbar>
           
          </div>
            )
  }
}





export default BottomNavBar;


 

