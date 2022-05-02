import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  loginForm !: FormGroup;
  errorMessage !:string;

  constructor(private router: Router, 
    private authService: AuthService, 
    private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    localStorage.removeItem("id");
    if(localStorage.getItem("login")){
      this.router.navigateByUrl('management');
      setTimeout(function(){
        window.location.reload();
      }, 1);
    }else{
      this.loginForm = this.formBuilder.group({
        user: ["", [Validators.required]],
        password: ["", [Validators.minLength(6), Validators.required]]
      });
    }
    console.log()
  }

  login(): void{
    if(this.authService.login(this.loginForm.getRawValue().user, 
      this.loginForm.getRawValue().password)){
      this.router.navigateByUrl('management');
      setTimeout(function(){
        window.location.reload();
      }, 1);
      localStorage.setItem("login", "01sa145ad124");
    }else{
      Swal.fire({
        title: 'Wrong credentials!',
        text: 'Please check the data.',
        icon: 'error',
        confirmButtonText: 'Ok',
      })
    }
  }

}
