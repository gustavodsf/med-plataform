import axios from 'axios';
import { firebase } from './firebase';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND
})

// Add a request interceptor
api.interceptors.request.use(async function (config) {
  const user = firebase.auth().currentUser;
  if(user == null){
    return config;
  }
  const idToken = await user.getIdToken(true);
  config.headers.Authorization =  `Bearer ${idToken}`;
  return config;
});

export { api };