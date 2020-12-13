import { action, computed, flow, makeObservable, observable } from 'mobx';
import { EUser } from '@store/db';
import { APIResp } from '@utils/response';
import { apiUserLogin } from '@store/api/apiUserLogin';
import { ErrorType } from '@utils/error';

export class UserStore {
  _loginError: ErrorType = { hasError: false };
  _user: EUser | null = null;

  constructor() {
    makeObservable(this, {
      _loginError: observable,
      _user: observable,
      authorized: computed,
      loginError: computed,
      user: computed,
      logout: action,
      _setLoginError: action,
      _setUserAuthorized: action,
    });
  }

  get authorized(): boolean {
    return this._user !== null;
  }

  get loginError(): ErrorType {
    return this._loginError;
  }

  get user(): EUser | null {
    return this._user;
  }

  login = flow(function* (this: UserStore, login: string, password: string) {
    const resp: APIResp<EUser> = yield apiUserLogin(login, password);

    if ('error' in resp) {
      this._setLoginError(resp.error);
      return;
    }

    this._setUserAuthorized(resp.data);
  });

  logout() {
    this._loginError = { hasError: false };
    this._user = null;
  }

  _setLoginError(loginError: ErrorType): void {
    this._loginError = loginError;
    this._user = null;
  }

  _setUserAuthorized(user: EUser) {
    this._loginError = { hasError: false };
    this._user = user;
  }
}
