import { SetStateAction, Dispatch } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';


type IUser = {
    id: string;
    email: string;
    name: string;
    profile: string;
    enabled: boolean;
}

type UserListProps = {
    userList: Array<IUser>;
    userSelected: IUser |  undefined;
    setUserSelected : Dispatch<SetStateAction<IUser |  undefined>>;
}

export function UserList(props: UserListProps){
    const { userList, userSelected, setUserSelected } = props;

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

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

    return(
        <DataTable
            value={userList}
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            paginator
            currentPageReportTemplate="Exibindo {first} de {last} até {totalRecords}" 
            rows={10} 
            rowsPerPageOptions={[10,20,30]}
            paginatorLeft={paginatorLeft}
            paginatorRight={paginatorRight}
            dataKey="id"
            selectionMode="radiobutton"
            selection={userSelected}
            onSelectionChange={e => setUserSelected(e.value)}
        >
            <Column selectionMode="single" headerStyle={{width: '3em'}}></Column>
            <Column field="email" header="Email"></Column>
            <Column field="name" header="Nome"></Column>
            <Column header="Perfil" body={profileBodyTemplate}></Column>
            <Column header="Habilitado" body={enabledBodyTemplate}></Column>
        </DataTable>    
    );
}