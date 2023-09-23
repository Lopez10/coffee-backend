import { LoginUserUseCase } from '../../../../modules/User/application/useCase/loginUser/LoginUser.useCase';
import { UserRepositoryPort } from '../../../../modules/User/domain/User.repository.port';
import { addUsersToRepository } from '../../repository/MockUserData';
import { MockUserRepository } from '../../repository/MockUserRepository';

describe('Login User', () => {
  const userRepository: UserRepositoryPort = new MockUserRepository();
  const action = new LoginUserUseCase(userRepository);
  it(`
    GIVEN there are 3 different users
    WHEN I login in the system with the user email and password
    THEN I get the user with that email and password
  `, async () => {
    // GIVEN
    addUsersToRepository(userRepository);

    // WHEN
    const user = await action.run({
      email: 'user1@gmail.com',
      password: '123456Prueba',
    });

    // THEN
    expect(user.isRight()).toEqual(true);
    // if (user.isRight()) {
    //   expect(user.value.getValue()).toEqual('');
    expect(true).toEqual(true);
  });
});
