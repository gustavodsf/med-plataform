import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';
import { confirmDialog } from 'primereact/confirmdialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect, useContext } from 'react';
import { Chips } from 'primereact/chips';

import { QuestionContext } from '@context/QuestionContext';
import { CourseService } from '@service/CourseService';
import { TopicService } from '@service/TopicService';

interface ITopic {
  id: string;
  name: string;
  pdf_url: string;
  courseId?: string;
}

interface ICourse {
  id: string;
  name: string;
  enabled: boolean;
  topics: Array<ITopic>;
}

type IQuestion = {
  answer: number;
  course_id: string;
  id: string;
  justification: string;
  options: Array<string>;
  proof: string;
  question: string;
  simulated: boolean;
  theme: Array<string>;
  topic_id: string;
  utterance: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  option5?: string;
};

export function QuestionForm() {
  /*
   **Framework Variables
   */
  const { questionSelected, setQuestionSelected, handleSave, handleDelete } =
    useContext(QuestionContext);
  /*
   **Model Variables
   */
  const [topicList, setTopicList] = useState(Array<ITopic>());
  const [couseList, setCourseList] = useState(Array<ICourse>());
  const [filteredTopicList, setFilteredTopicList] = useState(Array<ITopic>());

  /*
   **Local Variables
   */
  const defaultValues = {
    answer: '',
    course_id: '',
    justification: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    option5: '',
    proof: '',
    question: '',
    simulated: false,
    theme: Array<string>(),
    topic_id: '',
    utterance: '',
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
  } = useForm({ defaultValues });
  /*
   **Get values from state
   */
  useEffect(() => {
    if (questionSelected) {
      setValue('answer', questionSelected.answer.toString());
      setValue('justification', questionSelected.justification);
      setValue('option1', questionSelected.options[0]);
      setValue('option2', questionSelected.options[1]);
      setValue('option3', questionSelected.options[2]);
      setValue('option4', questionSelected.options[3]);
      setValue('option5', questionSelected.options[4]);
      setValue('proof', questionSelected.proof);
      setValue('question', questionSelected.question);
      setValue('simulated', questionSelected.simulated);
      setValue('theme', questionSelected.theme);
      setValue('utterance', questionSelected.utterance);
      setValue('topic_id', questionSelected.topic_id);
      setValue('course_id', questionSelected.course_id);
    }
  }, [questionSelected]);

  /*
   **Local Methods
   */
  const confirm = () => {
    confirmDialog({
      message: 'Tem certeza que deseja remover?',
      header: 'Confirma????o',
      icon: 'pi pi-exclamation-triangle',
      accept: () => handleLocalDelete(),
      reject: () => null,
    });
  };

  const getFormErrorMessage = (tag: string) => {
    if (Object.keys(errors).includes(tag)) {
      return (
        <small className="p-error">
          {'answer' === tag ? errors.answer?.message : ''}
          {'justification' === tag ? errors.justification?.message : ''}
          {'option1' === tag ? errors.option1?.message : ''}
          {'option2' === tag ? errors.option2?.message : ''}
          {'option3' === tag ? errors.option3?.message : ''}
          {'option4' === tag ? errors.option4?.message : ''}
          {'option5' === tag ? errors.option5?.message : ''}
          {'proof' === tag ? errors.proof?.message : ''}
          {'question' === tag ? errors.question?.message : ''}
          {'simulated' === tag ? errors.simulated?.message : ''}
          {'theme' === tag ? errors.theme?.map((x) => x.message) : ''}
          {'utterance' === tag ? errors.utterance?.message : ''}
        </small>
      );
    }
  };

  const getCourseList = () => {
    const courseService = new CourseService();
    courseService.getAllData().then((result) => {
      setCourseList(result);
    });
  };

  const getTopicList = () => {
    const topicService = new TopicService();
    topicService.getAllData().then((result) => {
      setTopicList(result);
      setFilteredTopicList(result);
    });
  };
  /*
   **React Methods
   */
  useEffect(() => {
    getCourseList();
    getTopicList();
  }, []);
  /*
   **Event Handler
   */
  const onSubmit = (data: IQuestion) => {
    const newValue = { ...data };
    newValue.options = [];
    newValue.options.push(data.option1 || '');
    newValue.options.push(data.option2 || '');
    newValue.options.push(data.option3 || '');
    newValue.options.push(data.option4 || '');
    newValue.options.push(data.option5 || '');

    delete newValue.option1;
    delete newValue.option2;
    delete newValue.option3;
    delete newValue.option4;
    delete newValue.option5;
    newValue.answer = parseInt(newValue.answer.toString(), 10);
    handleSave(newValue);
    setQuestionSelected(undefined);
    reset();
  };

  const handleLocalDelete = () => {
    handleDelete();
    setQuestionSelected(undefined);
    reset();
  };

  const handleFilterTopicList = () => {
    if (getValues('course_id')) {
      const course_id = getValues('course_id');
      const newArray = topicList.filter(
        (topic) => topic.courseId === course_id,
      );
      setFilteredTopicList(newArray);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label
              htmlFor="proof"
              className={classNames({ 'p-error': errors.proof })}
            >
              Prova*
            </label>
            <Controller
              name="proof"
              control={control}
              rules={{ required: 'Prova ?? obrigat??rio.' }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  autoFocus
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            {getFormErrorMessage('proof')}
          </div>
          <div className="p-field p-col">
            <label
              htmlFor="question"
              className={classNames({ 'p-error': errors.question })}
            >
              Quest??o*
            </label>
            <Controller
              name="question"
              control={control}
              rules={{ required: 'Quest??o ?? obrigat??rio.' }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            {getFormErrorMessage('question')}
          </div>
        </div>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label
              htmlFor="utterance"
              className={classNames({ 'p-error': errors.utterance })}
            >
              Enunciado*
            </label>
            <Controller
              name="utterance"
              control={control}
              rules={{ required: 'Enunciado ?? obrigat??rio.' }}
              render={({ field, fieldState }) => (
                <InputTextarea
                  id={field.name}
                  {...field}
                  rows={2}
                  cols={30}
                  autoResize
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            {getFormErrorMessage('utterance')}
          </div>
        </div>
        <div className="p-field p-mb-4">
          <label className="p-field p-mb-4">Op????es*</label>
          <span className="p-float-label p-mb-4">
            <Controller
              name="option1"
              control={control}
              rules={{ required: 'Op????o 1 ?? obrigat??rio.' }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label
              htmlFor="option1"
              className={classNames({ 'p-error': errors.option1 })}
            >
              1
            </label>
            {getFormErrorMessage('option1')}
          </span>
          <span className="p-float-label p-mb-4">
            <Controller
              name="option2"
              control={control}
              rules={{ required: 'Op????o 2 ?? obrigat??rio.' }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            {getFormErrorMessage('option2')}
            <label
              htmlFor="option2"
              className={classNames({ 'p-error': errors.option2 })}
            >
              2
            </label>
          </span>
          <span className="p-float-label p-mb-4">
            <Controller
              name="option3"
              control={control}
              rules={{ required: 'Op????o 3 ?? obrigat??rio.' }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label
              htmlFor="option3"
              className={classNames({ 'p-error': errors.option3 })}
            >
              3
            </label>
            {getFormErrorMessage('option3')}
          </span>
          <span className="p-float-label p-mb-4">
            <Controller
              name="option4"
              control={control}
              rules={{ required: 'Op????o 4 ?? obrigat??rio.' }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label
              htmlFor="option4"
              className={classNames({ 'p-error': errors.option4 })}
            >
              4
            </label>
            {getFormErrorMessage('option4')}
          </span>
          <span className="p-float-label p-mb-4">
            <Controller
              name="option5"
              control={control}
              rules={{ required: 'Op????o 5 ?? obrigat??rio.' }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label
              htmlFor="option5"
              className={classNames({ 'p-error': errors.option5 })}
            >
              5
            </label>
            {getFormErrorMessage('option5')}
          </span>
        </div>

        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label
              htmlFor="answer"
              className={classNames({ 'p-error': errors.answer })}
            >
              Resposta*
            </label>
            <Controller
              name="answer"
              control={control}
              rules={{
                required: 'Resposta ?? obrigat??rio.',
                pattern: {
                  value: /^[1-5]{1}$/i,
                  message: 'Valor deve estar entre 1 e 5.',
                },
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            {getFormErrorMessage('answer')}
          </div>
          <div className="p-field p-col">
            <label
              htmlFor="theme"
              className={classNames({ 'p-error': errors.theme })}
            >
              Tema*
            </label>
            <Controller
              name="theme"
              control={control}
              rules={{ required: 'Tema ?? obrigat??rio.' }}
              render={({ field, fieldState }) => (
                <Chips
                  id={field.name}
                  onChange={(e) => field.onChange(e.target.value)}
                  value={field.value}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  separator=","
                />
              )}
            />
            {getFormErrorMessage('theme')}
          </div>
        </div>

        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label
              htmlFor="justification"
              className={classNames({ 'p-error': errors.justification })}
            >
              Justificativa*
            </label>
            <Controller
              name="justification"
              control={control}
              rules={{ required: 'Justificativa ?? obrigat??rio.' }}
              render={({ field, fieldState }) => (
                <InputTextarea
                  id={field.name}
                  {...field}
                  rows={2}
                  cols={30}
                  autoResize
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            {getFormErrorMessage('justification')}
          </div>
        </div>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <div className="p-field-checkbox">
              <Controller
                name="simulated"
                control={control}
                render={({ field, fieldState }) => (
                  <Checkbox
                    inputId={field.name}
                    onChange={(e) => field.onChange(e.checked)}
                    checked={field.value}
                    className={classNames({ 'p-invalid': fieldState.invalid })}
                  />
                )}
              />
              <label
                htmlFor="simulated"
                className={classNames({ 'p-error': errors.simulated })}
              >
                Simulado*
              </label>
            </div>
          </div>
        </div>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="course_id">Curso</label>
            <Controller
              name="course_id"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  options={couseList}
                  optionLabel="name"
                  optionValue="id"
                  name="course_id"
                  onBlur={handleFilterTopicList}
                />
              )}
            />
          </div>
          <div className="p-field p-col">
            <label htmlFor="course_id">T??pico</label>
            <Controller
              name="topic_id"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  options={filteredTopicList}
                  optionLabel="name"
                  optionValue="id"
                  name="topic_id"
                />
              )}
            />
          </div>
        </div>
      </form>
      <div className="p-fluid p-formgrid p-grid">
        <div className="p-field p-col">
          <Button
            onClick={handleSubmit(onSubmit)}
            label="Salvar"
            icon="pi pi-check-circle"
            className="p-button-rounded p-mr-2 p-mb-2"
          />
        </div>
        <div className="p-field p-col">
          <Button
            label="Limpar"
            className="p-button-rounded p-mr-2 p-mb-2"
            icon="pi pi-times-circle"
            onClick={() => {
              reset();
              setQuestionSelected(undefined);
            }}
          />
        </div>
        <div className="p-field p-col">
          <Button
            label="Remover"
            onClick={() => confirm()}
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger p-mb-2"
          />
        </div>
      </div>
    </>
  );
}
