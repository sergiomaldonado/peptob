import React from 'react'
import './App.css'
import {Container, Row, Col,Button} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import SignInForm from './SignInForm'
import Logo from './assets/logo.svg'

const Langing = ({ history }) => {
   
   return(
      <div style={{ overflowX:"hidden !important", overflowY:"hidden !important" }}>
         <Container style={{ textAlign:"center",backgroundColor:"#0B519F", height:"100vh", }} fluid={false}>
            <Row style={{ paddingTop:"50%" }}> 
               <Col md={12} xs={12}>
                 <img alt="Agrot" style={{ marginBottom:"2.5em" }} src={Logo}></img>
                 <div style={{ marginTop:"100px" }}>
                 <h5 style={{ textAling:"center", color:"white" }}>¡Hola! da click en el boton que resuelva.</h5>
                 <Button 
                 href="/slide"
                 style={{ 
                    backgroundColor:"#A9F95A", 
                    borderRadius:"50px",
                    marginTop:"10px",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
                      }}  
                     variant="primary" 
                     size="lg" 
                     block >Conoce la Plataforma</Button>
                 <Button 
                 href="/signup"
                  style={{ 
                     backgroundColor:"#3FE0FF", 
                     borderRadius:"50px", 
                     marginTop:"10px",
                     boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)" }} 
                     variant="primary" 
                     size="lg" 
                     block >Emprender</Button>

                 <Button 
                 href="/login"
                 style={{ 
                  
                  
                    backgroundColor:"#6216C5", 
                    borderRadius:"50px", 
                    marginTop:"10px",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)" }} 
                    variant="primary" 
                    size="lg" 
                    block >Iniciar Sesión</Button>
                    </div>
               </Col> 
            </Row>
         </Container>
      </div>
   )
}

 
 export default withRouter(Langing);
 

