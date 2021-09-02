import { ReactNode, createContext } from "react";

type AuthContextType = {
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
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
    <AuthContext.Provider value={''}>
      {props.children}
    </AuthContext.Provider>
  );
}