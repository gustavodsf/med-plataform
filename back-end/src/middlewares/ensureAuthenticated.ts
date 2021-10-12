import { Request, Response, NextFunction } from 'express';

import { admin } from '@config/firebase';

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  // Receber o token
  const authToken = request.headers.authorization;

  // Validar se token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    // Validar se token é válido
    if (!token) {
      return response.status(401).end();
    }

    const result = await admin.auth().verifyIdToken(token);

    if (result) {
      return next();
    }
    return response.status(401).end();
  } catch (err) {
    return response.status(401).end();
  }
}

export { ensureAuthenticated };
