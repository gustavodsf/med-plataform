import { ReactNode, createContext } from "react";

type QuestionContextType = {
}

type QuestionContextProviderProps = {
  children: ReactNode;
}

export const QuestionContext = createContext({} as QuestionContextType);

export function QuestionContextProvider(props: QuestionContextProviderProps) {
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
    <QuestionContext.Provider value={''}>
      {props.children}
    </QuestionContext.Provider>
  );
}