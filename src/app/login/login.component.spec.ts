import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: jasmine.SpyObj<LoginService>;

  beforeEach(async () => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form and navigate to task-list', () => {
    component.form.patchValue({
      user: 'leo',
      password: '123',
    });

    loginService.login.and.returnValue(of(true));

    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    component.onSubmit();

    expect(loginService.login).toHaveBeenCalledWith('leo', '123');
    expect(navigateSpy).toHaveBeenCalledWith(['/task-list']);
  });

  it('should submit form and alert wrong credentials', () => {
    component.form.patchValue({
      user: 'test',
      password: '321',
    });

    loginService.login.and.returnValue(of(false));

    spyOn(window, 'alert');
    component.onSubmit();

    expect(loginService.login).toHaveBeenCalledWith('test', '321');
    expect(window.alert).toHaveBeenCalledWith('Credenciais inválidas');
  });
});