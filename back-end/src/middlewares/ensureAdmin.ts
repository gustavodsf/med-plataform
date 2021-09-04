import { Request, Response, NextFunction } from "express";

import { admin } from '../config/firebase';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {

  // Receber o token
  const authToken = request.headers.authorization;

   // Validar se token está preenchido
   if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    // Validar se token é válido
    const result = await admin.auth().verifyIdToken(token)
    if(result){
      console.log(result);
      return next();
    }
    return response.status(401).end();
  } catch (err) {
    return response.status(401).end();
  }

}