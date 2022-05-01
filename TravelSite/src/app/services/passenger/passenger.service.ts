import { Injectable } from '@angular/core';
import { map, Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { environment as e } from '../../../environments/environment';
import { PassengerModel } from 'src/app/common/models/passenger.model';
@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  constructor(private https: HttpClient) { }

  public getPassenger(): Observable<PassengerModel[]> {
    return this.https.get<PassengerModel[]>(e.PASSENGER_URL).pipe(
      map((items: any[]) => items.map((item: any) => {
        return {
          id: item.id,
          firstName: item.firstName,
          lastName: item.lastName,
          age: item.age
        };
      }))
    );
  }

  public getPassengerById(id: string): Observable<PassengerModel> {
    return this.https.get<PassengerModel>(e.PASSENGER_URL+id).pipe(
      map(item => {
        return {
          id: item.id,
          firstName: item.firstName,
          lastName: item.lastName,
          age: item.age
        };
      })
    );
  }

  public updatePassenger(id: string, firstname: string, lastname: string, age: string): any {
    var content = {id, firstname, lastname, age}
    return this.https.put(e.PASSENGER_URL, content).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public deletePassenger(id: string): any{
    return this.https.delete<PassengerModel>(e.PASSENGER_URL+id).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public addPassenger(firstname: string, lastName: string, age: string): any{
    var content = {firstname, lastName, age}
    return this.https.post(e.PASSENGER_URL, content).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }
}
