import { ReactNode, createContext } from "react";

type UserContextType = {
}

type UserContextProviderProps = {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider(props: UserContextProviderProps) {

  return (
    <UserContext.Provider value={''}>
      {props.children}
    </UserContext.Provider>
  );
}