import 'firebase/storage';
import 'firebase/auth';

import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('../../firebase-cred.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

const firestore = admin.firestore();
fireorm.initialize(firestore);

export { admin };
