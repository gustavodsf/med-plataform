/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';

import { auth, sendPasswordResetEmail } from '@service/firebase';
import { AuthContext } from '@context/AuthContext';

import logoImg from '@assets/logo_med_one.png';

import '@style/auth.scss';

type IAccess = {
  email: string;
  password: string;
};

function Login() {
  /*
   **Framework Variables
   */
  const history = useHistory();
  const { handleLogin, toast, user } = useContext(AuthContext);

  /*
   **Model Variables
   */
  const [emailChangePass, setEmailChangePass] = useState('');

  /*
   **Local Variables
   */
  const [position, setPosition] = useState('center');
  const [displayResponsive, setDisplayResponsive] = useState(false);

  const defaultValues = {
    email: '',
    password: '',
  };

  const dialogFuncMap = {
    displayResponsive: setDisplayResponsive,
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  /*
   **Get values from state
   */

  /*
   **Local Methods
   */
  const onClick = () => {
    dialogFuncMap['displayResponsive'](true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = () => {
    dialogFuncMap['displayResponsive'](false);
    setEmailChangePass('');
  };

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

  /*
   **React Methods
   */
  useEffect(() => {
    if (user) {
      history.push('/app');
    }
  }, [user]);

  /*
   **Event Handler
   */
  const onSubmit = (data: IAccess) => {
    handleLogin(data);
  };

  const sendEmailWithPassChange = () => {
    sendPasswordResetEmail(auth, emailChangePass)
      .then(() => {
        //TODO Improve the way to get error
        // @ts-ignore: Unreachable code error
        toast.current.show({
          severity: 'success',
          summary: 'Sucesso',
          detail:
            'Email com as informações de alteração de senha, foi enviado com sucesso.',
          life: 3000,
        });
        onHide();
      })
      .catch(() => {
        //TODO Improve the way to get error
        // @ts-ignore: Unreachable code error
        toast.current.show({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível enviar a alteração de senha.',
          life: 3000,
        });
      });
  };

  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Não"
          icon="pi pi-times"
          onClick={() => onHide()}
          className="p-button-text"
        />
        <Button
          label="Sim"
          icon="pi pi-check"
          onClick={() => sendEmailWithPassChange()}
          autoFocus
        />
      </div>
    );
  };

  return (
    <div id="page-auth">
      <aside>
        <strong>Curso Med One</strong>
        <p>
          <span className="my-destak">O</span>bjetivo ú
          <span className="my-destak">N</span>ico{' '}
          <span className="my-destak">É</span> Aprovar.
        </p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Med One" />
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid my-form">
            <div className="p-fluid p-formgrid p-grid my-space-btw">
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
                    {...field}
                    className={classNames({ 'p-invalid': fieldState.invalid })}
                  />
                )}
              />
              {getFormErrorMessage('email')}
            </div>
            <div className="p-fluid p-formgrid p-grid p-mb-2">
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
                    feedback={false}
                    className={classNames({ 'p-invalid': fieldState.invalid })}
                  />
                )}
              />
              {getFormErrorMessage('password')}
            </div>
            <div className="my-btn">
              <Button
                type="submit"
                label="Entrar"
                icon="pi pi-check-circle"
                className="p-button-rounded p-mr-2 p-mb-2"
              />
            </div>
          </form>
          <Button
            className="p-button-rounded p-button-warning my-btn-reset-pass"
            label="Esqueceu a senha?"
            icon="pi pi-external-link"
            onClick={() => onClick()}
          />
          <div className="digital-ocean-logo">
            <a href="https://www.digitalocean.com/?refcode=3df8caaf928c&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge">
              <img
                src="https://web-platforms.sfo2.digitaloceanspaces.com/WWW/Badge%202.svg"
                alt="DigitalOcean Referral Badge"
              />
            </a>
          </div>
          <Dialog
            header="Esqueceu a senha?"
            visible={displayResponsive}
            onHide={() => onHide()}
            breakpoints={{ '960px': '75vw' }}
            style={{ width: '50vw' }}
            footer={renderFooter()}
          >
            <p>
              Informe seu e-mail cadastrado para que se possa lhe enviar a
              instrução de alteração de senha:
            </p>
            <br />
            <div className="p-fluid p-formgrid p-grid">
              <span className="p-input-icon-left">
                <i className="pi pi-envelope" />
                <InputText
                  value={emailChangePass}
                  onChange={(event) => setEmailChangePass(event.target.value)}
                  placeholder="e-mail"
                />
              </span>
            </div>
          </Dialog>
        </div>
      </main>
    </div>
  );
}

export { Login };
