import logoImg from '../assets/logo_med_one.png';

import '../style/auth.scss';

function NotFound(){
  /*
  **Framework Variables
  */
  

  /*
  **Model Variables
  */
  

  /*
  **Local Variables
  */

  /*
  **Get values from state
  */

  /*
  **Local Methods
  */
  
  /*
  **React Methods
  */


  /*
  **Event Handler
  */
  
  return(
    <div id="page-auth">
      <aside>
        <strong>Curso Med One</strong>
        <p><span className="my-destak">O</span>bjetivo ú<span className="my-destak">N</span>ico <span className="my-destak">É</span> Aprovar.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Med One" />
          <span className="my-notfound-code"> 4<span className="my-notfound-code-0">0</span>4 </span>
          <span className="my-notfound-msg"> Página não encontrada!</span>
        </div>
      </main>
    </div>
  );
}

export { NotFound }