import { ReactNode, createContext } from "react";

type AuthContextType = {
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

  return (
    <AuthContext.Provider value={''}>
      {props.children}
    </AuthContext.Provider>
  );
}