import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {

  form = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    confirmPassword: new FormControl("", [Validators.required])
  });

  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  onSubmit() {
    if (this.form.value.password !== this.form.value.confirmPassword) {
      window.alert("Valores diferentes nos campos de Senha e Confirmar senha");
    }
    else {
      let payload = this.form.value;
      delete payload.confirmPassword;

      this.loginService.registerUser(payload).subscribe(
        res => {
          /* istanbul ignore else */
          if (res) {
            window.alert("Usuário cadastrado com sucesso");
            this.router.navigate(["/login"]);
          }
        }
      )
    }
  }

}
