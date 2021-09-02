import { ReactNode, createContext } from "react";
import { Toast } from 'primereact/toast';
import { useEffect, useState, useRef, Dispatch, SetStateAction  } from 'react';

import { QuestionService } from '../service/QuestionService';

type IQuestion = {
  answer: number;
  course_id: string;
  id: string;
  justification: string;
  options: Array<string>;
  proof: string;
  question: string;
  simulated: boolean
  theme: Array<string>;
  topic_id: string;
  utterance: string
}

type QuestionContextType = {
  handleDelete: Function;
  handleSave: Function;
  loading: boolean;
  questionList: Array<IQuestion>
  questionSelected: IQuestion | undefined
  setQuestionSelected : Dispatch<SetStateAction<IQuestion |  undefined>>;
}

type QuestionContextProviderProps = {
  children: ReactNode;
}

export const QuestionContext = createContext({} as QuestionContextType);

export function QuestionContextProvider(props: QuestionContextProviderProps) {
  /*
  **Framework Variables
  */
  const toast = useRef(null);
  /*
  **Model Variables
  */
  const [questionList, setQuestionList] = useState(Array<IQuestion>())
  const [questionSelected, setQuestionSelected] = useState<IQuestion>();
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
  const getQuestionList = () => {
    const questionService = new QuestionService();
    questionService.getAllData().then( result => {
      setQuestionList(result);
    });
  }

  /*
  **React Methods
  */
  useEffect(()=>{
    getQuestionList();
  }, [])

  /*
  **Event Handler
  */
  const handleSave = (data: IQuestion) => {
    setLoading(true);
    const questionService = new QuestionService();
    if(questionSelected && data.proof === questionSelected?.proof){
      data.id = questionSelected.id;
      questionService.update(data).then(() => {
        //TODO Improve the way to get error 
        // @ts-ignore: Unreachable code error
        toast.current.show({severity:'success', summary: 'Sucesso',detail:'Questão atualizada com sucesso.',life: 3000});
        getQuestionList();
        setLoading(false);
      }).catch(() => {
        //TODO Improve the way to get error 
        // @ts-ignore: Unreachable code error
        toast.current.show({severity:'error', summary: 'Erro',detail:'Problema ao atualizar a questão.',life: 3000});
        setLoading(false);
      });
    } else {
      questionService.save(data).then(async () => {
        //TODO Improve the way to get error 
        // @ts-ignore: Unreachable code error
        toast.current.show({severity:'success', summary: 'Sucesso',detail:'Questão salvo com sucesso.',life: 3000});
        getQuestionList();
        setLoading(false);                   
      }).catch(() => {
        //TODO Improve the way to get error 
        // @ts-ignore: Unreachable code error
        toast.current.show({severity:'error', summary: 'Error',detail:'Problema ao salvar a questão.',life: 3000});
        setLoading(false);
      });
    }
  }

  const handleDelete = () => {
    setLoading(true);
    const questionService = new QuestionService();
    if( questionSelected ){
      questionService.delete(questionSelected.id).then(() => {
        //TODO Improve the way to get error 
        // @ts-ignore: Unreachable code error
        toast.current.show({severity:'success', summary: 'Sucesso',detail:'Questão removida com sucesso.',life: 3000});
        getQuestionList();
        setLoading(false);
      }).catch(() => {
        //TODO Improve the way to get error 
        // @ts-ignore: Unreachable code error
        toast.current.show({severity:'error', summary: 'Error',detail:'Problema ao remover a questão.',life: 3000});
        setLoading(false);
      });
    }
    setLoading(false);
  }

  return (
    <QuestionContext.Provider value={{
      handleDelete,
      handleSave,
      loading,
      questionList,
      questionSelected,
      setQuestionSelected
    }}>
      <Toast ref={toast} position="top-right" />
      {props.children}
    </QuestionContext.Provider>
  );
}