import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';
import { confirmDialog } from 'primereact/confirmdialog';
import { Dispatch, SetStateAction } from 'react';
import { InputText } from 'primereact/inputtext';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';

type ITopic = {
    id: string;
    name: string;
    pdf_url: string;
}

type ICourse = {
    id: string;
    name: string;
    enabled: boolean;
    topics: Array<ITopic>;
}

type CourseFormProps = {
    courseSelected: ICourse | undefined
    setCourseSelected : Dispatch<SetStateAction<ICourse |  undefined>>;
    handleSave: Function;
    handleDelete: Function;
}

type TopicProps = {
    topic: ITopic;
    idx: number;
}

export function CourseForm(props: CourseFormProps){
    const { courseSelected, setCourseSelected, handleSave, handleDelete } = props;
    const [ topics, setTopics ] = useState<Array<ITopic>>([]);

    const defaultValues = {
        name: '',
        enabled: true
    } 

    const { 
        control,
        formState: { errors }, 
        handleSubmit,
        reset,
        setValue  
    } = useForm({ defaultValues });

    useEffect(() => {
        if(courseSelected){
            setValue('name', courseSelected.name);
            setValue('enabled', courseSelected.enabled);
            setTopics(courseSelected.topics);
        }
    }, [courseSelected])
  
    const getFormErrorMessage = (name: string) => {
        if(Object.keys(errors).includes(name)){
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

    const onSubmit = (data: ICourse) => {
        data.topics = topics;
        handleSave(data)
        setCourseSelected(undefined);
        setTopics([]);
        reset();
    };

    const handleClean = () => {
        setCourseSelected(undefined);
        setTopics([]);
        reset();
    }

    const handleLocalDelete = () => {
        handleDelete();
        setTopics([]);
        setCourseSelected(undefined);
        reset();
    }

    const confirm = () => {
        confirmDialog({
            message: 'Tem certeza que deseja remover?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            accept: () => handleLocalDelete(),
            reject: () => null
        });
    }

    const Topic = (props:TopicProps) => {

        const [ name, setName] = useState('');
        const [ url, setUrl] = useState('');

        useEffect(() => {
            if( props.topic !== undefined ){ 
                setName(props.topic.name);
                setUrl(props.topic.pdf_url);
            }
        },[props.topic])

        const handleAddTopic = () => {
            let newTopics =  [...topics];
            if(typeof topics[props.idx] === 'undefined') {
                newTopics.push({id: '', name, "pdf_url": url});
                setTopics(newTopics);
            }
            else {
                newTopics[props.idx].name = name;
                newTopics[props.idx].pdf_url = url;
                setTopics(newTopics);
            }
        }

        const removeTopic = () => {
            let newTopics = [...topics];
            delete newTopics[props.idx];
            newTopics = newTopics.filter(item => item !== undefined)
            setTopics(newTopics);
        }

        return(
            <>
                <div className="p-d-flex p-mr-2 p-mb-3" key={`div_topic_${props.idx}`}>
                    <div className="p-field p-mr-2 p-mb-4">
                        <span className="p-float-label">
                            <InputText 
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={() => handleAddTopic()}
                            />
                            <label htmlFor="name">Nome</label>
                        </span>
                    </div>
                    <div className="p-field p-mr-2 p-mb-4">
                        <span className="p-float-label">
                            <InputText 
                                name="pdf" 
                                value={url}                              
                                onChange={(e) => setUrl(e.target.value)} 
                                onBlur={() => handleAddTopic()} 
                            />
                            <label htmlFor="pdf">URL Apostila</label>
                        </span>
                    </div>
                    <div className="p-field p-mr-2 p-mb-4">
                        <Button
                            onClick={() => removeTopic()}
                            icon="pi pi-trash"
                            className="p-button-rounded p-button-danger p-mb-2" 
                        />
                    </div>
                </div>
            </>
        )
    }

    const addNewTopic = () => {
        const newTopics = [
            ...topics, 
            {
                id:'',
                name: '',
                pdf_url: ''
            }
        ];
        setTopics(newTopics);
    }

    return(<>
        <h4 className="p-text p-mb-4">Adicionar Curso</h4> 
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">    
            <div className="p-field p-mr-2 p-mb-4">
                <span className="p-float-label">
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
                    <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Nome*</label>
                </span>
                {getFormErrorMessage('name')}
            </div>
            <div className="p-field-checkbox p-mr-2 p-mb-3">
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
                <label htmlFor="enabled" className={classNames({ 'p-error': errors.enabled })}>Habilitado</label>
            </div>  
            <div className="p-d-flex p-mr-2 p-mb-3">
                <Button 
                    type="submit"
                    label="Enviar"
                    icon="pi pi-check-circle"
                    className="p-button-rounded p-mr-2 p-mb-2" 
                />
                <Button 
                    label="Limpar" 
                    className="p-button-rounded p-mr-2 p-mb-2"
                    icon="pi pi-times-circle"
                    onClick={
                        handleClean
                    } 
                />
                <Button
                    label="Remover"
                    onClick={confirm}
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger p-mb-2" 
                />
            </div>        
        </form>
        <h5 className="p-text p-mb-4">
            Adicionar Tópicos
            <Button
                onClick={addNewTopic}
                icon="pi pi-plus"
                className="p-button-rounded"
            />
        </h5> 
        {
            topics?.map((topic, idx) => 
            <>
                <Topic
                    key={`topicos_${idx}`}
                    topic={topic}
                    idx={idx}
                />
            </>)
        }
    </>)
}