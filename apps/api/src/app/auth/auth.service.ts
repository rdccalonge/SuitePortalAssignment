import { Injectable } from "@nestjs/common";
import { User } from "@suiteportal/api-interfaces";
import { AuthDao, MaintenanceRequestDB } from "./auth.dao";

@Injectable()
export class AuthService {

  constructor(
    private readonly authDao: AuthDao,
  ) {
    //
  }

  async getAdminUsers(user: User): Promise<MaintenanceRequestDB> {
    return await this.authDao.getAdminUsers(user);
  }
}
