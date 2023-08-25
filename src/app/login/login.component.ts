import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form = new FormGroup({
    user: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  hidePassword = true;
  isRequesting = false;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  onSubmit() {
    this.isRequesting = true;
    this.form.disable();

    this.loginService.login(this.form.value.user, this.form.value.password).subscribe(
      res => {
        if (res) {
          this.router.navigate(["/task-list"])
        }
        else {
          window.alert("Credenciais inválidas");
        }

        this.isRequesting = false;
        this.form.enable();
      }
    )
  }

}
