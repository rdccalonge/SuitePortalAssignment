import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DialogComponent, DialogModel } from "../dialog/dialog.component";
import { MaintenanceService } from "../../services/maintenance.service";

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
      private dialog: MatDialog
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

    confirmDialog(id: string): void {
      const message = `This will close the open maintenance request. It wil no longer appear in your list.`;
    
      const dialogData = new DialogModel("Close this request?", message);
    
      const dialogRef = this.dialog.open(DialogComponent, {
          maxWidth: "400px",
          data: dialogData
      });
    
      dialogRef.afterClosed().subscribe(dialogResult => {
          this.result = dialogResult;
          if (this.result){
            this.closeRequest(id);
          }
      });
      }
    }