import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UserMap from '../../../../../mappers/UserMap';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
     
    const { email, password } = request.body;
  
    const authenticateUser = container.resolve(AuthenticateUserService);
  
    const { user, token } = await authenticateUser.execute({
      email, 
      password,
    });

    return response.json({ user: classToClass(user), token });
  
    /* exemplo  return response.json({ user: classToClass(user), token });
    const mappedUser = UserMap.toDTO(user);
  
    return response.json(mappedUser); */
  
    /*delete user.password;
  
    return response.json({ user, token });*/       

    }
}