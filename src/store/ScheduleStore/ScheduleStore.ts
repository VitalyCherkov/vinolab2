import {
  action,
  computed,
  flow,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction
} from 'mobx';
import { JobStore } from '@store/JobStore';
import {
  CollectionType,
  DateInterval,
} from '@store/types';
import { isMeta, Meta } from '@utils/meta';
import { APIResp } from '@utils/response';
import { ESchedule } from '@store/db/TSchedule';
import { apiScheduleGet } from '@store/api/apiScheduleGet';
import { EScheduleKind } from '@store/db/TScheduleKind';
import { apiScheduleKindListGet } from '@store/api/apiScheduleKindListGet';
import dayjs, { Dayjs } from 'dayjs';
import { ResetOnLogoutStore } from '@store/baseStores/ResetOnLogoutStore';
import { UserStore } from '@store/UserStore';

export class ScheduleStore extends ResetOnLogoutStore {
  _activeJobChangeReaction: IReactionDisposer;
  _selectedSelectedDateChangeReaction: IReactionDisposer;

  _jobStore: JobStore;

  _schedule: ESchedule[] = [];
  _meta: Meta = Meta.initial;
  _prevSelectedDate: Dayjs | null = null;
  _selectedDate: Dayjs = dayjs(new Date());
  _scheduleKindMeta: Meta = Meta.initial;
  _scheduleKindCollection: CollectionType<EScheduleKind> = {
    ids: [],
    entities: {},
  }

  constructor(userStore: UserStore, jobStore: JobStore) {
    super(userStore);

    this._jobStore = jobStore;

    makeObservable(this, {
      _meta: observable,
      _schedule: observable,
      _selectedDate: observable,
      _scheduleKindMeta: observable,
      _scheduleKindCollection: observable,
      meta: computed,
      schedule: computed,
      selectedDate: computed,
      isLoading: computed,
      scheduleKindList: computed,
      setSelectedDate: action,
      _correspondingMonth: computed,
      _setMeta: action,
      _setSchedule: action,
      _setScheduleKindMeta: action,
      _setScheduleKindCollection: action,
    });

    this._activeJobChangeReaction = reaction(
      () => this._jobStore.activeJob,
      () => this._loadData(),
    );

    this._selectedSelectedDateChangeReaction = reaction(
      () => this._selectedDate,
      () => {
        if (this._prevSelectedDate && this._selectedDate.isSame(this._prevSelectedDate, 'month')) {
          return;
        }

        this._loadData();
      }
    );
  }

  get meta(): Meta {
    return this._meta;
  }

  get schedule(): ESchedule[] {
    return isMeta.loading(this._meta) || isMeta.error(this._meta)
      ? []
      : this._schedule;
  }

  get selectedDate(): Dayjs {
    return this._selectedDate;
  }

  get isLoading(): boolean {
    return isMeta.loading(this._meta) || isMeta.loading(this._scheduleKindMeta);
  }

  get scheduleKindList(): EScheduleKind[] {
    return this._scheduleKindCollection.ids.map(id => this._scheduleKindCollection.entities[id]);
  }

  setSelectedDate(date: Dayjs): void {
    this._prevSelectedDate = this._selectedDate;
    this._selectedDate = date;
  }

  getScheduleByDay(day: Dayjs): ESchedule[] {
    return this._schedule.filter(item =>
      day.isSameOrAfter(item.interval.from, 'day')
      && day.isSameOrBefore(item.interval.to, 'day')
    );
  }

  getScheduleKindById(scheduleKindId: string): EScheduleKind | null {
    return this._scheduleKindCollection.entities[scheduleKindId] || null;
  }

  loadScheduleKind = flow(function* (this: ScheduleStore) {
    if (isMeta.loading(this._scheduleKindMeta) || isMeta.success(this._scheduleKindMeta)) {
      return;
    }

    this._setScheduleKindMeta(Meta.loading);

    const resp: APIResp<CollectionType<EScheduleKind>> = yield apiScheduleKindListGet();

    if ('error' in resp) {
      this._setScheduleKindMeta(Meta.error);
    } else {
      this._setScheduleKindCollection(resp.data);
    }
  });

  _loadData = flow(function* (this: ScheduleStore) {
    this._schedule = [];

    if (!this._jobStore.activeJob) {
      return;
    }

    this._setMeta(Meta.loading);

    const resp: APIResp<ESchedule[]> = yield apiScheduleGet(
      this._jobStore.activeJob.id,
      this._correspondingMonth
    );

    if ('error' in resp) {
      this._setMeta(Meta.error);
    } else {
      this._setSchedule(resp.data);
    }
  });

  get _correspondingMonth(): DateInterval {
    return {
      from: this._selectedDate.startOf('month').toDate(),
      to: this._selectedDate.endOf('month').toDate(),
    }
  }

  _setMeta(meta: Meta): void {
    this._meta = meta;
  }

  _setSchedule(schedule: ESchedule[]): void {
    this._meta = Meta.success;
    this._schedule = schedule;
  }

  _setScheduleKindMeta(meta: Meta): void {
    this._scheduleKindMeta = meta;
  }

  _setScheduleKindCollection(collection: CollectionType<EScheduleKind>): void {
    this._scheduleKindMeta = Meta.success;
    this._scheduleKindCollection = collection;
  }

  protected _reset() {
    this._schedule = [];
    this._meta = Meta.initial;
    this._prevSelectedDate = null;
    this._selectedDate = dayjs(new Date());
    this._scheduleKindMeta = Meta.initial;
    this._scheduleKindCollection = {
      ids: [],
      entities: {},
    }
  }
}
