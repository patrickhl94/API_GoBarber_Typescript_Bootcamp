// import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserReposotory from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserServices from './AuthenticateUserServices';
import CreateUserServices from './CreateUserServices';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUserReposotory = new FakeUserReposotory();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserServices(
      fakeUserReposotory,
      fakeHashProvider,
    );

    const createUserServices = new CreateUserServices(
      fakeUserReposotory,
      fakeHashProvider,
    );

    const user = await createUserServices.execute({
      email: 'patrick@email.com',
      password: '123456',
      name: 'Patrick',
    });

    const response = await authenticateUser.execute({
      email: 'patrick@email.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
});
