import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserServices';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async(request, response) => {
    try{
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        delete user.password;
        
        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

userRouter.patch(
    '/avatar', 
    ensureAuthenticated, 
    upload.single('avatar'),
    async (request, response) => {
      console.log(request.file);
      return response.json({ ok: true });
},
);

export default userRouter;