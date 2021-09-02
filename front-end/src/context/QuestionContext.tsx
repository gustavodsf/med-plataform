import { ReactNode, createContext } from "react";

type QuestionContextType = {
}

type QuestionContextProviderProps = {
  children: ReactNode;
}

export const QuestionContext = createContext({} as QuestionContextType);

export function QuestionContextProvider(props: QuestionContextProviderProps) {

  return (
    <QuestionContext.Provider value={''}>
      {props.children}
    </QuestionContext.Provider>
  );
}