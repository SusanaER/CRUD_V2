import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TravelSite';
  isinAdmin: boolean;
  isInSession: boolean;
  link = 'http://localhost:4200/';

  constructor(private router: Router){
    this.isinAdmin = false;
    if(window.location.href == this.link+'login' || window.location.href == this.link+'management' || window.location.href == this.link+'updateDestination'
    || window.location.href == this.link+'journey' || window.location.href == this.link+'updateJourney' || window.location.href == this.link+'passenger'
    || window.location.href == this.link+'addPassenger' || window.location.href == this.link+'addJourney' || window.location.href == this.link+'updatePassenger' 
    || window.location.href == this.link+'ticket' || window.location.href == this.link+'addTicket' || window.location.href == this.link+'generateTicket'){
      this.isinAdmin = true;
    }

    this.isInSession = true;
    if(window.location.href == 'http://localhost:4200/login' || window.location.href == 'http://localhost:4200/home'){
      this.isInSession = false;
    }
  }

  loginAdmin(){
    this.router.navigateByUrl("/login");
    setTimeout(function(){
      window.location.reload();
    }, 1);
  }

  destination(){
    this.router.navigateByUrl("/management");
    setTimeout(function(){
      window.location.reload();
    }, 1);
  }

  journey(){
    this.router.navigateByUrl("/journey");
    setTimeout(function(){
      window.location.reload();
    }, 1);
  }

  passenger(){
    this.router.navigateByUrl("/passenger");
    setTimeout(function(){
      window.location.reload();
    }, 1);
  }

  ticket(){
    this.router.navigateByUrl("/ticket");
    setTimeout(function(){
      window.location.reload();
    }, 1);
  }

  closeAdmin(){
    this.router.navigateByUrl("/home");
    setTimeout(function(){
      window.location.reload();
    }, 1);
  }
}

