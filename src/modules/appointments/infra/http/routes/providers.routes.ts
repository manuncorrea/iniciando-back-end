import { Router } from 'express';

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
providersRouter.get('/:provider_id/month-availability', providerMonthAvaliabillyController.index);
providersRouter.get('/:provider_id/day-availability', providerDayAvaliabillyController.index);

export default providersRouter;