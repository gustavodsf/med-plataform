import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { useParams } from "react-router-dom";
import { TopicService } from '../../service/TopicService';
import { Document, Page } from 'react-pdf';
import { firebase } from '../../service/firebase';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';


import '../../style/pdf.scss';

interface ITopic {
  id: string;
  name: string;
  pdf_url: string;
  couseId?: string;
}

type MaterialParams = {
  id: string;
};

function Material(){
  /*
  **Framework Variables
  */

  const zoomOpt = [
    { name: 'x 1.0', code: 1.0 },
    { name: 'x 1.5', code: 1.5 },
    { name: 'x 2.0', code: 2.0 },
    { name: 'x 2.5', code: 2.5 },
    { name: 'x 3.0', code: 3.0 }
];

  const { id } = useParams<MaterialParams>();
  const [ topic, setTopic] = useState<ITopic>();
  const [ config, setConfig] = useState<{}>();
  const [ myZoom, setMyZoom] = useState<number>(2.0);

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
  useEffect(()=>{
    const topicService = new TopicService();
    topicService.getTopicById(id).then(result => {
      const user = firebase.auth().currentUser;
      user?.getIdToken(true).then((idToken) => {
        const url = `${process.env.REACT_APP_BACKEND}pdf/${result?.pdf_url}`;
        setTopic(result);
        setConfig({
          url: 'http://localhost:5000/pdf/APOSTILA TEÓRICA CTI EM VOL 1.pdf',
          httpHeaders: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${idToken}`
          }
        });
      });
    });
  },[id]);

  /*
  **Event Handler
  */

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages } : any) {
    setNumPages(numPages);
  }

  const handleChangePage = (value:number) => {
    const newPageNumber = pageNumber + value
    if( newPageNumber > 0 && newPageNumber <= numPages){
      setPageNumber(newPageNumber);
    }
  }

  const handleZoomChange = (e: DropdownChangeParams) => {
    const newValue: number = e.value
    setMyZoom(newValue);
  }

  return(
    <>
      <div className="pdfContainer">
        <div className="pdfMenu">
          <Button
            className="p-p-0"
            onClick={() => handleChangePage(-1)} 
            disabled={pageNumber === 1}
          >
            <i className="pi pi-caret-left p-px-2"></i>
            <span className="p-px-3">Anterior</span>
          </Button>
          <div className="slider-demo">
            <Dropdown
              value={myZoom}
              options={zoomOpt}
              onChange={handleZoomChange}
              optionLabel="name"
              optionValue="code"
              placeholder="Selecione o zoom" 
            />
          </div>
          <p>Página {pageNumber} de {numPages}</p>
          <Button 
            className="p-p-0"
            onClick={() => handleChangePage(+1)}
            disabled={pageNumber === numPages}
          >
            <span className="p-px-3">Próximo</span>
            <i className="pi pi-caret-right p-px-2"></i>
          </Button>
        </div>
        <Document
          file={config}
          renderMode="canvas"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            scale={myZoom}
            width={400}
            pageNumber={pageNumber}
            renderTextLayer={false}
          />
        </Document>  
      </div>
    </>
  );
}

export { Material }
