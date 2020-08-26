import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import AppError from '@shared/errors/AppError';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IUserRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exist');
    }
    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    user.password = await this.hashProvider.generateHash(password);

    user.password = password;

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
