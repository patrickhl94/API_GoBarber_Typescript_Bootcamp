import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserReposotory from '../repositories/fakes/FakeUsersRepository';
import CreateUserServices from './CreateUserServices';

describe('CreatUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserReposotory = new FakeUserReposotory();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserServices(
      fakeUserReposotory,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      email: 'patrick@email.com',
      name: 'Patrick',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Patrick');
  });

  it('should be able to create a new user with same email from another', async () => {
    const fakeUserReposotory = new FakeUserReposotory();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserServices(
      fakeUserReposotory,
      fakeHashProvider,
    );

    await createUserService.execute({
      email: 'patrick@email.com',
      name: 'Patrick',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        email: 'patrick@email.com',
        name: 'Patrick',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
