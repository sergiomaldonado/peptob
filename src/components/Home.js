import React, { Component } from 'react'
import withAutorization from './withAutorization'
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './appComponents/navBar.js'
import MenuPrincipalHome from './appComponents/menuPrincipalHome.js'
import BottomNavBar from './appComponents/bottomNavBar.js';
import Notifiaciones from './appComponents/notificaciones'

import './homeStyle.css'

const estadoInicial = {
  contenidoNav:"nod",
  perfilActivado:false,
  notificacionesActivadas:false,

   /** nombreDelComponente + Activado: Gestiona si el componente se muestra o no en el home
     * nombreDelComponente + NavContent: Cambia lo que se muestra en la barra de navegación superior 
     * */
  homeNavContent:true,
  homeActivado:true,
  bitacoraActivado:false,
  notificacionesNavContent:false,
  misParcelasActivado:false,
  misParcelasNavContent:false,
  miInventarioActivado:false,
  miInventarioNavContent:false,
  tiendaActivado:false,
  tiendaNavContent:false,
  escuelaActivado:false,
  escuelaNavContent:false,
  modalCreacionDeTarea:false,
  dentroDeParcela:false,
  nombreParcela:null,
  vistaParcelaActivada:true
}
/*** Esta constante resetea el estado de los componente para dar el efecto de volver al home en la flecha de regreso en 
   * en la barra dentro de cada componente
   */
const estadoInicialDeLasVistas = {
  homeActivado:true,
  homeNavContent:true,
  bitacoraActivado:false,
  notificacionesNavContent:false,
  misParcelasActivado:false,
  misParcelasNavContent:false,
  miInventarioActivado:false,
  miInventarioNavContent:false,
  tiendaActivado:false,
  tiendaNavContent:false,
  escuelaActivado:false,
  escuelaNavContent:false,
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...estadoInicial
    };
  }
  componentDidMount() { 
    
  }

  cambiarDeVistaHome = (stateHome, stateNotificacion, statePerfil) =>{

    
   this.setState({
     homeActivado:stateHome,
     perfilActivado:statePerfil,
     notificacionesActivadas:stateNotificacion,
     notificacionesNavContent:true,
     homeNavContent:false
   })

   if (statePerfil == true){
    this.setState({
      misParcelasNavContent:true,
      notificacionesNavContent:false,
      homeNavContent:false
    })
   }else{
     return false
   }

   if (stateHome == true){
    this.setState({
      ...estadoInicialDeLasVistas
    })
   }else{
     return false
   }

   


   
  }

  volverAlHome = () =>{
    this.setState({
      ...estadoInicialDeLasVistas
    })
  }
 

  render() {
       return(
          <div> 
            {
              /** Aqui se gestiona el contenido de la barra de navegacion superior, el contenido cambia segun
              la vista que esta activada, se para por propiedades los parametros al componente hijo */
              
              <NavBar style={{ zIndex:"999" }} Contenido={this.state.contenidoNav}
              /** Pasa al componente el contenido que tiene que mostrar en la nav */
              homeNavContent={this.state.homeNavContent}
              notificacionesNavContent={this.state.notificacionesNavContent}
              misParcelasNavContent={this.state.misParcelasNavContent}
              miInventarioNavContent={this.state.miInventarioNavContent}
              tiendaNavContent={this.state.tiendaNavContent}
              escuelaNavContent={this.state.escuelaNavContent}
              volverAlHome={()=>this.volverAlHome()}
              activarModalCreacionTarea={(estado)=>this.activarModalCreacionTarea(estado)}
              dentroDeParcela={this.state.dentroDeParcela}
              volverAParcelas={ ()=>this.volverAParcelas() }
              nombreParcela={this.state.nombreParcela}
              />
            }
              
              
            { 
              /*** Aquí se gestiona el contenido que se muestra en pantalla el home, las notificaciones o el 
              perfil de usuario, dentro del home se muestra el menu y todas las vistas de las funcionalidades principales */

              this.state.homeActivado === true
              ?<div>
              <h1>Este es el contenido del dashboard</h1>
              </div>
              :this.state.perfilActivado === true && this.state.bitacoraActivado === false
              ?<h1>Perfil</h1>
              :this.state.notificacionesActivadas === true && this.state.bitacoraActivado === false
              ?<Notifiaciones/>
              :null
            }

          
           
            {
              /** Este componente gestiona la navegacion inferior, controla las principales 3 vistas de la app */
              <BottomNavBar cambiarDeVistaHome={(stateHome, stateNotificacion, statePerfil)=>this.cambiarDeVistaHome(stateHome, stateNotificacion, statePerfil)}/>
            }
             
           
          </div>
            )
  }
}



const authCondition = (authUser) => !!authUser;

export default withAutorization(authCondition)(HomePage);

