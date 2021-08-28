import { SetStateAction, Dispatch } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

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

type QuestionListProps = {
  questionSelected: IQuestion | undefined
  setQuestionSelected : Dispatch<SetStateAction<IQuestion |  undefined>>;
  questionList: Array<IQuestion>
}

export function QuestionList(props: QuestionListProps){

  /*
  **Framework Variables
  */

  /*
  **Model Variables
  */

  /*
  **Local Variables
  */
  const { questionSelected, setQuestionSelected, questionList } = props;
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
    value={questionList}
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    paginator
    currentPageReportTemplate="Exibindo {first} de {last} até {totalRecords}" 
    rows={10} 
    rowsPerPageOptions={[10,20,30]}
    paginatorLeft={paginatorLeft}
    paginatorRight={paginatorRight}
    dataKey="id"
    selectionMode="radiobutton"
    selection={questionSelected}
    onSelectionChange={e => setQuestionSelected(e.value)}
  >
      <Column selectionMode="single" headerStyle={{width: '3em'}}></Column>
      <Column field="proof" header="Prova"></Column>
      <Column field="theme" header="Tema"></Column>
      <Column field="question" header="Questão"></Column>
      <Column header="Simulado" body={simulatedBodyTemplate}></Column>
  </DataTable>);
}