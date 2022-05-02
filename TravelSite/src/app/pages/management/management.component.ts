import { Component, OnDestroy, OnInit } from '@angular/core';
import { DestinationModel } from 'src/app/common/models/destination.model';
import { Subscription } from 'rxjs';
import { DestinationService } from 'src/app/services/destination/destination.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment as e } from 'src/environments/environment';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit, OnDestroy {
  destinationSubs!: Subscription;
  destination: DestinationModel[] = [];
  AddForm !: FormGroup;

  constructor(private destinationService: DestinationService, private router: Router, private formBuilder: FormBuilder ) { }
  
  ngOnInit(): void {
    if(localStorage.getItem("login")){
      this.destinationSubs = this.destinationService.getDestination().subscribe(
        (destinations: DestinationModel[]) => {
          this.destination = destinations;
        }
      )
      localStorage.removeItem("id");
      this.AddForm = this.formBuilder.group({
        name: ["", [Validators.required]]
      });
    }else{
      window.location.assign(e.PAGE_URL + 'login')
    }
  }

  public updateDestination(destination: string): void{
    localStorage.setItem("id", destination);
    this.router.navigateByUrl("/updateDestination");
    setTimeout(function(){
      window.location.reload();
    }, 2);
  }
  
  deleteDestination(id: string, name: string): void{
    this.destinationSubs = this.destinationService.deleteDestination(id).subscribe();
    window.location.reload();
    Swal.fire({
      title: name + ' deleted',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  }

  addDestination(): void{
    var name = this.AddForm.getRawValue().name;
    if(name === null){
      Swal.fire({
        title: 'Enter the destination name',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else{
      this.destinationSubs = this.destinationService.addDestination(name).subscribe();
      window.location.reload();
      Swal.fire({
        title: name + ' added',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    }
  }

  ngOnDestroy(): void {
    this.destinationSubs.unsubscribe();
  }
}
