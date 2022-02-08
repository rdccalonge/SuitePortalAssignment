/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceRequestController } from './maintenance-request.controller';
import { MaintenanceRequestService } from './maintenance-request.service';

describe('MaintenanceRequestController', () => {
  let controller: MaintenanceRequestController;
  let parameter: MaintenanceRequest;
  let mockService: MaintenanceRequestService;

  beforeEach(async () => {
    mockService = {} as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenanceRequestController],
      providers: [
        { provide: MaintenanceRequestService, useValue: mockService },
      ]
    }).compile();

    controller = module.get<MaintenanceRequestController>(MaintenanceRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // getMaintenanceRequest
  it('should call dao when getting a maintenance request by id', async () => {
    mockService.getMaintenanceRequest = jest.fn().mockResolvedValue({ id: '1', summary: 'test' });

    const result = await controller.getMaintenanceRequest('1');

    expect(mockService.getMaintenanceRequest).toHaveBeenCalled();
    expect(result).toEqual({ id: '1', summary: 'test'});
  });

  it('should throw bad request exception when id is null', async () => {
    await expect(controller.getMaintenanceRequest(null)).rejects.toThrowError(new BadRequestException('No id provided'));
  });

  it('should throw not found exception when id does not match data', async () => {
    mockService.getMaintenanceRequest = jest.fn().mockResolvedValue(null);

    await expect(controller.getMaintenanceRequest('1')).rejects.toThrowError(new NotFoundException('No record was found'));
  });

  // createMaintenanceRequest
  it('should return request when creating a valid maintenance request', async () => {
    parameter = createMaintenanceRequestParam('testsummary', 'testdetails', 'general');

    mockService.createMaintenanceRequest = jest.fn().mockResolvedValue({id: 2, parameter});

    const result = await controller.createMaintenanceRequest(parameter);

    expect(mockService.createMaintenanceRequest).toHaveBeenCalled();
    expect(result).not.toBeNull();
    expect(result.id).toEqual(2);
  });

  it('should throw bad request exception when creating a maintenance request with null summary', async () => {
    parameter = createMaintenanceRequestParam(null, 'SomeServiceType', 'general');
    mockService.createMaintenanceRequest = jest.fn().mockResolvedValue({id: 2, parameter});

    await expect(controller.createMaintenanceRequest(parameter)).rejects.toThrowError(new BadRequestException('Must provide a valid summary'));
  });
  
  it('should throw bad request exception when creating a maintenance request with null service type', async () => {
    parameter = createMaintenanceRequestParam('testsummary', null, null);
    mockService.createMaintenanceRequest = jest.fn().mockResolvedValue({id: 2, parameter});

    await expect(controller.createMaintenanceRequest(parameter)).rejects.toThrowError(new BadRequestException('Must provide a valid Service Type'));
  });
  
  it('should http exception when encountered error when creating maintenance request', async () => {
    parameter = createMaintenanceRequestParam('testsummary', 'SomeServiceType', null);
    mockService.createMaintenanceRequest = jest.fn().mockRejectedValue(null)

    await expect(controller.createMaintenanceRequest(parameter)).rejects.toThrowError(HttpException)
  });

  // get all maintenance requests
  it('should return all maintenance requests', async () => {
    const expected = [
      { id: '1', summary: 'test' },
      { id: '2', summary: 'test' }
    ];
    mockService.getOpenMaintenanceRequests = jest.fn().mockResolvedValue(expected);

    const result = await controller.getOpenMaintenanceRequests();

    var records = Object.keys(result);
    expect(mockService.getOpenMaintenanceRequests).toHaveBeenCalled();
    expect(records.length).toBe(2);
  });

  // close maintenance request
  it('should return updated values when closing valid request', async () => {
    mockService.getMaintenanceRequest = jest.fn().mockResolvedValue({ id: '1', status: 'open' });
    mockService.closeMaintenanceRequest = jest.fn().mockResolvedValue({ id: '1', status: 'closed' });

    const result = await controller.closeMaintenanceRequest('1');
    
    expect(mockService.closeMaintenanceRequest).toHaveBeenCalled();
    expect(result.status).toBe('closed');
  });

  it('should throw bad request exception when id is null', async () => {
    mockService.closeMaintenanceRequest = jest.fn().mockResolvedValue({ id: '1', summary: 'test' })

    await expect(controller.closeMaintenanceRequest(null)).rejects.toThrowError(new BadRequestException('No id provided'));
  });

  it('should throw not found exception when record is not found', async () => {
    mockService.getMaintenanceRequest = jest.fn().mockResolvedValue(null)

    await expect(controller.closeMaintenanceRequest('1')).rejects.toThrowError(new NotFoundException('No record was found'));
  });

  it('should http exception when encountered error when updating', async () => {
    mockService.getMaintenanceRequest = jest.fn().mockResolvedValue({ id: '1', status: 'open' });
    mockService.closeMaintenanceRequest = jest.fn().mockRejectedValue(undefined)

    await expect(controller.closeMaintenanceRequest('1')).rejects.toThrowError(new HttpException({
      message: "Cannot read property 'message' of undefined"
    }, HttpStatus.BAD_REQUEST));
  });
});

function createMaintenanceRequestParam(summary: string = null, details: string = null, serviceType: string = null): any {
  return ({
    name: 'John',
    email: 'john.doe@yopmail.com',
    unitNumber: '2AB',
    serviceType: serviceType ,
    summary: summary,
    details: details,
  });
}
