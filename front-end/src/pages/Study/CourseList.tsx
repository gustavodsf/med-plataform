import { Divider } from 'primereact/divider';
import { CourseService } from '../../service/CourseService';
import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'
import { ProgressSpinner } from 'primereact/progressspinner';
import logoImg from '../../assets/logo_med_one.jpeg';

import '../../style/course_list.scss';

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

interface ITopicList {
  course: ICourse
}

type CourseListProps = {
  redictFor: string,
}

function CourseList(props: CourseListProps) {
  /*
  **Framework Variables
  */
  const { user } = useContext(AuthContext);
  const history = useHistory();
  /*
  **Model Variables
  */
  const [courseList, setCourseList] = useState(Array<ICourse>());
  const [ loading, setLoading ] = useState(false);
 
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
  useEffect(()=>{
    setLoading(true);
    const courseService = new CourseService();
    courseService.getAllData().then( result => {
      result = result.filter(x => x.enabled);
      if(user){
        if( user.profile === 'admin' ){
          setCourseList(result);
        } else {
          setCourseList(result.filter(x => user.courses_id?.includes(x.id)));
        }
      }
      setLoading(false);
    });
  }, [])

  /*
  **Event Handler
  */
  const handleTopicCick = (topic: ITopic) => {
    if(props.redictFor === 'material') {
      history.push(`/app/study/material/${topic.id}`)
    } else if(props.redictFor === 'question'){
      history.push(`/app/study/question/${topic.id}`)
    }
  };

  const TopicList = (props: ITopicList) => {
    const { course } = props; 

    return(
      <>
        {
          course.topics.map((topic) => {
            return (
              <div className="my-topic-container" key={`${topic.id}_${course.id}`} onClick={() => handleTopicCick(topic)}>
                <img src={logoImg} alt="Med One" className="logo_med_one" />
                <div className="my-container">
                  { topic.name }
                </div>
              </div>
            );
          })
        }
      </>
    )
  };

  return(<>
    {
      loading ? (<ProgressSpinner 
        style={{width: '30px', height: '30px'}}
        strokeWidth="8"
        animationDuration="1s"
      />) : (<></>)
    }
    {
      courseList.map(course => {
        return(
          <div key={`${course.id}`}>
            <Divider align="center" key={`divider_${course.id}`}>
              <span className="p-tag">{course.name}</span>
            </Divider>
            <div className="p-d-flex p-flex-row my-div-class p-jc-between"  key={`topic_list_${course.id}`}>
              <TopicList course={course}/>
            </div>
          </div>
        )
      })
    }
  </>)
}

export { CourseList }
