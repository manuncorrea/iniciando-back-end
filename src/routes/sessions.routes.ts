import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
}

sessionRouter.post('/', async (request, response) => {
  try{

    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();
    
    const { user, token } = await authenticateUser.execute({
        email, 
        password,
    });

    const updatedUser: IUser = { ...user }
    
    delete updatedUser.password;

    return response.json( { updatedUser, token });
  } catch (err) {
    return response.status(400).json({ error: err.message});
  }
});

export default sessionRouter;