import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassengerService } from 'src/app/services/passenger/passenger.service';
import { PassengerModel } from 'src/app/common/models/passenger.model';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { TicketModel } from 'src/app/common/models/ticket.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  ticketSubs!: Subscription;
  ticket: TicketModel[] = [];
  routerLink!: RouterLink;

  constructor(private ticketService: TicketService, private router: Router, private formBuilder: FormBuilder ) { }
  
  ngOnInit(): void {
    if(localStorage.getItem("login")){
      this.ticketSubs = this.ticketService.getTicket().subscribe(
        (ticket: TicketModel[]) => {
          this.ticket = ticket;
        }
      )
      localStorage.removeItem("id");
    }else{
      this.router.navigateByUrl('login');
      setTimeout(function(){
        window.location.reload();
      }, 1);
    }
  }

  public updateTicket(ticket: string): void{
    localStorage.setItem("id", ticket);
    this.router.navigateByUrl("/updateTicket");
    setTimeout(function(){
      window.location.reload();
    }, 1);
  }
  
  deleteTicket(id: string): void{
    this.ticketSubs = this.ticketService.deleteTicket(id).subscribe();
    setTimeout(function(){
      window.location.reload();
    }, 2);
    Swal.fire({
      title: id + ' deleted',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  }

  addTicket(): void{
    this.router.navigateByUrl("/addTicket");
    setTimeout(function(){
      window.location.reload();
    }, 2);
  }

  generateTicket(id: string){
    localStorage.setItem("id", id);
    this.router.navigateByUrl("/generateTicket");
    setTimeout(function(){
      window.location.reload();
    }, 1);
  }
}
