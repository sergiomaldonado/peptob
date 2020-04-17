import React from 'react'
import './App.css'
import {Container, Row, Col} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import SignInForm from './SignInForm'
import Logo from './assets/logo.svg'

const Login = ({ history }) => {
   
   return(
      <div>
         <Container style={{ textAlign:"center"}} fluid={false}>
            <Row style={{ paddingTop:"10%" }}> 
               <Col md={12} xs={12}>
               
               <SignInForm/>
               </Col> 
            </Row>
         </Container>
      </div>
   )
}

 
 export default withRouter(Login);
 

