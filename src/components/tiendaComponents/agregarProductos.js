import React, { Component } from 'react'
import { authfb, dbfb, storage } from '../../firebase/firebase.js'
import {Form, Row, Col,Navbar,Button, Alert, Container, Card, Image, FormControl, ProgressBar, Badge} from 'react-bootstrap'
import Map from './../map.js'
import './../homeStyle.css'
import {Trash} from 'react-feather'

const estadoInicial = {
   vistaProductos:false,
   loader:0,
   loaderImagenDestacada:0,
   imagen:null,
   imagenes:[],
   porcentaje:"%",
   precio:"",
   precioOferta:"",
   unidad:"",
   inventario:"",
   nombreProducto:"",
   categoriaProducto:"",
   imagenDestacada:""
}
/*** Esta constante resetea el estado de los componente para dar el efecto de volver al home en la flecha de regreso en 
   * en la barra dentro de cada componente
   */
const estadoInicialDeLasVistas = {
  
}

class AgregarProductos extends Component {
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

        dbfb.ref(`${this.state.rutaNegocio}/productos`).on('value', snapshot =>{
          this.setState({
               listadoDeProductos: snapshot.val()           
            }) 
             })
         })
    
  }

  borrarProducto = (rutaProducto) =>{

 

    dbfb.ref(rutaProducto).remove()

  }

  crearProducto = () => {
    const idProducto = dbfb.ref().push();
    const key = idProducto.key   
    dbfb.ref(`${this.state.rutaNegocio}/productos/${key}`).set({
      nombre:this.state.nombreProducto,
      imagenes:this.state.imagenes,
      precio:this.state.precio,
      precioOferta:this.state.precioOferta,
      unidad:this.state.unidad,
      inventario:this.state.inventario,
      rutaProducto:`${this.state.rutaNegocio}/productos/${key}`,
      categoria:this.state.categoriaProducto,
      imagenDestacada:this.state.urlImagenDestacada
    })
    dbfb.ref(`productos/${this.state.categoriaProducto}/${key}`).set({
      nombre:this.state.nombreProducto,
      imagenes:this.state.imagenes,
      precio:this.state.precio,
      precioOferta:this.state.precioOferta,
      unidad:this.state.unidad,
      inventario:this.state.inventario,
      rutaProducto:`${this.state.rutaNegocio}/productos/${key}`,
      rutaNegocio:`${this.state.rutaNegocio}`,
      categoria:this.state.categoriaProducto,
      imagenDestacada:this.state.urlImagenDestacada
     
      
      
    })
    dbfb.ref(`${this.state.rutaNegocio}/productos`).on('value', snapshot =>{
      this.setState({
           listadoDeProductos: snapshot.val()           
        }) 
         })
     
    this.setState({
      vistaProductos:false,
   loader:0,
   imagen:null,
   imagenes:[],
   porcentaje:"%",
   precio:"",
   precioOferta:"",
   unidad:"",
   inventario:"",
   nombreProducto:"",
   categoriaProducto:"",
   imagenDestacada:""

   }) 

   
  



  }

  subidaDeimagenDestacada (event) {
    const file = event.target.files[0];
    const storageRef = storage.ref(`productos/${file.name}`);
    const task = storageRef.put(file);
    const uid = this.state.usuarioLogeado
    task.on('state_changed', (snapshot) => {
      let porcentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        loaderImagenDestacada: porcentaje
      })
    }, (error) => {
      console.error(error.message)
    }, () => {

            storage.ref('productos').child(file.name).getDownloadURL().then(url => {
              this.setState({urlImagenDestacada:url})
        })
         {/** this.setState({
        imagen: task.snapshot.downloadURL
   }) **/}
    })
  }
  

  subidaDeimagen (event) {
    const file = event.target.files[0];
    const storageRef = storage.ref(`productos/${file.name}`);
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

            storage.ref('productos').child(file.name).getDownloadURL().then(url => {
              
              this.setState(state => {
                const list = state.imagenes.push(url);
                return {
                  list,
                  value: '',
                };
              });
              this.setState({url:'',loader:0,})
             
        })
         {/** this.setState({
        imagen: task.snapshot.downloadURL
   }) **/}
    })
  }
  

  

  render() {
 const datos = this.state.imagenes ? this.state.imagenes:null
 const listadoDeProductos = this.state.listadoDeProductos ?this.state.listadoDeProductos:{}
  
       return(
           <div>
       
          {
               this.state.vistaProductos == false
               ?<div> <Container style={{ marginTop:"20px" }}>
               <Row>
                 <Col md={12} xs={12}>
                   <h2 style={{ color:"#19188A", fontWeight:"bold" }}>Tus productos</h2>
                 </Col>
       

               </Row>
           </Container>
           <Container style={{ marginTop:"10px" }}> 
               <Row>
                 <Col md={12} xs={12} style={ {paddingBottom:"90px"} }>
                 
                

                        {

                          Object.keys(listadoDeProductos).reverse().map(key=>

                            <Card style={{ marginTop:"10px" }}>
                             <Card.Body style={{ paddingTop:"5px", paddingBottom:"5px", border:"0px solid 1px", boxShadow:" 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"}}>   
                          
                            <Badge onClick={()=>this.borrarProducto(listadoDeProductos[key].rutaProducto)} style={{ height:"21px", 
                                              position:"absolute",
                                              zIndex:"99",
                                              right:"5px",
                                              boxShadow:" 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
                               }} pill variant="danger">x</Badge>    
                            <Row>
                              
                            <Col style={{ height:"90px"}} md={4} xs={4}>
                            <Image style={{ height:"100%", marginLeft:"-15px"  }} src={ listadoDeProductos[key].imagenDestacada } rounded/>
                            </Col>
                            <Col  md={8} xs={8}>
                            <h5>{ listadoDeProductos[key].nombre }</h5> 
                              <Row>
                               <Col md={6} xs={6}>${listadoDeProductos[key].precio}</Col>
                               <Col md={6} xs={6}>{listadoDeProductos[key].inventario} { listadoDeProductos[key].unidad }</Col>
                               </Row>
                            </Col>
                            </Row>
                            </Card.Body>
                   </Card>
                            )
                        }
                            
                      
                  
                   
                 </Col>
               </Row>
           </Container>
 
           <Navbar fixed="bottom" style={{ 

background: "rgb(255,255,255)",
background: "linear-gradient(0deg, rgba(255,255,255,1) 47%, rgba(255,255,255,0) 88%)"
}} >
               <Button 
               style={{ fontSize:"15px" }}
               className="botonVerde" 
               onClick={()=>this.setState({ vistaProductos:true })} 
               variant="primary" 
               size="lg" block>
               Agregar Producto
               </Button>
               <a href="/home" style={{ marginLeft:"20px", color:"#19188A"} }>Siguiente </a>
 
               </Navbar>
               
           </div>
               :<div>
               
           <Container style={{ marginTop:"20px", paddingBottom:"100px" }}> 
           <Form>
                    <Form.Group>
                    <Form.Control value={ this.state.nombreProducto } onChange={ (e)=>this.setState({ nombreProducto:e.target.value }) } type="text" placeholder="Titulo del Producto" />
                    </Form.Group>


                {/** PROCESO DE CARGA DE IMAGEN DESTACADA */}
                  {this.state.loaderImagenDestacada === 0
                      ? <div></div>
                      : <div style={{ width:"100%", textAlign:"center", paddingBottom:"10px" }}><Image style={{ width:"100px", height:"100px", textAlign:"center"}} src={this.state.urlImagenDestacada} rounded /></div>
                  }
                  {this.state.loaderImagenDestacada === 0
                     
                      ?<div><div style={{ width:"100%", height:"50px", borderRadius:"10px", border:"dotted #C7C4C4 3px", padding:"8px 10px 10px", marginBottom:"20px"}}>
                        <p style={{ textAlign:"center", }}>Agregar imagen destacada</p>
                        </div>
                        <div  style={{position:"absolute", opacity:"0", marginTop:"-40px"}} >
                         <FormControl className="buttonPic" type="file" placeholder="+Aregar Fotografia" onChange={(event)=>this.subidaDeimagenDestacada(event)}></FormControl>
                         </div></div>
                      :<div></div>
                   }
                   {this.state.loaderImagenDestacada === 0
                      
                      ? <div></div>
                      :this.state.loaderImagenDestacada === 100
                       ?null
                       :<div>
                         {/*** Mensaje mientras se carga la imagen */}
                        <p>Espera un momento, tu imagen se esta subiendo...
                        <ProgressBar animated bsStyle="success" label={`${Math.round(this.state.loaderImagenDestacada)}%`} now={this.state.loaderImagenDestacada} /></p>
                        </div>
                   }
{/*** ___________________________________________________________ */}

<div><div style={{ width:"100%", height:"50px", borderRadius:"10px", border:"dotted #C7C4C4 3px", padding:"8px 10px 10px"}}>
                        <p style={{ textAlign:"center", }}>Agregar imagen a la galeria</p>
                        </div>
                        <div  style={{position:"absolute", opacity:"0", marginTop:"-40px"}} >
                         <FormControl className="buttonPic" type="file" placeholder="+Aregar Fotografia" onChange={(event)=>this.subidaDeimagen(event)}></FormControl>
                         </div></div>

                     {/** PROCESO DE CARGA DE IMAGEN */}
                 
                  {this.state.loader === 0
                     
                      ?<div style={{position:"relative", marginBottom:"10px"}}>

                            <Row style={{ marginTop:"20px", marginBottom:"20px" }}>

                            {

                                Object.keys(datos).map(key=>


                                  <Col style={{ marginTop:"20px" }} md={4} xs={4}> 
                              <Badge style={{ height:"21px", 
                                              position:"absolute",
                                              float:"right !important",
                                              boxShadow:" 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
                               }} pill variant="danger">x</Badge><Image style={{ width:"100%", boxShadow:" 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)" }} src={ datos[key] } rounded></Image>
                               </Col>


                               )

                            }
                             
                            
                             
                             
                            </Row>
                         

                        
                       </div>
                      :<div></div>
                   }
                   {this.state.loader === 0
                      
                      ? <div></div>
                      :this.state.loader === 100
                       ?null
                       :<div>
                         {/*** Mensaje mientras se carga la imagen */}
                        <p>Tu imagen se esta subiendo...
                        <ProgressBar animated bsStyle="success" label={`${Math.round(this.state.loader)}%`} now={this.state.loader} /></p>
                        </div>
                   }
                   <Form.Group controlId="exampleForm.ControlTextarea1">
                     <Form.Label>Descripción</Form.Label>
                     <Form.Control as="textarea" rows="3" />
                   </Form.Group>
                  <Row>
                    <Col md={6} xs={6}>
                    <Form.Group>
                        <Form.Control value={ this.state.precio } onChange={ (e)=>this.setState({ precio:e.target.value }) } type="text" placeholder="Precio" />
                    </Form.Group>
                    </Col>
                    <Col md={6} xs={6}>
                    <Form.Group>
                        <Form.Control value={ this.state.precioOferta } onChange={ (e)=>this.setState({ precioOferta:e.target.value }) } type="text" placeholder="Precio Oferta" />
                    </Form.Group>
                    </Col>
                    <Col style={{ marginBottom:"20px" }} md={12} xs={12}>

                    <Form.Group onChange={ (e)=>this.setState({ categoriaProducto:e.target.value }) } controlId="exampleForm.ControlSelect1">
                      <Form.Label>Categoría</Form.Label>
                        <Form.Control as="select">
                          <option value="ropaMujer" >Ropa Mujer</option>
                          <option value="ropaHombre" >Ropa Hombre</option>
                          <option value="ropaNiño" >Ropa Niño</option>
                          <option value="ropaNiña" >Ropa Niña</option>
                          <option value="electronica" >Electronica</option>
                          <option value="Hogar" >Hogar</option>
                          <option value="accesorios" >Accesorios</option>
                          <option value="maquillaje" >Maquillaje</option>
                          <option value="cocina" >Cocina</option>
                          <option value="accesoriosCarros" >Accesorios Carros</option>
                        </Form.Control>
                      </Form.Group>
                    
                    </Col>
                    <Col md={6} xs={6}>
                    <Form.Group>
                        <Form.Control value={ this.state.unidad } onChange={ (e)=>this.setState({ unidad:e.target.value }) } type="text" placeholder="Unidad" />
                    </Form.Group>
                    </Col>
                    <Col md={6} xs={6}>
                    <Form.Group>
                        <Form.Control value={ this.state.inventario } onChange={ (e)=>this.setState({ inventario:e.target.value }) } type="text" placeholder="Inventario" />
                    </Form.Group>
                    </Col>

      
                  </Row>
               </Form>
            
           </Container>
 
           <Navbar fixed="bottom" style={{ 

            background: "rgb(255,255,255)",
            background: "linear-gradient(0deg, rgba(255,255,255,1) 47%, rgba(255,255,255,0) 88%)"
           }}>
           <a onClick={ ()=>this.setState({ vistaProductos:false }) } style={{ marginRight:"15px", color:"#19188A"} }>Cancelar </a>
 
               <Button 
               style={{ fontSize:"15px" }}
               className="botonVerde" 
               onClick={()=>this.crearProducto()} 
               variant="primary" 
               size="lg" block>
               Guardar Producto
               </Button>
              
               </Navbar>

               </div>
           }
           </div>
         
            )
  }
}





export default AgregarProductos

