import { Test } from "@nestjs/testing";
import { User } from "libs/api-interfaces/src/lib/api-interfaces";
import FileSync = require("lowdb/adapters/FileSync");
import * as low from 'lowdb';
import { AuthDao, MaintenanceRequestDB } from "./auth.dao";


describe('AuthDao', () => {
    let dao: AuthDao;
    const adapter = new FileSync<MaintenanceRequestDB>('./db/maint-requests.json')
    const db = low(adapter);
    beforeAll(async () => {
      const app = await Test.createTestingModule({
        providers: [AuthDao],
      }).compile();
      dao = app.get<AuthDao>(AuthDao);
    });
    it('should be defined', () => {
        expect(dao).toBeDefined();
    });

  });

  function createUser(username: string, password: string): User {
    return ({
      username: username,
      password: password
    })
}