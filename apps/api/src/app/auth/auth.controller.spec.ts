import { HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@suiteportal/api-interfaces';
describe('AuthController', () => {
  let app: AuthModule;
  let mockController: AuthController;
  let mockService: AuthService;
  let parameter: User;
  
  beforeAll(async () => {
    mockService = {} as any;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{
        provide: AuthService, 
        useValue: mockService
      }],
    }).compile();

    mockController = module.get<AuthController>(AuthController);
    mockService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(mockController).toBeDefined();
    expect(mockService).toBeDefined();
  });

  it('should call dao when logging in valid user', async () => {
    parameter = createUser("TestUsername", "TestPassword");
    
    mockService.getAdminUsers = jest.fn().mockResolvedValue(parameter);
   
    const result = await mockController.login(parameter);

    expect(mockService.getAdminUsers).toHaveBeenCalled();
    expect(result).not.toBeNull();
    expect(result).toEqual(parameter);
  });
  
  it('should throw http exception when get admin users returns null', async () => {
    parameter = createUser("InvalidUsername", "ValidPassword");
    mockService.getAdminUsers = jest.fn().mockResolvedValue(null);

    await expect(mockController.login(parameter)).rejects.toThrowError(
      new HttpException('Invalid username or password please try again.', HttpStatus.UNAUTHORIZED)
      );
  });

  it('should throw bad request exception when user parameter is null', async () => {
    mockService.getAdminUsers = jest.fn().mockResolvedValue(null);
    await expect(mockController.login(null)).rejects.toThrowError(new BadRequestException());
   
    expect(mockService.getAdminUsers).not.toHaveBeenCalled();
  });
});

function createUser(username: string, password: string): User {
  return ({
    username: username,
    password: password
  })
}
