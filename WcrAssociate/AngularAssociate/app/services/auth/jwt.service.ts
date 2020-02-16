import { Injectable } from '@angular/core';
import { User } from 'AngularAssociate/app/entities/user';


@Injectable()
export class JwtService {

  getToken(): String {
      return window.localStorage['jwtToken'];

  }

    saveToken(user: User) {
        debugger;
        if (!window.localStorage.getItem('jwtToken')) {
            window.localStorage.setItem('jwtToken', JSON.stringify(user));
        }
        //window.localStorage.setItem('jwtToken', JSON.stringify(user));
  }

  destroyToken() {
      window.localStorage.removeItem('jwtToken');
  }

}
