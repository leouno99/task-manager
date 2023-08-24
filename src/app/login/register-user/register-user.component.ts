import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  form = new FormGroup({
    user: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    confirmPassword: new FormControl("", [Validators.required])
  });

  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.value.password !== this.form.value.confirmPassword) {
      window.alert("Valores diferentes nos campos de Senha e Confirmar senha");
    }
    else {
      this.router.navigate(["/login"]);
    }
  }

}
