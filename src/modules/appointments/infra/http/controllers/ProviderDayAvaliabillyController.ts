import {Request, Response} from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvilabillyController {
    public async index(request: Request, response: Response): Promise<Response> {
        const provider_id = request.params.id;
        const {  day, month, year } = request.query;

        const listProviderDayAvailability = container.resolve(
            ListProviderDayAvailabilityService
        );
    
        const avilability = await listProviderDayAvailability.execute({ 
          provider_id,
          day: Number(day),
          month: Number(month),
          year: Number(year),
        });
    
        return response.json(avilability);
    }
}