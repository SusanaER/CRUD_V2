import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DestinationModel } from 'src/app/common/models/destination.model';
import { Subscription } from 'rxjs';
import { DestinationService } from 'src/app/services/destination/destination.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-destination',
  templateUrl: './update-destination.component.html',
  styleUrls: ['./update-destination.component.css']
})
export class UpdateDestinationComponent implements OnInit {
  destinationSubs!: Subscription;
  destination!: DestinationModel;
  id = localStorage.getItem("id");
  updateForm !: FormGroup;
  
  constructor(private destinationService: DestinationService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.id == null){

    }else{
      this.destinationSubs = this.destinationService.getDestinationById(this.id).subscribe(
        (destinations: DestinationModel) => {
          this.destination = destinations;
        }
      )
    }
    this.updateForm = this.formBuilder.group({
      id: ["", [Validators.required]],
      name: ["", [Validators.required]]
    });
  }

  update(){
    var idDes = this.id;
    var nameDes = this.updateForm.getRawValue().name;
    if(idDes === null){
      Swal.fire({
        title: 'Id is null',
        text: 'Please check the data.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else{
      this.destinationSubs = this.destinationService.updateDestination(idDes, nameDes).subscribe();
      Swal.fire({
        title: 'Destination Id: ' + idDes + ' edited, name: ' + nameDes ,
        icon: 'success',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      this.router.navigateByUrl("/management");
    }
  }

}
