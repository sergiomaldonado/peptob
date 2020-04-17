import React, { Component } from 'react'
import withAutorization from './withAutorization'
import { authfb, dbfb, storage } from '../firebase/firebase.js'
import {Form, Row, Col,Navbar,Button, Alert, Container, Card, Image, FormControl, ProgressBar} from 'react-bootstrap'

import Map from './map.js'
import './homeStyle.css'
import AgregarProductos from './tiendaComponents/agregarProductos'

const estadoInicial = {
   vistaActivada:1,
   loader:0,
   imagen:null,
   porcentaje:"%"
}

/*** Esta constante resetea el estado de los componente para dar el efecto de volver al home en la flecha de regreso en 
   * en la barra dentro de cada componente
   */
const estadoInicialDeLasVistas = {
  
}

class CrearTienda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...estadoInicial
    };
  }
  componentDidMount() { 

    const uid = authfb.currentUser.uid

    dbfb.ref(`usuarios/${uid}/rutaNegocio`).on('value', snapshot =>{
      this.setState({
           rutaNegocio: snapshot.val()           
        
        }) 

         })
    
  }
  
  crearTienda = (event) => {
    
    dbfb.ref(`${this.state.rutaNegocio}`).set({
        nombreTienda:this.state.nombreTienda,
        latitud:this.state.latitud,
        longitud:this.state.longitud,
        tipoDeProductos:this.state.tipoDeProductos,
        rfc:this.state.rfc,
        cuentaClabe:this.state.cuentaClabe,
        logo:this.state.url
    })
     this.setState({
       vistaActivada:2
     })

     event.preventDefault();

  }

  ubicacionMapa = (lat, long, direccion)=>{

 

    this.setState({
      latitud:lat,
      longitud:long,
      direccion:direccion
    })

  }
  subidaDeimagen (event) {
    const file = event.target.files[0];
    const storageRef = storage.ref(`logosNegocios/${file.name}`);
    const task = storageRef.put(file);
    const uid = this.state.usuarioLogeado
    task.on('state_changed', (snapshot) => {
      let porcentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        loader: porcentaje
      })
    }, (error) => {
      console.error(error.message)
    }, () => {
            storage.ref('logosNegocios').child(file.name).getDownloadURL().then(url => {
            this.setState({url});  
        })
         {/** this.setState({
        imagen: task.snapshot.downloadURL
   }) **/}
    })
  }

  render() {
       return(
          <div> 
            {
              this.state.vistaActivada === 1 
              ?<div>
                   
              <Container style={{ marginTop:"20px" }}>
              <Row>
                <Col md={10} xs={10}>
                  <h2 style={{ color:"#19188A" }}>TU TIENDA</h2>
                </Col>
              </Row>
              </Container>

              <Container>
                   {/** PROCESO DE CARGA DE IMAGEN */}
                   {this.state.loader === 0
                      ? <div></div>
                      : <div style={{ width:"100%", textAlign:"center", paddingBottom:"10px" }}><Image style={{ width:"100px", height:"100px", textAlign:"center"}} src={this.state.url} rounded /></div>
                  }
                  {this.state.loader === 0
                     
                      ?<div style={{position:"relative", marginBottom:"10px"}}>
                        <div style={{ width:"100%", height:"50px", borderRadius:"10px", border:"dotted #C7C4C4 3px", padding:"8px 10px 10px"}}>
                        <p style={{ textAlign:"center", }}>Agregar Logotipo</p>
                        </div>
                         
                         <div  style={{position:"absolute", opacity:"0", marginTop:"-40px"}} >
                         <FormControl className="buttonPic" type="file" placeholder="+Aregar Fotografia" onChange={this.subidaDeimagen.bind(this)}></FormControl>
                         </div>
                       </div>
                      :<div></div>
                   }
                   {this.state.loader === 0
                      
                      ? <div></div>
                      :this.state.loader === 100
                       ?null
                       :<div>
                         {/*** Mensaje mientras se carga la imagen */}
                        <p>Espera un momento, tu imagen se esta subiendo...
                        <ProgressBar animated bsStyle="success" label={`${Math.round(this.state.loader)}%`} now={this.state.loader} /></p>
                        </div>
                   }
              <Form>
                    <Form.Group>
                    <Form.Control value={ this.state.nombreTienda } onChange={ (e)=>this.setState({ nombreTienda:e.target.value }) } type="text" placeholder="Nombre De tu Tienda" />
                    </Form.Group>
                  
                    <Form.Group controlId="formBasicEmail">
                    <Form.Control value={ this.state.tipoDeProductos } onChange={ (e)=>this.setState({ tipoDeProductos:e.target.value }) } as="select">
                        <option>Tipo de productos que venderas</option>
                        <option>Tecnología</option>
                        <option>Ropa de Hombre</option>
                        <option>Ropa de Mujer</option>
                        <option>Ropa de Hombre y Mujer</option>
                        <option>Accesorios</option>
                        <option>Mascotas</option>
                        <option>Ferreteria</option>
                        <option>Farmacia</option>
                    </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control value={ this.state.rfc } onChange={ (e)=>this.setState({ rfc:e.target.value }) } type="text" placeholder="RFC de Facturacion" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control value={ this.state.cuentaClabe } onChange={ (e)=>this.setState({ cuentaClabe:e.target.value }) } type="text" placeholder="Cuenta Clabe" />
                    </Form.Group>
               </Form>
              </Container>

              <Map
				          google={this.props.google}
				        	center={{lat: 25.66660828990133, lng:-97.81584093689577}}
				         	height='400px'
				          zoom={14}
                  datosHijo={(lat, lng, direccion)=>this.ubicacionMapa(lat, lng, direccion)}
                  style={{marginTop:"30px"}}
			        />

              <Navbar fixed="bottom" style={{ 
                                      background: "rgb(255,255,255)",
                                      background: "linear-gradient(0deg, rgba(255,255,255,1) 47%, rgba(255,255,255,0) 88%)"
                                            }}>
              <Button 
              className="botonVerde" 
              onClick={(event)=>this.crearTienda(event)} 
              variant="primary" 
              size="lg" block>
              Guardar Tienda
              </Button>

              </Navbar>
                    
             




              </div>
              :this.state.vistaActivada === 2 
              ?<AgregarProductos/>
              :<h1>ERROR</h1>

            }
        
              
          </div>
            )
  }
}



const authCondition = (authUser) => !!authUser;

export default withAutorization(authCondition)(CrearTienda);

