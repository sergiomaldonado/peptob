import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Landing from './Landing'
import Home from './Home'
import Singin from './SingInPage'
import Singup from './SingUpPage'
import Acount from './acount'
import Login from './login'
import Slide from './slide'
import CrearTienda from './crearTienda'
import * as routes from '../constants/routes'
import withAuthentication from './withAutentication'

const App = () =>
  
      <Router>
        <div>
          <div>
     
     <Route exact path={routes.LANDING} component={ Landing } />
     <Route exact path={routes.HOME} component={ Home } />
     <Route exact path={routes.LOGIN} component={ Login } />
     <Route exact path={routes.SLIDE} component={ Slide } />
     <Route exact path={routes.CREAR_TIENDA} component={ CrearTienda } />
     <Route exact path={routes.SIGN_IN} component={ Singin } />
     <Route exact path={routes.SIGN_UP} component={ Singup } />
     <Route exact path={routes.ACCOUNT} component={ Acount } />

     </div>
        </div>
      </Router>
  
export default withAuthentication(App);

