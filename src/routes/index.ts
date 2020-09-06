import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

const appointments = [];

routes.use('/appointments', appointmentsRouter);

export default routes;