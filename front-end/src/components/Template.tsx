import { Menubar } from 'primereact/menubar';
import { useHistory } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { AuthContext } from '../context/AuthContext'
import logo from '../assets/logo_med_one.jpeg';

import '../style/template.scss';

type TemplateProps = {
  children: JSX.Element;
}

function Template(props:TemplateProps) {
  const history = useHistory();
   /*
  **Framework Variables
  */
  const { user, handleLogout } = useContext(AuthContext);

  /*
  **Model Variables
  */
  

  /*
  **Local Variables
  */
  const start = <img alt="logo" src={logo}  height="40" className="p-mr-2"></img>
  const adminMenu = {
    label: 'Configuração',
    icon: 'pi pi-fw pi-cog',
    items:[
      {
        label:'Usuários',
        icon:'pi pi-fw pi-users',
        command: ()=> history.push('/app/user')
      },
      {
        label:'Questões',
        icon:'pi pi-fw pi-comment',
        command: ()=> history.push('/app/question')
      },
      {
        label:'Cursos',
        icon:'pi pi-fw pi-book',
        command: ()=> history.push('/app/course')
      }
    ]
  };

  const userMenu = {
    label: 'Estudo',
    icon: 'pi pi-fw pi-bookmark',
    items:[
      {
        label:'Material',
        icon:'pi pi-fw pi-file-o',
        command: () => history.push('/app/study/material')
      },
      {
        label:'Questionário',
        icon:'pi pi-fw pi-list',
        command: () => history.push('/app/study/question')
      },
      {
        label:'Simulado',
        icon:'pi pi-fw pi-compass',
        command: () => history.push('/app/study/simulated')
      }
    ]
  }
  /*
  **Get values from state
  */

  /*
  **Local Methods
  */
  const items = [];
  if(user === undefined) {
    history.push('/login');
    
  } else {
    if(user.profile === 'admin'){
      items.push(adminMenu);
    } 
  }
  items.push(userMenu);
  items.push(
    {
      label: 'Sair',
      icon: 'pi pi-fw pi-power-off',
      command: () => handleLogout()
    }
  );
  /*
  **React Methods
  */

  /*
  **Event Handler
  */
  return (
    <>
      <div className="container">
        <div className="header">
          <Menubar 
            start={start}
            model={items}
          />
        </div>
        <div className="body">
          { props.children }
        </div>
      </div>
    </>
  ) 
}

export { Template } 