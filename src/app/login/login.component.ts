import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    user: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  hidePassword = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.value.user === "leo" && this.form.value.password ==="123") {
      this.router.navigate(["/task-list"])
    }
    else {
      window.alert("Credenciais inválidas");
    }
  }

}
