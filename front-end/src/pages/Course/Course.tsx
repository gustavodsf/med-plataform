import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { useState, useRef, useEffect } from 'react';
import { CourseService } from '../../service/CourseService';
import { CourseForm } from './CourseForm';
import { CourseList } from './CourseList';

interface ITopic {
  id: string;
  name: string;
  pdf_url: string;
  couseId?: string;
}

interface ICourse {
  id: string;
  name: string;
  enabled: boolean;
  topics: Array<ITopic>;
}

export function Course(){
  /*
  **Framework Variables
  */
  const toast = useRef(null);

  /*
  **Model Variables
  */
 const [courseList, setCourseList] = useState(Array<ICourse>());
 const [courseSelected, setCourseSelected] = useState<ICourse>();

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
  const getCourseList = () => {
    const courseService = new CourseService();
    courseService.getAllData().then( result => {
      setCourseList(result);
    });
  }

  /*
  **React Methods
  */
  useEffect(()=>{
    getCourseList();
  }, [])

  /*
  **Event Handler
  */
  const handleSave = (data: ICourse) => {
    setLoading(true);
    const courseService = new CourseService();
    if(courseSelected && data.name === courseSelected?.name){
      data.id = courseSelected.id;
      courseService.update(data).then(() => {
        //TODO Improve the way to get error 
        // @ts-ignore: Unreachable code error
        toast.current.show({severity:'success', summary: 'Sucesso',detail:'Curso atualizado com sucesso.',life: 3000});
        getCourseList();
        setLoading(false);
      }).catch(() => {
        //TODO Improve the way to get error 
        // @ts-ignore: Unreachable code error
        toast.current.show({severity:'error', summary: 'Erro',detail:'Problema ao atualizar o curso.',life: 3000});
        setLoading(false);
      });
    } else {
      courseService.save(data).then(async () => {
        //TODO Improve the way to get error 
        // @ts-ignore: Unreachable code error
        toast.current.show({severity:'success', summary: 'Sucesso',detail:'Curso salvo com sucesso.',life: 3000});
        getCourseList();
        setLoading(false);                   
      }).catch(() => {
        //TODO Improve the way to get error 
        // @ts-ignore: Unreachable code error
        toast.current.show({severity:'error', summary: 'Error',detail:'Problema ao salvar o curso.',life: 3000});
        setLoading(false);
      });
    }
  }

  const handleDelete = () => {
    setLoading(true);
    const courseService = new CourseService();
    if( courseSelected ){
      courseService.delete(courseSelected.id).then(() => {
        //TODO Improve the way to get error 
        // @ts-ignore: Unreachable code error
        toast.current.show({severity:'success', summary: 'Sucesso',detail:'Curso removido com sucesso.',life: 3000});
        getCourseList();
        setLoading(false);
      }).catch(() => {
        //TODO Improve the way to get error 
        // @ts-ignore: Unreachable code error
        toast.current.show({severity:'error', summary: 'Error',detail:'Problema ao remover o curso.',life: 3000});
        setLoading(false);
      });
    }
    setLoading(false);
  }

  return (
    <>
      <Toast ref={toast} position="top-right" />
      <div className="spinnerContainer">
        {
          loading ? (<ProgressSpinner 
            style={{width: '30px', height: '30px'}}
            strokeWidth="8"
            animationDuration="1s"
          />) : (<></>)
        }
      </div>
      <CourseForm
        courseSelected={courseSelected}
        setCourseSelected={setCourseSelected}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
      <CourseList
        courseSelected={courseSelected}
        setCourseSelected={setCourseSelected}
        courseList={courseList}
      />
    </>
  )
}