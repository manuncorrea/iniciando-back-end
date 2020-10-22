import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { container } from 'tsyringe';


import CreateUserService from '@modules/users/services/CreateUserServices';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import UserMap from '../../../../../mappers/UserMap';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userRouter = Router();
const upload = multer(uploadConfig);


userRouter.post('/', async(request, response) => {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
        name,
        email,
        password,
    });

    const mappedUser = UserMap.toDTO(user);

    return response.json(mappedUser);

 /*   delete user.password;
    
    return response.json(user); */
    
});

userRouter.patch(
    '/avatar', 
    ensureAuthenticated, 
    upload.single('avatar'),
    async (request, response) => {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);

        const user = await updateUserAvatar.execute({
            user_id : request.user.id,
            avatarFilename: request.file.filename,
        });

        const mappedUser = UserMap.toDTO(user);

        return response.json(mappedUser);

        /*delete user.password;
        
        return response.json(user);*/
    },
);

export default userRouter;