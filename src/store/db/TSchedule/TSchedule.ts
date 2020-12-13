import { BaseTManager } from '@store/db/BaseTManager';
import { ESchedule, scheduleCollection } from './collection';
import { DateInterval, Id } from '@store/types';
import { areIntervalsIntersected } from '@utils/areIntervalsIntersected';

class TSchedule extends BaseTManager<ESchedule> {
  getByJobId(jobId: Id): ESchedule[] {
    return this.list.filter(e => e.jobId === jobId);
  }

  getByDateInterval(jobId: Id, dateInterval: DateInterval): ESchedule[] {
    return this.getByJobId(jobId).filter(s =>
      areIntervalsIntersected(s.interval, dateInterval)
    );
  }
}

export const tSchedule: TSchedule = new TSchedule(scheduleCollection);
