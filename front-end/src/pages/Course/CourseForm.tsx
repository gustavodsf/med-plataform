/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';
import { confirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect, useContext } from 'react';

import { CourseContext } from '@context/CourseContext';

type ITopic = {
  id: string;
  name: string;
  pdf_url: string;
  couseId?: string;
};

type ICourse = {
  id: string;
  name: string;
  enabled: boolean;
  topics: Array<ITopic>;
};

type TopicProps = {
  topic: ITopic;
  idx: number;
};

export function CourseForm() {
  /*
   **Framework Variables
   */
  const { courseSelected, setCourseSelected, handleSave, handleDelete } =
    useContext(CourseContext);

  /*
   **Model Variables
   */
  const [topics, setTopics] = useState<Array<ITopic>>([]);
  const defaultValues = {
    name: '',
    enabled: true,
  };
  /*
   **Local Variables
   */
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({ defaultValues });
  /*
   **Get values from state
   */
  useEffect(() => {
    if (courseSelected) {
      setValue('name', courseSelected.name);
      setValue('enabled', courseSelected.enabled);
      setTopics(courseSelected.topics);
    }
  }, [courseSelected]);
  /*
   **Local Methods
   */
  const getFormErrorMessage = (name: string) => {
    if (Object.keys(errors).includes(name)) {
      return (
        <small className="p-error">
          {
            /** //TODO Improve the way to get error */
            // @ts-ignore: Unreachable code error
            errors[name].message
          }
        </small>
      );
    }
  };

  const confirm = () => {
    confirmDialog({
      message: 'Tem certeza que deseja remover?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => handleLocalDelete(),
      reject: () => null,
    });
  };

  const addNewTopic = () => {
    const newTopics = [
      ...topics,
      {
        id: '',
        name: '',
        pdf_url: '',
      },
    ];
    setTopics(newTopics);
  };
  /*
   **React Methods
   */

  /*
   **Event Handler
   */
  const onSubmit = (data: ICourse) => {
    data.topics = topics;
    handleSave(data);
    setCourseSelected(undefined);
    setTopics([]);
    reset();
  };

  const handleClean = () => {
    setCourseSelected(undefined);
    setTopics([]);
    reset();
  };

  const handleLocalDelete = () => {
    handleDelete();
    setTopics([]);
    setCourseSelected(undefined);
    reset();
  };

  /*
   **Local Component
   */
  const Topic = (props: TopicProps) => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
      if (props.topic !== undefined) {
        setName(props.topic.name);
        setUrl(props.topic.pdf_url);
      }
    }, [props.topic]);

    const handleAddTopic = () => {
      const newTopics = [...topics];
      if (typeof topics[props.idx] === 'undefined') {
        newTopics.push({ id: '', name, pdf_url: url });
        setTopics(newTopics);
      } else {
        newTopics[props.idx].name = name;
        newTopics[props.idx].pdf_url = url;
        setTopics(newTopics);
      }
    };

    const removeTopic = () => {
      let newTopics = [...topics];
      delete newTopics[props.idx];
      newTopics = newTopics.filter((item) => item !== undefined);
      setTopics(newTopics);
    };

    return (
      <>
        <div
          className="p-fluid p-formgrid p-grid"
          key={`div_topic_${props.idx}`}
        >
          <div className="p-field p-col">
            <label htmlFor="name">Nome</label>
            <InputText
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleAddTopic()}
            />
          </div>
          <div className="p-field p-col">
            <label htmlFor="pdf">URL Apostila</label>
            <InputText
              name="pdf"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onBlur={() => handleAddTopic()}
            />
          </div>
          <div className="p-field p-col my-icon">
            <Button
              onClick={() => removeTopic()}
              icon="pi pi-trash"
              className="p-button-rounded p-button-danger p-mb-2"
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label
              htmlFor="name"
              className={classNames({ 'p-error': errors.name })}
            >
              Nome*
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Nome é obrigatório.' }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  autoFocus
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            {getFormErrorMessage('name')}
          </div>
          <div className="p-field p-col">
            <div className="p-field-checkbox">
              <Controller
                name="enabled"
                control={control}
                rules={{ required: false }}
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
                htmlFor="enabled"
                className={classNames({ 'p-error': errors.enabled })}
              >
                Habilitado
              </label>
            </div>
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
            onClick={handleClean}
          />
        </div>
        <div className="p-field p-col">
          <Button
            label="Remover"
            onClick={confirm}
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger p-mb-2"
          />
        </div>
      </div>
      <h5 className="p-text p-mb-4">
        Adicionar Tópicos
        <Button
          onClick={addNewTopic}
          icon="pi pi-plus"
          className="p-button-rounded my-add-topic"
        />
      </h5>
      {topics?.map((topic, idx) => (
        <>
          <Topic key={`topicos_${idx}`} topic={topic} idx={idx} />
        </>
      ))}
    </>
  );
}
