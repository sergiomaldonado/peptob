import { db} from './firebase';

// User API

export const doCreateUser = (id, nombre, apellido, email, telefono, rfc, rutaNegocio, idNegocio) =>{

    
  db.ref(`usuarios/${id}`).set({
    
    nombre,
    apellido,
    email, 
    telefono, 
    rfc,
    rutaNegocio:`negocios/${rutaNegocio}/${idNegocio}`
    
  })

  db.ref(`negocios/${rutaNegocio}/${idNegocio}`).set({
    dueño:"dueño1",
    idNegocio:idNegocio
 
 });

}





export const onceGetUsers = () =>

  db.ref('users/nutriologos/').once('value', snapshot => {

    return(
        snapshot.val()

    )
  })

