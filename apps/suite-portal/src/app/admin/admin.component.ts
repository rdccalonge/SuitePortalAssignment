
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../services/services/authentication.service";

@Component({
    selector: 'pm-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
  })
  export class AdminComponent implements OnInit {
    public loginValid: boolean;
    loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        ) {}

        ngOnInit(): void {
            this.loginForm = this.formBuilder.group({
                username: [null, [Validators.required, Validators.minLength(6)]],
                password: [null, [Validators.required, Validators.minLength(3)]],
            });
            this.loginValid = true;
        }

        login(){
            if (this.loginForm.invalid) {
                return;
            }
            
        this.authenticationService.post(this.loginForm.getRawValue());
        this.loginValid = this.authenticationService.isLoggedIn;
        }
}