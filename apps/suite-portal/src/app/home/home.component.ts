import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';
import { tap } from 'rxjs/operators';
import { MaintenanceService } from '../../services/maintenance.service';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  maintForm: FormGroup;
  
  serviceTypes = ALL_SERVICE_TYPES;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private maintenanceService: MaintenanceService,
    ) {}
  
  ngOnInit(): void {
    this.maintForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      unitNumber: [null, [Validators.required]],
      serviceType: [null, [ Validators.required ]],
      summary: [null, [Validators.required]],
      details: [{value: null, disabled: false}],
    })
  }

  submitRequest(){
    
    if (this.maintForm.invalid){
      return;
    }
    this.maintenanceService.post(this.maintForm.getRawValue()).pipe(
      tap(() => this.router.navigate(['../']))
    ).subscribe(result => {
      console.log(result);
      this.maintForm.reset();
    });
  }

}
