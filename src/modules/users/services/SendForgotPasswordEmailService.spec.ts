import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokenRepository = new FakeUserTokenRepository();

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
           fakeUsersRepository,
           fakeMailProvider,
           fakeUserTokenRepository
       );

    });
      
    it('should be able to recover the password using the email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create({
            name: 'Emanuele Correa',
            email: 'manu@teste.com',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'manu@teste.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover a non-existing user password', async() => {
        await expect(
            sendForgotPasswordEmail.execute({
                email: 'manu@test.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    })

    it('should generate a forgot password token', async() => {
        const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'Emanuele Correa',
            email: 'manu@teste.com',
            password: '123456'
        });

        await sendForgotPasswordEmail.execute({
            email: 'manu@teste.com'
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });

});