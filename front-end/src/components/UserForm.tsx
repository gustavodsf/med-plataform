import { InputText } from 'primereact/inputtext';

export function UserForm (){
    return(
        <>
            <span className="p-float-label">
                <InputText id="in" />
                <label htmlFor="in">Username</label>
            </span>  
        </>
    )
}