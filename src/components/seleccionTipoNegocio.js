import React, {Component} from 'react'
import './App.css'
import { Container, Row, Col, Card } from 'react-bootstrap'
import icoTienda from './assets/icoTienda.svg'
import icoRestaurant from './assets/icoRestaurant.svg'
import icoServicio from './assets/icoServicio.svg'

const INITIAL_STATE = {

}

class SeleccionarNegocio extends Component{

    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
      }
   
      render(){

        return(
         <div>
         <Container style={{ marginTop:"20px" }}>
        <Row>
          <Col md={10} xs={10}>
          <h2 style={{ color:"#19188A" }}>TU PRIMER NEGOCIO</h2>
          <p>Para configurar tu panel de control elige tu tipo de negocio.</p>
          </Col>
        </Row>
       </Container>
  <Container>
    <Row>
      
      { /////****  TARGETA DE SELECCION 1 ****/  
      }
       <Col md={12}>
       <Card onClick={ (event)=>this.props.crearTienda(event, "tiendas")} style={{ padding:"10px", paddingBottom:"0px" }}>
         <Row>
         <Col md={4} xs={4}>
         <img style={{  maxWidth:"100%", marginTop:"10%" }}src={icoTienda}></img>
         </Col>
         <Col md={8} xs={8}>
         <h4>Tienda</h4>
         <p>Elige esta opción si quieres vender, ropa, electronicos, etc.</p>
         </Col>
         </Row>
       </Card>
       </Col>

       { /////****  TARGETA DE SELECCION 1 ****/  
      }
       <Col md={12} style={{ marginTop:"10px" }}>
       <Card onClick={ (event)=>this.props.crearTienda(event, "restaurants")} style={{ padding:"10px", paddingBottom:"0px" }}>
       
         <Row>
         <Col md={4} xs={4}>
         <img style={{  maxWidth:"100%", marginTop:"10%" }}src={icoRestaurant}></img>
         </Col>
         <Col md={8} xs={8}>
         <h4>Restaurant o Bar</h4>
         <p>Elige esta opción si quieres vender, ropa, electronicos, etc.</p>
         </Col>
         </Row>
    
       </Card>
       </Col>

       { /////****  TARGETA DE SELECCION 1 ****/  
      }
       <Col style={{ marginTop:"10px" }} md={12}>
       <Card onClick={ (event)=>this.props.crearTienda(event, "servicios")}  style={{ padding:"10px", paddingBottom:"0px" }}>
        
         <Row>
         <Col md={4} xs={4}>
         <img style={{  maxWidth:"100%", marginTop:"10%" }}src={icoServicio}></img>
         </Col>
         <Col md={8} xs={8}>
         <h4>Servicio</h4>
         <p>Elige esta opción si quieres vender, ropa, electronicos, etc.</p>
         </Col>
         </Row>
        
       </Card>
       </Col>
  
    </Row>
  </Container>
         </div>
            )

      }
   
}

 
 export default SeleccionarNegocio;
 

