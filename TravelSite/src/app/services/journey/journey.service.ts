import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { JourneyModel } from '../../common/models/journeys.model';
import { environment as e } from '../../../environments/environment';
import { DestinationModel } from '../../common/models/destination.model';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {
  constructor(private https: HttpClient) { }

  public getDestination(idDestination: string): any {
    return this.https.get<DestinationModel>(e.DESTINATION_URL+idDestination).pipe(
      map(item => {
        return(
        localStorage.setItem("des", item.name));
      })
    );
  }

  public getJourney(): Observable<JourneyModel[]> {
    return this.https.get<JourneyModel[]>(e.JOURNEY_URL).pipe(
      map((items: any[]) => items.map((item: any) => {
        this.getDestination(item.originId);
        var des = localStorage.getItem("des");
        this.getDestination(item.destinationId);
        var origin = localStorage.getItem("des");
        if(des === null || origin === null){
          return {
            id: item.id,
            destinationId: item.destinationId,
            originId: item.originId,
            departure: item.departure,
            arrival: item.arrival
          };
        } else{
          return {
            id: item.id,
            destinationId: des,
            originId: origin,
            departure: item.departure,
            arrival: item.arrival
          };
        }    
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

  public getJourneyById(idJourney: string): Observable<JourneyModel> {
    return this.https.get<JourneyModel>(e.JOURNEY_URL+idJourney).pipe(
      map(item => {
        return {
          id: item.id,
          destinationId: item.destinationId,
          originId: item.originId,
          departure: item.departure,
          arrival: item.arrival
        };
      })
    );
  }

  public updateJourney(id: string, destinationId: string, originId: string, departure: string, arrival: string): any {
    var content = {id, destinationId ,originId, departure, arrival}
    return this.https.put(e.JOURNEY_URL, content).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public deleteJourney(id: string): any{
    return this.https.delete<JourneyModel>(e.JOURNEY_URL+id).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public addJourney(destinationId: string, originId: string, departure: string, arrival: string): any{
    var content = {destinationId, originId, departure, arrival}
    return this.https.post(e.JOURNEY_URL, content).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }
}
