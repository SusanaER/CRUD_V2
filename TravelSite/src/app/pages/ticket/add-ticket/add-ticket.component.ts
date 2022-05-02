import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModelGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JourneyModel } from 'src/app/common/models/journeys.model';
import { PassengerModel } from 'src/app/common/models/passenger.model';
import { JourneyService } from 'src/app/services/journey/journey.service';
import { PassengerService } from 'src/app/services/passenger/passenger.service';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {
  journey: JourneyModel[] = [];
  journeySubs!: Subscription;
  addForm !: FormGroup;
  ticketSubs!: Subscription;
  journeySelected!: string;
  passengerSelected!: string;
  passengerSubs!: Subscription;
  passenger: PassengerModel[] = [];

  constructor(private ticketService: TicketService, private journeyService: JourneyService, private passengerService: PassengerService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.getItem("login")){
      this.getJourney();
      this.getPassenger();
      localStorage.removeItem("id");
      this.addForm = this.formBuilder.group({
        seat: ["", [Validators.required]],
      });
      this.journeySelected = "1";
      this.passengerSelected = "1";
    }else{
      this.router.navigateByUrl('login');
      setTimeout(function(){
        window.location.reload();
      }, 1);
    }
  }

  add(): void{
    var journey = this.journeySelected;
    var passenger = this.passengerSelected;
    var seat = this.addForm.getRawValue().seat;
    if(seat === null){
      Swal.fire({
        title: 'Seat is null',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else{
      this.ticketSubs = this.ticketService.addTicket(journey, passenger, seat).subscribe();
      Swal.fire({
        title: 'Ticket added',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      this.router.navigateByUrl('ticket');
      setTimeout(function(){
        window.location.reload();
      }, 2);
    }
  }

  getJourney(){
    this.journeySubs = this.journeyService.getJourney().subscribe(
      (journeys: JourneyModel[]) => {
        this.journey = journeys;
      }
    )
  }

  getPassenger(){
    this.passengerSubs = this.passengerService.getPassenger().subscribe(
      (passengers: PassengerModel[]) => {
        this.passenger = passengers;
      }
    )
  }
}
