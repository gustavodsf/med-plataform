import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';
import { confirmDialog } from 'primereact/confirmdialog';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { PickList, PickListChangeParams } from 'primereact/picklist';
import { useEffect, useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { CourseService } from '@service/CourseService';
import { UserContext } from '@context/UserContext';

interface ICourse {
  id: string;
  name: string;
  enabled: boolean;
}

type IUser = {
  id: string;
  email: string;
  name: string;
  password?: string;
  profile: string;
  enabled: boolean;
  courses_id: string[];
};

export function UserForm() {
  /*
   **Framework Variables
   */
  const { userSelected, setUserSelected, handleSave, handleDelete } =
    useContext(UserContext);

  /*
   **Model Variables
   */
  const [courseList, setCourseList] = useState(Array<ICourse>());
  const [source, setSource] = useState(Array<ICourse>());
  const [target, setTarget] = useState(Array<ICourse>());
  const defaultValues = {
    email: '',
    name: '',
    profile: '',
    password: '',
    enabled: true,
  };

  /*
   **Local Variables
   */
  const profiles = [
    { name: 'Administrador', code: 'admin' },
    { name: 'Usuário', code: 'user' },
  ];

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
    if (userSelected) {
      setValue('email', userSelected.email);
      setValue('name', userSelected.name);
      setValue('profile', userSelected.profile);
      setValue('enabled', userSelected.enabled);
      if (userSelected.courses_id.length > 0) {
        setTarget(
          courseList.filter((x) => userSelected.courses_id.includes(x.id)),
        );
        setSource(
          courseList.filter((x) => !userSelected.courses_id.includes(x.id)),
        );
      }
    }
  }, [userSelected]);

  /*
   **Local Methods
   */
  const getFormErrorMessage = (tag: string) => {
    if (Object.keys(errors).includes(tag)) {
      return (
        <small className="p-error">
          {'email' === tag ? errors.email?.message : ''}
          {'name' === tag ? errors.name?.message : ''}
          {'profile' === tag ? errors.profile?.message : ''}
          {'password' === tag ? errors.password?.message : ''}
          {'enabled' === tag ? errors.enabled?.message : ''}
        </small>
      );
    }
  };

  const getCourseList = () => {
    const courseService = new CourseService();
    courseService.getAllData().then((result) => {
      setCourseList(result);
      setSource(result);
    });
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
  /*
   **React Methods
   */
  useEffect(() => {
    getCourseList();
  }, []);

  /*
   **Event Handler
   */
  const onSubmit = (data: IUser) => {
    const coursesId = target.map((x) => x.id);
    data.courses_id = coursesId;
    handleSave(data);
    setUserSelected(undefined);
    setSource(courseList);
    setTarget([]);
    reset();
  };

  const handleLocalDelete = () => {
    handleDelete();
    setUserSelected(undefined);
    reset();
  };

  const handleOnChange = (event: PickListChangeParams) => {
    setSource(event.source);
    setTarget(event.target);
  };

  const itemTemplate = (item: ICourse) => {
    return (
      <div className="product-item">
        <span>{item.name}</span>
      </div>
    );
  };

  return (
    <>
      <form className="p-fluid">
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
            <label
              htmlFor="email"
              className={classNames({ 'p-error': !!errors.email })}
            >
              Email*
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email é obrigatório.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message:
                    'Endereço de email inválido.  E.x. examplo@email.com',
                },
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  disabled={userSelected !== undefined}
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            {getFormErrorMessage('email')}
          </div>
        </div>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="profile">Perfil</label>
            <Controller
              name="profile"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  options={profiles}
                  optionLabel="name"
                  optionValue="code"
                  name="profile"
                />
              )}
            />
          </div>
          <div className="p-field p-col">
            {userSelected ? (
              <></>
            ) : (
              <>
                <label
                  htmlFor="password"
                  className={classNames({ 'p-error': errors.password })}
                >
                  Senha*
                </label>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: 'Senha é obrigatório.' }}
                  render={({ field, fieldState }) => (
                    <Password
                      id={field.name}
                      {...field}
                      toggleMask
                      className={classNames({
                        'p-invalid': fieldState.invalid,
                      })}
                      header={passwordHeader}
                      footer={passwordFooter}
                      promptLabel="Entre com a senha"
                      weakLabel="Fraca"
                      mediumLabel="Moderada"
                      strongLabel="Forte"
                    />
                  )}
                />
                {getFormErrorMessage('password')}
              </>
            )}
          </div>
        </div>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <div className="p-field-checkbox">
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
              <label
                htmlFor="enabled"
                className={classNames({ 'p-error': errors.enabled })}
              >
                Habilitado*
              </label>
            </div>
          </div>
          <div className="p-field p-col"></div>
        </div>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label>Cursos</label>
            <PickList
              source={source}
              target={target}
              itemTemplate={itemTemplate}
              sourceHeader="Disponíveis"
              targetHeader="Habilitados"
              onChange={handleOnChange}
            ></PickList>
          </div>
        </div>
      </form>
      <div className="p-fluid p-formgrid p-grid">
        <div className="p-field p-col">
          <Button
            label="Salvar"
            icon="pi pi-check-circle"
            onClick={handleSubmit(onSubmit)}
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
              setUserSelected(undefined);
            }}
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
    </>
  );
}
