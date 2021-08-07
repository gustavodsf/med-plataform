import firebase from 'firebase/app';
import 'firebase/auth';
import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

const serviceAccount = require('../../firebase-cred.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

const firestore = admin.firestore();
fireorm.initialize(firestore);