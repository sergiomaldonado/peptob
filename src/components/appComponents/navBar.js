import React, { Component } from 'react'
import './../App.css'
import {Navbar,Nav, Image, Button, Badge } from 'react-bootstrap'
import { ChevronLeft, Edit, MessageCircle, DollarSign, PlusCircle } from 'react-feather';
import logoOscuro from '../assets/logoOscuro.svg'

 const estadoInicial = {
   
}

class NavBar extends Component {
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

               {
                  this.props.homeNavContent === true 
                  ?  <Navbar style={{ marginTop:"5px" }} variant="dark">
                     <Navbar.Brand href="#home"><Image src={logoOscuro}></Image></Navbar.Brand>
                     <Nav className="mr-auto"></Nav>
                     <div><Badge style={{ position:"absolute", backgroundColor:"#8BE007", marginLeft:"30px", marginTop:"-5px" }} variant="light">9</Badge><Button style={{ backgroundColor:"#3E78F7", marginRight:"5px", border:"none", borderRadius:"50px", padding:"10px", paddingRight:"13px", paddingLeft:"13px" }} variant="primary">  <MessageCircle style={{ marginTop:"-5px", marginLeft:"-2px" }} size="20"/></Button></div>
                     <div><Button style={{ backgroundColor:"#2751AF", marginRight:"5px", border:"none", borderRadius:"50px", padding:"10px", paddingRight:"13px", paddingLeft:"13px" }} variant="primary">  <DollarSign style={{ marginTop:"-5px", marginLeft:"-2px" }} size="20"/></Button></div>
                     <div><Button style={{ backgroundColor:"#0E224B", marginRight:"5px", border:"none", borderRadius:"50px", padding:"10px", paddingRight:"10px", paddingLeft:"10px" }} variant="primary">  <PlusCircle style={{ marginTop:"-5px", marginLeft:"-0px" }} size="25"/></Button></div>
                    
                     </Navbar>   
                  :null
               }
               {
                  this.props.notificacionesNavContent === true
                  ?  <Navbar variant="dark">
                     <Navbar.Brand href="#home"> 
                     <h3 style={{ fontWeight:"bold", color:"#1A188A" }}><ChevronLeft style={{ marginTop:"-4px" }} onClick={()=>this.props.volverAlHome()} size={30}/> 
                           Notificaciones</h3>
                           </Navbar.Brand>
                     <Nav className="mr-auto"></Nav>
                     </Navbar>   
                  :null
               }

               {
                  this.props.misParcelasNavContent === true
                  ?  <Navbar style={{backgroundColor:"#0A369C"}} variant="dark">
                     <Navbar.Brand href="#home"> <ChevronLeft onClick={()=>this.props.volverAlHome()} size={25}/> Mis Parcelas</Navbar.Brand>
                     <Nav className="mr-auto"></Nav>
                     </Navbar>   
                  :null
               }
               {
                  this.props.miInventarioNavContent === true
                  ?  <Navbar style={{backgroundColor:"#0A369C"}} variant="dark">
                     <Navbar.Brand href="#home"> <ChevronLeft onClick={()=>this.props.volverAlHome()} size={25}/> Mi Inventario</Navbar.Brand>
                     <Nav className="mr-auto"></Nav>
                     </Navbar>   
                  :null
               }
               {
                  this.props.tiendaNavContent === true
                  ?  <Navbar style={{backgroundColor:"#0A369C"}} variant="dark">
                     <Navbar.Brand href="#home"> <ChevronLeft onClick={()=>this.props.volverAlHome()} size={25}/> Tienda</Navbar.Brand>
                     <Nav className="mr-auto"></Nav>
                     </Navbar>   
                  :null
               }
               {
                  this.props.escuelaNavContent === true
                  ?  <Navbar style={{backgroundColor:"#0A369C"}} variant="dark">
                     <Navbar.Brand href="#home"> <ChevronLeft onClick={()=>this.props.volverAlHome()} size={25}/> Escuela</Navbar.Brand>
                     <Nav className="mr-auto"></Nav>
                     </Navbar>   
                  :null
               }


               {
                  this.props.dentroDeParcela === true
                  ?  <Navbar style={{backgroundColor:"#0A369C"}} variant="dark">
                     <Navbar.Brand href="#home"><ChevronLeft onClick={()=>this.props.volverAParcelas(false)} size={25}/>
                            
                         {this.props.nombreParcela}

                     </Navbar.Brand>
                     <Nav className="mr-auto"></Nav>
                     </Navbar>   
                  :null
               }




               {/*this.props.regresarIcon == true ?<ChevronLeft/>:null <SingOutButton></SingOutButton>*/}

          </div>
            )
  }
}





export default NavBar;

