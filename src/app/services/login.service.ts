import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userList: User[] = [
    { username: "leonardo.uno", password: "123" },
  ];

  constructor() { }

  registerUser(user: User): Observable<boolean> {
    this.userList.push(user);
    return of(true);
  }

  login(username: string, password: string): Observable<boolean> {
    let result = this.userList.filter(
      user => {
        return user.username === username && user.password === password;
      }
    )

    return of(result.length > 0).pipe(delay(1000));
  }
}
