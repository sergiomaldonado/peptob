import React, { Component } from 'react'
import { Button,Badge } from 'react-bootstrap';
import {ChevronRight,Book,Map,Box,ShoppingCart,BookOpen} from 'react-feather';
import 'react-toastify/dist/ReactToastify.css';
import './stylesAppComponents/menuPrincipalStyle.css'

const estadoInicial = {
  
}

class MenuPrincipalHome extends Component {
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
          <div style={{ marginTop:"15px" }}>
            <Button onClick={ ()=>this.props.activarBitacora() } className="botonMenuPrincipalHome" size="lg" block>
              <span className="itemMenuPrincipal"><Book size="20" /> &nbsp; Bitacora <Badge variant="success">1</Badge></span>
              <span style={{ float:"right", marginTop:"-2px" }}> <ChevronRight/> </span>
            </Button>
            <hr style={{ width:"87%", borderBottom:"solid #E1DFDF 0.5px", float:"right",  }}/>
            <Button onClick={ ()=>this.props.activarMisParcelas() } className="botonMenuPrincipalHome" size="lg" block>
              <span className="itemMenuPrincipal" > <Map size="20" />  &nbsp; Parcelas</span>
              <span style={{ float:"right", marginTop:"-2px" }}> <ChevronRight/> </span>
            </Button>
            <hr style={{ width:"87%", borderBottom:"solid #E1DFDF 0.5px", float:"right",  }}/>
            <Button onClick={ ()=>this.props.activarMiInventario() } className="botonMenuPrincipalHome" size="lg" block>
              <span className="itemMenuPrincipal" ><Box size="20" />  &nbsp; Inventario</span>
              <span style={{ float:"right", marginTop:"-2px" }}> <ChevronRight/> </span>
            </Button>
            <hr style={{ width:"87%", borderBottom:"solid #E1DFDF 0.5px", float:"right",  }}/>
            <Button onClick={ ()=>this.props.activarTienda() } className="botonMenuPrincipalHome" size="lg" block>
              <span className="itemMenuPrincipal" ><ShoppingCart size="20" />  &nbsp; Tienda</span>
              <span style={{ float:"right", marginTop:"-2px" }}> <ChevronRight/> </span>
            </Button>
            <hr style={{ width:"87%", borderBottom:"solid #E1DFDF 0.5px", float:"right",  }}/>
            <Button onClick={ ()=>this.props.activarEscuela() } className="botonMenuPrincipalHome" size="lg" block>
              <span className="itemMenuPrincipal" ><BookOpen size="20" />  &nbsp; Escuela</span>
              <span style={{ float:"right", marginTop:"-2px" }}> <ChevronRight/> </span>
            </Button>
            <hr style={{ width:"87%", borderBottom:"solid #E1DFDF 0.5px", float:"right",  }}/>
           

          
          </div>
            )
  }
}

export default MenuPrincipalHome;



