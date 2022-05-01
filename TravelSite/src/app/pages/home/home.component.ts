import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  journeyForm !: FormGroup;

  constructor(private router: Router, 
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    localStorage.removeItem("id");
  }

  addTravel(){
    this.router.navigateByUrl("/passenger");
  }

}
