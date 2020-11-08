import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';


let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();

        createAppointment = new CreateAppointmentService(
            fakeAppointmentRepository,
            fakeNotificationsRepository,
        );

        jest
        .spyOn(Date, 'now')
        .mockImplementationOnce(() => new Date(2020, 8, 24, 15).getTime());
    });
    it('should be able to create a new appointment', async () => {
        const appointment = await createAppointment.execute({
            date: new Date(),
            user_id: 'user-id',
            provider_id: 'provider-id',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('provider-id');
    });

    it('should not be able to create two appointments on the same time', async() => {
        const appointmentDate = new Date(2020, 10, 23, 17);

        await createAppointment.execute({
            date: appointmentDate,
            user_id: 'user-id',
            provider_id: 'provider-id',
        });

       await expect(createAppointment.execute({
            date: appointmentDate,
            user_id: 'user-id',
            provider_id: 'provider-id',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointments on a past date', async() => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 11),
                user_id: 'user-id',
                provider_id: 'provider-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointments with same user as provider', async () => {
        await expect(
          createAppointment.execute({
            provider_id: 'user-id',
            user_id: 'user-id',
            date: new Date(2020, 8, 25, 8),
          }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointments before 8am and after 5pm', async () => {
        await expect(
          createAppointment.execute({
            user_id: 'user-id',
            provider_id: 'provider-id',
            date: new Date(2020, 8, 25, 7),
          }),
        ).rejects.toBeInstanceOf(AppError);
    
        await expect(
          createAppointment.execute({
            user_id: 'user-id',
            provider_id: 'provider-id',
            date: new Date(2020, 8, 25, 18),
          }),
        ).rejects.toBeInstanceOf(AppError);
    });
});