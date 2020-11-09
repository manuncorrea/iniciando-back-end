import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderController from '../controllers/ProviderController';
import ProviderMonthAvaliabillyController from '../controllers/ProviderMonthAvaliabillyController';
import ProviderDayAvaliabillyController from '../controllers/ProviderDayAvaliabillyController';

const providersRouter = Router();

const providerController = new ProviderController();
const providerMonthAvaliabillyController = new ProviderMonthAvaliabillyController();
const providerDayAvaliabillyController = new ProviderDayAvaliabillyController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providerController.index);

providersRouter.get(
    '/:provider_id/month-availability',
     celebrate({
         [Segments.PARAMS]: {
             provider_id: Joi.string().uuid().required(),
         },
     }),
     providerMonthAvaliabillyController.index
     );

providersRouter.get(
    '/:provider_id/day-availability', 
    celebrate({
        [Segments.PARAMS]: {
            provider_id: Joi.string().uuid().required(),
        },
    }),
    providerDayAvaliabillyController.index
    );

export default providersRouter;