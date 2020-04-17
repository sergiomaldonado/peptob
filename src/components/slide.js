import React from 'react'
import './App.css'
import {Container, Row, Col} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import SignInForm from './SignInForm'
import Logo from './assets/logo.svg'
import Carousel from 're-carousel'

const Slide = ({ history }) => {
   
   return(
    

      <Carousel auto>
  <div style={{backgroundColor: 'tomato', height: '100%'}}>Frame 1</div>
  <div style={{backgroundColor: 'orange', height: '100%'}}>Frame 2</div>
  <div style={{backgroundColor: 'orchid', height: '100%'}}>Frame 3</div>
</Carousel>
   
   )
}

 
 export default withRouter(Slide);
 

