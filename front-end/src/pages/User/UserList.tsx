import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useContext } from 'react' 

import { UserContext } from '../../context/UserContext'

type IUser = {
  id: string;
  email: string;
  name: string;
  profile: string;
  enabled: boolean;
}

export function UserList(){
  /*
  **Framework Variables
  */
  const { userList, userSelected, setUserSelected } = useContext(UserContext);

  /*
  **Model Variables
  */

  /*
  **Local Variables
  */
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
  const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

  /*
  **Get values from state
  */

  /*
  **Local Methods
  */
  const profileBodyTemplate = (rowData: IUser) => {
    if(rowData.profile === 'admin'){
      return "Administrador";
    }
    return "Usuário";
  }

  const enabledBodyTemplate = (rowData: IUser) => {
    if(rowData.enabled){
      return "Sim";
    }
    return "Não";
  }

  /*
  **React Methods
  */

  /*
  **Event Handler
  */
  return(
    <DataTable
        currentPageReportTemplate="Exibindo {first} de {last} até {totalRecords}" 
        dataKey="id"
        emptyMessage="Não foram encontrados usuários"
        onSelectionChange={e => setUserSelected(e.value)}
        paginator
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        rows={10} 
        rowsPerPageOptions={[10,20,30]}
        selection={userSelected}
        selectionMode="radiobutton"
        value={userList}
    >
      <Column selectionMode="single" headerStyle={{width: '3em'}}></Column>
      <Column field="email" header="Email"></Column>
      <Column field="name" header="Nome"></Column>
      <Column header="Perfil" body={profileBodyTemplate}></Column>
      <Column header="Habilitado" body={enabledBodyTemplate}></Column>
    </DataTable>    
  );
}