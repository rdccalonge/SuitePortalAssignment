import { BadRequestException, Body, Controller, Post, Get, Param, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceRequestService } from './maintenance-request.service';

@Controller('maintenance-requests')
export class MaintenanceRequestController {

  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService,
  ) {
    //
  }

  @Get('/')
  public async getAllMaintenanceRequests() {
    return await this.maintenanceRequestService.getAllMaintenanceRequests();
  }

  @Post('/')
  public async createMaintenanceRequest(
    @Body() maintenanceRequest: MaintenanceRequest,
  ) {
    if (!maintenanceRequest?.summary) {
      throw new BadRequestException('Must provide a valid summary');
    }
    if (!maintenanceRequest?.serviceType) {
      throw new BadRequestException('Must provide a valid Service Type');
    }
    return await this.maintenanceRequestService.createMaintenanceRequest(maintenanceRequest).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    });
  }

  @Get('/:id')
  public async getMaintenanceRequest(
    @Param('id') id: string,
  ) {
    if (!id) {
      throw new BadRequestException('No id provided');
    }
    var result = await this.maintenanceRequestService.getMaintenanceRequest(id);
      if (!result){
        throw new NotFoundException('No record was found');
      }
      return result;
  }

}
