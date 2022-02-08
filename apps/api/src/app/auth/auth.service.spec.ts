import { AuthDao } from './auth.dao';
import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';
import { User } from '@suiteportal/api-interfaces';




describe('AuthService', () => {
  let service: AuthService;
  let dao: AuthDao;
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AuthService, AuthDao],
    }).compile();

    service = app.get<AuthService>(AuthService);
    dao = app.get<AuthDao>(AuthDao);
  });

    it('should return valid user', async () => {
        dao.getAdminUsers = jest.fn().mockResolvedValue({id: 1, username: "johndoe", password: "password", name: "John Doe"})
        const user = await service.getAdminUsers(createUser('johndoe', 'password'));
      expect(user.id).toEqual(1);
      expect(user.username).toEqual('johndoe');
      expect(user.password).toEqual('password');
      expect(user.name).toEqual('John Doe');
    });
  });

function createUser(username: string, password: string): User {
    return ({
      username: username,
      password: password
    })
}