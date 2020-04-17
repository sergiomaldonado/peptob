import React, { Component } from 'react';
import './App.css';
import { auth, db } from './../firebase'
import { authfb, dbfb } from './../firebase/firebase.js'
import {Form, Row, Col,Navbar,Button, Alert, Container, Card} from 'react-bootstrap'
import icoTienda from './assets/icoTienda.svg'
import icoRestaurant from './assets/icoRestaurant.svg'
import icoServicio from './assets/icoServicio.svg'
import SeleccionarNegocio from './seleccionTipoNegocio'
import {
    Link,
    withRouter,
  } from 'react-router-dom';
import * as routes from '../constants/routes';
import { ChevronLeft } from 'react-feather';


const SignUpPage = ({ history }) =>

     <div>
       

       <SignUpForm history={history} />
    
     </div>

const INITIAL_STATE = {
    nombre: '',
    apellido:'',
    email: '',
    telefono: '',
    matricula: '',
    pacientes:'',
    dietas:'',
    recetas:'',
    agenda:'',
    passwordOne: '',
    passwordTwo: '',
    error: '',
    rfc:"",
    pasoActualRegistro:1
  };

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });  
  
class SignUpForm extends Component {
 
        constructor(props) {
          super(props);
          this.state = { ...INITIAL_STATE };
        }



         crearTienda= (mensaje) =>{
           this.setState({

           })
         }
       
         siguientePaso = (event) =>{
          const {
            nombre,
            apellido,
            email,
            telefono,
            passwordOne,
            passwordTwo,
            rfc,
            
          } = this.state;

          nombre.length == 0 ? alert("llena todos los datos"):apellido.length == 0 ?alert("llena todos los datos"):
          
          email.length == 0 ?alert("llena todos los datos"):telefono.length == 0 ?alert("llena todos los datos"):

          passwordOne.length == 0 ?alert("llena todos los datos"):rfc.length==0 ?alert("llena todos los datos"):

          passwordOne != passwordTwo ?alert("las contraseñas no coinciden"):

          
           this.setState({
            pasoActualRegistro:2
          })

          

          event.preventDefault();

        }

        crearNeogocio = () =>{

        }
        onSubmit = (event, rutaNegocio) => {
            const {
                nombre,
                apellido,
                email,
                telefono,
                passwordOne,
                rfc,     
              } = this.state;
              const {
                history,
              } = this.props;
              const idNegocio = dbfb.ref().push();
              const key = idNegocio.key   
      
              auth.doCreateUserWithEmailAndPassword(email, passwordOne)
                .then(authUser => {
             
              db.doCreateUser(authUser.user.uid, nombre, apellido, email, telefono, rfc, rutaNegocio, key)

              rutaNegocio === "tiendas"
              ?history.push(routes.CREAR_TIENDA)
              :  rutaNegocio === "restaurants"
              ?history.push(routes.HOME)
              :rutaNegocio === "servicios" 
              ?history.push(routes.HOME):null  
        .then(() => {
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
          
        });
                })
                .catch(error => {
                  this.setState(byPropKey('error', error));
                });
          
             event.preventDefault();
      
        }
      
        render() {

            const {
                nombre,
                apellido,
                email,
                telefono,
                passwordOne,
                passwordTwo,
                error,
                rfc,
              } = this.state;
             
           
            
          return (


<div>
            
           
            {

this.state.pasoActualRegistro === 1
?   <div className="form-registro">
<Container style={{ marginTop:"20px" }}>
        <Row>
          <Col md={2} xs={2}><Link to={routes.LANDING}><ChevronLeft style={{ color:"#B2B2B2" }} className="regreso-ico" size="40"/></Link></Col>
          <Col md={10} xs={10}><h2 style={{ color:"#19188A" }}>REGISTRO</h2></Col>
        </Row>
       </Container>
  <Form onSubmit={this.siguientePaso} >
            <Form.Group controlId="formGridAddress1">
  <Row>
  <Alert style={{ fontSize:"15px" }} variant="warning">
    Es necesario que seas el representante legal o dueño de los negocios que registres dentro de la plataforma.
  </Alert>
    <Col md={6} xs={6}>
   
      <Form.Control value={nombre} onChange={event => this.setState(byPropKey('nombre', event.target.value))} placeholder="Nombre" />
    </Col>
    <Col  md={6} xs={6}>
  
      <Form.Control value={apellido} onChange={event => this.setState(byPropKey('apellido', event.target.value))} placeholder="Apellidos" />
    </Col>
  </Row>
  </Form.Group>
  <Row>
  <Col md={6} xs={6}>
  <Form.Group controlId="formGridAddress1">
    
    <Form.Control  value={email} onChange={event => this.setState(byPropKey('email', event.target.value))}placeholder="Correo Electronico" />
  </Form.Group>
  </Col>
  <Col md={6} xs={6}>
  <Form.Group controlId="formGridAddress1">
    
    <Form.Control  value={telefono} onChange={event => this.setState(byPropKey('telefono', event.target.value))} placeholder="Whatsapp" />
  </Form.Group>
  </Col>
  </Row>
  <Form.Group controlId="formGridAddress1">
    
    <Form.Control value={rfc} onChange={event => this.setState(byPropKey('rfc', event.target.value))} placeholder="RFC" />
    
  </Form.Group>
  <Form.Group controlId="formGridAddress1">
    <Form.Control value={passwordOne} onChange={event => this.setState(byPropKey('passwordOne', event.target.value))} type="password"  placeholder="Contraseña nueva" />
  </Form.Group>
  <Form.Group controlId="formGridAddress1">
    <Form.Control value={passwordTwo} onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))} type="password"  placeholder="Confirma tu Contraseña" />
  </Form.Group>
  { error && <p>{error.message}</p> }
  <Button type="submit" variant="primary" size="lg" block>Registrarme</Button>
</Form>
<Alert style={{ fontSize:"15px", marginTop:"20px" }} variant="primary">
Es necesario que tengas a la mano información sobre tu negocios y productos antes de registrarte, ya que tendras que iniciar el proceso de registro y verificacion de tu tienda.
  </Alert>

            </div>

///                            INICIA PASO DOS DEL REGISTRO          ////            
:this.state.pasoActualRegistro === 2
?<SeleccionarNegocio crearTienda={ (event, rutaNegocio)=>this.onSubmit(event, rutaNegocio) }/>
/**** CREAR UNA TIENDA */
:this.state.pasoActualRegistro == 3  //Pestaña de creacion de tienda
?<h1>ESTAS CREANDO UNA TIENDA</h1>
:this.state.pasoActualRegistro == 4 //Pestaña de creacion de Restaurant
?<h1>ESTAS CREANDO UN RESTAURANT</h1>
:this.state.pasoActualRegistro == 5 //Pestaña de creacion de Servicio
?<h1>ESTAS CREANDO UN SERVICIO</h1>
: null
}
</div>     
            
          );
        }
      }
      
      const SignUpLink = () =>
        <p>
          ¿Quieres usar Nodu en tus Parcelas?<br/>
          Envianos un correo a nodu@agrot.mx
          
        </p>
      

export default withRouter(SignUpPage);
export {
    SignUpForm,
    SignUpLink,
  };