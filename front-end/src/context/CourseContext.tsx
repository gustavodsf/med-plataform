import { 
  ReactNode,
  createContext,
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction
} from "react";
import { Toast } from 'primereact/toast';

import { CourseService } from '@service/CourseService';

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

type CourseContextype = {
  courseList: Array<ICourse>
  courseSelected: ICourse | undefined,
  handleDelete: Function,
  handleSave: Function,
  loading: boolean,
  setCourseSelected: Dispatch<SetStateAction<ICourse | undefined>>,
}

type CourseContextProviderProps = {
  children: ReactNode;
}

export const CourseContext = createContext({} as CourseContextype);

export function CourseContextProvider(props: CourseContextProviderProps) {
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
    setLoading(true);
    const courseService = new CourseService();
    courseService.getAllData().then( result => {
      setCourseList(result);
      setLoading(false);
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
  }
  
  
  return (
    <CourseContext.Provider value={{
      courseList,
      courseSelected,
      handleDelete,
      handleSave,
      loading,
      setCourseSelected
    }}>
      <Toast ref={toast} position="top-right" />
      {props.children}
    </CourseContext.Provider>
  );
}