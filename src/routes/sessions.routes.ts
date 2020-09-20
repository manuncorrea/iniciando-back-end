import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async(request, response) => {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
        email, 
        password,
    });

    delete user.password      // Não retornar a senha para o usuario

    return response.json({ user , token})

});

export default sessionRouter;