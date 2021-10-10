

import {
  useParams
} from "react-router-dom";

import { AnswerService } from '../../service/AnswerService';
import { AuthContext } from '../../context/AuthContext'
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { ProgressSpinner } from 'primereact/progressspinner';
import { QuestionService } from '../../service/QuestionService';
import { RadioButton, RadioButtonChangeParams } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';
import { useState, useEffect, useContext, useRef } from 'react';

import '../../style/query.scss';

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

type IAnswer = {
  id?: string;
  user_id: string | undefined;
  course_id: string | undefined;
  topic_id: string | undefined;
  question_id: string | undefined;
  user_answer: number;
  question_answer: number | undefined;
}

type IParam = {
  id: string
}

function Query(){
  /*
  **Framework Variables
  */
  const { id } = useParams<IParam>();
  const { user } = useContext(AuthContext);
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);

  /*
  **Model Variables
  */
  const [questionList, setQuestionList] = useState(Array<IQuestion>());
  const [existingAnswerList, setExistingAnswerList] = useState(Array<IAnswer>());


  const [question, setQuestion] = useState<IQuestion>();
  const [ actualIdx, setactualIdx] = useState<number>();
  const [ maxIdx, setMaxIdx] = useState<number>();
    

  /*
  **Local Variables
  */
  const [showJustication, setShowJustification] =  useState(false);
  const [isAnswered, setIsAnswered] =  useState(false);
  const [answer, setAnswer] =  useState(0);

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
    const questionService =  new QuestionService();
    const answerService =  new AnswerService();

    answerService.getAnwserByUserAndTopic(user?.id || '', id).then((answerResult) => {
      setExistingAnswerList(answerResult);
      questionService.getQuestionOfTopic(id).then((result)=>{
        setQuestionList(result);
        if(result.length > 0){
          const localQuestion = result[0];
          setQuestion(localQuestion);
          setactualIdx(0);
          setMaxIdx(result.length - 1);
          const localAnswer = answerResult.find(elem => elem.question_id === localQuestion.id);
          if(localAnswer){
            setAnswer(localAnswer.user_answer);
            setIsAnswered(true);
          }
        }
        setLoading(false);
      });
    });
  },[user?.id, id])
  /*
  **Event Handler
  */
  const handleRadioClick = (event: RadioButtonChangeParams) => {
    setLoading(true);
    const value: number = event.value;
    setIsAnswered(true);
    setAnswer(value);

    const answerObj = {
      user_id: user?.id,
      course_id: question?.course_id,
      topic_id: question?.topic_id,
      question_id: question?.id,
      user_answer: value,
      question_answer: question?.answer
    }

    const answerService =  new AnswerService();
    
    answerService.save(answerObj).then(() => {
      //TODO Improve the way to get error 
      // @ts-ignore: Unreachable code error
      toast.current.show({severity:'success', summary: 'Sucesso',detail:'Resposta armazenada com sucesso!',life: 3000});
      setLoading(false);
    }).catch(() => {
      //TODO Improve the way to get error 
      // @ts-ignore: Unreachable code error
      toast.current.show({severity:'error', summary: 'Erro',detail:'Problema ao armazenar a resposta.',life: 3000});
      setLoading(false);
    });
  }
  
  const handleChangeQuestion = (value: number) => {
    const newIdx = (actualIdx || 0) + value;
    setactualIdx(newIdx);
    setShowJustification(false);
    setIsAnswered(false);
    setAnswer(0);

    const localQuestion = questionList[newIdx]
    setQuestion(localQuestion);
    console.log(existingAnswerList);
    const localAnswer = existingAnswerList.find(elem => elem.question_id === localQuestion.id);
    console.log(localAnswer);
    if(localAnswer){
      setAnswer(localAnswer.user_answer);
      setIsAnswered(true);
    }
  }

  const header = (
    <div className="headerContent">
      <span className="q-proof"> {question?.proof} </span>
      <span className="q-question"> - {question?.question} </span>
      <Divider />
    </div>
  );

  const footer = (
    <div className="footerMenu">
      <Button
        className="p-p-0"
        onClick={() => handleChangeQuestion(-1)} 
        disabled={actualIdx === 0}
      >
        <i className="pi pi-caret-left p-px-2"></i>
        <span className="p-px-3">Anterior</span>
      </Button>
      <div className="footerInfo">
        <Tooltip target=".my-answer-btn" content="Justificativa" />
        <Button
          className="my-answer-btn p-p-0 p-button-rounded p-button-info"
          onClick={() => setShowJustification(!showJustication)}
          disabled={!isAnswered}
        >
          <i className="pi pi-map p-px-2"></i>
        </Button>
        {
          loading ? (<ProgressSpinner 
            style={{width: '30px', height: '30px'}}
            strokeWidth="8"
            animationDuration="1s"
          />) : (<></>)
        }
      </div>
      <Button 
        className="p-p-0"
        onClick={() => handleChangeQuestion(+1)}
        disabled={actualIdx === maxIdx}
      >
        <span className="p-px-3">Próximo</span>
        <i className="pi pi-caret-right p-px-2"></i>
      </Button>
    </div>
  );

  return(
    <>
      <Toast ref={toast} position="top-right" />
      <Card className="questionCard" footer={footer} header={header}>
        <div className="questionBobdy">
          <div className="questionUtterance">
            <p> {question?.utterance} </p>
          </div>
          <div className="questionOptions">
              <div className={
                  isAnswered && question?.answer === 1 ? 
                  ("p-field-radiobutton correctAnswer") : 
                  ( isAnswered && answer !== question?.answer  &&  answer === 1  ?
                  "p-field-radiobutton wrongAnswer":
                  "p-field-radiobutton"
                  )
                }
              >
                  <RadioButton 
                    inputId="opt1"
                    name="option"
                    disabled={ answer !== 0 }
                    value={1}
                    onChange={handleRadioClick} checked={answer === 1} />
                  <label htmlFor="opt1">{ question?.options[0] }</label>
              </div>
              <div className={
                  isAnswered && question?.answer === 2 ? 
                  ("p-field-radiobutton correctAnswer") : 
                  ( isAnswered && answer !== question?.answer  &&  answer === 2  ?
                  "p-field-radiobutton wrongAnswer":
                  "p-field-radiobutton"
                  )
                }
              >
                  <RadioButton 
                    inputId="opt2"
                    name="option"
                    disabled={ answer !== 0 }
                    value={2}
                    onChange={handleRadioClick} checked={answer === 2} />
                  <label htmlFor="opt2">{question?.options[1]}</label>
              </div>
              <div className={
                  isAnswered && question?.answer === 3 ? 
                  ("p-field-radiobutton correctAnswer") : 
                  ( isAnswered && answer !== question?.answer  &&  answer === 3  ?
                  "p-field-radiobutton wrongAnswer":
                  "p-field-radiobutton"
                  )
                }
              >
                  <RadioButton 
                    inputId="opt3"
                    name="option"
                    disabled={ answer !== 0 }
                    value={3}
                    onChange={handleRadioClick} checked={answer === 3} />
                  <label htmlFor="opt3">{ question?.options[2] }</label>
              </div>
              <div className={
                  isAnswered && question?.answer === 4 ? 
                  ("p-field-radiobutton correctAnswer") : 
                  ( isAnswered && answer !== question?.answer  &&  answer === 4 ?
                  "p-field-radiobutton wrongAnswer":
                  "p-field-radiobutton"
                  )
                }
              >
                  <RadioButton 
                    inputId="opt4"
                    name="option"
                    disabled={ answer !== 0 }
                    value={4}
                    onChange={handleRadioClick} checked={answer === 4} />
                  <label htmlFor="opt4">{ question?.options[3] }</label>
              </div>
              {
                question?.options[4] === '-' ? 
                (<></>) :
                (
                <div className={
                    isAnswered && question?.answer === 5 ? 
                    ("p-field-radiobutton correctAnswer") : 
                    ( isAnswered && answer !== question?.answer  &&  answer === 5  ?
                    "p-field-radiobutton wrongAnswer":
                    "p-field-radiobutton"
                    )
                  }
                >
                    <RadioButton 
                      inputId="opt5"
                      name="option" 
                      value={5}
                      disabled={ answer !== 0 }
                      onChange={handleRadioClick} checked={answer === 5} />
                    <label htmlFor="opt5">{ question?.options[4] }</label>
                </div>
                )
              }
          </div>
        </div>
        {
          showJustication ?
          (
            <div className="my-justification-content">
              <Divider align="center">
                <span className="p-tag">Justificativa</span>
              </Divider>
              <span className="my-txt-justification">
                {question?.justification}
              </span>
            </div>
          ) :
          (<></>)
        }
      </Card>
    </>
  )
}

export { Query }