import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useContext } from 'react';

import { QuestionContext } from '../../context/QuestionContext'

type IQuestion = {
  answer: number;
  course_id: string;
  id: string;
  justification: string;
  options: Array<string>;
  proof: string;
  question: string;
  simulated: boolean
  theme: Array<string>;
  topic_id: string;
  utterance: string
}

export function QuestionList(){

  /*
  **Framework Variables
  */
 const { questionSelected, setQuestionSelected, questionList } = useContext(QuestionContext);

  /*
  **Model Variables
  */

  /*
  **Local Variables
  */
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
  const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

  /*
  **Get values from state
  */

  /*
  **Local Methods
  */
  const simulatedBodyTemplate = (rowData: IQuestion) => {
    if(rowData.simulated){
      return "Sim";
    }
    return "Não";
  }
  /*
  **React Methods
  */

  /*
  **Event Handler
  */
  return (<DataTable
    currentPageReportTemplate="Exibindo {first} de {last} até {totalRecords}" 
    dataKey="id"
    emptyMessage="Não foram encontradas questões"
    onSelectionChange={e => setQuestionSelected(e.value)}
    paginator
    paginatorLeft={paginatorLeft}
    paginatorRight={paginatorRight}
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    rows={10} 
    rowsPerPageOptions={[10,20,30]}
    selection={questionSelected}
    selectionMode="radiobutton"
    value={questionList}
  >
      <Column selectionMode="single" headerStyle={{width: '3em'}}></Column>
      <Column field="proof" header="Prova"></Column>
      <Column field="theme" header="Tema"></Column>
      <Column field="question" header="Questão"></Column>
      <Column header="Simulado" body={simulatedBodyTemplate}></Column>
  </DataTable>);
}