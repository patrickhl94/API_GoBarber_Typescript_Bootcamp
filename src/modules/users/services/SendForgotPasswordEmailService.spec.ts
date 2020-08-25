// import AppError from '@shared/errors/AppError';
import FakeEmailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserReposotory from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUserReposotory = new FakeUserReposotory();
    const fakeEmailProvider = new FakeEmailProvider();

    const sendMail = jest.spyOn(fakeEmailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserReposotory,
      fakeEmailProvider,
    );

    await fakeUserReposotory.create({
      name: 'Patrick',
      email: 'patrick@email.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'patrick@email.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
