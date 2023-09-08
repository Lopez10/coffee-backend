import { UserRepositoryPort } from '../../../../modules/User/domain/User.repository.port';
import { MockUserRepository } from '../../repository/MockUserRepository';
import { RetrieveUserUseCase } from '../../../../modules/User/application/useCase/retrieveUser/RetrieveUser.useCase';
import { addUsersToRepository } from '../../repository/MockUserData';

describe('Retrieve User', () => {
  const userRepository: UserRepositoryPort = new MockUserRepository();
  const action = new RetrieveUserUseCase(userRepository);
  it(`
    GIVEN There are 3 different users
    WHEN I retrieve a user by id
    THEN I get the user with that id
  `, async () => {
    // GIVEN
    addUsersToRepository(userRepository);

    // WHEN
    const user = await action.run({
      id: 'user1',
    });

    // THEN
    expect(user.isRight()).toEqual(true);
    if (user.isRight()) {
      expect(user.value.toPrimitives().id).toEqual('user1');
      expect(user.value.toPrimitives().name).toEqual('User 1');
      expect(user.value.toPrimitives().email).toEqual('user1@gmail.com');
      expect(user.value.toPrimitives().role).toEqual('USER');
      expect(user.value.toPrimitives().description).toEqual(
        'User 1 description',
      );
      expect(user.value.toPrimitives().coffeeCounter).toEqual(0);
      expect(user.value.toPrimitives().coffeeExtraction).toEqual('AEROPRESS');
      expect(user.value.toPrimitives().coffeeExtractionMachine).toEqual(
        'Lelit Bianca',
      );
    }
  });
});
