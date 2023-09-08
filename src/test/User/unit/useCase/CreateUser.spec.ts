import { UserRepositoryPort } from '../../../../modules/User/domain/User.repository.port';
import { MockUserRepository } from '../../repository/MockUserRepository';
import { CreateUserUseCase } from '../../../../modules/User/application/useCase/createUser/CreateUser.useCase';
import { Email } from '@common';
import { UserDTO } from 'src/modules/User/user.mapper';

describe('Create User', () => {
  const userRepository: UserRepositoryPort = new MockUserRepository();
  const action = new CreateUserUseCase(userRepository);
  it(`
    GIVEN a new user data 
    WHEN the user is created
    THEN the user should be created in the repository
  `, async () => {
    // GIVEN
    const userData: UserDTO = {
      id: 'user1',
      name: 'User 1',
      email: 'user@gmail.com',
      password: '123456Prueba',
      role: 'USER',
      description: 'User 1 description',
      coffeeCounter: 0,
      coffeeExtraction: 'AEROPRESS',
      coffeeExtractionMachine: 'Lelit Bianca',
      coffeeGrinderMachine: 'Eureka Mignon',
    };

    // WHEN
    const userCreationRequest = await action.run(userData);
    expect(userCreationRequest.isRight()).toEqual(true);

    // THEN
    const user = await userRepository.findOneByEmail(new Email(userData.email));
    expect(user).not.toBeNull();
    expect(user.toPrimitives().name).toEqual('User 1');
    expect(user.toPrimitives().email).toEqual('user@gmail.com');
    expect(user.toPrimitives().role).toEqual('USER');
  });
});
