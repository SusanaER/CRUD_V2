import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static USER: string = "admin";
  private static PWD: string = "123456";

  constructor() { }

  public login(user: string, pwd: string): boolean{
    return user == AuthService.USER && pwd === AuthService.PWD;
  }

}
