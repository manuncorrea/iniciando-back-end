import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO} from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

//Rota de listagem de appoints
appointmentsRouter.get('/', (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointment = appointmentsRepository.find();

  return response.json(appointment);
})

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);
  
    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({ 
      date: parsedDate, 
      provider 
    });

    return response.json(appointment);
  } catch(err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;