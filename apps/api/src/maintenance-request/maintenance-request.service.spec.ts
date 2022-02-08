
import { Test } from '@nestjs/testing';
import { MaintenanceRequestService } from './maintenance-request.service';
import { MaintenanceRequestDao } from './maintenance-request.dao';

describe('MaintenanceRequestService', () => {
  let service: MaintenanceRequestService;
  let dao: MaintenanceRequestDao;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [MaintenanceRequestService, MaintenanceRequestDao],
    }).compile();

    service = app.get<MaintenanceRequestService>(MaintenanceRequestService);
    dao = app.get<MaintenanceRequestDao>(MaintenanceRequestDao);
  });

    it('should return new id', async () => {
        dao.insertNewRequest = jest.fn().mockResolvedValue({id: 'NewId'})
        const result = await service.createMaintenanceRequest(createMaintenanceRequest('someType', 'someSummary', 'someDetails'));
      expect(result.id).toEqual('NewId');
    });

    it('should get specific record', async () => {
        dao.getMaintenanceRequest = jest.fn().mockResolvedValue({id: '1'})
        const result = await service.getMaintenanceRequest('1');
      expect(result.id).toEqual('1');
    });

    it('should get all records', async () => {
      const expected = [
          {id: '1'},
          {id: '2'}
      ]
      dao.getAllMaintenanceRequests = jest.fn().mockResolvedValue(expected)
      const result = await service.getAllMaintenanceRequests();
      const obj = Object(result);
    expect(obj.length).toEqual(2);
    });

    it('should return updated record', async () => {
      dao.closeMaintenanceRequest = jest.fn().mockResolvedValue({id: '1', status: 'closed'})
      const result = await service.closeMaintenanceRequest('1');
      expect(result.status).toEqual('closed');
    });
  });

function createMaintenanceRequest(summary: string = null, details: string = null, serviceType: string = null): any {
    return ({
      name: 'John Doe',
      email: 'john.doe@yopmail.com',
      unitNumber: '2AB',
      serviceType: serviceType ,
      summary: summary,
      details: details,
    });
  }