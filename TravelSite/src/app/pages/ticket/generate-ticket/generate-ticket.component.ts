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

  constructor(private journeyService: JourneyService, private destinationService: DestinationService, private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    if (this.id == null){
      this.router.navigateByUrl("/ticket");
    }else{
      console.log(this.id)
      this.journeySubs = this.journeyService.getJourneyById(this.id).subscribe(
        (j: JourneyModel) => {
          this.journey = j;
          this.originSelected = this.journey.originId;
          this.destinationSelected = this.journey.destinationId;
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
