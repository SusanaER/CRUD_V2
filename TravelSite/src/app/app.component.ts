import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment as e } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TravelSite';
  isinAdmin: boolean;
  isInSession: boolean;

  constructor(private router: Router){
    this.isinAdmin = false;
    if(window.location.href == e.PAGE_URL +'login' || window.location.href == e.PAGE_URL + 'management' || window.location.href == e.PAGE_URL + 'updateDestination'
    || window.location.href == e.PAGE_URL +'journey' || window.location.href == e.PAGE_URL + 'updateJourney' || window.location.href == e.PAGE_URL + 'passenger'
    || window.location.href == e.PAGE_URL + 'addPassenger' || window.location.href == e.PAGE_URL + 'addJourney' || window.location.href == e.PAGE_URL + 'updatePassenger' 
    || window.location.href == e.PAGE_URL +'ticket' || window.location.href == e.PAGE_URL + 'addTicket' || window.location.href == e.PAGE_URL + 'generateTicket'){
      this.isinAdmin = true;
    }

    this.isInSession = true;
    if(window.location.href == e.PAGE_URL + 'login'){
      this.isInSession = false;
    }
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
    localStorage.removeItem("login");
    setTimeout(function(){
      window.location.reload();
    }, 1);
  }
}

