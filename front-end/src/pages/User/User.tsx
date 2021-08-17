import { useState, useEffect, useRef } from "react";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { UserForm } from "./UserForm";
import { UserList } from "./UserList";
import { UserService } from "../../service/UserService";

type IUser = {
    id: string;
    email: string;
    name: string;
    profile: string;
    enabled: boolean;
    password?: string;
}

export function User(){
    const [userList, setUserList] = useState(Array<IUser>())
    const [userSelected, setUserSelected] = useState<IUser>();
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);

    useEffect(()=>{
        getUserList();
    }, [])

    const handleSave = (data: IUser) => {
        setLoading(true);
        const userService = new UserService();
        if(userSelected && data.email === userSelected?.email){
            data.id = userSelected.id;
            userService.update(data).then(() => {
                //TODO Improve the way to get error 
                // @ts-ignore: Unreachable code error
                toast.current.show({severity:'success', summary: 'Sucesso',detail:'Usuário atualizado com sucesso.',life: 3000});
                getUserList();
                setLoading(false);
            }).catch(() => {
                //TODO Improve the way to get error 
                // @ts-ignore: Unreachable code error
                toast.current.show({severity:'error', summary: 'Error',detail:'Problema ao atualizar o usuário.',life: 3000});
                setLoading(false);
            })
        
        } else {
            userService.save(data).then(() => {
                //TODO Improve the way to get error 
                // @ts-ignore: Unreachable code error
                toast.current.show({severity:'success', summary: 'Sucesso',detail:'Usuário salvo com sucesso.',life: 3000});
                getUserList();
                setLoading(false);
            }).catch(() => {
                //TODO Improve the way to get error 
                // @ts-ignore: Unreachable code error
                toast.current.show({severity:'error', summary: 'Error',detail:'Problema ao salvar o usuário.',life: 3000});
                setLoading(false);
            })
        }
    }

    const getUserList = () => {
        const userService = new UserService();
        userService.getAllData().then( result => {
            setUserList(result);
        });
    }

    const handleDelete = () => {
        setLoading(true);
        const userService = new UserService();
        if( userSelected ){
            userService.delete(userSelected.id).then(() => {
                //TODO Improve the way to get error 
                // @ts-ignore: Unreachable code error
                toast.current.show({severity:'success', summary: 'Sucesso',detail:'Usuário removido com sucesso.',life: 3000});
                getUserList();
                setLoading(false);
            }).catch(() => {
                //TODO Improve the way to get error 
                // @ts-ignore: Unreachable code error
                toast.current.show({severity:'error', summary: 'Error',detail:'Problema ao remover o usuário.',life: 3000});
                setLoading(false);
            })
        }
        setLoading(false);
    }

    return (<>
        <Toast ref={toast} position="top-right" />
        <div className="spinnerContainer">
            {
                loading ? (<ProgressSpinner 
                    style={{width: '30px', height: '30px'}}
                    strokeWidth="8"
                    animationDuration="1s"
                />) : (<></>)
            }
        </div>
        <UserForm
            userSelected={userSelected}
            setUserSelected={setUserSelected}
            handleSave={handleSave}
            handleDelete={handleDelete}
        />
        <UserList 
            userList={userList}
            setUserSelected={setUserSelected}
            userSelected={userSelected}
        />
    </>);
}