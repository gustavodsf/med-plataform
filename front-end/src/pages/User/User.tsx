import { auth } from '../../service/firebase';
import { ProgressSpinner } from 'primereact/progressspinner';
import { SendService } from "../../service/SendService";
import { Toast } from 'primereact/toast';
import { UserForm } from "./UserForm";
import { UserList } from "./UserList";
import { UserService } from "../../service/UserService";
import { useState, useEffect, useRef } from "react";

type IUser = {
  id: string;
  email: string;
  name: string;
  profile: string;
  enabled: boolean;
  password?: string;
}

export function User(){
  /*
  **Framework Variables
  */
  const toast = useRef(null);
  /*
  **Model Variables
  */
  const [userList, setUserList] = useState(Array<IUser>())
  const [userSelected, setUserSelected] = useState<IUser>();
  /*
  **Local Variables
  */
  const [loading, setLoading] = useState(false);
   
  /*
  **Get values from state
  */

  /*
  **Local Methods
  */
  const getUserList = () => {
    const userService = new UserService();
    userService.getAllData().then( result => {
      setUserList(result);
    });
  }
  /*
  **React Methods
  */
  useEffect(()=>{
    getUserList();
  }, [])

  /*
  **Event Handler
  */
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
        toast.current.show({severity:'error', summary: 'Erro',detail:'Problema ao atualizar o usuário.',life: 3000});
        setLoading(false);
      })
    } else {
      const pass = data.password || ''
      auth.createUserWithEmailAndPassword(data.email, pass).then(() => {
        userService.save(data).then(async () => {
          const sendService = new SendService();
          sendService.sendWelcomeMessage(data.email, pass);
          //TODO Improve the way to get error 
          // @ts-ignore: Unreachable code error
          toast.current.show({severity:'success', summary: 'Sucesso',detail:'Usuário salvo com sucesso.',life: 3000});
          getUserList();
          setLoading(false);
        })
      }).catch(() => {
        //TODO Improve the way to get error 
        // @ts-ignore: Unreachable code error
        toast.current.show({severity:'error', summary: 'Error',detail:'Problema ao salvar o usuário.',life: 3000});
        setLoading(false);
      });       
    }
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
      });
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