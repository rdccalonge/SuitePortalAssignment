import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MaintenanceRequest } from "libs/api-interfaces/src/lib/api-interfaces";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  baseUrl: string;
  constructor(private http: HttpClient) { 
    this.baseUrl = environment.backendApiUrl;
  }

  post(maintenanceRequest: MaintenanceRequest) {
    return this.http.post<MaintenanceRequest>(`${this.baseUrl}/api/maintenance-requests`, maintenanceRequest);
  }

  get() {
    return this.http.get(`${this.baseUrl}/api/maintenance-requests`);
  }
  
  closeRequest(id: string){
    return this.http.patch(`${this.baseUrl}/api/maintenance-requests/` + id + `/close`, null);
  }
}