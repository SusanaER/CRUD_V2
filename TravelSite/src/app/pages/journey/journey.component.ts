import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JourneyModel } from 'src/app/common/models/journeys.model';
import { JourneyService } from 'src/app/services/journey/journey.service';
import { DestinationModel } from 'src/app/common/models/destination.model';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {
  journeySubs!: Subscription;
  destinationSubs!: Subscription;
  journey: JourneyModel[] = [];
  AddForm !: FormGroup;
  destination !: DestinationModel;

  constructor(private journeyService: JourneyService, private router: Router, private formBuilder: FormBuilder ) { }
  
  ngOnInit(): void {
    this.journeySubs = this.journeyService.getJourney().subscribe(
      (journeys: JourneyModel[]) => {
        this.journey = journeys;
      }
    )
    localStorage.removeItem("id");
    this.AddForm = this.formBuilder.group({
      name: ["", [Validators.required]]
    });
  }

  addJourney(): void{
    this.router.navigateByUrl("/addJourney");
    setTimeout(function(){
      window.location.reload();
    }, 1);
  }

  public updateJourney(journey: string): void{
    localStorage.setItem("id", journey);
    this.router.navigateByUrl("/updateJourney");
    setTimeout(function(){
      window.location.reload();
    }, 1);
  }
  
  deleteJourney(id: string): void{
    this.destinationSubs = this.journeyService.deleteJourney(id).subscribe();
    window.location.reload();
    Swal.fire({
      title: 'Journey deleted',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  }
}
