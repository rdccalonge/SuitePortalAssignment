import { Test } from "@nestjs/testing";
import { MaintenanceRequestDao, MaintenanceRequestDB } from "./maintenance-request.dao";
import { seedDatabase} from "../../../database";
describe('MaintenanceRequestDao', () => {
    let dao: MaintenanceRequestDao;
    
    beforeEach(async () => {
      seedDatabase();
      const app = await Test.createTestingModule({
        providers: [MaintenanceRequestDao],
      }).compile();
        
      dao = app.get<MaintenanceRequestDao>(MaintenanceRequestDao);
    });
      
    it('should return valid request', async () => {
         const result = await dao.getMaintenanceRequest('Test1');
         
         expect(result).not.toBeNull();
         expect(result.id).toEqual('Test1')
         expect(result.name).toEqual('Reni Calonge')
         expect(result.email).toEqual('rdccalonge@gmail.com')
         expect(result.unitNumber).toEqual('1A')
         expect(result.serviceType).toEqual('general')
         expect(result.details).toEqual('Clean all rooms')
         expect(result.summary).toEqual('General Cleaning')
         expect(result.status).toEqual('closed')
    });

    it('should return all open requests', async () => {
      const result = await dao.getOpenMaintenanceRequests();

      expect(result).not.toBeNull();
      var obj = Object(result);
      expect(obj.length).toBe(1);
    });

    it('should return new id', async () => {
      const result = await dao.insertNewRequest(createMaintenanceRequestParam());

      expect(result).not.toBeNull();
      expect(result.id.length).toBeGreaterThan(0);
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
  
