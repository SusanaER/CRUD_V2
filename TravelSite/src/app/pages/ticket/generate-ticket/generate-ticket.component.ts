import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModelGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DestinationModel } from 'src/app/common/models/destination.model';
import { JourneyModel } from 'src/app/common/models/journeys.model';
import { DestinationService } from 'src/app/services/destination/destination.service';
import { JourneyService } from 'src/app/services/journey/journey.service';
import Swal from 'sweetalert2';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { TicketModel } from 'src/app/common/models/ticket.model';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { PassengerModel } from 'src/app/common/models/passenger.model';
import { PassengerService } from 'src/app/services/passenger/passenger.service';

@Component({
  selector: 'app-generate-ticket',
  templateUrl: './generate-ticket.component.html',
  styleUrls: ['./generate-ticket.component.css']
})
export class GenerateTicketComponent implements OnInit {
  journey!: JourneyModel;
  journeySubs!: Subscription;
  originSelected!: string;
  destinationSelected!: string;
  id = localStorage.getItem("id");
  updateForm !: FormGroup;
  destinationSubs!: Subscription;
  destination!: DestinationModel;
  origin!: DestinationModel;
  ticket!: TicketModel;
  ticketSubs!: Subscription;
  journeyId!: string;
  passengerId!: string;
  passenger!: PassengerModel;
  passengerSubs!: Subscription;
  currentDate = new Date();

  constructor(private ticketService: TicketService, private passengerService: PassengerService, private journeyService: JourneyService, private destinationService: DestinationService, private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    if(localStorage.getItem("login")){
      if (this.id == null){
        alert('id is null')
      }else{
        this.ticketSubs = this.ticketService.getTicketById(this.id).subscribe(
          (t: TicketModel) => {
            this.ticket = t;
            this.journeyId = this.ticket.journeyId;
            this.passengerId = this.ticket.passengerId;
            if(this.journeyId === undefined){
              console.log('Journey Id is undefined')
            }else{
              this.journeySubs = this.journeyService.getJourneyById(this.ticket.journeyId).subscribe(
                (j: JourneyModel) => {
                  this.journey = j;
                  this.originSelected = j.originId;
                  this.destinationSelected = j.destinationId;
                  this.destinationSubs = this.destinationService.getDestinationById(this.journey.destinationId).subscribe(
                    (destinations: DestinationModel) => {
                      this.destination = destinations;
                    }
                  );
                  this.destinationSubs = this.destinationService.getDestinationById(this.journey.originId).subscribe(
                    (origins: DestinationModel) => {
                      this.origin = origins;
                    }
                  );
                }
              ) 
            }
            this.passengerSubs = this.passengerService.getPassengerById(this.passengerId).subscribe(
              (p: PassengerModel) => {
                this.passenger = p;
              }
            )
          }
        )
      }
    }else{
      this.router.navigateByUrl('login');
      setTimeout(function(){
        window.location.reload();
      }, 1);
    }
  }

  exportAsPDF(divId: any)
    {
        let data = document.getElementById('divId');
        if(data === null){
          console.log("data null")
        }else{
          html2canvas(data).then(canvas => {
          const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
          let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
          //let pdf = new jspdf('p', 'cm', 'a4'); //Generates PDF in portrait mode
          pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
          pdf.save('TravelSite.pdf'); 
        }); 
      }
    }
}

