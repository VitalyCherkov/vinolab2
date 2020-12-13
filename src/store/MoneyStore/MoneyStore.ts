import {
  action,
  computed,
  flow,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction
} from 'mobx';
import { CancellablePromise } from 'mobx/dist/api/flow';
import { JobStore } from '@store/JobStore';
import { EMoney } from '@store/db/TMoney';
import { NullableDateInterval } from '@store/types';
import { isMeta, Meta } from '@utils/meta';
import { apiMoneyGet } from '@store/api/apiMoneyGet';
import { APIResp } from '@utils/response';
import { ResetOnLogoutStore } from '@store/baseStores/ResetOnLogoutStore';
import { UserStore } from '@store/UserStore';

export class MoneyStore extends ResetOnLogoutStore {
  _activeJobChangeReaction: IReactionDisposer;
  _selectedIntervalChangeReaction: IReactionDisposer;

  _jobStore: JobStore;
  _money: EMoney[] = [];
  _meta: Meta = Meta.initial;
  _selectedInterval: NullableDateInterval | null = null;

  constructor(userStore: UserStore, jobStore: JobStore) {
    super(userStore);
    this._jobStore = jobStore;

    makeObservable(this, {
      _meta: observable,
      _money: observable,
      _selectedInterval: observable,
      meta: computed,
      money: computed,
      moneyStats: computed,
      selectedInterval: computed,
      setSelectedInterval: action,
      _setMeta: action,
      _setMoney: action,
    });

    this._activeJobChangeReaction = reaction(
      () => this._jobStore.activeJob,
      this.forceLoadData
    );

    this._selectedIntervalChangeReaction = reaction(
      () => this._selectedInterval,
      this.forceLoadData
    );
  }

  get meta(): Meta {
    return this._meta;
  }

  get money(): EMoney[] {
    return isMeta.loading(this._meta) || isMeta.error(this._meta)
      ? []
      : this._money;
  }

  get moneyStats(): number {
    return this.money.reduce((acc, item) => acc + item.amount, 0);
  }

  get selectedInterval(): NullableDateInterval | null {
    return this._selectedInterval;
  }

  setSelectedInterval(interval: NullableDateInterval | null): void {
    this._selectedInterval = interval;
  }

  forceLoadData = () => {
    if (this._loadPromise) {
      this._loadPromise.cancel();
    }

    this._loadPromise = this._loadData();
  }

  _loadPromise: null | CancellablePromise<any> = null;
  _loadData = flow(function* (this: MoneyStore) {
    this._money = [];

    if (
      !this._jobStore.activeJob
      || !this._selectedInterval
      || !this._selectedInterval.from
      || !this._selectedInterval.to
    ) {
      this._loadPromise = null;
      return;
    }

    this._setMeta(Meta.loading);

    const resp: APIResp<EMoney[]> = yield apiMoneyGet(
      this._jobStore.activeJob.id,
      { from: this._selectedInterval.from, to: this._selectedInterval.to }
    );

    if ('error' in resp) {
      this._setMeta(Meta.error);
    } else {
      this._setMoney(resp.data);
    }

    this._loadPromise = null;
  });

  _setMeta(meta: Meta): void {
    this._meta = meta;
  }

  _setMoney(money: EMoney[]): void {
    this._meta = Meta.success;
    this._money = money;
  }

  protected _reset() {
    this._money = [];
    this._meta = Meta.initial;
    this._selectedInterval = null;
  }
}
