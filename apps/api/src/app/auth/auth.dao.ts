import { Injectable } from "@nestjs/common";
import { User } from "libs/api-interfaces/src/lib/api-interfaces";
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';

  export interface MaintenanceRequestDB extends User {
    id: string;
    name: string;
  }

  export interface MaintenanceRequestData {
    users: MaintenanceRequestDB[];
  }

  const adapter = new FileSync<MaintenanceRequestDB>('./db/maint-requests.json')
  const db = low(adapter)
  
  db.defaults({ users: [ {'username': 'superadmin', 'password': '123456', 'id': '1', 'name' : 'Super Admin'}] }).write();

@Injectable()
export class AuthDao {

    private get collection(): any {
            return db.get('users');
    }

    constructor(
    ) {
        //
    }

    async getAdminUsers(user: User): Promise<MaintenanceRequestDB> {
        const { username, password } = user;
        const values = await this.collection.find({
            username, password
    }).value();
        return values;
    }
}