import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { auth } from '@service/firebase';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND
})


const requestHandler = async (config: AxiosRequestConfig)  => {
  // Token will be dynamic so we can use any app-specific way to always   
  // fetch the new token before making the call
  const user = auth.currentUser;
  if(user !== null && config !== null && config.headers != null){
    const idToken = await user.getIdToken(true);
    config.headers.Authorization =   `Bearer ${idToken}`;

  }
  return config;
}; 

const errorHandler = (error: AxiosError) => {
  return Promise.reject(error);
};

// Add a request interceptor
api.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

export { api };