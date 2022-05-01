import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TicketModel } from 'src/app/common/models/ticket.model';
import { environment as e } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private https: HttpClient) { }

  public getTicket(): Observable<TicketModel[]> {
    return this.https.get<TicketModel[]>(e.TICKET_URL).pipe(
      map((items: any[]) => items.map((item: any) => {
        return {
          id: item.id,
          journeyId: item.journeyId,
          passengerId: item.passengerId,
          seat: item.seat
        };
      }))
    );
  }

  public getTicketById(id: string): Observable<TicketModel> {
    return this.https.get<TicketModel>(e.TICKET_URL+id).pipe(
      map(item => {
        return {
          id: item.id,
          journeyId: item.journeyId,
          passengerId: item.passengerId,
          seat: item.seat
        };
      })
    );
  }

  public updateTicket(id: string, journeyId: string, passengerId: string, seat: string): any {
    var content = {id, journeyId, passengerId, seat}
    return this.https.put(e.TICKET_URL, content).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public deleteTicket(id: string): any{
    return this.https.delete<TicketModel>(e.TICKET_URL+id).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public addTicket(journeyId: string, passengerId: string, seat: string): any{
    var content = {journeyId, passengerId, seat}
    return this.https.post(e.TICKET_URL, content).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }
}