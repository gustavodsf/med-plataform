import { Request, Response, NextFunction } from 'express';

import { admin } from '@config/firebase';
import { UserService } from '@service/UserService';

async function ensureAdmin(
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
    const result = await admin.auth().verifyIdToken(token);
    if (result) {
      const userService = new UserService();
      const user = await userService.getUser(result.email);
      if (user.profile === 'admin') {
        return next();
      } else {
        return response.status(401).json({
          error: 'Unauthorized',
        });
      }
    }
    return response.status(401).json({
      error: 'Unauthorized',
    });
  } catch (err) {
    return response.status(401).json({
      error: 'Unauthorized',
    });
  }
}

export { ensureAdmin };
