import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModelGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TicketModel } from 'src/app/common/models/ticket.model';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent implements OnInit {
  ticket!: TicketModel;
  ticketSubs!: Subscription;
  id = localStorage.getItem("id");
  updateForm !: FormGroup;

  constructor(private ticketService: TicketService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.getItem("login")){
      this.updateForm = this.formBuilder.group({
        journey: ["", [Validators.required]],
        passenger: ["", [Validators.required]],
        seat: ["", [Validators.required]],
      });
      if (this.id == null){
        Swal.fire({
          title: 'Id is null',
          text: 'Please check the data.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }else{
        this.ticketSubs = this.ticketService.getTicketById(this.id).subscribe(
          (t: TicketModel) => {
            this.ticket = t;
            this.updateForm.setValue({
              journey: this.ticket.journeyId,
              passenger: this.ticket.passengerId,
              seat: this.ticket.seat
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
    var id = this.id;
    var journey = this.updateForm.getRawValue().journey;
    var passenger = this.updateForm.getRawValue().passenger;
    var seat = this.updateForm.getRawValue().seat;
    if(id === null){
      Swal.fire({
        title: 'Id is null',
        text: 'Please check the data.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else{
      this.ticketSubs = this.ticketService.updateTicket(id, journey, passenger, seat).subscribe();
      Swal.fire({
        title: 'Ticket Id: ' + id + ' edited',
        icon: 'success',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      this.router.navigateByUrl("ticket");
      setTimeout(function(){
        window.location.reload();
      }, 2);
    }
  }
}
