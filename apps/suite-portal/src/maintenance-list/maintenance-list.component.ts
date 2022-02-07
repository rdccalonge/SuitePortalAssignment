import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MaintenanceService } from "../services/maintenance.service";

@Component({
    selector: 'pm-maintenance-list',
    templateUrl: './maintenance-list.component.html',
    styleUrls: ['./maintenance-list.component.scss']
  })
  export class MaintenanceListComponent implements OnInit{
    dataSource: any = [];
    result: string = '';
    columnsToDisplay = [
      'name',
      'email',
      'unitNumber',
      'serviceType',
      'summary',
      'details',
      'submittedAt',
      'status'
    ];

    @ViewChild('paginator') paginator!: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
      private maintService: MaintenanceService,
      ) {}
    
    ngOnInit() {
      this.refresh();
    }

    refresh() {
    this.maintService.get().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      })
    }

    closeRequest(id: string){
      this.maintService.closeRequest(id).subscribe(() => {
      this.refresh();
      });
    }
    }