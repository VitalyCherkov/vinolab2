import { BaseTManager } from '@store/db/BaseTManager';
import { EJob, jobCollection } from './collection';
import { Id } from '@store/types';

class TJob extends BaseTManager<EJob> {
  getByUserId(userId: Id): EJob[] {
    return this.list.filter(e => e.userId === userId);
  }
}

export const tJob: TJob = new TJob(jobCollection);
