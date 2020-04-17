import React, { Component } from 'react';
import { SignUpLink } from './SingUpForm';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import {Form,Button} from 'react-bootstrap'
import {
  withRouter,
} from 'react-router-dom';

const SignInPage = ({ history }) =>
<div>
    
    <SignInForm history={history} />
    <SignUpLink />
</div>
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
        
       
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

   
    return (
      <div>
     
     
<Form onSubmit={this.onSubmit}>
  <Form.Group controlId="formBasicEmail">
   
    <Form.Control  value={email} onChange={event => this.setState(byPropKey('email', event.target.value))}  type="email" placeholder="Usuario" />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    
    <Form.Control value={password} onChange={event => this.setState(byPropKey('password', event.target.value))}  type="password" placeholder="Contraseña" />
  </Form.Group>
 
  <Button style={{ width:"100%" }}variant="primary" type="submit">
    Entrar
  </Button>
  { error && <p>{error.message}</p> }
</Form>


      
      </div>
     
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};