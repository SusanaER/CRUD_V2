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
  selector: 'app-add-journey',
  templateUrl: './add-journey.component.html',
  styleUrls: ['./add-journey.component.css']
})
export class AddJourneyComponent implements OnInit {
  journey!: JourneyModel;
  addForm !: FormGroup;
  destinationSubs!: Subscription;
  destination: DestinationModel[] = [];
  originSelected!: string;
  destinationSelected!: string;

  constructor(private destinationService: DestinationService, private journeyService: JourneyService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    localStorage.removeItem("id");
    this.getDestinations();
    this.addForm = this.formBuilder.group({
      origin: ["", [Validators.required]],
      destination: ["", [Validators.required]],
      arrival: ["", [Validators.required]],
      departure: ["", [Validators.required]],
    });
    this.originSelected = "1";
    this.destinationSelected = "2";
  }

  add(): void{
    var destinationId = this.destinationSelected;
    var originId = this.originSelected;
    var arrival = this.addForm.getRawValue().arrival;
    var departure = this.addForm.getRawValue().departure;
    if(destinationId === originId){
      Swal.fire({
        title: 'Origin and destinations are the same place',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else if(arrival === null){
      Swal.fire({
        title: 'Arrival is null',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else if(departure === null){
      Swal.fire({
        title: 'Departure is null',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else{
      this.destinationSubs = this.journeyService.addJourney(destinationId, originId, arrival, departure).subscribe();
      Swal.fire({
        title: 'Journey added',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      this.router.navigateByUrl('journey');
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
