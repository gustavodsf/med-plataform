import React from 'react';

import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { sendMail } from './service/sender';

import { InputText } from 'primereact/inputtext';




function App() {

    React.useEffect(() => {
       sendMail('gustavodsf1@gmail.com', 'Teste', 'Vamos Time');
       console.log("Tentei enviar o email!");
    }, [])

    return(<>
        <div className="p-field">
            <label htmlFor="username2" className="p-d-block">Username</label>
            <InputText id="username2" aria-describedby="username2-help" className="p-invalid p-d-block" />
            <small id="username2-help" className="p-error p-d-block">Username is not available.</small>
        </div>
    </>);
}

export default App;