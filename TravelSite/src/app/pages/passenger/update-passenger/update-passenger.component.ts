import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModelGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DestinationModel } from 'src/app/common/models/destination.model';
import { PassengerModel } from 'src/app/common/models/passenger.model';
import { PassengerService } from 'src/app/services/passenger/passenger.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-passenger',
  templateUrl: './update-passenger.component.html',
  styleUrls: ['./update-passenger.component.css']
})
export class UpdatePassengerComponent implements OnInit {
  passenger!: PassengerModel;
  id = localStorage.getItem("id");
  updateForm !: FormGroup;
  passengernSubs!: Subscription;

  constructor(private passengerService: PassengerService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      age: ["", [Validators.required]],
    });
    if (this.id == null){
      Swal.fire({
        title: 'Id of passenger not found.',
        text: 'Please check the data.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else{
      this.passengernSubs = this.passengerService.getPassengerById(this.id).subscribe(
        (p: PassengerModel) => {
          this.passenger = p;
          this.updateForm.setValue({
            firstname: this.passenger.firstName,
            lastname: this.passenger.lastName,
            age: this.passenger.age
          });
        }
      )
    }
  }

  update(){
    var id = this.id;
    var fname = this.updateForm.getRawValue().firstname;
    var lname = this.updateForm.getRawValue().lastname;
    var agenumber = this.updateForm.getRawValue().age;
    if(id === null){
      Swal.fire({
        title: 'Id is null',
        text: 'Please check the data.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else{
      this.passengernSubs = this.passengerService.updatePassenger(id, fname, lname, agenumber).subscribe();
      Swal.fire({
        title: 'Passenger Id: ' + id + ' edited',
        icon: 'success',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      this.router.navigateByUrl("/passenger");
    }
  }
}
