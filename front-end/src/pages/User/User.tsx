import { Divider } from 'primereact/divider';

import { UserContextProvider } from '@context/UserContext';
import { UserList } from '@user/UserList';

export function User() {
  /*
   **Framework Variables
   */

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

  return (
    <UserContextProvider>
      <Divider align="center">
        <span className="my-page-header">Lista de Usuário</span>
      </Divider>
      <div className="my-list">
        <UserList />
      </div>
    </UserContextProvider>
  );
}
