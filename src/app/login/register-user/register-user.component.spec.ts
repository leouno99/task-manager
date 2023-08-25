import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserComponent } from './register-user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;
  let loginService: jasmine.SpyObj<LoginService>;

  beforeEach(async () => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['registerUser']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule
      ],
      declarations: [RegisterUserComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RegisterUserComponent);
        component = fixture.componentInstance;
        loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should alert password and confirm password are not the same', () => {
    component.form.patchValue({
      user: 'test',
      password: '123',
      confirmPassword: '321'
    });

    spyOn(window, 'alert');
    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Valores diferentes nos campos de Senha e Confirmar senha');
  });

  it('should create user, alert successful creation and navigate to login', () => {
    component.form.patchValue({
      username: 'test',
      password: '123',
      confirmPassword: '123'
    });

    loginService.registerUser.and.returnValue(of(true));

    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    spyOn(window, 'alert');
    component.onSubmit();

    expect(loginService.registerUser).toHaveBeenCalledWith({ username: 'test', password: '123' });
    expect(window.alert).toHaveBeenCalledWith('Usuário cadastrado com sucesso');
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
