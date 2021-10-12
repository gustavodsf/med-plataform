import { Request, Response } from 'express';
import { admin } from '@config/firebase';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const https = require('https');

class PdfController {
  async getPdfWithName(request: Request, response: Response) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'X-Requested-With');
    response.header('content-type', 'application/pdf');
    const fileName = request.params.fileName;

    const bucket = admin.storage().bucket('app-med-one-322010.appspot.com'); // initialize storage as admin
    const stream = bucket.file(`apostila/${fileName}`).createReadStream(); // create stream of the file in bucket

    // pipe stream on 'end' event to the response
    return stream.on('end', (data: any) => {}).pipe(response);
  }
}

export { PdfController };
