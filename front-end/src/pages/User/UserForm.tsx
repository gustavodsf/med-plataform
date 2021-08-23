import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';
import { confirmDialog } from 'primereact/confirmdialog';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useEffect, Dispatch, SetStateAction } from 'react';
import { useForm, Controller } from 'react-hook-form';

type IUser = {
    id: string;
    email: string;
    name: string;
    password?: string;
    profile: string;
    enabled: boolean;
}

type UserFormProps = {
    userSelected: IUser | undefined
    setUserSelected : Dispatch<SetStateAction<IUser |  undefined>>;
    handleSave: Function;
    handleDelete: Function;
}

export function UserForm(props: UserFormProps){ 
    const { userSelected, setUserSelected, handleSave, handleDelete } = props;
    

    const profiles = [
        { "name": "Administrador", "code": "admin" },
        { "name": "Usuário", "code": "user" }
    ]

    const defaultValues = {
        email: '',
        name: '',
        profile: '',
        password: '',
        enabled: true
    }

    const { 
        control,
        formState: { errors }, 
        handleSubmit,
        reset,
        setValue  
    } = useForm({ defaultValues });

    const passwordHeader = <h6>Informe uma senha</h6>;
    const passwordFooter = (
        <>
            <Divider />
            <p className="p-mt-2">Sugestão</p>
            <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
                <li>Letra minúscula</li>
                <li>Letra maiúscula</li>
                <li>Possuir números</li>
                <li>Maior que 8 caracteres</li>
            </ul>
        </>
    );

    const onSubmit = (data: IUser) => {
        handleSave(data);
        setUserSelected(undefined);
        reset();
    };

    const handleLocalDelete = () => {
        handleDelete();
        setUserSelected(undefined);
        reset();
    }

    useEffect(()=>{
        if(userSelected){
            setValue('email', userSelected.email);
            setValue('name', userSelected.name);
            setValue('profile', userSelected.profile);
            setValue('enabled', userSelected.enabled);
        }
    },[userSelected]);

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

    const confirm = () => {
        confirmDialog({
            message: 'Tem certeza que deseja remover?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            accept: () => handleLocalDelete(),
            reject: () => null
        });
    }

    return(<>
        <h4 className="p-text p-mb-4">Adicionar Usuário</h4> 
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

            <div className="p-field p-mr-2 p-mb-4">
                <span className="p-float-label p-input-icon-right">
                    <i className="pi pi-envelope" />
                    <Controller 
                        name="email"
                        control={control}
                        rules={
                                { 
                                    required: 'Email é obrigatório.', 
                                    pattern: { 
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: 'Endereço de email inválido.  E.x. examplo@email.com'
                                    }
                                }
                            }
                        render={({ field, fieldState }) => (
                            <InputText 
                                id={field.name}
                                disabled={userSelected !== undefined}
                                {...field} 
                                className={classNames({ 'p-invalid': fieldState.invalid })}
                            />
                    )} />
                    <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email*</label>
                </span>
                {getFormErrorMessage('email')}
            </div>
            {
                userSelected ? <></> :(
                    <div className="p-field p-mr-2 p-mb-4">
                        <span className="p-float-label">
                            <Controller 
                                name="password"
                                control={control}
                                rules={{ required: 'Senha é obrigatório.' }}
                                render={({ field, fieldState }) => (
                                    <Password 
                                        id={field.name} 
                                        {...field} 
                                        toggleMask 
                                        className={classNames({ 'p-invalid': fieldState.invalid })} 
                                        header={passwordHeader}
                                        footer={passwordFooter}
                                        promptLabel="Entre com a senha"
                                        weakLabel='Fraca'
                                        mediumLabel='Moderada'
                                        strongLabel='Forte'
                                    />
                            )} />
                            <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Senha*</label>
                        </span>
                        {getFormErrorMessage('password')}
                    </div>
                )
            }

            <div className="p-field p-mr-2 p-mb-4">
                <span className="p-float-label">
                    <Controller 
                        name="profile"
                        control={control}
                        render={({ field }) => 
                    (   
                        <Dropdown 
                            id={field.name}
                            value={field.value}
                            onChange={(e) => field.onChange(e.value)}
                            options={profiles}
                            optionLabel="name"
                            optionValue="code" 
                            name="profile"
                        />
                    )} />
                    <label htmlFor="profile">Perfil</label>
                </span>
            </div>

            <div className="p-field-checkbox p-mr-2 p-mb-3">
                <Controller
                    name="enabled"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                        <Checkbox
                            inputId={field.name}
                            onChange={(e) => field.onChange(e.checked)}
                            checked={field.value}
                            className={classNames({ 'p-invalid': fieldState.invalid })}
                        />
                    )} 
                />
                <label htmlFor="enabled" className={classNames({ 'p-error': errors.enabled })}>Habilitado*</label>
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
                        () => {reset(); setUserSelected(undefined);}
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
     </>)
}