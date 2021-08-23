import { Dispatch, SetStateAction } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

interface ITopic {
    id: string;
    name: string;
    pdf_url: string;
}

interface ICourse {
    id: string;
    name: string;
    enabled: boolean;
    topics: Array<ITopic>;
}

type CourseListProps = {
    courseList: Array<ICourse>
    courseSelected: ICourse |  undefined;
    setCourseSelected : Dispatch<SetStateAction<ICourse |  undefined>>;
}

export function CourseList(props:CourseListProps){
    const { courseList, courseSelected, setCourseSelected } = props;

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    const topicBodyTemplate = (rowData: ICourse) => {
        return rowData.topics.map(t => t.name).join();
    }

    return(<>
         <DataTable
            currentPageReportTemplate="Exibindo {first} de {last} até {totalRecords}" 
            dataKey="id"
            onSelectionChange={e => setCourseSelected(e.value)}
            paginator
            paginatorLeft={paginatorLeft}
            paginatorRight={paginatorRight}
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            rows={10} 
            rowsPerPageOptions={[10,20,30]}
            selection={courseSelected}
            selectionMode="radiobutton"
            value={courseList}
        >
            <Column selectionMode="single" headerStyle={{width: '3em'}}></Column>
            <Column field="name" header="Nome"></Column>
            <Column header="Tópico" body={topicBodyTemplate}></Column>
        </DataTable>
    </>)
}