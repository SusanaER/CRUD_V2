import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModelGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PassengerModel } from 'src/app/common/models/passenger.model';
import { PassengerService } from 'src/app/services/passenger/passenger.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.css']
})
export class AddPassengerComponent implements OnInit {
  passenger!: PassengerModel;
  addForm !: FormGroup;
  passengerSub!: Subscription;

  constructor(private passengerService: PassengerService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.getItem("login")){
      localStorage.removeItem("id");
      this.addForm = this.formBuilder.group({
        firstname: ["", [Validators.required]],
        lastname: ["", [Validators.required]],
        age: ["", [Validators.required]],
      });
    }else{
      this.router.navigateByUrl('login');
      setTimeout(function(){
        window.location.reload();
      }, 1);
    }
  }

  add(): void{
    var name = this.addForm.getRawValue().firstname;
    var lname = this.addForm.getRawValue().lastname;
    var ageNumber = this.addForm.getRawValue().age;
    if(name === "" || lname === "" || ageNumber === ""){
      Swal.fire({
        title: 'Missing information',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else{
      this.passengerSub = this.passengerService.addPassenger(name, lname, ageNumber).subscribe();
      Swal.fire({
        title: 'Passenger added',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      this.router.navigateByUrl('passenger');
      setTimeout(function(){
        window.location.reload();
      }, 2);
    }
  }
}
