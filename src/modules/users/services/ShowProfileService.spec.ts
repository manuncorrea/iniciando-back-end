import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(
      fakeUsersRepository,
      
    );
  });

  it('should not be able show the profile from non-existing user', async () => {
   const user = await fakeUsersRepository.create({
      name: 'Emanuele Correa',
      email: 'manu@email.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Emanuele Correa');
    expect(profile.email).toBe('manu@email.com');
  });

  it('should be able show the profile', async () => {
     expect(
         showProfile.execute({
             user_id: 'non-existing-user-id',
         }),
     ).rejects.toBeInstanceOf(AppError);
   });
});