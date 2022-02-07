import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "libs/api-interfaces/src/lib/api-interfaces";
import { tap } from "rxjs/operators";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public isLoggedIn: boolean;
  baseUrl: string;
  constructor(private http: HttpClient, private router: Router) { 
    this.isLoggedIn = false;
    this.baseUrl = environment.backendApiUrl;
  }
  
  post(user: User) {
    return this.http.post<any>(`${this.baseUrl}/api/users/login`, user).pipe(
      tap(() => this.router.navigate(['maintenance-list']))
    ).subscribe({
      next: _ => {
        this.isLoggedIn = true;
      },
      error: _ => this.isLoggedIn = false
    });

  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

}
