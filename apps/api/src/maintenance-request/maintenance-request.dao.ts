import { Injectable } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as nanoid from 'nanoid';

export interface MaintenanceRequestDB extends MaintenanceRequest {
  id: string;
  submittedAt: Date;
  status: string
}

export interface MaintenanceRequestData {
  requests: MaintenanceRequestDB[];
}

const DATABASE_NAME = process.env.NODE_ENV === 'test' ? './db/test-db.json' : './db/maint-requests.json'
const adapter = new FileSync<MaintenanceRequestDB>(DATABASE_NAME)
const db = low(adapter)

db.defaults({ requests: [] }).write();

@Injectable()
export class MaintenanceRequestDao {

  private get collection(): any {
    return db.get('requests');
  }

  constructor() {
    //
  }

  async insertNewRequest(maintenanceRequest: MaintenanceRequest) {
    const id = { id: nanoid.nanoid(10) };
    await this.collection
      .push({
        ...id,
        ...maintenanceRequest,
        submittedAt: new Date(),
        status: 'open'
      })
      .write()
    return id;
  }

  async getMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return await this.collection.find({ id }).value();
  }

  async getOpenMaintenanceRequests(): Promise<MaintenanceRequestDB>{
    return await this.collection.filter({ status: 'open' }).value();
  }

  async closeMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return await this.collection.find({ id })
    .assign({ status : 'closed' })
    .write();
  }
}
