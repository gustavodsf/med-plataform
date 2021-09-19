import { CourseForm } from './CourseForm';
import { CourseList } from './CourseList';
import { Divider } from 'primereact/divider';
import { useContext } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

import { CourseContextProvider, CourseContext } from '../../context/CourseContext'

export function Course(){
  /*
  **Framework Variables
  */
  const { loading } = useContext(CourseContext);
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
    <CourseContextProvider>
      <Divider align="center">
        <span className="my-page-header">Formulário do Curso</span> 
      </Divider>
     
      {
        loading ? (<ProgressSpinner 
          style={{width: '30px', height: '30px'}}
          strokeWidth="8"
          animationDuration="1s"
        />) : (<></>)
      }
      <div className="my-from"> 
        <CourseForm />
      </div>
      <Divider align="center" >
        <span className="my-page-header">Lista de Curso</span> 
      </Divider>
      <div className="my-list"> 
        <CourseList />
      </div>
    </CourseContextProvider>
  )
}