import { UserStore } from '@store/UserStore';
import { IReactionDisposer, reaction } from 'mobx';

export abstract class ResetOnLogoutStore {
  private _userLoggedOutReaction: IReactionDisposer;

  protected _userStore: UserStore;

  constructor(userStore: UserStore) {
    this._userStore = userStore;

    this._userLoggedOutReaction = reaction(
      () => this._userStore.authorized,
      (authrized) => {
      if (!authrized) {
        this._reset();
      }
    });
  }

  protected abstract _reset(): void;
}
