import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
    it('should be able to create a new apppointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );
        
        const apppointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '123123',
        });

        expect(apppointment).toHaveProperty('id');
        expect(apppointment.provider_id).toBe('123123')
    });

    it('should not be able to create two appointments on the same time', async() => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );

        const appointmentDate = new Date(2020, 10, 23, 17);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id:'123123'
        });

        expect(createAppointment.execute({
            date: appointmentDate,
            provider_id: '123123',
        })).rejects.toBeInstanceOf(AppError);
    });
});