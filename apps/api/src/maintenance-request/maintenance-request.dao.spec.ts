import { Test } from "@nestjs/testing";
import { MaintenanceRequestDao, MaintenanceRequestDB } from "./maintenance-request.dao";
import { seedDatabase} from "../../../database";
describe('MaintenanceRequestDao', () => {
    let dao: MaintenanceRequestDao;
    
    beforeAll(async () => {
        seedDatabase();
      const app = await Test.createTestingModule({
        providers: [MaintenanceRequestDao],
      }).compile();
      dao = app.get<MaintenanceRequestDao>(MaintenanceRequestDao);
    });
      
    it('should return valid user', async () => {
         const result = await dao.getMaintenanceRequest('Test1');
         console.log(result)
         expect(result).not.toBeNull();
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
  
