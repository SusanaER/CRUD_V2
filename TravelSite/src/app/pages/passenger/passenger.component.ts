import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassengerService } from 'src/app/services/passenger/passenger.service';
import { PassengerModel } from 'src/app/common/models/passenger.model';
@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {
  passengerSubs!: Subscription;
  passenger: PassengerModel[] = [];
  AddForm !: FormGroup;

  constructor(private passengerService: PassengerService, private router: Router, private formBuilder: FormBuilder ) { }
  
  ngOnInit(): void {
    this.passengerSubs = this.passengerService.getPassenger().subscribe(
      (passengers: PassengerModel[]) => {
        this.passenger = passengers;
      }
    )
    localStorage.removeItem("id");
    this.AddForm = this.formBuilder.group({
      name: ["", [Validators.required]]
    });
  }

  public updatePassenger(passenger: string): void{
    localStorage.setItem("id", passenger);
    this.router.navigateByUrl("/updatePassenger");
    setTimeout(function(){
      window.location.reload();
    }, 1);
  }
  
  deletePassenger(id: string, fname: string, lname: string): void{
    this.passengerSubs = this.passengerService.deletePassenger(id).subscribe();
    window.location.reload();
    Swal.fire({
      title: fname + ' ' + lname + ' deleted',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  }

  addPassenger(): void{
    this.router.navigateByUrl("/addPassenger");
    setTimeout(function(){
      window.location.reload();
    }, 2);
  }

  ngOnDestroy(): void {
    this.passengerSubs.unsubscribe();
  }
}
