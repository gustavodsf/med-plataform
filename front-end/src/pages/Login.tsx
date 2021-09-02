import { useState, useRef } from 'react';
import { Captcha } from 'primereact/captcha';
import logoImg from '../assets/logo_med_one.png';
import { Password } from 'primereact/password';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { firebase } from '../service/firebase';

import '../style/auth.scss';

type IAccess = {
  email: string;
  password: string;
}

function Login(){
  /*
  **Framework Variables
  */
  const toast = useRef(null);

  /*
  **Model Variables
  */
  const [emailChangePass, setEmailChangePass] = useState('');

  /*
  **Local Variables
  */
  const [position, setPosition] = useState('center');
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [notRobot, setNotRobot] = useState(false)
  const privateKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"

  const defaultValues = {
    email: '',
    password: ''
  };

  const dialogFuncMap = {
    'displayResponsive': setDisplayResponsive
  }

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
  }

  const onHide = () => {
    dialogFuncMap['displayResponsive'](false);
    setEmailChangePass('');
  }

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

  /*
  **React Methods
  */


  /*
  **Event Handler
  */
  const onSubmit = (data: IAccess) => {
    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      //TODO Improve the way to get error 
      // @ts-ignore: Unreachable code error
      toast.current.show({severity:'error', summary: 'Erro',detail:'Usuário ou senha inválido.',life: 3000});
    });
  };

  const sendEmailWithPassChange = () => {
    firebase.auth().sendPasswordResetEmail(emailChangePass)
    .then(() => {
      //TODO Improve the way to get error 
      // @ts-ignore: Unreachable code error
      toast.current.show({severity:'success', summary: 'Sucesso',detail:'Email com as informações de alteração de senha, foi enviado com sucesso.',life: 3000});
      onHide();
    })
    .catch((error) => {
      //TODO Improve the way to get error 
      // @ts-ignore: Unreachable code error
      toast.current.show({severity:'error', summary: 'Erro',detail:'Não foi possível enviar a alteração de senha.',life: 3000});
    });

  }

  const renderFooter = () => {
    return (
      <div>
        <Button label="Não" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
        <Button label="Sim" icon="pi pi-check" onClick={() => sendEmailWithPassChange()} autoFocus />
      </div>
    );
}

  return(
    <div id="page-auth">
      <Toast ref={toast} position="top-right" />
      <aside>
        <strong>Curso Med One</strong>
        <p><span className="my-destak">O</span>bjetivo ú<span className="my-destak">N</span>ico <span className="my-destak">É</span> Aprovar.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Med One" />
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid my-form">
            <div className="p-fluid p-formgrid p-grid">
              <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email*</label>
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
                    {...field} 
                    className={classNames({ 'p-invalid': fieldState.invalid })}
                  />
              )} />
              {getFormErrorMessage('email')}
            </div>
            <div className="p-fluid p-formgrid p-grid">
              <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Senha*</label>
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
                  />
              )} />
              {getFormErrorMessage('password')}
            </div>
            <div className="my-btn">
              <Button 
                disabled={!notRobot}
                type="submit"
                label="Entrar"
                icon="pi pi-check-circle"
                className="p-button-rounded p-mr-2 p-mb-2" 
              />
            </div>
          </form>
          <div className="my-captcha">
            <Captcha 
              siteKey={privateKey}
              onResponse={() => setNotRobot(true)}>
            </Captcha>
          </div>
          <Button
            className="p-button-rounded p-button-warning my-btn-reset-pass"
            label="Esqueceu a senha?"
            icon="pi pi-external-link"
            onClick={() => onClick()}
          />
          <Dialog 
              header="Esqueceu a senha?" 
              visible={displayResponsive}
              onHide={() => onHide()}
              breakpoints={{'960px': '75vw'}} 
              style={{width: '50vw'}} 
              footer={renderFooter()}>
              <p>Informe seu e-mail cadastrado para que se possa lhe enviar a instrução de alteração de senha:</p><br />
              <div className="p-fluid p-formgrid p-grid">
                <span className="p-input-icon-left">
                  <i className="pi pi-envelope" />
                  <InputText value={emailChangePass} onChange={(event)=> setEmailChangePass(event.target.value)} placeholder="e-mail" />
                </span>
              </div>
          </Dialog>
        </div>
      </main>
    </div>
  );
}

export { Login }