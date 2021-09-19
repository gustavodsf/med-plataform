import { ReactNode, createContext } from "react";
import { Toast } from 'primereact/toast';
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";

import { auth } from '../service/firebase';
import { SendService } from "../service/SendService";
import { UserService } from "../service/UserService";

type IUser = {
  id: string;
  email: string;
  name: string;
  profile: string;
  enabled: boolean;
  password?: string;
  courses_id: string[]
}

type UserContextType = {
  handleDelete: Function;
  handleSave: Function;
  loading: boolean;
  setUserSelected : Dispatch<SetStateAction<IUser |  undefined>>;
  userList: Array<IUser>;
  userSelected: IUser |  undefined;
}

type UserContextProviderProps = {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider(props: UserContextProviderProps) {
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
    setLoading(true);
    const userService = new UserService();
    userService.getAllData().then( result => {
      setUserList(result);
      setLoading(false);
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

  return (
    <UserContext.Provider value={{
      handleDelete,
      handleSave,
      loading,
      setUserSelected,
      userList,
      userSelected,
    }}>
      <Toast ref={toast} position="top-right" />
      {props.children}
    </UserContext.Provider>
  );
}