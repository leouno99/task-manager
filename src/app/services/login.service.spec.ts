import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { User } from '../models/user';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
    service.userList = [
      { username: "mock", password: "test" }
    ]
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create user', (done: DoneFn) => {
    let newUser: User = { username: "mock1", password: "test1" };

    expect(service.registerUser(newUser).subscribe(
      res => {
        expect(res).toBeTrue();
        done();
      }
    ));
  });

  it('should login', (done: DoneFn) => {
    expect(service.login("mock", "test").subscribe(
      res => {
        expect(res).toBeTrue();
        done();
      }
    ));
  });
});
