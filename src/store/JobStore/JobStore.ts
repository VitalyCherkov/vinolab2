import { EJob } from '@store/db/TJob';
import { action, computed, flow, makeObservable, observable } from 'mobx';
import { UserStore } from '@store/UserStore';
import { isMeta, Meta } from '@utils/meta';
import { apiJobsGet } from '@store/api/apiJobsGet';
import { ResetOnLogoutStore } from '@store/baseStores/ResetOnLogoutStore';

export class JobStore extends ResetOnLogoutStore {
  _activeJob: EJob | null = null;
  _jobs: EJob[] = [];
  _meta: Meta = Meta.initial;

  constructor(userStore: UserStore) {
    super(userStore);

    makeObservable(this, {
      _activeJob: observable,
      _jobs: observable,
      _meta: observable,
      meta: computed,
      jobs: computed,
      activeJob: computed,
      setActiveJob: action,
      loadJobs: action,
      _setMeta: action,
      _setLoadedJobs: action,
    });
  }

  get meta(): Meta {
    return this._meta;
  }

  get jobs(): EJob[] {
    return this._jobs;
  }

  get activeJob(): EJob | null {
    return this._activeJob;
  }

  setActiveJob(job: EJob) {
    this._activeJob = job;
  }

  loadJobs = flow(function* (this: JobStore) {
    if (isMeta.loading(this._meta) || isMeta.success(this._meta)) {
      return;
    }

    this._setMeta(Meta.loading);

    const resp = yield apiJobsGet();
    if ('error' in resp) {
      this._setMeta(Meta.error);
      return;
    }

    this._setLoadedJobs(resp.data);
  });

  _setMeta(meta: Meta): void {
    this._meta = meta;
  }

  _setLoadedJobs(jobs: EJob[]): void {
    this._jobs = jobs;
    this._meta = Meta.success;
  }

  protected _reset() {
    this._activeJob = null;
    this._jobs = [];
    this._meta = Meta.initial;
  }
}
