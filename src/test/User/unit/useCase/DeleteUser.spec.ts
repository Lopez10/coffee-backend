import { UserRepositoryPort } from '../../../../modules/User/domain/User.repository.port';
import { MockUserRepository } from '../../repository/MockUserRepository';
import { addUsersToRepository } from '../../repository/MockUserData';
import { DeleteUserUseCase } from '../../../../modules/User/application/useCase/deleteUser/DeleteUser.useCase';

describe('Delete User', () => {
  const userRepository: UserRepositoryPort = new MockUserRepository();
  addUsersToRepository(userRepository);
  const action = new DeleteUserUseCase(userRepository);
  it(`
    GIVEN There are 3 different users
    WHEN I delete a user by id
    THEN I the user with that id doesn't exist
    AND the other users still exist
    `, async () => {
    // GIVEN
    const isUserDeleted = await action.run({
      id: 'user1',
    });
    expect(isUserDeleted.isRight()).toEqual(true);
    if (isUserDeleted.isRight()) {
      expect(isUserDeleted.value).toEqual(true);
    }
    // WHEN
    const retrieveUsers = await userRepository.findAll();
    // THEN
    expect(retrieveUsers).toHaveLength(2);
    expect(retrieveUsers[0].toPrimitives().id).toEqual('user2');
    expect(retrieveUsers[1].toPrimitives().id).toEqual('user3');
  });
});
