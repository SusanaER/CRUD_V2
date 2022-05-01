import { Injectable } from '@angular/core';
import { map, Observable, catchError } from 'rxjs';
import { DestinationModel } from '../../common/models/destination.model';
import { HttpClient } from '@angular/common/http'
import { environment as e } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  constructor(private https: HttpClient) { }

  public getDestination(): Observable<DestinationModel[]> {
    return this.https.get<DestinationModel[]>(e.DESTINATION_URL).pipe(
      map((items: any[]) => items.map((item: any) => {
        return {
          id: item.id,
          name: item.name
        };
      }))
    );
  }

  public getDestinationById(idDestination: string): Observable<DestinationModel> {
    return this.https.get<DestinationModel>(e.DESTINATION_URL+idDestination).pipe(
      map(item => {
        return {
          id: item.id,
          name: item.name
        };
      })
    );
  }

  public updateDestination(id: string, name: string): any {
    var content = {id, name}
    return this.https.put(e.DESTINATION_URL, content).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public deleteDestination(id: string): any{
    return this.https.delete<DestinationModel>(e.DESTINATION_URL+id).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public addDestination(name: string): any{
    var content = {name}
    return this.https.post(e.DESTINATION_URL, content).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }
}
