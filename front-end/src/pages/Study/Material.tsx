import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Document, Page } from 'react-pdf';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { auth } from '@service/firebase';
import { TopicService } from '@service/TopicService';

import '@style/pdf.scss';

type MaterialParams = {
  id: string;
};

function Material() {
  /*
   **Framework Variables
   */

  const zoomOpt = [
    { name: 'x 1.0', code: 1.0 },
    { name: 'x 1.5', code: 1.5 },
    { name: 'x 2.0', code: 2.0 },
    { name: 'x 2.5', code: 2.5 },
    { name: 'x 3.0', code: 3.0 },
  ];

  const { id } = useParams<MaterialParams>();
  // eslint-disable-next-line @typescript-eslint/ban-types
  const [config, setConfig] = useState<{}>();
  const [myZoom, setMyZoom] = useState<number>(2.0);

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
  useEffect(() => {
    const topicService = new TopicService();
    topicService.getTopicById(id).then((result) => {
      const user = auth.currentUser;
      user?.getIdToken(true).then((idToken) => {
        const url = `${process.env.REACT_APP_BACKEND}pdf/${result?.pdf_url}`;
        setConfig({
          url: url,
          httpHeaders: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${idToken}`,
          },
        });
      });
    });
  }, [id]);

  /*
   **Event Handler
   */

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  const handleChangePage = (value: number) => {
    const newPageNumber = pageNumber + value;
    if (newPageNumber > 0 && newPageNumber <= numPages) {
      setPageNumber(newPageNumber);
    }
  };

  const handleZoomChange = (e: DropdownChangeParams) => {
    const newValue: number = e.value;
    setMyZoom(newValue);
  };

  return (
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
          <p>
            P??gina {pageNumber} de {numPages}
          </p>
          <Button
            className="p-p-0"
            onClick={() => handleChangePage(+1)}
            disabled={pageNumber === numPages}
          >
            <span className="p-px-3">Pr??ximo</span>
            <i className="pi pi-caret-right p-px-2"></i>
          </Button>
        </div>
        <Divider />
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
        <Divider />
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
          <p>
            P??gina {pageNumber} de {numPages}
          </p>
          <Button
            className="p-p-0"
            onClick={() => handleChangePage(+1)}
            disabled={pageNumber === numPages}
          >
            <span className="p-px-3">Pr??ximo</span>
            <i className="pi pi-caret-right p-px-2"></i>
          </Button>
        </div>
      </div>
    </>
  );
}

export { Material };
