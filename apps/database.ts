import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as path from "path";
import * as fs from "fs";
import { MaintenanceRequest } from '@suiteportal/api-interfaces';

export interface MaintenanceRequestDB extends MaintenanceRequest {
    id: string;
    submittedAt: Date;
    status: string
  }

  
const databaseFile = path.join(__dirname, "../db/test-db.json");
const adapter = new FileSync<MaintenanceRequestDB>(databaseFile);
const db = low(adapter);
export const seedDatabase = () => {
    db.defaults({ requests: [] }).write();
    const testSeed = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "db", "test-db-seed.json"), "utf-8")
    );
    
    // seed database with test data
    db.setState(testSeed).write();
    return;
  };
  