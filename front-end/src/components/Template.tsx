import { Menubar } from 'primereact/menubar';
import { useHistory } from 'react-router-dom'
import logo from '../assets/logo_med_one.jpeg';

import '../style/template.scss';

type TemplateProps = {
  children: JSX.Element;
}

function Template(props:TemplateProps) {
  const history = useHistory();
  const start = <img alt="logo" src={logo}  height="40" className="p-mr-2"></img>

  const items = [
    {
      label: 'Configuração',
      icon: 'pi pi-fw pi-cog',
      items:[
        {
          label:'Usuários',
          icon:'pi pi-fw pi-users',
          command: ()=> history.push('/internal/user')
        },
        {
          label:'Questões',
          icon:'pi pi-fw pi-comment',
          command: ()=> history.push('/internal/question')
        },
        {
          label:'Cursos',
          icon:'pi pi-fw pi-book',
          command: ()=> history.push('/internal/course')
        }
      ]
    },
    {
      label: 'Estudo',
      icon: 'pi pi-fw pi-bookmark',
      items:[
        {
          label:'Material',
          icon:'pi pi-fw pi-file-o'
        },
        {
          label:'Questionário',
          icon:'pi pi-fw pi-list'
        },
        {
          label:'Simulado',
          icon:'pi pi-fw pi-compass'
        }
      ]
    },
    {
      label: 'Sair',
      icon: 'pi pi-fw pi-power-off',
      command: () => console.log('Hello World!!!!')
    }
  ]

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