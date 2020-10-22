import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

import UserMap from '../../../../../mappers/UserMap';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = container.resolve(AuthenticateUserService);

  const { user, token } = await authenticateUser.execute({
    email, 
    password,
  });

  /* exemplo */
  const mappedUser = UserMap.toDTO(user);

  return response.json(mappedUser);

  /*delete user.password;

  return response.json({ user, token });*/
});

export default sessionsRouter;
