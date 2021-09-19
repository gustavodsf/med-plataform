import { Divider } from 'primereact/divider';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useContext } from "react";

import { UserContext, UserContextProvider } from '../../context/UserContext'
import { UserForm } from "./UserForm";
import { UserList } from "./UserList";

export function User(){
  /*
  **Framework Variables
  */
  const { loading } = useContext(UserContext);

  /*
  **Model Variables
  */
  

  /*
  **Local Variables
  */

  /*
  **Get values from state
  */

  /*
  **Local Methods
  */
  
  /*
  **React Methods
  */


  /*
  **Event Handler
  */

  return (<UserContextProvider>
    {
      loading ? (<ProgressSpinner 
          style={{width: '30px', height: '30px'}}
          strokeWidth="8"
          animationDuration="1s"
      />) : (<></>)
    }
    <Divider align="center">
      <span className="my-page-header">Formulário do Usuário</span> 
    </Divider>
    <div className="my-from"> 
      <UserForm />
    </div>
    <Divider align="center" >
      <span className="my-page-header">Lista de Usuário</span> 
    </Divider>
    <div className="my-list"> 
      <UserList />
    </div>
  </UserContextProvider>);
}