import React, { Component } from 'react'
import './../App.css'
import SingOutButton from './../SingOut'


 const estadoInicial = {
   
}

class Notificaciones extends Component {
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
          <SingOutButton></SingOutButton>
          </div>
            )
  }
}





export default Notificaciones;

