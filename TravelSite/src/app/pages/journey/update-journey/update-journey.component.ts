import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModelGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DestinationModel } from 'src/app/common/models/destination.model';
import { JourneyModel } from 'src/app/common/models/journeys.model';
import { DestinationService } from 'src/app/services/destination/destination.service';
import { JourneyService } from 'src/app/services/journey/journey.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-journey',
  templateUrl: './update-journey.component.html',
  styleUrls: ['./update-journey.component.css']
})
export class UpdateJourneyComponent implements OnInit {
  journey!: JourneyModel;
  journeySubs!: Subscription;
  originSelected!: string;
  destinationSelected!: string;
  id = localStorage.getItem("id");
  updateForm !: FormGroup;
  destinationSubs!: Subscription;
  destination: DestinationModel[] = [];

  constructor(private journeyService: JourneyService, private destinationService: DestinationService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.getItem("login")){
      this.getDestinations();
      this.updateForm = this.formBuilder.group({
        arrival: ["", [Validators.required]],
        departure: ["", [Validators.required]],
      });
      if (this.id == null){

      }else{
        this.journeySubs = this.journeyService.getJourneyById(this.id).subscribe(
          (j: JourneyModel) => {
            this.journey = j;
            this.originSelected = this.journey.originId;
            this.destinationSelected = this.journey.destinationId;
            this.updateForm.setValue({
              departure: this.journey.departure,
              arrival: this.journey.arrival
            }); 
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

  update(){
    var idJourney = this.id;
    var destinationId = this.updateForm.getRawValue().destinationId;
    var originId = this.updateForm.getRawValue().originId;
    var departure = this.updateForm.getRawValue().departure;
    var arrival = this.updateForm.getRawValue().arrival;
    if(idJourney === null){
      Swal.fire({
        title: 'Id is null',
        text: 'Please check the data.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else{
      this.journeySubs = this.journeyService.updateJourney(idJourney, destinationId, originId, departure, arrival).subscribe();
      Swal.fire({
        title: 'Journey Id: ' + idJourney + ' edited',
        icon: 'success',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      this.router.navigateByUrl("/journey");
      setTimeout(function(){
        window.location.reload();
      }, 2);
    }
  }

  getDestinations(){
    this.destinationSubs = this.destinationService.getDestination().subscribe(
      (destinations: DestinationModel[]) => {
        this.destination = destinations;
      }
    )
  }
}
