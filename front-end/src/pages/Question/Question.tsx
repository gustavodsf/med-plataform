import { Divider } from 'primereact/divider';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useContext } from 'react'

import { QuestionContext, QuestionContextProvider } from '../../context/QuestionContext'
import { QuestionForm } from './QuestionForm';
import { QuestionList } from './QuestionList';

export function Question(){
  /*
  **Framework Variables
  */
  const { loading } = useContext(QuestionContext);

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
    <QuestionContextProvider>
      {
          loading ? (<ProgressSpinner 
              style={{width: '30px', height: '30px'}}
              strokeWidth="8"
              animationDuration="1s"
          />) : (<></>)
      }
      <Divider align="center">
        <span className="my-page-header">Formulário da Questäo</span> 
      </Divider>
      <QuestionForm/>
      <Divider align="center" >
        <span className="my-page-header">Lista de Questäo</span> 
      </Divider>
      <QuestionList/>
    </QuestionContextProvider>
  );
}