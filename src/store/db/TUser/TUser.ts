import { BaseTManager } from '@store/db/BaseTManager';
import { EUser, userCollection } from './collection';

class TUser extends BaseTManager<EUser> {
  getByCredentials(login: string, password: string): EUser | null {
    return this.list.find(u => {
      return u.login === login && u.password === password;
    }) || null;
  }
}

export const tUser: TUser = new TUser(userCollection);
