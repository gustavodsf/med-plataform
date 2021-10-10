import { ReactNode, createContext } from "react";
import { Toast } from 'primereact/toast';
import { useRef, MutableRefObject, useEffect, useState } from 'react';

import { auth , signInWithEmailAndPassword, browserSessionPersistence, setPersistence} from '../service/firebase';
import { UserService } from '../service/UserService'

type IAccess = {
  email: string;
  password: string;
}

type User = {
  id: string;
  email: string | null;
  profile: string | null;
  courses_id: string[] | null;
}

type AuthContextType = {
  user: User | undefined;
  handleLogin: Function,
  handleLogout: Function,
  toast: MutableRefObject<Toast | null>
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  /*
  **Framework Variables
  */
  const toast = useRef(null);
  

  /*
  **Model Variables
  */
  const [user, setUser] = useState<User>();

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
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { uid, email } = user
        const userService  = new UserService();
        const dbUser = await userService.getUserById(email || '');
        setUser({
          id: uid,
          email: email,
          profile: dbUser.profile,
          courses_id: dbUser.courses_id,
        });
      }

    });
    
    return () => {
      unsubscribe();
    }
  }, [])

  /*
  **Event Handler
  */
  const handleLogout = () => {
    auth.signOut().then(() => {
      // Sign-out successful.
      setUser(undefined);
    }).catch((error) => {
      // An error happened.
    });
  }

  const handleLogin = (data: IAccess) => {
    setPersistence(auth , browserSessionPersistence)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      signInWithEmailAndPassword(auth, data.email, data.password).then(async (result) => {
        if (result.user) {
          const userService  = new UserService();
          const dbUser = await userService.getUserById(data.email);
          if(dbUser.enabled) {
            setUser({
              id: result.user.uid,
              email: result.user.email,
              profile: dbUser.profile,
              courses_id: dbUser.courses_id
            });
          } else {
            handleLogout();
          }
         
        }
      }).catch((error) => {
        // Handle Errors here.
        //TODO Improve the way to get error 
        // @ts-ignore: Unreachable code error
        toast.current.show({severity:'error', summary: 'Erro',detail:'Usuário ou senha inválido.',life: 3000});
      });
    })
    .catch((error) => {
      // Handle Errors here.
      //TODO Improve the way to get error 
      // @ts-ignore: Unreachable code error
      toast.current.show({severity:'error', summary: 'Erro',detail:'Usuário ou senha inválido.',life: 3000});
    });
  };
  
  return (
    <AuthContext.Provider value={{
      handleLogin,
      handleLogout,
      toast,
      user
    }}>
      <Toast ref={toast} position="top-right" />
      {props.children}
    </AuthContext.Provider>
  );
}